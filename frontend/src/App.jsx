import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Screen1 from './pages/screen1.jsx';
import Screen2 from './pages/screen2.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Screen4Profile from './pages/Screen4Profile.jsx';
import Screen5RequestModal from './pages/Screen5RequestModal.jsx';
import Screen6SwapRequests from './pages/Screen6SwapRequests.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Dummy users for demo
const initialDemoUsers = [
  { id: 1, name: 'Marc Demo', skillsOffered: ['Graphic Design', 'Video Editing'], skillsWanted: ['Python', 'Manager'], photo: null, feedback: '', profile: 'Public', availability: 'weekends', location: 'Paris' },
  { id: 2, name: 'Nickel', skillsOffered: ['UI Design'], skillsWanted: ['React'], photo: null, feedback: '', profile: 'Public', availability: 'weekdays', location: 'Berlin' },
  { id: 3, name: 'Joe Wills', skillsOffered: ['Writing'], skillsWanted: ['Photoshop'], photo: null, feedback: '', profile: 'Public', availability: 'evenings', location: 'London' },
];

function AppRoutes({ isLoggedIn, setIsLoggedIn, user, setUser, users, setUsers, swapRequests, setSwapRequests, adminMessages, setAdminMessages }) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle login
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate('/');
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  // Open request modal from Screen4
  const handleRequest = (user) => {
    setModalUser(user);
    setShowRequestModal(true);
  };

  // Home (Screen1)
  // Only public profiles if not logged in
  const visibleUsers = isLoggedIn ? users : users.filter(u => u.profile === 'Public');

  // Accept swap request: swap skills and mark as accepted
  const handleAcceptRequest = (requestId) => {
    setSwapRequests(reqs => reqs.map(r => r.id === requestId ? { ...r, status: 'Accepted' } : r));
    // Swap skills in users
    setUsers(prevUsers => {
      const req = swapRequests.find(r => r.id === requestId);
      if (!req) return prevUsers;
      const { fromUserId, toUserId, offeredSkill, wantedSkill } = req;
      return prevUsers.map(u => {
        if (u.id === fromUserId) {
          // Remove offeredSkill, add wantedSkill
          return {
            ...u,
            skillsOffered: [...u.skillsOffered.filter(s => s !== offeredSkill), wantedSkill],
            skillsWanted: u.skillsWanted.filter(s => s !== wantedSkill),
          };
        }
        if (u.id === toUserId) {
          // Remove wantedSkill, add offeredSkill
          return {
            ...u,
            skillsOffered: [...u.skillsOffered.filter(s => s !== wantedSkill), offeredSkill],
            skillsWanted: u.skillsWanted.filter(s => s !== offeredSkill),
          };
        }
        return u;
      });
    });
  };

  // Reject swap request: remove from list
  const handleRejectRequest = (requestId) => {
    setSwapRequests(reqs => reqs.filter(r => r.id !== requestId));
  };

  // Add navigation for Swap request button
  const handleSwapRequestNav = () => navigate('/swap-requests');

  // Admin: Ban user
  const handleBanUser = (userId) => {
    setUsers(users => users.filter(u => u.id !== userId));
    setSwapRequests(reqs => reqs.filter(r => r.fromUserId !== userId && r.toUserId !== userId));
  };

  // Admin: Reject skill
  const handleRejectSkill = (userId, skill) => {
    setUsers(users => users.map(u =>
      u.id === userId ? { ...u, skillsOffered: u.skillsOffered.filter(s => s !== skill) } : u
    ));
  };

  // Admin: Send platform-wide message
  const handleSendMessage = (msg) => {
    setAdminMessages(msgs => [...msgs, msg]);
  };

  // Admin: Download reports
  const handleDownloadReport = () => {
    const data = {
      users,
      swaps: swapRequests,
      messages: adminMessages,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skill_swap_report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simple admin access: ?admin=1 in URL
  const isAdmin = new URLSearchParams(location.search).get('admin') === '1';

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Screen1
              users={visibleUsers}
              isLoggedIn={isLoggedIn}
              onProfilePhotoClick={u => {
                if (user && u.id === user.id) navigate('/profile');
                else navigate(`/user/${u.id}`);
              }}
              onLoginClick={() => navigate('/login')}
              onSwapRequestClick={handleSwapRequestNav}
              user={user}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Screen2
              onLogin={handleLogin}
              onHome={() => navigate('/')}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <UserProfile
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route
          path="/user/:id"
          element={
            <Screen4Profile
              user={modalUser || users[0]}
              onBack={() => navigate('/')}
              onRequest={() => handleRequest(modalUser || users[0])}
              onSwapRequestClick={handleSwapRequestNav}
            />
          }
        />
        <Route
          path="/swap-requests"
          element={
            <Screen6SwapRequests
              swapRequests={swapRequests}
              users={users}
              onAcceptRequest={handleAcceptRequest}
              onRejectRequest={handleRejectRequest}
              onHome={() => navigate('/')}
            />
          }
        />
        {isAdmin && (
          <Route
            path="/admin"
            element={
              <AdminDashboard
                users={users}
                swaps={swapRequests}
                onBanUser={handleBanUser}
                onRejectSkill={handleRejectSkill}
                onSendMessage={handleSendMessage}
                onDownloadReport={handleDownloadReport}
                messages={adminMessages}
              />
            }
          />
        )}
      </Routes>
      {/* Screen5 Modal */}
      {showRequestModal && (
        <Screen5RequestModal
          offeredSkills={modalUser?.skillsOffered || []}
          wantedSkills={modalUser?.skillsWanted || []}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(initialDemoUsers);
  const [swapRequests, setSwapRequests] = useState([
    // Example request
    // { id, fromUserId, toUserId, offeredSkill, wantedSkill, status }
  ]);
  const [adminMessages, setAdminMessages] = useState([]);

  return (
    <Router>
      <AppRoutes
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        setUser={setUser}
        users={users}
        setUsers={setUsers}
        swapRequests={swapRequests}
        setSwapRequests={setSwapRequests}
        adminMessages={adminMessages}
        setAdminMessages={setAdminMessages}
      />
    </Router>
  );
}

export default App;
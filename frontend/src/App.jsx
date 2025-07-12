import React, { useState } from 'react';
import './App.css'
import Screen1 from './pages/screen1.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Screen4Profile from './pages/Screen4Profile.jsx'
import Screen5RequestModal from './pages/Screen5RequestModal.jsx'

function App() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [wantedSkills, setWantedSkills] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      {!selectedUser ? (
        <Screen1
          onProfilePhotoClick={(user) => setSelectedUser(user)}
        />
      ) : (
        <Screen4Profile
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onRequest={() => setShowRequestModal(true)}
        />
      )}
      {showRequestModal && (
        <Screen5RequestModal
          offeredSkills={offeredSkills}
          wantedSkills={wantedSkills}
          onClose={() => setShowRequestModal(false)}
        />
      )}
    </>
  );
}

export default App
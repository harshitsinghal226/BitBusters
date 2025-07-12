import React, { useState } from 'react';
import './App.css'
import UserProfile from './pages/UserProfile.jsx'
import Screen4Profile from './pages/Screen4Profile.jsx'
import Screen5RequestModal from './pages/Screen5RequestModal.jsx'
import Screen2Login from "./pages/screen2";
import Screen1 from "./pages/screen1";
import Screen6SwapRequest from "./pages/screen6";

function App() {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [offeredSkills, setOfferedSkills] = useState([]); // Adjust initial value as needed
  const [wantedSkills, setWantedSkills] = useState([]);   // Adjust initial value as needed

  return (
    <>
      <UserProfile />
      <Screen4Profile onRequest={() => setShowRequestModal(true)} />
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
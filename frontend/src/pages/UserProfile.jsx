import React, { useState } from 'react';

const initialOffered = [
  'Graphic Design',
  'Video Editing',
  'PhotoShop',
];
const initialWanted = [
  'Python',
  'Java Script',
  'Manager',
];

export default function UserProfile() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [skillsOffered, setSkillsOffered] = useState(initialOffered);
  const [skillsWanted, setSkillsWanted] = useState(initialWanted);
  const [availability, setAvailability] = useState('weekends');
  const [profileType, setProfileType] = useState('Public');
  const [photo, setPhoto] = useState(null);

  const removeSkill = (skill, type) => {
    if (type === 'offered') setSkillsOffered(skillsOffered.filter(s => s !== skill));
    else setSkillsWanted(skillsWanted.filter(s => s !== skill));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-3xl rounded-2xl bg-black/70 shadow-2xl p-8 relative border border-purple-900">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <button className="text-green-400 font-semibold hover:underline">Save</button>
            <button className="text-red-400 font-semibold hover:underline">Discard</button>
          </div>
          <div className="flex gap-8 items-center">
            <a href="#" className="underline underline-offset-4 hover:text-purple-400">Swap request</a>
            <a href="#" className="underline underline-offset-4 hover:text-purple-400">Home</a>
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center">
              {photo ? (
                <img src={photo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-2xl">👤</span>
              )}
            </div>
          </div>
        </div>
        {/* Main Form */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="font-bold text-lg text-purple-300">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="block w-full mt-1 bg-black/40 border-b border-purple-700 focus:outline-none focus:border-purple-400 text-white py-1 px-2" />
            </div>
            <div>
              <label className="font-bold text-lg text-purple-300">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className="block w-full mt-1 bg-black/40 border-b border-purple-700 focus:outline-none focus:border-purple-400 text-white py-1 px-2" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="font-bold text-lg text-purple-300">Skills Offered</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsOffered.map(skill => (
                    <span key={skill} className="flex items-center bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-sm">
                      {skill}
                      <button onClick={() => removeSkill(skill, 'offered')} className="ml-2 text-xs text-red-400 hover:text-red-600">✕</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <label className="font-bold text-lg text-purple-300">Skills wanted</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsWanted.map(skill => (
                    <span key={skill} className="flex items-center bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-sm">
                      {skill}
                      <button onClick={() => removeSkill(skill, 'wanted')} className="ml-2 text-xs text-red-400 hover:text-red-600">✕</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="font-bold text-lg text-purple-300">Availability</label>
              <input value={availability} onChange={e => setAvailability(e.target.value)} className="block w-full mt-1 bg-black/40 border-b border-purple-700 focus:outline-none focus:border-purple-400 text-white py-1 px-2" />
            </div>
            <div>
              <label className="font-bold text-lg text-purple-300">Profile</label>
              <input value={profileType} onChange={e => setProfileType(e.target.value)} className="block w-full mt-1 bg-black/40 border-b border-purple-700 focus:outline-none focus:border-purple-400 text-white py-1 px-2" />
            </div>
          </div>
          {/* Right Side - Profile Photo */}
          <div className="flex flex-col items-center justify-start w-56 mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-full border-4 border-purple-400 flex items-center justify-center bg-black/40 mb-2 overflow-hidden">
              {photo ? (
                <img src={photo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-5xl text-purple-300">👤</span>
              )}
            </div>
            <div className="text-center">
              <div className="text-purple-200 font-semibold">Profile Photo</div>
              <div className="flex gap-2 justify-center mt-1">
                <label className="text-xs text-purple-400 cursor-pointer hover:underline">
                  Add/Edit
                  <input type="file" accept="image/*" className="hidden" onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setPhoto(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }} />
                </label>
                <button className="text-xs text-red-400 hover:underline" onClick={() => setPhoto(null)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
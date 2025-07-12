import React, { useState } from 'react';

export default function Screen4Profile({ onRequest }) {
  // Demo data
  const skillsOffered = ['Graphic Design', 'Video Editing'];
  const skillsWanted = ['Python', 'Manager'];
  const [photo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-3xl rounded-2xl bg-black/70 shadow-2xl p-8 relative border border-purple-900">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-bold text-purple-200">Skill Swap Platform</div>
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
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <button
              className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-5 py-2 rounded mb-4 w-32"
              onClick={onRequest}
            >
              Request
            </button>
            <div className="text-2xl font-bold text-white mb-2">Marc Demo</div>
            <div>
              <div className="font-bold text-purple-300">Skills Offered</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {skillsOffered.map(skill => (
                  <span key={skill} className="bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-sm">{skill}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold text-purple-300">Skills wanted</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {skillsWanted.map(skill => (
                  <span key={skill} className="bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-sm">{skill}</span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <div className="font-bold text-purple-300">Rating and Feedback</div>
              <div className="text-purple-200 italic mt-1">No feedback yet.</div>
            </div>
          </div>
          {/* Profile Photo */}
          <div className="flex flex-col items-center justify-start w-56 mx-auto md:mx-0">
            <div className="w-32 h-32 rounded-full border-4 border-purple-400 flex items-center justify-center bg-black/40 mb-2 overflow-hidden">
              {photo ? (
                <img src={photo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-5xl text-purple-300">👤</span>
              )}
            </div>
            <div className="text-center text-purple-200 font-semibold">Profile Photo</div>
          </div>
        </div>
      </div>
    </div>
  );
} 
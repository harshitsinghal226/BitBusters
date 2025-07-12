import React, { useState } from 'react';

export default function Screen2({ onLogin, onHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use email as the user's name for login
    onLogin({
      id: Date.now(),
      name: email,
      skillsOffered: [],
      skillsWanted: [],
      photo: null,
      feedback: '',
      profile: 'Public',
      availability: '',
      location: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-md rounded-2xl bg-black/70 shadow-2xl p-8 border border-purple-900">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-bold text-purple-200">Skill Swap Platform</div>
          <button
            onClick={onHome}
            className="border border-purple-400 text-purple-300 px-5 py-1 rounded-full font-semibold hover:bg-purple-800/40 hover:text-white transition-colors"
          >
            Home
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="text-purple-200">Email</label>
          <input
            type="email"
            className="rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
            value={email}
            onChange={e => setEmasil(e.target.value)}
            required
          />
          <label className="text-purple-200">Password</label>
          <input
            type="password"
            className="rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded mt-2">Login</button>
          <button
            type="button"
            className="text-blue-300 hover:text-blue-400 hover:underline text-sm mt-2 transition-colors"
          >
            Forgot username/password
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function Screen5RequestModal({ offeredSkills, wantedSkills, onClose }) {
  const [selectedOffered, setSelectedOffered] = useState('');
  const [selectedWanted, setSelectedWanted] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the request logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black rounded-2xl shadow-2xl p-8 w-96 relative border border-purple-900">
        <button className="absolute top-2 right-4 text-purple-300 text-xl" onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-purple-200 mb-1">Choose one of your offered skills</label>
            <select
              className="w-full rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
              value={selectedOffered}
              onChange={e => setSelectedOffered(e.target.value)}
              required
            >
              <option value="" disabled>Select a skill</option>
              {offeredSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-purple-200 mb-1">Choose one of their wanted skills</label>
            <select
              className="w-full rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
              value={selectedWanted}
              onChange={e => setSelectedWanted(e.target.value)}
              required
            >
              <option value="" disabled>Select a skill</option>
              {wantedSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-purple-200 mb-1">Message</label>
            <textarea
              className="w-full rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400 min-h-[80px]"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-6 py-2 rounded mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
} 
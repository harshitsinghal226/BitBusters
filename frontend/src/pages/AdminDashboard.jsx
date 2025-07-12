import React, { useState } from 'react';

export default function AdminDashboard({ users, swaps, onBanUser, onRejectSkill, onSendMessage, onDownloadReport, messages }) {
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-5xl rounded-2xl bg-black/70 shadow-2xl p-4 md:p-8 border border-purple-900">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-2xl font-bold text-purple-200">Admin Dashboard</div>
          <button onClick={onDownloadReport} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded">Download Reports</button>
        </div>
        {/* Platform-wide messages */}
        <div className="mb-6">
          <div className="font-semibold text-purple-200 mb-2">Platform-wide Messages</div>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={e => { e.preventDefault(); onSendMessage(message); setMessage(''); }}>
            <input
              className="flex-1 rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
              placeholder="Type a message to broadcast..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-4 py-2 rounded">Send</button>
          </form>
          <div className="mt-2 space-y-1">
            {messages && messages.map((msg, i) => (
              <div key={i} className="text-sm text-purple-300">{msg}</div>
            ))}
          </div>
        </div>
        {/* User List */}
        <div className="mb-8">
          <div className="font-semibold text-purple-200 mb-2">Users</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-purple-400 border-b border-purple-800">
                  <th className="p-2">Name</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Profile</th>
                  <th className="p-2">Skills Offered</th>
                  <th className="p-2">Skills Wanted</th>
                  <th className="p-2">Ban</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className="border-b border-purple-900">
                    <td className="p-2">{u.name}</td>
                    <td className="p-2">{u.location}</td>
                    <td className="p-2">{u.profile}</td>
                    <td className="p-2">
                      {u.skillsOffered.map(skill => (
                        <span key={skill} className="inline-block bg-purple-900/70 border border-purple-500 rounded-full px-2 py-0.5 text-xs m-0.5">
                          {skill}
                          <button className="ml-1 text-red-400 hover:underline" onClick={() => onRejectSkill(u.id, skill)}>✕</button>
                        </span>
                      ))}
                    </td>
                    <td className="p-2">
                      {u.skillsWanted.map(skill => (
                        <span key={skill} className="inline-block bg-purple-900/70 border border-purple-500 rounded-full px-2 py-0.5 text-xs m-0.5">{skill}</span>
                      ))}
                    </td>
                    <td className="p-2">
                      <button className="text-red-400 hover:underline" onClick={() => onBanUser(u.id)}>Ban</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Swaps Monitor */}
        <div>
          <div className="font-semibold text-purple-200 mb-2">All Swaps</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-purple-400 border-b border-purple-800">
                  <th className="p-2">From</th>
                  <th className="p-2">To</th>
                  <th className="p-2">Offered Skill</th>
                  <th className="p-2">Wanted Skill</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {swaps.map(s => (
                  <tr key={s.id} className="border-b border-purple-900">
                    <td className="p-2">{users.find(u => u.id === s.fromUserId)?.name}</td>
                    <td className="p-2">{users.find(u => u.id === s.toUserId)?.name}</td>
                    <td className="p-2">{s.offeredSkill}</td>
                    <td className="p-2">{s.wantedSkill}</td>
                    <td className="p-2">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 
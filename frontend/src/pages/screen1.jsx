import React, { useState } from 'react';

const AVAILABILITY_OPTIONS = ['All', 'weekends', 'weekdays', 'evenings'];
const USERS_PER_PAGE = 2;

export default function Screen1({
  users = [],
  isLoggedIn,
  user,
  onProfilePhotoClick,
  onLoginClick,
  onSwapRequestClick,
}) {
  const [availability, setAvailability] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filter users by availability and search
  const filteredUsers = users.filter(u =>
    (availability === 'All' || u.availability === availability) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.skillsOffered.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      u.skillsWanted.some(s => s.toLowerCase().includes(search.toLowerCase()))
    )
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((page - 1) * USERS_PER_PAGE, page * USERS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-8">
      {/* Top Bar */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6 px-2">
        <div className="text-2xl font-bold text-purple-200">Skill Swap Platform</div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button onClick={onSwapRequestClick} className="underline underline-offset-4 hover:text-purple-400">Swap request</button>
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center cursor-pointer"
                onClick={() => onProfilePhotoClick(user)}
                title="Your Profile"
              >
                {user?.photo ? <img src={user.photo} alt="Profile" className="object-cover w-full h-full" /> : <span className="text-xl">👤</span>}
              </div>
            </>
          ) : (
            <button onClick={onLoginClick} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded">Login</button>
          )}
        </div>
      </div>
      {/* Search Bar */}
      <div className="w-full max-w-4xl flex gap-2 mb-8 px-2">
        <select
          className="rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
          value={availability}
          onChange={e => { setAvailability(e.target.value); setPage(1); }}
        >
          {AVAILABILITY_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
        <input
          className="flex-1 rounded border border-purple-700 bg-black/40 text-white py-2 px-3 focus:outline-none focus:border-purple-400"
          placeholder="Search by name or skill..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded"
          onClick={() => setPage(1)}
        >
          Search
        </button>
      </div>
      {/* User List */}
      <div className="w-full max-w-4xl space-y-6 mb-8">
        {paginatedUsers.length === 0 && (
          <div className="text-center text-purple-300">No users found.</div>
        )}
        {paginatedUsers.map(u => (
          <div key={u.id} className="flex items-center justify-between bg-black/60 rounded-xl p-4 border border-purple-900 shadow">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center cursor-pointer"
                onClick={() => onProfilePhotoClick(u)}
                title={u.name}
              >
                {u.photo ? <img src={u.photo} alt="Profile" className="object-cover w-full h-full" /> : <span className="text-2xl">👤</span>}
              </div>
              <div>
                <div className="text-lg font-bold text-white">{u.name}</div>
                <div className="flex gap-2 mt-1">
                  {u.skillsOffered.map(skill => (
                    <span key={skill} className="bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-xs">{skill}</span>
                  ))}
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="text-blue-300 text-xs">Skill wanted:</span>
                  {u.skillsWanted.map(skill => (
                    <span key={skill} className="bg-purple-900/70 border border-purple-500 rounded-full px-3 py-1 text-xs">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-purple-300 text-sm">rating <span className="font-bold">{u.rating || '3.8/5'}</span></div>
              <button
                className={`bg-blue-400 hover:bg-blue-500 text-black font-semibold px-5 py-2 rounded ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!isLoggedIn}
                onClick={() => isLoggedIn && onProfilePhotoClick(u)}
              >
                Request
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-2 mb-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={`w-8 h-8 rounded ${p === page ? 'bg-purple-600 text-white' : 'bg-purple-900 text-purple-200'} font-bold hover:bg-purple-700`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

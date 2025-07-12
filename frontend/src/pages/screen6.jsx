import React, { useState } from 'react';

const mockRequests = [
  {
    id: 1,
    name: 'Marc Demo',
    photo: null,
    skillsOffered: ['Java Script'],
    skillsWanted: ['Photoshop'],
    rating: 3.9,
    status: 'Pending',
  },
  {
    id: 2,
    name: 'name',
    photo: null,
    skillsOffered: [],
    skillsWanted: [],
    rating: 3.9,
    status: 'Rejected',
  },
];

const statusOptions = [
  { value: 'all', label: 'All' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Accepted', label: 'Accepted' },
  { value: 'Rejected', label: 'Rejected' },
];

export default function Screen6SwapRequest() {
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const userProfilePhoto = null; // Replace with actual user photo if available

  // Filter requests
  const filteredRequests = mockRequests.filter((req) => {
    const matchesStatus =
      statusFilter === 'all' || req.status === statusFilter;
    const matchesSearch =
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.skillsOffered.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      req.skillsWanted.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Pagination (mock, 2 per page)
  const requestsPerPage = 2;
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage) || 1;
  const paginatedRequests = filteredRequests.slice(
    (page - 1) * requestsPerPage,
    page * requestsPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-3xl rounded-2xl bg-black/70 shadow-2xl p-0 border border-purple-900">
        {/* Top Bar */}
        <div className="flex justify-between items-center border-b border-purple-900 px-6 py-4">
          <div className="text-lg font-bold text-purple-200">Skill Swap Platform</div>
          <div className="flex gap-4 items-center">
            <a href="/" className="underline underline-offset-4 hover:text-purple-400 text-lg">Home</a>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center">
              {userProfilePhoto ? (
                <img src={userProfilePhoto} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <span className="text-2xl">👤</span>
              )}
            </div>
          </div>
        </div>
        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center px-6 py-6 border-b border-purple-900">
          <div className="flex gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-black/40 border border-purple-700 text-white py-2 px-3 rounded focus:outline-none focus:border-purple-400"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or skill..."
              className="bg-black/40 border border-purple-700 text-white py-2 px-3 rounded focus:outline-none focus:border-purple-400 min-w-[120px]"
            />
            <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-semibold transition-colors">search</button>
          </div>
        </div>
        {/* Requests List */}
        <div className="flex flex-col gap-8 px-4 py-8">
          {paginatedRequests.length === 0 && (
            <div className="text-center text-purple-300 py-8">No swap requests found.</div>
          )}
          {paginatedRequests.map((req) => (
            <div
              key={req.id}
              className="flex flex-col md:flex-row items-center md:items-stretch justify-between bg-black/60 border border-purple-700 rounded-xl p-6 gap-6 shadow-lg"
            >
              {/* Profile Photo */}
              <div className="flex flex-col items-center justify-center w-full md:w-1/5">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center mb-2">
                  {req.photo ? (
                    <img src={req.photo} alt="Profile" className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-lg text-purple-200">Profile Photo</span>
                  )}
                </div>
              </div>
              {/* Request Info */}
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="font-bold text-lg text-purple-200 mb-1">{req.name}</div>
                <div className="flex flex-wrap gap-2 items-center mb-1">
                  <span className="text-green-400 font-semibold text-sm">Skills Offered =&gt;</span>
                  {req.skillsOffered.length > 0 ? req.skillsOffered.map((skill) => (
                    <span key={skill} className="bg-black/40 border border-green-400 rounded-full px-3 py-1 text-xs text-green-200 font-semibold">{skill}</span>
                  )) : <span className="text-gray-400 text-xs">-</span>}
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-blue-400 font-semibold text-sm">Skill wanted =&gt;</span>
                  {req.skillsWanted.length > 0 ? req.skillsWanted.map((skill) => (
                    <span key={skill} className="bg-black/40 border border-blue-400 rounded-full px-3 py-1 text-xs text-blue-200 font-semibold">{skill}</span>
                  )) : <span className="text-gray-400 text-xs">-</span>}
                </div>
                <div className="text-xs text-purple-400 mt-1">rating <span className="font-semibold text-purple-200">{req.rating}/5</span></div>
              </div>
              {/* Status & Actions */}
              <div className="flex flex-col items-end justify-between gap-4 w-full md:w-1/5 mt-4 md:mt-0">
                <div className="text-right text-lg font-semibold mb-2">
                  Status{' '}
                  {req.status === 'Pending' && <span className="text-purple-300">Pending</span>}
                  {req.status === 'Accepted' && <span className="text-green-400">Accepted</span>}
                  {req.status === 'Rejected' && <span className="text-red-400">Rejected</span>}
                </div>
                {req.status === 'Pending' && (
                  <div className="flex gap-4">
                    <button className="text-green-400 font-semibold hover:underline">Accept</button>
                    <button className="text-red-400 font-semibold hover:underline">Reject</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pb-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded font-semibold border transition-colors mx-0.5 bg-black/40 border-purple-700 text-purple-300 hover:bg-purple-800/40 disabled:opacity-50"
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded font-semibold border transition-colors mx-0.5 ${
                page === num
                  ? 'bg-purple-600 border-purple-400 text-white'
                  : 'bg-black/40 border-purple-700 text-purple-300 hover:bg-purple-800/40'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 rounded font-semibold border transition-colors mx-0.5 bg-black/40 border-purple-700 text-purple-300 hover:bg-purple-800/40 disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}

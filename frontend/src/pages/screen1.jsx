import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Marc Demo",
    photo: null,
    skillsOffered: ["Graphic Design", "Video Editing"],
    skillsWanted: ["Python", "JavaScript"],
    rating: 4.8,
    feedback: 23,
    availability: "weekends",
    profileType: "Public",
  },
  {
    id: 2,
    name: "Rachel",
    photo: null,
    skillsOffered: ["PhotoShop"],
    skillsWanted: ["Manager"],
    rating: 3.9,
    feedback: 15,
    availability: "weekdays",
    profileType: "Public",
  },
  {
    id: 3,
    name: "Joe Wills",
    photo: null,
    skillsOffered: ["UI/UX"],
    skillsWanted: ["React"],
    rating: 4.2,
    feedback: 9,
    availability: "flexible",
    profileType: "Public",
  },
];

const availabilityOptions = [
  { value: "all", label: "All" },
  { value: "weekends", label: "Weekends" },
  { value: "weekdays", label: "Weekdays" },
  { value: "evenings", label: "Evenings" },
  { value: "flexible", label: "Flexible" },
];

export default function Screen1() {
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);

  // Filter users by search and availability
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.skillsOffered.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      user.skillsWanted.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchesAvailability =
      availability === "all" || user.availability === availability;
    return matchesSearch && matchesAvailability && user.profileType === "Public";
  });

  // Pagination (mock, 3 per page)
  const usersPerPage = 3;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-3xl rounded-2xl bg-black/70 shadow-2xl p-6 md:p-8 border border-purple-900">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="text-2xl font-bold text-purple-300">Skill Swap Platform</div>
          <div className="flex gap-4 items-center">
            <button className="text-purple-400 underline underline-offset-4 hover:text-purple-300 font-semibold">Swap request</button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
          </div>
        </div>
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="bg-black/40 border border-purple-700 text-white py-2 px-3 rounded focus:outline-none focus:border-purple-400"
          >
            {availabilityOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or skill..."
            className="flex-1 bg-black/40 border border-purple-700 text-white py-2 px-3 rounded focus:outline-none focus:border-purple-400 min-w-[180px]"
          />
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded font-semibold transition-colors">Search</button>
        </div>
        {/* User List */}
        <div className="space-y-6">
          {paginatedUsers.length === 0 && (
            <div className="text-center text-purple-300 py-8">No public profiles found.</div>
          )}
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-purple-900/30 border border-purple-700 rounded-xl p-4 gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400 bg-purple-900 flex items-center justify-center">
                  {user.photo ? (
                    <img src={user.photo} alt="Profile" className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg text-purple-200">{user.name}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.skillsOffered.map((skill) => (
                      <span key={skill} className="bg-purple-800/70 border border-purple-500 rounded-full px-2 py-0.5 text-xs text-purple-100">{skill}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.skillsWanted.map((skill) => (
                      <span key={skill} className="bg-black/40 border border-purple-500 rounded-full px-2 py-0.5 text-xs text-purple-300">{skill}</span>
                    ))}
                  </div>
                  <div className="text-xs text-purple-400 mt-1">Availability: <span className="font-semibold text-purple-200">{user.availability}</span></div>
                  <div className="text-xs text-purple-400">Rating: <span className="font-semibold text-purple-200">{user.rating}</span> ({user.feedback} feedback)</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded font-semibold transition-colors">Request</button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded font-semibold border transition-colors ${
                page === num
                  ? "bg-purple-600 border-purple-400 text-white"
                  : "bg-black/40 border-purple-700 text-purple-300 hover:bg-purple-800/40"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

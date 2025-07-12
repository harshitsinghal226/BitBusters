import React, { useState } from 'react';

export default function Screen2Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-black/70 shadow-2xl p-8 border border-purple-900">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="text-lg font-bold text-purple-200">Skill Swap Platform</div>
          <a
            href="/"
            className="bg-transparent border border-purple-400 text-purple-300 px-6 py-2 rounded-full font-semibold hover:bg-purple-800/40 transition-colors text-lg"
          >
            Home
          </a>
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <div className="w-full max-w-md flex flex-col gap-4">
            <label className="text-purple-200 font-semibold text-lg" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-purple-700 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-400 text-lg"
              autoComplete="username"
              required
            />
            <label className="text-purple-200 font-semibold text-lg mt-4" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-purple-700 rounded px-4 py-2 text-white focus:outline-none focus:border-purple-400 text-lg"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-transparent border border-purple-400 text-purple-200 px-8 py-2 rounded-full font-semibold hover:bg-purple-800/40 transition-colors text-lg"
          >
            Login
          </button>
          <a
            href="#"
            className="text-blue-400 hover:underline mt-2 text-base"
          >
            Forgot username/password
          </a>
        </form>
      </div>
    </div>
  );
}

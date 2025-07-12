import React, { useState } from 'react';

export default function Screen6SwapRequests({ swapRequests, users, onAcceptRequest, onRejectRequest, onHome }) {
  const [feedbacks, setFeedbacks] = useState({}); // { [requestId]: { rating, feedback } }

  const handleFeedbackSubmit = (reqId, rating, feedback) => {
    setFeedbacks(f => ({ ...f, [reqId]: { rating, feedback } }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1333] via-[#2d1a4d] to-black text-white flex flex-col items-center py-4 md:py-10 px-2">
      <div className="w-full max-w-3xl rounded-2xl bg-black/70 shadow-2xl p-2 sm:p-4 md:p-8 border border-purple-900">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-0">
          <div className="text-lg md:text-xl font-bold text-purple-200">Skill Swap Platform</div>
          <button onClick={onHome} className="border border-purple-400 text-purple-300 px-4 py-1 rounded-full font-semibold hover:bg-purple-800/40 hover:text-white transition-colors text-sm md:text-base">
            Home
          </button>
        </div>
        <div className="space-y-4 md:space-y-6">
          {swapRequests.length === 0 && (
            <div className="text-center text-purple-300">No swap requests.</div>
          )}
          {swapRequests.map(req => {
            const fromUser = users.find(u => u.id === req.fromUserId);
            const toUser = users.find(u => u.id === req.toUserId);
            const feedback = feedbacks[req.id];
            return (
              <div key={req.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black/40 rounded-lg p-3 sm:p-4 border border-purple-800 gap-2 sm:gap-0">
                <div>
                  <div className="font-semibold text-base md:text-lg">{fromUser?.name} → {toUser?.name}</div>
                  <div className="text-xs md:text-sm text-purple-300">
                    {fromUser?.name} offers <b>{req.offeredSkill}</b> for <b>{req.wantedSkill}</b>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                  <span className={
                    req.status === 'Pending' ? 'text-yellow-300' :
                    req.status === 'Accepted' ? 'text-green-400' :
                    'text-red-400'
                  }>{req.status || 'Pending'}</span>
                  {req.status !== 'Accepted' && (
                    <>
                      <button className="text-green-400 font-semibold hover:underline text-sm md:text-base" onClick={() => onAcceptRequest(req.id)}>Accept</button>
                      <button className="text-red-400 font-semibold hover:underline text-sm md:text-base" onClick={() => onRejectRequest(req.id)}>Reject</button>
                    </>
                  )}
                </div>
                {/* Ratings and Feedback for accepted swaps */}
                {req.status === 'Accepted' && (
                  <div className="w-full mt-4">
                    <div className="font-semibold text-purple-200 mb-1">Leave Feedback</div>
                    {feedback ? (
                      <div className="text-sm text-purple-300">
                        <div>Rating: <span className="font-bold">{feedback.rating}/5</span></div>
                        <div>Feedback: {feedback.feedback}</div>
                      </div>
                    ) : (
                      <FeedbackForm onSubmit={(rating, fb) => handleFeedbackSubmit(req.id, rating, fb)} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FeedbackForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  return (
    <form
      className="flex flex-col gap-2 mt-2"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(rating, feedback);
      }}
    >
      <label className="text-xs text-purple-300">Rating</label>
      <select
        className="rounded border border-purple-700 bg-black/40 text-white py-1 px-2 focus:outline-none focus:border-purple-400 w-24"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <label className="text-xs text-purple-300">Feedback</label>
      <textarea
        className="rounded border border-purple-700 bg-black/40 text-white py-1 px-2 focus:outline-none focus:border-purple-400 min-h-[40px]"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        required
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-1 rounded mt-1 text-sm">Submit</button>
    </form>
  );
} 
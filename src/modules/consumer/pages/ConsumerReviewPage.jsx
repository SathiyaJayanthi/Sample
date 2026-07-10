import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ConsumerReviewPage() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!review.trim()) {
      return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <Link to="/orders" className="text-sm font-medium text-emerald-600">← Back to orders</Link>
        <h1 className="mt-4 text-2xl font-semibold">Leave a review for {id}</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Rating</label>
            <select value={rating} onChange={(event) => setRating(Number(event.target.value))} className="rounded-xl border border-slate-200 px-4 py-3">
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>{value} stars</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Your feedback</label>
            <textarea value={review} onChange={(event) => setReview(event.target.value)} rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Share your experience with the delivery and product quality" />
          </div>
          <button type="submit" className="rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white">Submit review</button>
        </form>
      </div>
    </div>
  );
}

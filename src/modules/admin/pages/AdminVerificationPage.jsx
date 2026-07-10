import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialFarmers = [
  { id: 'f-1', name: 'Anita Rao', location: 'Coimbatore', phone: '9876543210', status: 'pending' },
  { id: 'f-2', name: 'Karthik Menon', location: 'Salem', phone: '9123456780', status: 'pending' },
  { id: 'f-3', name: 'Priya S', location: 'Madurai', phone: '9988776655', status: 'verified' },
];

export default function AdminVerificationPage() {
  const [farmers, setFarmers] = useState(initialFarmers);
  const pendingCount = useMemo(() => farmers.filter((farmer) => farmer.status === 'pending').length, [farmers]);

  const updateStatus = (id, status) => {
    setFarmers((current) => current.map((farmer) => farmer.id === id ? { ...farmer, status } : farmer));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Verification</p>
            <h1 className="text-2xl font-semibold">Farmer verification queue</h1>
          </div>
          <Link to="/admin" className="text-sm font-medium text-slate-600">Back to dashboard</Link>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Pending approvals: {pendingCount}
        </div>

        <div className="mt-6 space-y-4">
          {farmers.map((farmer) => (
            <div key={farmer.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-semibold">{farmer.name}</h2>
                <p className="text-sm text-slate-500">{farmer.location} • {farmer.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${farmer.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {farmer.status}
                </span>
                {farmer.status === 'pending' ? (
                  <>
                    <button type="button" onClick={() => updateStatus(farmer.id, 'verified')} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Approve</button>
                    <button type="button" onClick={() => updateStatus(farmer.id, 'rejected')} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600">Reject</button>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

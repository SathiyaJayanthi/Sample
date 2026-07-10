import { Link } from 'react-router-dom';

const metrics = [
  { label: 'Verified farmers', value: '128' },
  { label: 'Pending approvals', value: '7' },
  { label: 'Delivered orders', value: '342' },
  { label: 'Revenue', value: '₹84,250' },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-slate-900 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Admin module</p>
              <h1 className="mt-2 text-3xl font-semibold">Verification and monitoring dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">Review farmer verifications, monitor orders, and keep an eye on platform activity.</p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm">
              Admin access enabled
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Link to="/admin/verification" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Farmer verification queue</h2>
            <p className="mt-2 text-sm text-slate-600">Approve or reject pending farmer applications before they can list products.</p>
          </Link>
          <Link to="/admin/orders" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Order monitoring</h2>
            <p className="mt-2 text-sm text-slate-600">Track all orders, review status changes, and keep delivery health visible.</p>
          </Link>
        </section>
      </div>
    </div>
  );
}

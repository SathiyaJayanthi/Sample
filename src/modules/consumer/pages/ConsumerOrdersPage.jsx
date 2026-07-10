import { Link } from 'react-router-dom';
import { getStatusTimeline } from '../utils/cartUtils';

const orders = [
  {
    id: 'ORD-101',
    date: '2026-07-10',
    total: 345,
    status: 'delivered',
    items: ['Fresh Tomatoes', 'Organic Eggs']
  },
  {
    id: 'ORD-102',
    date: '2026-07-08',
    total: 220,
    status: 'out_for_delivery',
    items: ['Farm Honey']
  }
];

export default function ConsumerOrdersPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Orders</p>
              <h1 className="text-2xl font-semibold">Order history and tracking</h1>
            </div>
            <Link to="/" className="text-sm font-medium text-emerald-600">Browse products</Link>
          </div>
        </header>

        {orders.map((order) => {
          const timeline = getStatusTimeline(order.status);
          return (
            <section key={order.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{order.id}</p>
                  <h2 className="text-lg font-semibold">{order.items.join(', ')}</h2>
                </div>
                <div className="text-sm text-slate-500">Placed on {order.date}</div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {timeline.map((step) => (
                  <div key={step.key} className={`rounded-xl border p-3 ${step.done ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                    <p className="text-sm font-medium">{step.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-slate-500">Status: {order.status.replace(/_/g, ' ')}</span>
                <Link to={`/reviews/${order.id}`} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white">Leave review</Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

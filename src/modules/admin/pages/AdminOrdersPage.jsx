import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const initialOrders = [
  { id: 'ORD-1001', customer: 'Madhav', farmer: 'Anita Rao', total: 345, status: 'delivered', payment: 'COD' },
  { id: 'ORD-1002', customer: 'Riya', farmer: 'Karthik Menon', total: 220, status: 'out_for_delivery', payment: 'COD' },
  { id: 'ORD-1003', customer: 'Kiran', farmer: 'Priya S', total: 180, status: 'pending', payment: 'Razorpay' },
];

export default function AdminOrdersPage() {
  const [orders] = useState(initialOrders);
  const revenue = useMemo(() => orders.filter((order) => order.payment === 'COD' && order.status === 'delivered').reduce((sum, order) => sum + order.total, 0), [orders]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Orders</p>
            <h1 className="text-2xl font-semibold">Order monitoring</h1>
          </div>
          <Link to="/admin" className="text-sm font-medium text-slate-600">Back to dashboard</Link>
        </div>

        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Delivered COD revenue: ₹{revenue}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-3 py-3">Order ID</th>
                <th className="px-3 py-3">Customer</th>
                <th className="px-3 py-3">Farmer</th>
                <th className="px-3 py-3">Total</th>
                <th className="px-3 py-3">Payment</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-slate-200">
                  <td className="px-3 py-3 font-medium">{order.id}</td>
                  <td className="px-3 py-3">{order.customer}</td>
                  <td className="px-3 py-3">{order.farmer}</td>
                  <td className="px-3 py-3">₹{order.total}</td>
                  <td className="px-3 py-3">{order.payment}</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

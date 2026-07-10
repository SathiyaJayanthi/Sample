import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateCartTotals } from '../utils/cartUtils';

export default function ConsumerCheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const totals = calculateCartTotals(items);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      return;
    }

    clearCart();
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
        <Link to="/cart" className="text-sm font-medium text-emerald-600">← Back to cart</Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-lg font-semibold">Delivery address</h2>
              <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={4} className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3" placeholder="Enter your delivery address" />
            </section>
            <section className="rounded-2xl border border-slate-200 p-4">
              <h2 className="text-lg font-semibold">Payment</h2>
              <label className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                <input type="radio" name="payment" checked={paymentMethod === 'Razorpay'} onChange={() => setPaymentMethod('Razorpay')} />
                <span>Razorpay test mode</span>
              </label>
            </section>
          </div>
          <aside className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold">Review order</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Items</span><span>{totals.itemCount}</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹{totals.deliveryFee}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-800"><span>Total</span><span>₹{totals.total}</span></div>
            </div>
            <button type="button" onClick={handlePlaceOrder} className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white">Place order</button>
          </aside>
        </div>
      </div>
    </div>
  );
}

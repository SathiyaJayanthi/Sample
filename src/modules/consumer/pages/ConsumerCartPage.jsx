import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateCartTotals } from '../utils/cartUtils';

export default function ConsumerCartPage() {
  const { items, updateQuantity, clearCart } = useCart();
  const totals = calculateCartTotals(items);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Cart</p>
            <h1 className="text-2xl font-semibold">Your selected items</h1>
          </div>
          <Link to="/" className="text-sm font-medium text-emerald-600">Continue shopping</Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">Your cart is empty.</div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                  <div className="h-24 w-full rounded-xl bg-slate-100 sm:w-24" />
                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-slate-500">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 rounded-full border border-slate-200">−</button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 rounded-full border border-slate-200">+</button>
                  </div>
                  <div className="text-right font-semibold">₹{item.price * item.quantity}</div>
                </div>
              ))
            )}
          </div>

          <aside className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Items</span><span>{totals.itemCount}</span></div>
              <div className="flex justify-between"><span>Subtotal</span><span>₹{totals.subtotal}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>₹{totals.deliveryFee}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-800"><span>Total</span><span>₹{totals.total}</span></div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <Link to="/checkout" className="rounded-xl bg-emerald-600 px-4 py-3 text-center font-medium text-white">Checkout</Link>
              <button type="button" onClick={clearCart} className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600">Clear cart</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

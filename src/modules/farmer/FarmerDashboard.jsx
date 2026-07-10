import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import {
  createFarmerProduct,
  deleteFarmerProduct,
  getFarmerOrders,
  getFarmerProducts,
  updateFarmerOrderStatus,
  updateFarmerProduct,
} from '../../api/farmer';
import { MapView } from '../../shared';
import { LocationPicker } from './components/LocationPicker';

const emptyForm = {
  name: '',
  category: 'Vegetables',
  price: '',
  quantity: '',
  unit: 'kg',
  harvestDate: '',
  location: { address: '', lat: '', lng: '' },
  status: 'active',
  photoUrl: '',
};

const statusSequence = ['placed', 'confirmed', 'out_for_delivery', 'delivered'];

function FarmerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const [productResponse, orderResponse] = await Promise.all([
        getFarmerProducts(),
        getFarmerOrders(),
      ]);
      if (productResponse.success) {
        setProducts(productResponse.data);
      }
      if (orderResponse.success) {
        setOrders(orderResponse.data);
      }
      setLoading(false);
    };

    init();
  }, []);

  const earnings = useMemo(
    () => orders.filter((order) => order.status === 'delivered').reduce((sum, order) => sum + order.totalAmount, 0),
    [orders]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm((current) => ({ ...current, photoUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      location: form.location,
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    if (editingId) {
      const response = await updateFarmerProduct(editingId, payload);
      if (response.success) {
        setProducts((current) => current.map((item) => (item.id === editingId ? response.data : item)));
      }
    } else {
      const response = await createFarmerProduct(payload);
      if (response.success) {
        setProducts((current) => [response.data, ...current]);
      }
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      ...emptyForm,
      ...product,
      location: typeof product.location === 'object' && product.location !== null
        ? product.location
        : { address: product.location || '', lat: '', lng: '' },
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleDelete = async (id) => {
    const response = await deleteFarmerProduct(id);
    if (response.success) {
      setProducts((current) => current.filter((item) => item.id !== id));
    }
  };

  const handleStatusChange = async (orderId, nextStatus) => {
    const response = await updateFarmerOrderStatus(orderId, nextStatus);
    if (response.success) {
      setOrders((current) => current.map((order) => (order.id === orderId ? response.data : order)));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-green-700 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-green-100">Farmer workspace</p>
              <h1 className="mt-2 text-3xl font-semibold">Welcome back, {user.name}</h1>
              <p className="mt-2 max-w-2xl text-sm text-green-100">
                Manage your listings, track incoming orders, and review your delivered earnings in one place.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-sm text-green-100">Delivered earnings</p>
              <p className="text-2xl font-semibold">₹{earnings}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active listings</p>
            <p className="mt-2 text-3xl font-semibold">{products.filter((item) => item.status === 'active').length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Pending orders</p>
            <p className="mt-2 text-3xl font-semibold">{orders.filter((item) => item.status !== 'delivered').length}</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Delivered orders</p>
            <p className="mt-2 text-3xl font-semibold">{orders.filter((item) => item.status === 'delivered').length}</p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Product inventory</h2>
                <p className="text-sm text-slate-500">Add, edit, and retire produce listings.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/browse"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  Browse nearby
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-lg border border-green-600 px-3 py-2 text-sm font-medium text-green-700"
                >
                  New product
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-2">
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="name" value={form.name} onChange={handleChange} placeholder="Product name" required />
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="price" type="number" min="0" value={form.price} onChange={handleChange} placeholder="Price" required />
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" required />
              <input className="rounded-lg border border-slate-300 px-3 py-2" name="harvestDate" type="date" value={form.harvestDate} onChange={handleChange} required />
              <div className="md:col-span-2">
                <LocationPicker
                  value={form.location}
                  onChange={(nextLocation) => setForm((current) => ({ ...current, location: nextLocation }))}
                />
              </div>
              {form.location?.lat && form.location?.lng ? (
                <div className="md:col-span-2">
                  <MapView center={form.location} markers={[{ id: 'selected', title: form.name || 'Selected farm', description: form.location.address, lat: form.location.lat, lng: form.location.lng, color: '#16a34a' }]} height="220px" />
                </div>
              ) : null}
              <select className="rounded-lg border border-slate-300 px-3 py-2" name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="sold_out">Sold out</option>
              </select>
              <input className="rounded-lg border border-slate-300 px-3 py-2 md:col-span-2" type="file" accept="image/*" onChange={handleFileChange} />
              <div className="md:col-span-2 flex items-center justify-between">
                <p className="text-sm text-slate-500">{editingId ? 'Update the selected item' : 'Create a new listing'}</p>
                <button type="submit" className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white">
                  {editingId ? 'Save changes' : 'Create listing'}
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {loading ? (
                <p className="text-sm text-slate-500 md:col-span-2">Loading listings...</p>
              ) : (
                products.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {product.photoUrl ? <img src={product.photoUrl} alt={product.name} className="h-36 w-full object-cover" /> : null}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-slate-500">{product.category}</p>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {product.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">₹{product.price}/{product.unit}</p>
                      <p className="text-sm text-slate-600">Available: {product.quantity} {product.unit}</p>
                      <p className="text-sm text-slate-600">Harvested: {product.harvestDate}</p>
                      <p className="text-sm text-slate-600">Location: {typeof product.location === 'object' && product.location !== null ? product.location.address : product.location}</p>
                      <div className="mt-4 flex gap-2">
                        <button type="button" onClick={() => startEdit(product)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
                          Edit
                        </button>
                        <button type="button" onClick={() => handleDelete(product.id)} className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600">
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Incoming orders</h2>
              <p className="mt-1 text-sm text-slate-500">Advance each order as it moves through fulfillment.</p>
              <div className="mt-4 space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold">{order.consumerName}</p>
                        <p className="text-sm text-slate-500">Order {order.id}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{order.status}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">Total: ₹{order.totalAmount}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {statusSequence.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => handleStatusChange(order.id, status)}
                          className={`rounded-lg px-3 py-2 text-sm ${order.status === status ? 'bg-green-700 text-white' : 'border border-slate-300 text-slate-700'}`}
                        >
                          {status.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Earnings snapshot</h2>
              <p className="mt-2 text-sm text-slate-500">Revenue from fulfilled deliveries.</p>
              <div className="mt-4 rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-700">Total delivered value</p>
                <p className="mt-1 text-3xl font-semibold text-green-800">₹{earnings}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes',
    price: 120,
    category: 'Vegetables',
    location: 'Coimbatore',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80',
    description: 'Locally harvested tomatoes from organic farms.'
  },
  {
    id: 'p2',
    name: 'Organic Eggs',
    price: 80,
    category: 'Dairy',
    location: 'Salem',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    description: 'Free-range eggs delivered within 24 hours.'
  },
  {
    id: 'p3',
    name: 'Farm Honey',
    price: 220,
    category: 'Honey',
    location: 'Madurai',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: 'Pure wildflower honey sourced directly from farmers.'
  }
];

export default function ConsumerBrowsePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { addItem } = useCart();

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="rounded-2xl bg-emerald-600 p-8 text-white shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-100">Consumer module</p>
              <h1 className="mt-2 text-3xl font-semibold">Browse fresh produce and place orders</h1>
              <p className="mt-3 max-w-2xl text-sm text-emerald-50">Search by product, filter by category, and add items to your cart for checkout.</p>
            </div>
            <Link to="/cart" className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-emerald-700">View cart</Link>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search produce or category"
              className="rounded-xl border border-slate-200 px-4 py-3"
            />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
              <option value="All">All categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Honey">Honey</option>
            </select>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-slate-500">{product.category} • {product.location}</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">★ {product.rating}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">₹{product.price}</span>
                  <div className="flex gap-2">
                    <Link to={`/products/${product.id}`} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">View</Link>
                    <button type="button" onClick={() => addItem(product)} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Add</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

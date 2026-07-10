import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    description: 'Locally harvested tomatoes from organic farms.',
    details: 'Harvested this morning and packed in recyclable crates.'
  },
  {
    id: 'p2',
    name: 'Organic Eggs',
    price: 80,
    category: 'Dairy',
    location: 'Salem',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    description: 'Free-range eggs delivered within 24 hours.',
    details: 'Fresh eggs from pasture-fed hens, available daily.'
  },
  {
    id: 'p3',
    name: 'Farm Honey',
    price: 220,
    category: 'Honey',
    location: 'Madurai',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: 'Pure wildflower honey sourced directly from farmers.',
    details: 'Unfiltered honey with rich floral notes and natural sweetness.'
  }
];

export default function ConsumerProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();

  const product = useMemo(() => products.find((entry) => entry.id === id), [id]);

  if (!product) {
    return <div className="p-6 text-slate-600">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
        <Link to="/" className="text-sm font-medium text-emerald-600">← Back to browse</Link>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <img src={product.image} alt={product.name} className="h-80 w-full rounded-2xl object-cover" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{product.category}</p>
            <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
            <p className="mt-3 text-slate-600">{product.description}</p>
            <p className="mt-4 text-sm text-slate-500">{product.details}</p>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-medium">{product.location}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Price</p>
                <p className="text-2xl font-semibold">₹{product.price}</p>
              </div>
            </div>
            <button type="button" onClick={() => addItem(product)} className="mt-6 rounded-xl bg-emerald-600 px-4 py-3 font-medium text-white">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

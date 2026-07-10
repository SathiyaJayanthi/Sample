import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFarmerProducts } from '../../api/farmer';
import { MapView, useDistance } from '../../shared';

const fallbackReference = { lat: 11.0168, lng: 76.9558, address: 'Coimbatore, Tamil Nadu' };

function ProductBrowsePage() {
  const [products, setProducts] = useState([]);
  const [referenceLocation, setReferenceLocation] = useState(fallbackReference);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const response = await getFarmerProducts();
      if (response.success) {
        setProducts(response.data);
      }
      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setReferenceLocation({ lat: coords.latitude, lng: coords.longitude, address: 'Your current location' });
      },
      () => undefined
    );
  }, []);

  const sortedProducts = useMemo(() => useDistance(products, referenceLocation), [products, referenceLocation]);
  const markers = sortedProducts
    .filter((product) => product.location?.lat && product.location?.lng)
    .map((product) => ({
      id: product.id,
      title: product.name,
      description: `${product.category} · ₹${product.price}/${product.unit}`,
      lat: product.location.lat,
      lng: product.location.lng,
      color: product.status === 'active' ? '#16a34a' : '#f59e0b',
    }));

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-800">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-green-700">Discover produce</p>
              <h1 className="mt-2 text-3xl font-semibold">Nearby farm listings</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Browse markets around the selected location and sort the nearest farms first.
              </p>
            </div>
            <Link to="/dashboard" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
              Back to dashboard
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Map view</h2>
                <p className="text-sm text-slate-500">Pins show product locations as they appear on the map.</p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                Sorted nearest first
              </span>
            </div>
            <MapView center={referenceLocation} markers={markers} height="420px" />
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl bg-white p-6 shadow-sm text-sm text-slate-500">Loading produce from local farms...</div>
            ) : (
              sortedProducts.map((product) => (
                <article key={product.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">{product.name}</h3>
                      <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">₹{product.price}/{product.unit}</p>
                  <p className="text-sm text-slate-600">Available: {product.quantity} {product.unit}</p>
                  <p className="text-sm text-slate-600">Location: {product.location?.address || product.location || 'Unknown'}</p>
                  <p className="mt-2 text-sm font-medium text-green-700">
                    {Number.isFinite(product.distanceKm) ? `${product.distanceKm.toFixed(1)} km away` : 'Distance unavailable'}
                  </p>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBrowsePage;

import { useMemo, useState } from 'react';

const fallbackLocations = {
  Coimbatore: { lat: 11.0168, lng: 76.9558, address: 'Coimbatore, Tamil Nadu' },
  'Mettupalayam': { lat: 11.2994, lng: 76.9441, address: 'Mettupalayam, Tamil Nadu' },
};

const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`
  );
  const results = await response.json();

  if (!results?.[0]) {
    return null;
  }

  return {
    lat: Number(results[0].lat),
    lng: Number(results[0].lon),
    address: results[0].display_name,
  };
};

export function LocationPicker({ value, onChange }) {
  const [addressInput, setAddressInput] = useState(value?.address || '');
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');

  const currentValue = useMemo(() => {
    if (value?.lat && value?.lng) {
      return `${value.lat.toFixed(4)}, ${value.lng.toFixed(4)}`;
    }

    return 'No coordinates yet';
  }, [value]);

  const handleLocate = async () => {
    if (!addressInput.trim()) {
      setError('Enter an address to resolve coordinates.');
      return;
    }

    setIsLocating(true);
    setError('');

    try {
      const fallback = fallbackLocations[addressInput.trim()];
      const resolved = (await geocodeAddress(addressInput)) || fallback;

      if (!resolved) {
        throw new Error('Location could not be resolved.');
      }

      onChange({ address: resolved.address, lat: resolved.lat, lng: resolved.lng });
      setAddressInput(resolved.address);
    } catch (locationError) {
      setError(locationError.message || 'Unable to resolve location.');
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <label className="text-sm font-medium text-slate-700" htmlFor="location-search">
        Pick location from address
      </label>
      <div className="flex flex-col gap-2 md:flex-row">
        <input
          id="location-search"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2"
          value={addressInput}
          onChange={(event) => setAddressInput(event.target.value)}
          placeholder="Type an address or town"
        />
        <button
          type="button"
          onClick={handleLocate}
          className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white"
          disabled={isLocating}
        >
          {isLocating ? 'Resolving...' : 'Resolve'}
        </button>
      </div>
      <div className="text-sm text-slate-600">
        <span className="font-medium">Coordinates:</span> {currentValue}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

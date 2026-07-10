const EARTH_RADIUS_KM = 6371;

export const normalizeLocation = (location) => {
  if (!location) {
    return null;
  }

  if (typeof location === 'object' && location !== null) {
    if (typeof location.lat === 'number' && typeof location.lng === 'number') {
      return { lat: location.lat, lng: location.lng };
    }

    if (typeof location.latitude === 'number' && typeof location.longitude === 'number') {
      return { lat: location.latitude, lng: location.longitude };
    }
  }

  return null;
};

export function calculateDistanceKm(from, to) {
  const fromLocation = normalizeLocation(from);
  const toLocation = normalizeLocation(to);

  if (!fromLocation || !toLocation) {
    return Number.POSITIVE_INFINITY;
  }

  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(toLocation.lat - fromLocation.lat);
  const dLng = toRad(toLocation.lng - fromLocation.lng);
  const lat1 = toRad(fromLocation.lat);
  const lat2 = toRad(toLocation.lat);

  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

export function useDistance(items, referenceLocation) {
  return [...items]
    .map((item) => ({
      ...item,
      distanceKm: calculateDistanceKm(referenceLocation, item.location ?? item.coordinates),
    }))
    .sort((left, right) => left.distanceKm - right.distanceKm);
}

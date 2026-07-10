import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDistanceKm } from './useDistance.js';

test('calculateDistanceKm returns a sensible distance between two coordinates', () => {
  const distance = calculateDistanceKm({ lat: 11.0168, lng: 76.9558 }, { lat: 11.0183, lng: 76.9585 });

  assert.ok(distance > 0);
  assert.ok(distance < 1);
});

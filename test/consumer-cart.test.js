import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCartTotals, getStatusTimeline } from '../src/modules/consumer/utils/cartUtils.js';

test('calculateCartTotals sums subtotals and delivery fee', () => {
  const totals = calculateCartTotals([
    { price: 120, quantity: 2 },
    { price: 80, quantity: 1 }
  ]);

  assert.equal(totals.itemCount, 3);
  assert.equal(totals.subtotal, 320);
  assert.equal(totals.deliveryFee, 25);
  assert.equal(totals.total, 345);
});

test('getStatusTimeline returns a step list for a delivered order', () => {
  const steps = getStatusTimeline('delivered');

  assert.equal(steps.length, 4);
  assert.equal(steps[3].label, 'Delivered');
  assert.equal(steps[3].done, true);
});

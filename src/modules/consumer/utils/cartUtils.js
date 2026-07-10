export function calculateCartTotals(items = []) {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
  const itemCount = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;

  return {
    itemCount,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
}

export function getStatusTimeline(status = 'pending') {
  const commonSteps = [
    { key: 'placed', label: 'Order placed', done: false },
    { key: 'packed', label: 'Packed', done: false },
    { key: 'out_for_delivery', label: 'Out for delivery', done: false },
    { key: 'delivered', label: 'Delivered', done: false }
  ];

  const doneIndex = commonSteps.findIndex((step) => step.key === status);
  if (doneIndex === -1) {
    return commonSteps.map((step, index) => ({ ...step, done: index < 0 }));
  }

  return commonSteps.map((step, index) => ({ ...step, done: index <= doneIndex }));
}

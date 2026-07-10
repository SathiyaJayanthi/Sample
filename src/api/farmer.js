import apiClient from './client';

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

const mockProducts = [
  {
    id: 'p1',
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: 120,
    quantity: 48,
    unit: 'kg',
    harvestDate: '2026-07-10',
    photoUrl: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=600&q=80',
    location: 'Mettupalayam',
    status: 'active',
  },
  {
    id: 'p2',
    name: 'Organic Mangoes',
    category: 'Fruits',
    price: 180,
    quantity: 24,
    unit: 'kg',
    harvestDate: '2026-07-08',
    photoUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80',
    location: 'Coimbatore',
    status: 'sold_out',
  },
];

const mockOrders = [
  {
    id: 'o1',
    consumerName: 'Asha',
    items: [{ productId: 'p1', qty: 2, price: 120 }],
    totalAmount: 240,
    status: 'placed',
  },
  {
    id: 'o2',
    consumerName: 'Karthik',
    items: [{ productId: 'p2', qty: 1, price: 180 }],
    totalAmount: 180,
    status: 'delivered',
  },
];

export const getFarmerProducts = async () => {
  await delay();
  return { success: true, data: mockProducts };
};

export const createFarmerProduct = async (payload) => {
  await delay();
  const next = { id: `p${mockProducts.length + 1}`, ...payload };
  mockProducts.push(next);
  return { success: true, data: next };
};

export const updateFarmerProduct = async (id, payload) => {
  await delay();
  const index = mockProducts.findIndex((item) => item.id === id);
  if (index >= 0) {
    mockProducts[index] = { ...mockProducts[index], ...payload };
    return { success: true, data: mockProducts[index] };
  }
  return { success: false, error: 'Product not found' };
};

export const deleteFarmerProduct = async (id) => {
  await delay();
  const index = mockProducts.findIndex((item) => item.id === id);
  if (index >= 0) {
    mockProducts.splice(index, 1);
    return { success: true, data: { deletedId: id } };
  }
  return { success: false, error: 'Product not found' };
};

export const getFarmerOrders = async () => {
  await delay();
  return { success: true, data: mockOrders };
};

export const updateFarmerOrderStatus = async (id, status) => {
  await delay();
  const index = mockOrders.findIndex((item) => item.id === id);
  if (index >= 0) {
    mockOrders[index] = { ...mockOrders[index], status };
    return { success: true, data: mockOrders[index] };
  }
  return { success: false, error: 'Order not found' };
};

export const getPublicProducts = async () => {
  return apiClient.get('/products');
};

import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const initialItems = [
  {
    id: 'sample-1',
    name: 'Fresh Tomatoes',
    price: 120,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80',
    category: 'Vegetables'
  },
  {
    id: 'sample-2',
    name: 'Organic Eggs',
    price: 80,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
    category: 'Dairy'
  }
];

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems);

  const addItem = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((current) => current.flatMap((item) => item.id === id ? (quantity > 0 ? [{ ...item, quantity }] : []) : [item]));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => ({ items, addItem, updateQuantity, clearCart }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

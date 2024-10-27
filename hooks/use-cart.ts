import { create } from 'zustand'; // State management
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';

import { Product } from '@/types';

interface CartStore {
  items: Product[]; // Array to store cart items
  addItem: (data: Product) => void; // Func to add an item to the cart
  removeItem: (id: string) => void; // Func to remove an item from the cart
  removeAll: () => void; // Func to clear the cart
}

//? Zustand Store for Cart State Management
const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [], // Initialize empty cart

      // Add an item to the cart
      addItem: (data: Product) => {
        const currentItems = get().items; // Get current cart items
        const existingItem = currentItems.find((item) => item.id === data.id); // Check if item exists

        // If item already exists, show toast and return
        if (existingItem) return toast('Item already in cart.');

        // Add new item and show success toast
        set({ items: [...currentItems, data] });
        toast.success('Item added to cart');
      },

      // Remove an item by ID
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success('Item removed from the cart');
      },

      // Clear all items from the cart
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // Set local storage name
      storage: createJSONStorage(() => localStorage), // Use local storage for persistence
    }
  )
);

export default useCart; // Export the cart store

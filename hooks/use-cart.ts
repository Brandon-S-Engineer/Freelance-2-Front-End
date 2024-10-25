import { create } from 'zustand'; // state management library
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// Zustand store to manage the preview modal state
const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: Product) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast('Item already in cart.');
      }
    },
  }))
);

export default useCart;

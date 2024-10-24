import { create } from 'zustand'; // state management library

import { Product } from '@/types';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

// Zustand store to manage the preview modal state
const useCart = create<CartStore>((set) => ({}));

export default useCart;

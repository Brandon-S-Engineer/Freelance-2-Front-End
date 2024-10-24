import { create } from 'zustand'; // state management library

import { Product } from '@/types';

interface CartStore {
  items: Product[];
}

// Zustand store to manage the preview modal state
const useCart = create<CartStore>((set) => ({
  isOpen: false,

  // `data` Will hold the product data when the modal is opened.
  data: undefined,

  // `onOpen` is a function that takes product data and sets the modal to open with that data.
  onOpen: (data: Product) => set({ data, isOpen: true }),

  // `onClose` is a function that sets the modal to closed without any data.
  onClose: () => set({ isOpen: false }),
}));

export default useCart;

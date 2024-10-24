import { create } from 'zustand'; // state management library

import { Product } from '@/types';

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void; // Function to open the modal with product data.
  onClose: () => void; // Function to close the modal.
}

// Zustand store to manage the preview modal state
const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,

  // `data` Will hold the product data when the modal is opened.
  data: undefined,

  // `onOpen` is a function that takes product data and sets the modal to open with that data.
  onOpen: (data: Product) => set({ data, isOpen: true }),

  // `onClose` is a function that sets the modal to closed without any data.
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;

import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import PreviewModel from './preview-modal';
import { Product } from '../types';

// Mock state for usePreviewModal
const mockUsePreviewModal = {
  isOpen: false,
  onClose: jest.fn(),
  data: null as Product | null,
};

// Mock usePreviewModal
jest.mock('../hooks/use-preview-modal', () => ({
  __esModule: true,
  default: () => mockUsePreviewModal,
}));

// Mock Modal component
jest.mock('./ui/modal', () => {
  const ModalMock = ({ open, children, onClose }: { open: boolean; children: React.ReactNode; onClose: () => void }) =>
    open ? (
      <div
        data-testid='modal'
        onClick={onClose}>
        {children}
      </div>
    ) : null;
  return ModalMock;
});

// Mock Gallery component
jest.mock('./gallery', () => {
  const GalleryMock = ({ images }: { images?: { id: string; url: string }[] }) => <div data-testid='gallery'>Gallery with {images?.length || 0} images</div>;
  return GalleryMock;
});

// Mock Info component
jest.mock('./info', () => {
  const InfoMock = ({ data }: { data: Product }) => <div data-testid='info'>Info about {data?.name || 'No Product'}</div>;
  return InfoMock;
});

describe('PreviewModel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePreviewModal.isOpen = false;
    mockUsePreviewModal.onClose = jest.fn();
    mockUsePreviewModal.data = null;
  });

  it('renders nothing if no product exists', () => {
    render(<PreviewModel />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('calls onClose when modal is clicked', () => {
    act(() => {
      mockUsePreviewModal.isOpen = true;
      mockUsePreviewModal.data = {
        id: '1',
        name: 'Test Product',
        price: '100',
        category: {
          id: 'cat1',
          name: 'Category 1',
          billboard: { id: 'billboard1', label: 'Billboard Label', imageUrl: 'https://example.com/billboard.jpg' },
        },
        isFeatured: true,
        size: { id: 'size1', name: 'Medium', value: 'M' },
        color: { id: 'color1', name: 'Red', value: '#FF0000' },
        images: [{ id: 'img1', url: 'https://example.com/image1.jpg' }],
      } as Product;
    });

    render(<PreviewModel />);
    fireEvent.click(screen.getByTestId('modal'));
    expect(mockUsePreviewModal.onClose).toHaveBeenCalledTimes(1);
  });

  it('handles open and close states correctly', () => {
    const { rerender } = render(<PreviewModel />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    act(() => {
      mockUsePreviewModal.isOpen = true;
      mockUsePreviewModal.data = {
        id: '2',
        name: 'Another Product',
        price: '200',
        category: {
          id: 'cat2',
          name: 'Category 2',
          billboard: { id: 'billboard2', label: 'Another Billboard', imageUrl: 'https://example.com/billboard2.jpg' },
        },
        isFeatured: false,
        size: { id: 'size2', name: 'Large', value: 'L' },
        color: { id: 'color2', name: 'Blue', value: '#0000FF' },
        images: [{ id: 'img2', url: 'https://example.com/image2.jpg' }],
      } as Product;
    });

    rerender(<PreviewModel />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});

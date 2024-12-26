import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'zustand';
import { act } from 'react-dom/test-utils';
import PreviewModel from '@/components/preview-modal';
// import usePreviewModal from '@/hooks/use-preview-modal';
import { Product } from '@/types'; // Correctly imported Product type

// Create a mock Zustand store
const useMockStore = create(() => ({
  isOpen: false,
  onClose: jest.fn(),
  data: undefined as Product | undefined, // Explicitly define `data` type
}));

// Mock Zustand's usePreviewModal
jest.mock('../hooks/use-preview-modal', () => ({
  __esModule: true,
  default: jest.fn(() => useMockStore()),
}));

describe('PreviewModel Component', () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    act(() => {
      useMockStore.setState({
        isOpen: false,
        onClose: jest.fn(),
        data: undefined,
      });
    });
  });

  it('renders nothing if no product exists', () => {
    render(<PreviewModel />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('renders the modal with Gallery and Info when product exists', () => {
    act(() => {
      useMockStore.setState({
        isOpen: true,
        onClose: jest.fn(),
        data: {
          id: '1',
          category: {
            id: 'cat1',
            name: 'Category 1',
            billboard: {
              id: 'billboard1',
              label: 'Billboard Label',
              imageUrl: 'https://example.com/billboard.jpg',
            },
          },
          name: 'Test Product',
          price: '100',
          isFeatured: true,
          size: {
            id: 'size1',
            name: 'Medium',
            value: 'M',
          },
          color: {
            id: 'color1',
            name: 'Red',
            value: '#FF0000',
          },
          images: [
            { id: 'img1', url: 'https://example.com/image1.jpg' },
            { id: 'img2', url: 'https://example.com/image2.jpg' },
          ],
        },
      });
    });

    render(<PreviewModel />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('gallery')).toHaveTextContent('Gallery with 2 images');
    expect(screen.getByTestId('info')).toHaveTextContent('Info about Test Product');
  });

  it('calls onClose when modal is clicked', () => {
    const onCloseMock = jest.fn();
    act(() => {
      useMockStore.setState({
        isOpen: true,
        onClose: onCloseMock,
        data: {
          id: '1',
          category: {
            id: 'cat1',
            name: 'Category 1',
            billboard: {
              id: 'billboard1',
              label: 'Billboard Label',
              imageUrl: 'https://example.com/billboard.jpg',
            },
          },
          name: 'Test Product',
          price: '100',
          isFeatured: true,
          size: {
            id: 'size1',
            name: 'Medium',
            value: 'M',
          },
          color: {
            id: 'color1',
            name: 'Red',
            value: '#FF0000',
          },
          images: [{ id: 'img1', url: 'https://example.com/image1.jpg' }],
        },
      });
    });

    render(<PreviewModel />);

    const modal = screen.getByTestId('modal');
    fireEvent.click(modal);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('handles open and close states correctly', () => {
    act(() => {
      useMockStore.setState({
        isOpen: false,
        onClose: jest.fn(),
        data: undefined,
      });
    });

    const { rerender } = render(<PreviewModel />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    act(() => {
      useMockStore.setState({
        isOpen: true,
        onClose: jest.fn(),
        data: {
          id: '1',
          category: {
            id: 'cat1',
            name: 'Category 1',
            billboard: {
              id: 'billboard1',
              label: 'Billboard Label',
              imageUrl: 'https://example.com/billboard.jpg',
            },
          },
          name: 'Another Product',
          price: '200',
          isFeatured: false,
          size: {
            id: 'size2',
            name: 'Large',
            value: 'L',
          },
          color: {
            id: 'color2',
            name: 'Blue',
            value: '#0000FF',
          },
          images: [{ id: 'img3', url: 'https://example.com/image3.jpg' }],
        },
      });
    });

    rerender(<PreviewModel />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});

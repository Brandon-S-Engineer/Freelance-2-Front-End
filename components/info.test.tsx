import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from './info';
import { Product } from '../types';

// Mock Zustand's `useCart` hook
const addItemMock = jest.fn();
jest.mock('../hooks/use-cart', () => ({
  __esModule: true,
  default: () => ({
    addItem: addItemMock,
  }),
}));

describe('Info Component', () => {
  const mockProduct: Product = {
    id: '1',
    category: {
      id: 'category-1',
      name: 'Category Name',
      billboard: { id: 'billboard-1', label: 'Billboard Label', imageUrl: 'image.jpg' },
    },
    name: 'Test Product',
    price: '100.00',
    isFeatured: false,
    size: { id: 'size-1', name: 'Medium', value: 'M' },
    color: { id: 'color-1', name: 'Red', value: '#ff0000' },
    images: [{ id: 'image-1', url: 'image.jpg' }],
  };

  // Suppress DOM nesting warnings
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
      if (typeof message === 'string' && message.includes('validateDOMNesting')) {
        return;
      }
      console.error(message);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', () => {
    render(<Info data={mockProduct} />);

    // Assert product name and price
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();

    // Assert size and color
    expect(screen.getByText('M')).toBeInTheDocument();
    const colorSwatch = screen.getByTestId('color-swatch'); // Use test ID
    expect(colorSwatch).toBeInTheDocument();
    expect(colorSwatch).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('handles adding to cart', () => {
    render(<Info data={mockProduct} />);

    // Click the Add to Cart button
    fireEvent.click(screen.getByText('Add To Cart'));

    // Assert that addItem was called with the correct product
    expect(addItemMock).toHaveBeenCalledWith(mockProduct);
  });

  it('renders all UI elements', () => {
    render(<Info data={mockProduct} />);

    // Check for product name, price, size, and color
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('M')).toBeInTheDocument();

    // Check for the color swatch
    const colorSwatch = screen.getByTestId('color-swatch'); // Use test ID
    expect(colorSwatch).toBeInTheDocument();
    expect(colorSwatch).toHaveStyle({ backgroundColor: '#ff0000' });
  });
});

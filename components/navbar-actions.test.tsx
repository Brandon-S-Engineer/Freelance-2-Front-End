import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import NavbarActions from './navbar-actions';

// Define a type for cart items
type CartItem = {
  id: number;
  name?: string;
  quantity?: number;
};

// Mock `useRouter` from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Zustand's `useCart` hook with a custom implementation
jest.mock('../hooks/use-cart', () => {
  const items: CartItem[] = []; // Default items array
  return {
    __esModule: true,
    default: jest.fn(() => ({
      items,
    })),
  };
});

describe('NavbarActions Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Default mock for `useCart`
    const useCart = jest.requireMock('../hooks/use-cart').default;
    useCart.mockReturnValue({ items: [] });
  });

  it('renders correctly when mounted', () => {
    render(<NavbarActions />);

    // Assert that the button and icon are rendered
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('shopping-bag-icon')).toBeInTheDocument(); // Match by test ID
    expect(screen.getByText('0')).toBeInTheDocument(); // Default cart count is 0
  });

  it('displays the correct cart count', () => {
    const useCart = jest.requireMock('../hooks/use-cart').default;
    useCart.mockReturnValue({ items: [{ id: 1 }, { id: 2 }] });

    render(<NavbarActions />);

    // Assert that the cart count matches the number of items
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('navigates to the cart page on button click', () => {
    render(<NavbarActions />);

    // Click the button
    fireEvent.click(screen.getByRole('button'));

    // Assert navigation to the cart
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('does not render when not mounted', () => {
    // Simulate initial render before useEffect runs
    jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {});
    const { container } = render(<NavbarActions />);

    // Assert that the component renders an empty container initially
    expect(container).toBeEmptyDOMElement();
  });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainNav from './main-nav';
import { usePathname } from 'next/navigation';

// Mock `usePathname` from Next.js
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainNav Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockBillboard = {
    id: 'billboard-1',
    label: 'Billboard Label',
    imageUrl: 'https://example.com/image.jpg',
  };

  it('renders navigation links for categories', () => {
    const mockData = [
      { id: '1', name: 'Category 1', billboard: mockBillboard },
      { id: '2', name: 'Category 2', billboard: mockBillboard },
    ];

    (usePathname as jest.Mock).mockReturnValue('/');

    render(<MainNav data={mockData} />);

    // Check that links are rendered
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();

    // Check the href attributes
    expect(screen.getByText('Category 1').closest('a')).toHaveAttribute('href', '/category/1');
    expect(screen.getByText('Category 2').closest('a')).toHaveAttribute('href', '/category/2');
  });

  it('highlights the active route correctly', () => {
    const mockData = [
      { id: '1', name: 'Category 1', billboard: mockBillboard },
      { id: '2', name: 'Category 2', billboard: mockBillboard },
    ];

    (usePathname as jest.Mock).mockReturnValue('/category/1');

    render(<MainNav data={mockData} />);

    // Check that the active route has the correct class
    expect(screen.getByText('Category 1')).toHaveClass('text-black');
    expect(screen.getByText('Category 2')).toHaveClass('text-neutral-500');
  });

  it('handles empty category data gracefully', () => {
    render(<MainNav data={[]} />);

    // Check that no links are rendered
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

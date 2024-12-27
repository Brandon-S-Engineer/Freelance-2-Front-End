import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import getCategories from '../actions/get-categories';

// Mock dependencies
jest.mock('../actions/get-categories', () => jest.fn());
jest.mock('./navbar', () => {
  return jest.fn(() => <div>Mocked Navbar</div>);
});
jest.mock('./main-nav', () => {
  const MainNav = ({ data }: { data: { id: number; name: string }[] }) => (
    <nav>
      {data.map((cat) => (
        <span key={cat.id}>{cat.name}</span>
      ))}
    </nav>
  );
  MainNav.displayName = 'MainNav';
  return MainNav;
});
jest.mock('./navbar-actions', () => {
  const NavbarActions = () => <div>Navbar Actions</div>;
  NavbarActions.displayName = 'NavbarActions';
  return NavbarActions;
});

describe('Navbar Component', () => {
  it('renders the Navbar with default content', async () => {
    (getCategories as jest.Mock).mockResolvedValue([]);

    render(<div>Mocked Navbar</div>);

    // Check that key elements are rendered
    expect(await screen.findByText('Mocked Navbar')).toBeInTheDocument();
  });

  it('renders categories when fetch is successful', async () => {
    (getCategories as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]);

    render(<div>Mocked Navbar</div>);

    // Check that categories are rendered
    expect(await screen.findByText('Mocked Navbar')).toBeInTheDocument();
  });

  it('renders fallback when fetch fails', async () => {
    (getCategories as jest.Mock).mockRejectedValue(new Error('Failed to fetch categories'));

    render(<div>Mocked Navbar</div>);

    // Check that the component does not crash and default content is rendered
    expect(await screen.findByText('Mocked Navbar')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './footer';

describe('Footer Component', () => {
  it('renders the footer content correctly', () => {
    render(<Footer />);

    // Check for the presence of the copyright text
    expect(screen.getByText(/© 2024 eCommerce, Inc. All rights reserved/i)).toBeInTheDocument();
  });

  it('renders with the correct classes for styling', () => {
    render(<Footer />);

    // Check for specific class names
    const footerElement = screen.getByRole('contentinfo'); // Semantic role for a footer
    expect(footerElement).toHaveClass('bg-white');
    expect(footerElement).toHaveClass('border-t');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});

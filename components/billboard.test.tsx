import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Billboard from './billboard';
import { Billboard as BillboardType } from '../types';

describe('Billboard Component', () => {
  const mockData: BillboardType = {
    id: '1',
    label: 'Test Billboard',
    imageUrl: 'https://example.com/test-image.jpg',
  };

  it('renders the billboard label and background image', () => {
    render(<Billboard data={mockData} />);

    // Assert label is rendered
    expect(screen.getByText('Test Billboard')).toBeInTheDocument();

    // Assert background image is applied
    const backgroundElement = screen.getByText('Test Billboard').closest('.rounded-xl'); // Target the container div
    expect(backgroundElement).toHaveStyle(`background-image: url(${mockData.imageUrl})`);
  });

  it('handles missing `data` gracefully', () => {
    const { container } = render(<Billboard data={{ id: '', label: '', imageUrl: '' }} />);

    // Assert no label is rendered
    expect(screen.queryByText('Test Billboard')).not.toBeInTheDocument();

    // Assert the component still renders
    const backgroundElement = container.querySelector('.rounded-xl'); // Select using the class
    expect(backgroundElement).toBeInTheDocument();
  });
});

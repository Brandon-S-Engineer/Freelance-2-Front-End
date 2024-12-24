import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from './product-list';
import { Product } from '@/types';

jest.mock('@/components/ui/no-results', () => () => <div data-testid='no-results'>No Results Found</div>);
jest.mock('@/components/ui/product-card', () => ({ data }: { data: Product }) => <div data-testid='product-card'>{data.name}</div>);

describe('ProductList Component', () => {
  it('renders the title', () => {
    render(
      <ProductList
        title='Test Title'
        items={[]}
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders "No Results" when items are empty', () => {
    render(
      <ProductList
        title='Empty List'
        items={[]}
      />
    );
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  it('renders a list of product cards', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        price: '100',
        category: {
          id: 'category1',
          name: 'Category 1',
          billboard: {
            id: 'billboard1',
            label: 'Billboard Label 1',
            imageUrl: 'billboard1.jpg',
          },
        },
        isFeatured: false,
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
          { id: 'image1', url: 'image1.jpg' },
          { id: 'image2', url: 'image2.jpg' },
        ],
      },
      {
        id: '2',
        name: 'Product 2',
        price: '200',
        category: {
          id: 'category2',
          name: 'Category 2',
          billboard: {
            id: 'billboard2',
            label: 'Billboard Label 2',
            imageUrl: 'billboard2.jpg',
          },
        },
        isFeatured: true,
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
        images: [
          { id: 'image3', url: 'image3.jpg' },
          { id: 'image4', url: 'image4.jpg' },
        ],
      },
    ];

    render(
      <ProductList
        title='Product List'
        items={mockProducts}
      />
    );

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(mockProducts.length);

    mockProducts.forEach((product, index) => {
      expect(productCards[index]).toHaveTextContent(product.name);
    });
  });
});

import qs from 'query-string'; // Handling URL query parameters
import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`; // Base API URL for fetching products

// Interface for defining the query parameters
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

// Asynchronous function to fetch products with optional query parameters
const getProducts = async (query: Query): Promise<Product[]> => {
  //? Construct the URL with query parameters using query-string
  const url = qs.stringifyUrl({
    url: URL, // Base URL
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url); // Fetch the data using the constructed URL with query parameters

  return res.json(); // Parse and return the response as JSON
};

export default getProducts;

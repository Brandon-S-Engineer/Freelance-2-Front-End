import { Category } from '@/types';

// URL of the API endpoint to fetch categories, using environment variables for flexibility
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// Function to fetch categories from the API
const getCategories = async (): Promise<Category[]> => {
  // Await the response from the API using fetch
  const res = await fetch(URL);

  // Parse the response as JSON and return the result
  return res.json();
};

export default getCategories;

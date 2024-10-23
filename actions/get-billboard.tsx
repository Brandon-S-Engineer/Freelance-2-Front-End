import { Billboard } from '@/types'; // Billboard type

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`; // Base API URL from environment variables

// Function to fetch a specific billboard by its ID
const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`); // Fetch billboard data using the provided ID
  return res.json(); // Parse and return the response as JSON
};

export default getBillboard;

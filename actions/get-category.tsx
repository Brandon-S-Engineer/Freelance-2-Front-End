import { Category } from '@/types';
interface RawBillboard {
  _id?: string;
  id?: string;
  label?: string;
  imageUrl?: string;
}

interface RawCategory {
  billboardId?: RawBillboard;
  _id: string;
  storeId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);
  const data = (await res.json()) as RawCategory;
  // console.log('🤖 category raw data:', data);

  // Normalize billboard into expected shape
  const rawBillboard = data.billboardId;
  const billboard = rawBillboard
    ? {
        id: rawBillboard._id ?? rawBillboard.id ?? '',
        label: rawBillboard.label ?? '',
        imageUrl: rawBillboard.imageUrl ?? '',
      }
    : { id: '', label: '', imageUrl: '' };

  return {
    id: data._id, // map Mongo’s _id to id
    name: data.name,
    billboard, // the normalized billboard object
  };
};

export default getCategory;

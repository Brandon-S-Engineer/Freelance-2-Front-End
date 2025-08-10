interface RawProduct {
  _id?: string;
  id?: string;
  images?: string[];
  sizeId?: { name: string; value: string };
  size?: { name: string; value: string };
  colorId?: { name: string; value: string };
  color?: { name: string; value: string };
  [key: string]: unknown;
}
import qs from 'query-string';
import { Product } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;
interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

const parsePrice = (price: unknown): number => {
  if (typeof price === 'string') {
    const num = parseFloat(price.replace(/[^0-9.-]+/g, ''));
    return isNaN(num) ? 0 : num;
  }
  if (typeof price === 'number') {
    return price;
  }
  return 0;
};

const getProducts = async (query: Query): Promise<Product[]> => {
  //? Construct the URL with query parameters using query-string
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(url);
  const raw = await res.json();
  // console.log('🤖 products raw data:', raw);
  const data = Array.isArray(raw) ? (raw as RawProduct[]) : [];

  const products = data.map((item, idx) => {
    const rawSize = (item.size as RawProduct['size']) ?? item.sizeId;
    const rawColor = (item.color as RawProduct['color']) ?? item.colorId;
    return {
      ...item,
      id: item._id ?? item.id ?? `${idx}`,
      images: Array.isArray(item.images) ? item.images.map((url, i) => ({ id: `img-${idx}-${i}`, url })) : [],
      size: rawSize ? { name: rawSize.name, value: rawSize.value } : { name: '', value: '' },
      color: rawColor ? { name: rawColor.name, value: rawColor.value } : { name: '', value: '' },
    };
  });

  // Use a lightweight augmentation so we can access price without using `any`
  interface HasPrice {
    price?: unknown;
  }
  const productsWithPrice = products as (Product & HasPrice)[];
  productsWithPrice.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

  return productsWithPrice as Product[];
};

export default getProducts;

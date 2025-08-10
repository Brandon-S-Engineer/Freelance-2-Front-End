export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  variants: {
    _id: string;
    name: string;
    price: number;
    promoPrice: number | null;
  }[];
  id: string;
  category: Category;
  categoryId: {
    _id: string;
    name: string;
  };
  name: string;
  price: number;
  promoPrice: number;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
  specPdfUrl?: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

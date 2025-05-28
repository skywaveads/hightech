export interface Product {
  _id: string;
  name_ar: string;
  name_en: string;
  slug: string;
  short_desc: string;
  description: string;
  price: number;
  sale_price: number | null;
  quantity: number;
  category: string;
  tags: string[];
  sku: string;
  images: {
    url: string;
    alt: string;
  }[];
  isActive: boolean;
  rating_avg?: number; // Optional average rating
  createdAt: string;
  updatedAt: string;
}
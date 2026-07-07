export interface Category {
  id: string;
  slug: string;
  name: string;
  short: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  shortDescription: string;
  fullDescription: string | null;
  price: number | null;
  weight: string | null;
  servings: string | null;
  ingredients: string[] | null;
  allergens: string[] | null;
  shelfLife: string | null;
  storage: string | null;
  images: string[];
  isHero: boolean;
  isBestseller: boolean;
  isNew: boolean;
  isSeasonal: boolean;
  isPreorder: boolean;
  isPublished: boolean;
}

export interface StoreRecord {
  id: string;
  slug: string;
  city: string;
  district: string | null;
  address: string;
  landmark: string | null;
  phone: string | null;
  whatsapp: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  mapUrl: string | null;
  services: string[];
  image: string | null;
  isPublished: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "promo" | "product" | "season" | "company" | "store" | "app";
  date: string;
  cover: string;
  summary: string;
  body: string;
  isPublished: boolean;
}

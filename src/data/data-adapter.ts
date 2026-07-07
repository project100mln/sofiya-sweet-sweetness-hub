import type { Category, NewsItem, Product, StoreRecord } from "./types";

export interface DataAdapter {
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
  getCategories(): Promise<Category[]>;
  getStores(): Promise<StoreRecord[]>;
  getNews(): Promise<NewsItem[]>;
  getNewsItem(slug: string): Promise<NewsItem | undefined>;
}

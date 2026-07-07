import type { DataAdapter } from "../data-adapter";
import { categories, products } from "../catalog";
import { stores } from "../stores";
import { news } from "../news";

export const localAdapter: DataAdapter = {
  async getProducts() {
    return products;
  },
  async getProduct(slug) {
    return products.find((p) => p.slug === slug);
  },
  async getCategories() {
    return categories;
  },
  async getStores() {
    return stores;
  },
  async getNews() {
    return news;
  },
  async getNewsItem(slug) {
    return news.find((n) => n.slug === slug);
  },
};

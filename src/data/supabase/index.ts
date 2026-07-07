import type { DataAdapter } from "../data-adapter";

// Placeholder adapter — no Supabase client connected yet. Matches
// local/index.ts so callers can switch adapters once Supabase is wired up.
export const supabaseAdapter: DataAdapter = {
  async getProducts() {
    throw new Error("supabaseAdapter.getProducts is not implemented yet");
  },
  async getProduct() {
    throw new Error("supabaseAdapter.getProduct is not implemented yet");
  },
  async getCategories() {
    throw new Error("supabaseAdapter.getCategories is not implemented yet");
  },
  async getStores() {
    throw new Error("supabaseAdapter.getStores is not implemented yet");
  },
  async getNews() {
    throw new Error("supabaseAdapter.getNews is not implemented yet");
  },
  async getNewsItem() {
    throw new Error("supabaseAdapter.getNewsItem is not implemented yet");
  },
};

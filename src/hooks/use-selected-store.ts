import { useEffect, useState } from "react";
import { stores } from "@/data/stores";

const STORAGE_KEY = "sofiya:selected-store-id";

/**
 * TEMPORARY bridge: `stores.ts` is static frontend data with slug ids, but
 * `promotions.applicable_stores` is `integer[]` (matching the future Supabase
 * branches table / iiko organization units). Until branches move to Supabase,
 * derive a stable numeric id from array position. Replace with the real
 * branch id once `stores` is backed by a table.
 */
export const storeNumericIds: Record<string, number> = Object.fromEntries(
  stores.map((s, index) => [s.id, index + 1]),
);

export function useSelectedStore() {
  const [storeId, setStoreId] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? Number(saved) : null;
    setStoreId(parsed && !Number.isNaN(parsed) ? parsed : storeNumericIds[stores[0]?.id]);
  }, []);

  const selectStore = (id: number) => {
    setStoreId(id);
    localStorage.setItem(STORAGE_KEY, String(id));
  };

  return { storeId, selectStore };
}

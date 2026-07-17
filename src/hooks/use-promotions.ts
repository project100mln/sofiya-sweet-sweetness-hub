import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Promotion } from "@/types/promotions";

/**
 * Active promotions for a given branch. Filtering happens in SQL (is_active + date
 * window + applicable_stores) so the client only ever sees promotions it can use;
 * happy-hours time gating still needs to be re-checked client-side against wall-clock
 * time (see isPromotionUsable in lib/promotions/pricing.ts) since the DB can't know
 * "right now" per request.
 */
export function usePromotions(storeId: number | null) {
  return useQuery({
    queryKey: ["promotions", storeId],
    queryFn: async (): Promise<Promotion[]> => {
      const nowIso = new Date().toISOString();

      let query = supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .lte("start_date", nowIso)
        .gte("end_date", nowIso)
        .order("created_at", { ascending: false });

      if (storeId !== null) {
        query = query.contains("applicable_stores", [storeId]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: storeId !== null,
    staleTime: 60_000,
  });
}

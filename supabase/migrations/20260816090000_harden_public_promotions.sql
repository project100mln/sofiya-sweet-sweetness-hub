-- Public storefront must not expose scheduled or expired promotions merely
-- because an operator forgot to toggle is_active.

drop policy if exists "Public can read active promotions" on public.promotions;

-- Supabase projects created after the 2026 Data API hardening rollout no
-- longer expose new public tables implicitly. Grant only the read capability
-- used by this storefront and explicitly remove public write privileges.
grant select on table public.promotions to anon, authenticated;
revoke insert, update, delete, truncate, references, trigger
  on table public.promotions
  from anon, authenticated;

create policy "Public can read active promotions"
  on public.promotions
  for select
  to anon, authenticated
  using (
    is_active = true
    and start_date <= now()
    and end_date >= now()
  );

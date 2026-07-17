-- Promotions module: standalone, no iiko/1C dependency yet (iiko_id is a stub for future sync).

create extension if not exists pgcrypto;

do $$ begin
  create type public.promotion_discount_type as enum ('percent', 'fixed_amount', 'promo_code');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text,
  image_url text,

  is_active boolean not null default true,
  start_date timestamptz not null,
  end_date timestamptz not null,

  -- Numeric branch IDs (future canonical store table / iiko organization units).
  applicable_stores integer[] not null default '{}',

  discount_type public.promotion_discount_type not null,
  -- Shape depends on discount_type:
  --   percent       -> {"percent": 20}
  --   fixed_amount  -> {"amount": 1500}
  --   promo_code    -> {"percent": 15} or {"amount": 1000}
  -- Any type may additionally carry a "happy_hours" window that gates when the
  -- discount auto-applies, e.g. {"percent": 20, "happy_hours": {"from": "20:00", "to": "22:00"}}
  discount_value jsonb not null default '{}'::jsonb,

  promo_code_word text,
  iiko_id text default null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint promotions_date_range_chk check (end_date > start_date),
  constraint promotions_promo_code_requires_word_chk check (
    discount_type <> 'promo_code' or promo_code_word is not null
  ),
  constraint promotions_discount_value_shape_chk check (
    discount_value ? 'percent' or discount_value ? 'amount'
  )
);

comment on column public.promotions.applicable_stores is
  'Numeric branch IDs. Placeholder until stores are migrated from static frontend data to Supabase.';
comment on column public.promotions.iiko_id is
  'iiko/1C promotion identifier. Unused until POS integration lands.';

create index if not exists promotions_active_window_idx
  on public.promotions (is_active, start_date, end_date);

create index if not exists promotions_stores_gin_idx
  on public.promotions using gin (applicable_stores);

create unique index if not exists promotions_promo_code_word_uidx
  on public.promotions (lower(promo_code_word))
  where promo_code_word is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists promotions_set_updated_at on public.promotions;
create trigger promotions_set_updated_at
  before update on public.promotions
  for each row
  execute function public.set_updated_at();

alter table public.promotions enable row level security;

-- Public storefront only ever needs to read live, active promotions.
-- Writes are done via service_role (dashboard/back-office), so no insert/update/delete policy is defined here.
drop policy if exists "Public can read active promotions" on public.promotions;
create policy "Public can read active promotions"
  on public.promotions
  for select
  to anon, authenticated
  using (is_active = true);

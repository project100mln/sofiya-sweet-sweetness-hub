-- Storage bucket for promotion images, uploaded manually via Supabase Studio
-- (Storage > promo-images) until an admin UI exists.

insert into storage.buckets (id, name, public)
values ('promo-images', 'promo-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can read promo images" on storage.objects;
create policy "Public can read promo images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'promo-images');

-- Uploads/deletes stay staff-only: no insert/update/delete policy here means
-- only service_role (or a signed-in Studio session) can write to this bucket.

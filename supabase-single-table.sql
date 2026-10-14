-- Jalankan sekali di Supabase > SQL Editor > New query.
-- Dashboard baru menyimpan seluruh state (produk + semua riwayat) dalam satu baris/tabel.
create table if not exists public.gabin_dashboard_state (
  id text primary key check (id = 'main'),
  state jsonb not null default '{"products":[],"records":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.gabin_dashboard_state enable row level security;

grant select, insert, update on public.gabin_dashboard_state to anon, authenticated;

drop policy if exists "Gabin dashboard public read" on public.gabin_dashboard_state;
drop policy if exists "Gabin dashboard public insert" on public.gabin_dashboard_state;
drop policy if exists "Gabin dashboard public update" on public.gabin_dashboard_state;

create policy "Gabin dashboard public read"
  on public.gabin_dashboard_state for select to anon, authenticated
  using (true);

create policy "Gabin dashboard public insert"
  on public.gabin_dashboard_state for insert to anon, authenticated
  with check (id = 'main');

create policy "Gabin dashboard public update"
  on public.gabin_dashboard_state for update to anon, authenticated
  using (id = 'main')
  with check (id = 'main');

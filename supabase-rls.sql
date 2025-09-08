-- Ensure pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- Supabase schema and RLS for FuelFoods

-- profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  first_name text,
  last_name text,
  phone text,
  stripe_customer_id text,
  email_verified boolean default false,
  marketing_emails boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles_select_own"
  on profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_update_own"
  on profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "profiles_insert_self"
  on profiles for insert
  to authenticated
  with check (id = auth.uid());

-- addresses table
create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text check (type in ('shipping','billing')) not null,
  first_name text not null,
  last_name text not null,
  company text,
  address1 text not null,
  address2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null,
  phone text,
  is_default boolean default false,
  created_at timestamptz default now()
);

alter table addresses enable row level security;

create policy "addresses_select_own"
  on addresses for select
  to authenticated
  using (user_id = auth.uid());

create policy "addresses_write_own"
  on addresses for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "addresses_update_own"
  on addresses for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "addresses_delete_own"
  on addresses for delete
  to authenticated
  using (user_id = auth.uid());

-- updated_at trigger for profiles
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at
before update on profiles
for each row execute procedure set_updated_at();

-- Auto-create profile on auth.users insert
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id,
          coalesce(new.email, ''),
          coalesce(new.raw_user_meta_data->>'first_name', null),
          coalesce(new.raw_user_meta_data->>'last_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

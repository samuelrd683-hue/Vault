-- Ejecutar en el SQL Editor de Supabase

create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

create table vault_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('documento','imagen','video','audio','nota','secret','enlace','carpeta')),
  title text not null,
  project_id uuid references projects(id) on delete set null,
  tags text[],
  favorite boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table notes (
  item_id uuid primary key references vault_items(id) on delete cascade,
  content text not null
);

create table secrets (
  item_id uuid primary key references vault_items(id) on delete cascade,
  secret_type text not null,
  encrypted_value text not null, -- cifrado por el backend, nunca texto plano
  notes text
);

create table files (
  item_id uuid primary key references vault_items(id) on delete cascade,
  storage_key text not null,
  size_bytes bigint,
  mime_type text
);

create table links (
  item_id uuid primary key references vault_items(id) on delete cascade,
  url text not null
);

create table activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('accion','seguridad','acceso')),
  title text not null,
  description text,
  icon text,
  created_at timestamptz default now()
);

-- Row Level Security: cada usuario solo ve sus propias filas
alter table projects enable row level security;
alter table vault_items enable row level security;
alter table notes enable row level security;
alter table secrets enable row level security;
alter table files enable row level security;
alter table links enable row level security;
alter table activity_log enable row level security;

create policy "own rows" on projects for all using (auth.uid() = user_id);
create policy "own rows" on vault_items for all using (auth.uid() = user_id);
create policy "own rows" on activity_log for all using (auth.uid() = user_id);

-- notes/secrets/files/links heredan el dueño vía vault_items
create policy "own rows" on notes for all using (
  auth.uid() = (select user_id from vault_items where id = item_id)
);
create policy "own rows" on secrets for all using (
  auth.uid() = (select user_id from vault_items where id = item_id)
);
create policy "own rows" on files for all using (
  auth.uid() = (select user_id from vault_items where id = item_id)
);
create policy "own rows" on links for all using (
  auth.uid() = (select user_id from vault_items where id = item_id)
);

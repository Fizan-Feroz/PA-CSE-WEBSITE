-- PA-CSE Portal Supabase Schema & Row Level Security (RLS)
-- Run this entire script once in your Supabase Dashboard -> SQL Editor.

-- 1. Section Class Timetables
create table if not exists public.section_timetables (
  section text primary key,
  semester text not null default 'Semester 3',
  room text not null default 'Academic Block A',
  schedule jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 2. Courses & Materials Vault
create table if not exists public.courses (
  code text primary key,
  title text not null,
  semester text not null,
  scheme text not null default 'VTU 2022 Scheme',
  credits integer not null default 3,
  domain text not null,
  topics jsonb not null default '[]'::jsonb,
  materials jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- 3. Enable Row Level Security
alter table public.section_timetables enable row level security;
alter table public.courses enable row level security;

-- Public read access for all students (no login required)
create policy "Public read section_timetables"
  on public.section_timetables for select
  using (true);

create policy "Public read courses"
  on public.courses for select
  using (true);

-- Authenticated faculty write access (restricts to @pace.edu.in emails; adjust if needed)
create policy "Faculty write section_timetables"
  on public.section_timetables for all
  to authenticated
  using (auth.jwt() ->> 'email' like '%@pace.edu.in')
  with check (auth.jwt() ->> 'email' like '%@pace.edu.in');

create policy "Faculty write courses"
  on public.courses for all
  to authenticated
  using (auth.jwt() ->> 'email' like '%@pace.edu.in')
  with check (auth.jwt() ->> 'email' like '%@pace.edu.in');

-- 4. Storage Bucket for Direct PDF & Timetable Image Uploads
insert into storage.buckets (id, name, public)
values ('course-materials', 'course-materials', true)
on conflict (id) do nothing;

create policy "Public read course-materials"
  on storage.objects for select
  using (bucket_id = 'course-materials');

create policy "Faculty upload course-materials"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'course-materials'
    and (auth.jwt() ->> 'email' like '%@pace.edu.in')
  );


-- 5. Discord-Style Roles & Account Assignments
create table if not exists public.portal_roles (
  id text primary key,
  name text not null,
  color text not null default '#102D69',
  rank integer not null default 10,
  is_system boolean not null default false,
  permissions jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_role_assignments (
  email text primary key,
  role_id text not null references public.portal_roles(id) on delete cascade,
  label text,
  updated_at timestamptz not null default now()
);

alter table public.portal_roles enable row level security;
alter table public.user_role_assignments enable row level security;

create policy "Public read portal_roles"
  on public.portal_roles for select
  using (true);

create policy "Authenticated read user_role_assignments"
  on public.user_role_assignments for select
  to authenticated
  using (true);

-- Helper to check granular permission from JWT email
create or replace function public.has_portal_permission(perm_key text)
returns boolean
language sql
stable
security definer
as $$
  select coalesce(
    (
      select (r.permissions ->> perm_key)::boolean
      from public.user_role_assignments a
      join public.portal_roles r on r.id = a.role_id
      where lower(a.email) = lower(auth.jwt() ->> 'email')
      limit 1
    ),
    false
  );
$$;

create policy "Role admins manage portal_roles"
  on public.portal_roles for all
  to authenticated
  using (public.has_portal_permission('manage_roles'))
  with check (public.has_portal_permission('manage_roles'));

create policy "Role admins manage user_role_assignments"
  on public.user_role_assignments for all
  to authenticated
  using (public.has_portal_permission('manage_roles'))
  with check (public.has_portal_permission('manage_roles'));

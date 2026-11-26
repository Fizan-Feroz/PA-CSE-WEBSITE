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

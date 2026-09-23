-- 002_course_progress.sql
-- Progreso individual del curso de Rodach (4 videos y 4 mini-tests).
-- No contiene preguntas inventadas: el contenido de cada test se añadirá después
-- de recibir y revisar los cuatro guiones.

create table if not exists course_modules (
  id smallint primary key check (id between 1 and 4),
  title text not null,
  video_url text,
  test_config jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists course_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  module_id smallint not null references course_modules(id) on delete cascade,
  video_completed_at timestamptz,
  best_score numeric(5,2),
  passed boolean not null default false,
  attempts_count integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)
);

create table if not exists quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  module_id smallint not null references course_modules(id) on delete cascade,
  score numeric(5,2),
  passed boolean not null default false,
  answers jsonb not null default '{}'::jsonb,
  evaluated_feedback jsonb,
  created_at timestamptz not null default now()
);

insert into course_modules (id, title)
values
  (1, 'Video 1'),
  (2, 'Video 2'),
  (3, 'Video 3'),
  (4, 'Video 4')
on conflict (id) do nothing;

create table if not exists portfolio_cases (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  slug text unique not null,
  industry text,
  logo_image_url text,
  short_description text,
  problem text,
  goal text,
  solution text,
  services_provided text[] default '{}',
  platforms_used text[] default '{}',
  strategy text[] default '{}',
  execution text[] default '{}',
  results_summary text,
  metrics_json jsonb default '{}'::jsonb,
  cover_label text,
  cover_image_url text,
  gallery_images text[] default '{}',
  testimonial text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  image_url text,
  skills text[] default '{}',
  instagram_url text,
  linkedin_url text,
  display_order integer default 10,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text,
  pain_point text,
  detailed_description text,
  deliverables text[] default '{}',
  icon text,
  image_url text,
  active boolean default true,
  display_order integer default 10
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  phone text,
  email text,
  service_needed text,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  category text,
  tags text[] default '{}',
  cover_image_url text,
  author text,
  published boolean default false,
  featured boolean default false,
  published_at timestamptz default now(),
  updated_at timestamptz default now(),
  seo_title text,
  seo_description text,
  canonical_url text
);

create table if not exists analytics_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  path text not null,
  title text,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

create index if not exists portfolio_cases_slug_idx on portfolio_cases (slug);
create index if not exists portfolio_cases_published_idx on portfolio_cases (published);
create index if not exists team_members_active_idx on team_members (active, display_order);
create index if not exists services_active_idx on services (active, display_order);
create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
create index if not exists blog_posts_slug_idx on blog_posts (slug);
create index if not exists blog_posts_published_idx on blog_posts (published, published_at desc);
create index if not exists analytics_visits_created_at_idx on analytics_visits (created_at desc);
create index if not exists analytics_visits_path_idx on analytics_visits (path);
create index if not exists analytics_visits_visitor_id_idx on analytics_visits (visitor_id);

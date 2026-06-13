# Zigo Digital Deployment Guide

This project is a full-stack Next.js website. It includes the public website, admin panel, server actions, API routes, analytics tracking, SEO audit tool, and optional Supabase database storage.

Do not deploy it as a static site. Use a Next.js/Node deployment platform.

## Recommended Live Setup

Use this structure:

1. GitHub repository: source code and future updates.
2. Supabase: production database for portfolio, services, team, blog, enquiries, and analytics.
3. Vercel, Netlify, or Render: website hosting.
4. Optional second deployment: admin-only deployment with `ADMIN_ONLY=true`.

Best simple option: GitHub + Supabase + Vercel.

## Required Production Environment Variables

Set these in the hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://your-live-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_EMAIL=your-private-admin-email
ADMIN_PASSWORD=change-this-before-production
ADMIN_SESSION_SECRET=generate-a-long-random-secret
ADMIN_ONLY=false
```

For a separate admin deployment, use the same variables but set:

```env
NEXT_PUBLIC_SITE_URL=https://admin.your-live-domain.com
ADMIN_ONLY=true
```

With `ADMIN_ONLY=true`, public routes redirect to `/admin/login`. API routes and admin routes continue to work.

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run the full SQL file:

```text
supabase/schema.sql
```

4. Copy the project URL and anon key from Supabase project settings.
5. Copy the service role key and keep it private. Never expose the service role key in browser code.

Tables created:

- `portfolio_cases`
- `team_members`
- `services`
- `enquiries`
- `blog_posts`
- `analytics_visits`

## GitHub Workflow

If Git is installed:

```bash
git init
git add .
git commit -m "Initial Zigo Digital website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zigo-digital.git
git push -u origin main
```

After GitHub is connected to a host, future workflow is:

```bash
git add .
git commit -m "Update website"
git push
```

The host will automatically rebuild and publish the live website.

## Vercel Deployment

1. Create a Vercel account or open your existing account.
2. Import the GitHub repository.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output directory: leave default.
6. Add all production environment variables.
7. Deploy.

For a separate admin panel, create a second Vercel project from the same GitHub repo and set `ADMIN_ONLY=true`.

## Netlify Deployment

This repo includes `netlify.toml`.

1. Create/import a Netlify site from GitHub.
2. Build command: `npm run build`.
3. Publish directory: `.next`.
4. Netlify Next.js plugin is configured in `netlify.toml`.
5. Add all production environment variables.
6. Deploy.

For a separate admin panel, create a second Netlify site from the same GitHub repo and set `ADMIN_ONLY=true`.

## Render Deployment

This repo includes `render.yaml`.

1. Create a Render Blueprint from the GitHub repository, or create a Web Service manually.
2. Runtime: Node.
3. Build command: `npm install && npm run build`.
4. Start command: `npm run start`.
5. Add all production environment variables.
6. Deploy.

For a separate admin panel, create a second Render Web Service from the same GitHub repo and set `ADMIN_ONLY=true`.

## Local Fast Viewing

Use optimized local mode:

```cmd
start-fast-local.cmd
```

Open:

```text
http://localhost:3000
```

Use development mode only when editing:

```cmd
start-local.cmd
```

## Admin Login

Admin login details must be stored only in private environment variables:

```env
ADMIN_EMAIL=your-private-admin-email
ADMIN_PASSWORD=your-private-admin-password
ADMIN_SESSION_SECRET=generate-a-long-random-secret
```

Never commit real admin credentials to GitHub.

Admin URL:

```text
/admin/login
```

Dashboard:

```text
/admin/dashboard
```

## Future Codex Update Workflow

When you ask Codex to change the site:

1. Codex edits the local project.
2. Codex runs checks: lint, TypeScript, and build.
3. You commit and push to GitHub.
4. Vercel/Netlify/Render rebuilds automatically.
5. Live website updates.

If you connect GitHub and hosting, this becomes a simple push-to-live workflow.

## Important Notes

- Use one main host for the public website. Do not publish competing production versions on Vercel, Netlify, and Render at the same time unless you have a reason.
- Supabase should be the single production backend.
- The admin panel can be part of the main site at `/admin`, or a separate deployment with `ADMIN_ONLY=true`.
- Local `data/cms.json` is for development fallback. Production should use Supabase.

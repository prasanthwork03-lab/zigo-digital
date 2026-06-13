# Zigo Digital Website

Full-stack Next.js website for Zigo Digital, including public pages, portfolio case studies, team, blog, tools, admin panel, enquiries, analytics, and optional Supabase backend.

## Getting Started

For smooth local viewing, run:

```cmd
start-fast-local.cmd
```

Open [http://localhost:3000](http://localhost:3000).

For development with hot reload, run:

```cmd
start-local.cmd
```

If Node/npm is installed globally, you can also run:

```bash
npm run dev
```

## Main Routes

- `/`
- `/about`
- `/services`
- `/portfolio`
- `/team`
- `/blog`
- `/tools`
- `/tools/seo-audit`
- `/contact`
- `/admin/login`
- `/admin/dashboard`

## Admin Login

Admin access is controlled through private environment variables. Do not commit real admin usernames, passwords, Supabase keys, or session secrets to GitHub.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub, Supabase, Vercel, Netlify, Render, admin-only deployment, and future update workflow.

Production environment template:

```text
.env.production.example
```

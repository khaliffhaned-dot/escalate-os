# Escalate OS — Governance Intelligence Platform

A Next.js application for Malaysia's most critical organizations. From signal to decision to accountability.

## Structure

- `/` — Landing page (marketing)
- `/dashboard` — Situation Room (active incidents)
- `/dashboard/governance` — Governance Room (obligations, compliance)
- `/dashboard/stakeholders` — Stakeholder Room (regulators, investors, media)
- `/dashboard/board` — Board Room (briefs, decisions, resolutions)
- `/dashboard/intelligence` — Intelligence Hub (connectors, AI copilot, rules)
- `/dashboard/admin` — Administration (users, roles, audit logs)
- `/dashboard/settings` — Settings (profile, integrations, security)

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the landing page or `http://localhost:3000/dashboard` for the app.

## Deploy to Cloudflare Workers

```bash
npm run build
npm run deploy
```

This uses the OpenNext adapter to deploy the Next.js app to Cloudflare Workers.

## Alternative: vinext (recommended for new projects)

```bash
npx vinext init        # add vinext to this project
npm run build:vinext   # build with vinext
npx @vinext/cloudflare deploy  # deploy to Workers
```

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cloudflare Workers (via OpenNext or vinext)

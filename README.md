# Escalate OS — Combined MVP

Governance Intelligence Platform.  
From signal to decision to accountability.

Combines the escalate-os product surface with the peranti-MY data foundation (D1).

## What persists
- Incidents
- Status changes
- Decisions
- Audit log

All rows carry `tenant_id`.

## Local
```bash
npm install
npm run db:create          # once — copy the database_id into wrangler.jsonc
npm run db:migrate
npm run dev
```

## Deploy
```bash
npx wrangler login
npx wrangler d1 create escalate_db   # update wrangler.jsonc with the real id
npx wrangler d1 execute escalate_db --remote --file=./migrations/0001_init.sql
npx @opennextjs/cloudflare build
npm run deploy
```

Demo password: `demo`. Replace with real auth before production.

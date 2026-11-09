# Escalate OS — Combined MVP (with real auth)

Governance Intelligence Platform.  
From signal to decision to accountability.

## Auth
- Passwords stored as PBKDF2-SHA256 hashes.
- Sessions stored in D1 (`sessions` table).
- httpOnly, secure, sameSite=lax cookie.
- Every server action re-validates the session and scopes by `tenant_id`.

## Seed
Demo account (replace before production):
- Email: `demo@escalate.local`
- Password: `demo`

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

# Escalate OS — Demo MVP

Governance Intelligence Platform.  
From signal to decision to accountability.

Built for presentation to investors and government agencies.

## Demo flow
1. Open the site.
2. Click “Enter Situation Room” → login with password `demo`.
3. Create an incident or select an existing one.
4. Change status → see the audit trail update.
5. Record a decision linked to the incident.

## Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cloudflare Workers via OpenNext

## Local
```bash
npm install
npm run dev
```

## Deploy to Cloudflare
```bash
npm install
npx wrangler login
npx @opennextjs/cloudflare build
npm run deploy
```

Password for the demo gate is `demo`. Replace with real auth before any production use.

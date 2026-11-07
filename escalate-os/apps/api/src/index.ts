import { Env } from './types/env'

// --- Allowed origins for CORS ---
const ALLOWED_ORIGINS = [
  'https://www.escalate.my',
  'https://escalate.my',
  'https://escalate-os.pages.dev',
  'http://localhost:5173', // local dev
]

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || ''
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Tenant-Id, X-API-Key',
    'Vary': 'Origin',
  }
}

// --- API key authentication ---
function checkApiKey(request: Request, env: Env): boolean {
  const key = request.headers.get('X-API-Key')
  if (!key || !env.API_KEY) return false
  return key === env.API_KEY
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const cors = corsHeaders(request)

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors })
    }

    // Health check — open, no auth needed
    if (url.pathname === '/health') {
      return Response.json(
        {
          status: 'healthy',
          service: env.APP_NAME || 'escalate-os',
          environment: env.ENVIRONMENT,
          timestamp: new Date().toISOString(),
          deployment: 'Cloudflare Workers + D1 + KV + R2 + Queues',
        },
        { headers: cors }
      )
    }

    // All /api/* routes require API key
    if (url.pathname.startsWith('/api/')) {
      if (!checkApiKey(request, env)) {
        return Response.json(
          { error: 'Unauthorized — valid X-API-Key header required' },
          { status: 401, headers: cors }
        )
      }
    }

    // Version info
    if (url.pathname === '/api/version') {
      return Response.json(
        {
          version: '1.0.0',
          name: 'Escalate OS',
          model: 'Signal → Decision → Accountability',
          architecture: 'Crisis Governance Operating System',
          stack: ['Cloudflare Pages', 'Workers', 'D1', 'KV', 'R2', 'Queues', 'Vectorize'],
          domains: {
            app: 'app.escalate.my',
            api: 'api.escalate.my',
            files: 'files.escalate.my',
            status: 'status.escalate.my',
          },
        },
        { headers: cors }
      )
    }

    // Tenant-aware incident creation
    if (url.pathname === '/api/incidents' && request.method === 'POST') {
      const tenantId = request.headers.get('X-Tenant-Id')
      if (!tenantId) {
        return Response.json({ error: 'Missing tenant' }, { status: 400, headers: cors })
      }
      const body = (await request.json()) as any
      const id = crypto.randomUUID()
      await env.DB.prepare(
        `INSERT INTO incidents (id, organization_id, title, severity, status, incident_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(id, tenantId, body.title, body.severity || 'medium', 'created', body.incident_type || null, Date.now())
        .run()

      // Queue event for normalization
      await env.EVENT_QUEUE.send({
        id,
        source: 'manual',
        sourceType: 'incident',
        title: body.title,
        content: body.description || '',
        occurredAt: new Date().toISOString(),
        metadata: { tenantId, severity: body.severity },
      })

      return Response.json({ id, status: 'created', tenantId }, { headers: cors })
    }

    if (url.pathname.startsWith('/api/incidents')) {
      const tenantId = request.headers.get('X-Tenant-Id') || 'org_default'
      const { results } = await env.DB.prepare(
        `SELECT * FROM incidents WHERE organization_id = ? ORDER BY created_at DESC LIMIT 50`
      )
        .bind(tenantId)
        .all()
      return Response.json({ incidents: results }, { headers: cors })
    }

    return Response.json({ error: 'Not Found', path: url.pathname }, { status: 404, headers: cors })
  },

  async queue(batch: MessageBatch, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const event = message.body as any
      console.log(`[EVENT_QUEUE] Normalized event: ${event.id} from ${event.source}`)
      await env.CACHE.put(`event:${event.id}`, JSON.stringify(event), { expirationTtl: 86400 })
      message.ack()
    }
  },
}

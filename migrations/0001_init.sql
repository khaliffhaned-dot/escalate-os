-- Combined schema with real auth (sessions + hashed passwords)
-- tenant_id on every table

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('admin', 'operator', 'viewer')) DEFAULT 'viewer',
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(tenant_id, email)
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

CREATE TABLE IF NOT EXISTS incidents (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  severity TEXT CHECK(severity IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK(status IN ('Active', 'Monitoring', 'Closed')) DEFAULT 'Active',
  owner TEXT,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_incidents_tenant ON incidents(tenant_id, status);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  detail TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_tenant ON audit_log(tenant_id, created_at);

CREATE TABLE IF NOT EXISTS decisions (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  incident_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  recorded_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(incident_id) REFERENCES incidents(id)
);

-- Demo user: email demo@escalate.local / password demo
-- Hash is PBKDF2-SHA256
INSERT OR IGNORE INTO users (id, tenant_id, email, password_hash, role)
VALUES (
  'user-demo',
  'tenant-demo',
  'demo@escalate.local',
  'pbkdf2:100000:Sa6U8nLhBvIRIn1kX4Y5fA==:u3mKO5qCwLUU5Ju2lbV+gIWTp2n+ehHl5powOGNHUAQ=',
  'admin'
);

INSERT OR IGNORE INTO incidents (id, tenant_id, title, summary, severity, status, owner, created_by)
VALUES 
  ('inc-001', 'tenant-demo', 'Regulatory inquiry — media coverage', 'Signal from press and social regarding ongoing compliance process.', 'high', 'Active', 'Governance Lead', 'user-demo'),
  ('inc-002', 'tenant-demo', 'Stakeholder request — board briefing', 'Investor desk requested updated position on open regulatory item.', 'medium', 'Monitoring', 'Comms', 'user-demo');

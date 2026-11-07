// === MOCK DATA FOR ESCALATE OS ===

export type Severity = "critical" | "high" | "medium" | "low";
export type IncidentStatus = "active" | "monitoring" | "contained";

export interface Regulator {
  code: string;
  name: string;
  obligations: number;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: IncidentStatus;
  regulators: string[];
  obligations: number;
  deadline: string;
  boardEscalation: boolean;
  signals: number;
  created: string;
  owner: string;
  description: string;
}

export interface Obligation {
  id: string;
  incident: string;
  title: string;
  regulator: string;
  deadline: string;
  status: string;
  owner: string;
  evidence: number;
}

export interface Stakeholder {
  type: string;
  name: string;
  influence: string;
  status: string;
}

export interface BoardBrief {
  id: string;
  incident: string;
  title: string;
  date: string;
  status: string;
  sections: string[];
  decision: string;
}

export interface Connector {
  name: string;
  icon: string;
  color: string;
  status: string;
  signals: number;
  category: string;
}

export interface Role {
  id: string;
  name: string;
  short: string;
  fullName: string;
  views: string[];
}

export const REGULATORS: Regulator[] = [
  { code: "JPDP", name: "Jabatan Perlindungan Data Peribadi", obligations: 3 },
  { code: "BNM", name: "Bank Negara Malaysia", obligations: 5 },
  { code: "SC", name: "Securities Commission", obligations: 4 },
  { code: "Bursa", name: "Bursa Malaysia", obligations: 6 },
  { code: "MCMC", name: "Malaysian Communications & Multimedia Commission", obligations: 2 },
  { code: "DOSH", name: "Dept of Occupational Safety & Health", obligations: 3 },
  { code: "DOE", name: "Dept of Environment", obligations: 2 },
  { code: "KKM", name: "Kementerian Kesihatan Malaysia", obligations: 4 },
  { code: "PDPA", name: "Personal Data Protection Act", obligations: 3 },
  { code: "Local", name: "Local Authorities", obligations: 1 },
];

export const INCIDENTS: Incident[] = [
  {
    id: "INC-001",
    title: "Customer Data Breach — Retail Banking",
    severity: "critical",
    status: "active",
    regulators: ["JPDP", "BNM"],
    obligations: 4,
    deadline: "2h 14m",
    boardEscalation: true,
    signals: 3,
    created: "2026-11-07 08:42",
    owner: "Legal Counsel",
    description:
      "Unauthorized access to customer database affecting 15,000 accounts. PDPA 72-hour notification window active.",
  },
  {
    id: "INC-002",
    title: "Product Recall — Infant Formula Batch BF-2026",
    severity: "critical",
    status: "active",
    regulators: ["KKM", "Bursa"],
    obligations: 5,
    deadline: "4h 30m",
    boardEscalation: true,
    signals: 7,
    created: "2026-11-07 06:15",
    owner: "Corporate Affairs",
    description:
      "Contamination detected in production batch. Bursa disclosure required. KKM notification within 24 hours.",
  },
  {
    id: "INC-003",
    title: "Pipeline Leak — Sarawak Operations",
    severity: "high",
    status: "active",
    regulators: ["DOE", "DOSH"],
    obligations: 3,
    deadline: "12h 00m",
    boardEscalation: false,
    signals: 4,
    created: "2026-11-07 04:30",
    owner: "Operations",
    description:
      "Hydrocarbon leak detected at Station 7. DOE notification required within 24 hours. DOSH investigation triggered.",
  },
  {
    id: "INC-004",
    title: "Market Manipulation Allegation",
    severity: "high",
    status: "monitoring",
    regulators: ["SC", "Bursa"],
    obligations: 4,
    deadline: "48h 00m",
    boardEscalation: true,
    signals: 2,
    created: "2026-11-06 14:20",
    owner: "Legal Counsel",
    description:
      "Social media allegations of insider trading. SC inquiry possible. Bursa query anticipated.",
  },
  {
    id: "INC-005",
    title: "Cyber Attack — Ransomware on IT Systems",
    severity: "critical",
    status: "active",
    regulators: ["JPDP", "MCMC", "BNM"],
    obligations: 6,
    deadline: "1h 45m",
    boardEscalation: true,
    signals: 9,
    created: "2026-11-07 09:00",
    owner: "CISO",
    description:
      "Ransomware detected on internal systems. Multiple regulator notifications required. BNM RMiT compliance breach likely.",
  },
  {
    id: "INC-006",
    title: "Workplace Fatality — Construction Site",
    severity: "critical",
    status: "active",
    regulators: ["DOSH"],
    obligations: 2,
    deadline: "Immediate",
    boardEscalation: true,
    signals: 1,
    created: "2026-11-07 07:15",
    owner: "Operations",
    description:
      "Worker fatality at KL construction site. DOSH notification required immediately. Site shutdown ordered.",
  },
];

export const OBLIGATIONS: Obligation[] = [
  { id: "OBL-001", incident: "INC-001", title: "PDPA 72-Hour Notification", regulator: "JPDP", deadline: "2h 14m", status: "active", owner: "Legal Counsel", evidence: 0 },
  { id: "OBL-002", incident: "INC-001", title: "BNM Incident Report", regulator: "BNM", deadline: "24h 00m", status: "active", owner: "Compliance", evidence: 1 },
  { id: "OBL-003", incident: "INC-002", title: "KKM Product Recall Notice", regulator: "KKM", deadline: "4h 30m", status: "active", owner: "Corporate Affairs", evidence: 2 },
  { id: "OBL-004", incident: "INC-002", title: "Bursa Immediate Disclosure", regulator: "Bursa", deadline: "1h 00m", status: "overdue", owner: "Company Secretary", evidence: 1 },
  { id: "OBL-005", incident: "INC-003", title: "DOE Pollution Report", regulator: "DOE", deadline: "12h 00m", status: "active", owner: "Operations", evidence: 0 },
  { id: "OBL-006", incident: "INC-003", title: "DOSH Incident Notification", regulator: "DOSH", deadline: "Immediate", status: "active", owner: "Operations", evidence: 1 },
  { id: "OBL-007", incident: "INC-005", title: "BNM RMiT Breach Report", regulator: "BNM", deadline: "1h 45m", status: "active", owner: "CISO", evidence: 0 },
  { id: "OBL-008", incident: "INC-005", title: "PDPA Data Breach Notification", regulator: "JPDP", deadline: "1h 45m", status: "active", owner: "Legal Counsel", evidence: 0 },
  { id: "OBL-009", incident: "INC-005", title: "MCMC Cyber Incident Report", regulator: "MCMC", deadline: "24h 00m", status: "active", owner: "CISO", evidence: 0 },
  { id: "OBL-010", incident: "INC-006", title: "DOSH Fatality Notification", regulator: "DOSH", deadline: "Immediate", status: "active", owner: "Operations", evidence: 2 },
  { id: "OBL-011", incident: "INC-004", title: "SC Insider Trading Response", regulator: "SC", deadline: "48h 00m", status: "pending", owner: "Legal Counsel", evidence: 0 },
  { id: "OBL-012", incident: "INC-004", title: "Bursa Query Response", regulator: "Bursa", deadline: "48h 00m", status: "pending", owner: "Company Secretary", evidence: 0 },
];

export const STAKEHOLDERS: Stakeholder[] = [
  { type: "Regulator", name: "JPDP — Data Protection Commissioner", influence: "critical", status: "notification-required" },
  { type: "Regulator", name: "BNM — Financial Sector Regulation", influence: "critical", status: "notification-required" },
  { type: "Regulator", name: "Bursa Malaysia — Listing Rules", influence: "critical", status: "notification-overdue" },
  { type: "Regulator", name: "KKM — Ministry of Health", influence: "high", status: "notification-required" },
  { type: "Regulator", name: "DOSH — Safety & Health", influence: "high", status: "engaged" },
  { type: "Regulator", name: "DOE — Environment", influence: "medium", status: "monitoring" },
  { type: "Investor", name: "Khazanah Nasional", influence: "critical", status: "briefed" },
  { type: "Investor", name: "EPF — Employees Provident Fund", influence: "high", status: "pending-briefing" },
  { type: "Investor", name: "BlackRock Fund Services", influence: "high", status: "pending-briefing" },
  { type: "Media", name: "The Edge Malaysia", influence: "high", status: "query-received" },
  { type: "Media", name: "Bernama", influence: "medium", status: "monitoring" },
  { type: "Media", name: "Malay Mail", influence: "medium", status: "monitoring" },
  { type: "Government", name: "Ministry of Finance", influence: "critical", status: "briefed" },
  { type: "Government", name: "Ministry of Health", influence: "high", status: "engaged" },
  { type: "Community", name: "Affected Residents — Sarawak", influence: "medium", status: "notification-required" },
  { type: "NGO", name: "FOMCA — Consumer Association", influence: "medium", status: "monitoring" },
];

export const BOARD_BRIEFS: BoardBrief[] = [
  {
    id: "BRF-001",
    incident: "INC-001",
    title: "Customer Data Breach — Board Brief",
    date: "2026-11-07",
    status: "pending-review",
    sections: ["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions"],
    decision: "Approve external legal counsel engagement and public notification strategy",
  },
  {
    id: "BRF-002",
    incident: "INC-005",
    title: "Cyber Attack — Emergency Board Brief",
    date: "2026-11-07",
    status: "urgent",
    sections: ["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions"],
    decision: "Approve emergency cybersecurity response budget and external IR firm engagement",
  },
  {
    id: "BRF-003",
    incident: "INC-002",
    title: "Product Recall — Board Brief",
    date: "2026-11-07",
    status: "pending-review",
    sections: ["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions"],
    decision: "Approve recall scope and consumer compensation framework",
  },
  {
    id: "BRF-004",
    incident: "INC-006",
    title: "Workplace Fatality — Board Brief",
    date: "2026-11-07",
    status: "urgent",
    sections: ["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions"],
    decision: "Approve site closure extension and family support package",
  },
  {
    id: "BRF-005",
    incident: "INC-004",
    title: "Market Manipulation Allegation — Board Brief",
    date: "2026-11-06",
    status: "drafted",
    sections: ["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions"],
    decision: "Approve proactive SC engagement and internal audit launch",
  },
];

export const CONNECTORS: Connector[] = [
  { name: "Meltwater", icon: "M", color: "#0066FF", status: "connected", signals: 142, category: "Media Monitoring" },
  { name: "Brandwatch", icon: "B", color: "#FF6600", status: "connected", signals: 89, category: "Social Listening" },
  { name: "Talkwalker", icon: "T", color: "#1A73E8", status: "connected", signals: 67, category: "Social Listening" },
  { name: "Dataminr", icon: "D", color: "#1A1A1A", status: "connected", signals: 34, category: "Real-time Alerts" },
  { name: "Sprinklr", icon: "S", color: "#FF4F00", status: "available", signals: 0, category: "Customer Experience" },
  { name: "Email", icon: "@", color: "#3B82F6", status: "connected", signals: 256, category: "Communication" },
  { name: "RSS", icon: "R", color: "#FF6600", status: "connected", signals: 78, category: "News Feeds" },
  { name: "WhatsApp", icon: "W", color: "#22C55E", status: "available", signals: 0, category: "Communication" },
  { name: "Government Feed", icon: "G", color: "#64748B", status: "connected", signals: 12, category: "Regulatory" },
  { name: "Bursa Feed", icon: "Bu", color: "#F97316", status: "connected", signals: 5, category: "Market Data" },
];

export const ROLES: Role[] = [
  { id: "board", name: "Board Member", short: "BDM", fullName: "Tan Sri Ismail", views: ["board"] },
  { id: "ceo", name: "CEO", short: "CEO", fullName: "M. Khaliff", views: ["situation", "governance", "board", "stakeholders", "intelligence"] },
  { id: "legal", name: "Legal Counsel", short: "LWC", fullName: "Sarah Chen", views: ["governance", "stakeholders"] },
  { id: "corp", name: "Corporate Affairs", short: "CFA", fullName: "Aisha Rahman", views: ["situation", "stakeholders"] },
  { id: "compliance", name: "Compliance", short: "CMP", fullName: "David Tan", views: ["governance", "intelligence"] },
  { id: "admin", name: "Administrator", short: "ADM", fullName: "System Admin", views: ["situation", "governance", "stakeholders", "board", "intelligence", "admin", "settings"] },
];

export const NAV_ITEMS = [
  { key: "situation", label: "Situation Room", section: "CORE", icon: "⚠" },
  { key: "governance", label: "Governance Room", section: "CORE", icon: "⚙" },
  { key: "stakeholders", label: "Stakeholder Room", section: "CORE", icon: "👥" },
  { key: "board", label: "Board Room", section: "CORE", icon: "📄" },
  { key: "intelligence", label: "Intelligence Hub", section: "HUB", icon: "🧠" },
  { key: "admin", label: "Administration", section: "SYSTEM", icon: "🛡" },
  { key: "settings", label: "Settings", section: "SYSTEM", icon: "🔧" },
];

export const PILLARS = [
  { icon: "📋", title: "Regulatory Intelligence", desc: "Know exactly what obligations apply before deadlines are missed." },
  { icon: "📊", title: "Board Intelligence", desc: "Transform incidents into board-ready decision packs automatically." },
  { icon: "⚙️", title: "Governance Engine", desc: "Convert events into actions, owners, approvals and evidence." },
  { icon: "👥", title: "Stakeholder Intelligence", desc: "Map regulators, media, investors and communities." },
  { icon: "⚡", title: "Crisis Workflow", desc: "Execute repeatable response playbooks across the organization." },
  { icon: "🔒", title: "Audit & Accountability", desc: "Immutable records for every decision and action." },
];

export const WORKFLOW_STEPS = [
  { num: "1", title: "Detect", detail: "Monitor signals, classify severity, assess scope." },
  { num: "2", title: "Mobilize", detail: "Owner: Crisis Response Team · Deadline: Immediate." },
  { num: "3", title: "Notify", detail: "Alert stakeholders by influence & risk score." },
  { num: "4", title: "Comply", detail: "Owner: Compliance Officer · Deadline: Regulatory window." },
  { num: "5", title: "Communicate", detail: "Draft statements, brief media, update public." },
  { num: "6", title: "Recover", detail: "Evidence: Audit trail, post-incident review." },
];

export const MCP_TOOLS = ["Meltwater", "Brandwatch", "Talkwalker", "Dataminr", "Sprinklr", "Email", "RSS", "WhatsApp"];

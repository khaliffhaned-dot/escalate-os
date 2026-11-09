export const sampleIncidents = [
  {
    id: "inc-001",
    title: "Regulatory inquiry — media coverage",
    summary: "Signal from social and press regarding compliance process.",
    severity: "high" as const,
    status: "Active",
    owner: "Governance Lead",
  },
  {
    id: "inc-002",
    title: "Stakeholder request — board briefing",
    summary: "Investor desk requested updated position on open item.",
    severity: "medium" as const,
    status: "Monitoring",
    owner: "Comms",
  },
  {
    id: "inc-003",
    title: "Internal signal — process delay",
    summary: "Operations flagged missing documentation for upcoming review.",
    severity: "medium" as const,
    status: "Active",
    owner: "Ops",
  },
];

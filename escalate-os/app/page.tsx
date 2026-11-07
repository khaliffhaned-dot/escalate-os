import Link from "next/link";
import { PILLARS, WORKFLOW_STEPS, MCP_TOOLS, REGULATORS } from "@/lib/data";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          maskImage:
            "radial-gradient(ellipse 100% 80% at 50% 0%, #000 30%, transparent 80%)",
        }}
      />
      <div className="pointer-events-none fixed -left-5 -top-10 z-0 h-[500px] w-[500px] rounded-full opacity-50 blur-[80px]" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.3), transparent 70%)" }} />
      <div className="pointer-events-none fixed right-[-10%] top-[30%] z-0 h-[400px] w-[400px] rounded-full opacity-50 blur-[80px]" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.2), transparent 70%)" }} />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.08] bg-black/65 px-12 py-3.5 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L3 7v6c0 5.5 4.5 10.5 11 13 6.5-2.5 11-7.5 11-13V7L14 2z" stroke="#F97316" strokeWidth="2" fill="rgba(249,115,22,0.15)" />
              <path d="M14 9v6M14 18v.5" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <span className="text-[18px] font-extrabold tracking-wider">ESCALATE</span>
              <br />
              <span className="text-[13px] font-semibold uppercase tracking-wider text-slate-500">Governance Intelligence</span>
            </div>
          </Link>
          <div className="flex items-center gap-8">
            <a href="#pillars" className="text-sm font-medium text-slate-400 transition-all hover:-translate-y-px hover:text-white">Features</a>
            <a href="#regulatory" className="text-sm font-medium text-slate-400 transition-all hover:-translate-y-px hover:text-white">Regulatory Intelligence</a>
            <a href="#board" className="text-sm font-medium text-slate-400 transition-all hover:-translate-y-px hover:text-white">Board Intelligence</a>
            <a href="#mcp" className="text-sm font-medium text-slate-400 transition-all hover:-translate-y-px hover:text-white">MCP Ecosystem</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="btn-ghost">Sign In</Link>
            <Link href="/dashboard" className="btn-primary">Get Started</Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-[1100px] px-12 pb-20 pt-40 text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-[13px] text-slate-400 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-500" />
            Governance Intelligence for Critical Organizations
          </div>
          <h1 className="mb-5 text-[56px] font-extrabold leading-[1.1] tracking-tight">
            When crisis strikes,
            <br />
            <span className="bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "gradientShift 5s ease infinite" }}>
              intelligence is everything.
            </span>
          </h1>
          <div className="mb-5 text-base font-semibold text-orange-400">
            The Governance Intelligence Platform for Malaysia's most critical organizations.
          </div>
          <p className="mx-auto mb-9 max-w-[620px] text-lg leading-relaxed text-slate-400">
            From signal to decision to accountability. Escalate transforms incidents into regulatory action, board decisions, and auditable outcomes. Built for enterprises, regulators, GLCs, financial institutions, and critical infrastructure.
          </p>
          <div className="mb-12 flex justify-center gap-3.5">
            <Link href="/dashboard" className="btn-primary !px-7 !py-3.5 !text-[15px]">Explore Situation Room</Link>
            <a href="#cta" className="btn-ghost !px-7 !py-3.5 !text-[15px]">Book Enterprise Demo</a>
          </div>
          <div className="mx-auto flex max-w-[800px] justify-center gap-12 border-t border-white/[0.08] pt-8">
            {[
              { num: "10+", label: "Regulators" },
              { num: "25+", label: "Obligation Types" },
              { num: "100%", label: "Audit Trail" },
              { num: "24/7", label: "Monitoring" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[32px] font-extrabold">{s.num}</div>
                <div className="mt-1 text-[13px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Built For */}
        <section className="mx-auto max-w-[900px] px-12 pb-16 text-center">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[2px] text-slate-500">Trusted for High-Consequence Decisions</div>
          <div className="flex flex-wrap justify-center gap-3">
            {["PLCs", "GLCs", "Financial Institutions", "Energy & Utilities", "Healthcare", "Government Agencies"].map((item) => (
              <span key={item} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-6 py-2.5 text-sm font-semibold text-slate-400 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:text-white">{item}</span>
            ))}
          </div>
        </section>

        {/* Why Escalate */}
        <section className="mx-auto max-w-[1000px] px-12 py-20 text-center">
          <h2 className="mb-4 text-4xl font-bold">Why Existing Tools Aren't Enough</h2>
          <p className="mx-auto mb-12 max-w-[560px] text-base text-slate-500">Monitoring platforms tell you what happened. Escalate tells you what you must do next.</p>
          <div className="mx-auto grid max-w-[800px] grid-cols-[1fr_auto_1fr] items-center gap-8">
            <div className="card opacity-70">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Monitoring Platforms</div>
              <h3 className="mb-4 text-xl font-bold">Detect</h3>
              <p className="text-[15px] leading-relaxed text-slate-400">Meltwater, Brandwatch, Talkwalker, Dataminr — they alert you that something happened. Then you're on your own.</p>
            </div>
            <div className="text-3xl text-slate-600">→</div>
            <div className="card border-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.1)]">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Escalate OS</div>
              <h3 className="mb-4 text-xl font-bold text-orange-400">Decide & Account</h3>
              <p className="text-[15px] leading-relaxed text-slate-400">Which regulator applies. What obligations exist. Who must approve. What the board needs. What must be communicated — with evidence.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {["Detect", "Decide", "Comply", "Govern", "Account"].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className={"rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur-md " + (i === 4 ? "border-orange-500 bg-orange-500/15 text-orange-400" : "border-white/[0.08] bg-white/[0.03] text-slate-400")}>{step}</span>
                {i < 4 && <span className="text-slate-600">→</span>}
              </span>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section id="pillars" className="mx-auto max-w-[1100px] px-12 py-20">
          <h2 className="mb-3 text-center text-4xl font-bold">Governance Intelligence Pillars</h2>
          <p className="mx-auto mb-12 max-w-[560px] text-center text-base text-slate-500">Six capabilities that transform how your organization detects, decides, and accounts.</p>
          <div className="grid grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="card card-hover hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(249,115,22,0.15)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-500/15 text-xl text-orange-400">{p.icon}</div>
                <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory Intelligence */}
        <section id="regulatory" className="mx-auto max-w-[1100px] px-12 py-20">
          <h2 className="mb-3 text-center text-4xl font-bold">Built for Malaysia's Regulatory Environment</h2>
          <p className="mx-auto mb-12 max-w-[560px] text-center text-base text-slate-500">Malaysia Regulatory Matrix — obligations embedded directly into your workflow.</p>
          <div className="mx-auto grid max-w-[700px] grid-cols-5 gap-3 pb-8">
            {REGULATORS.map((r) => (
              <div key={r.code} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-5 text-center text-sm font-semibold text-slate-400 backdrop-blur-md transition-all hover:border-green-500 hover:text-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                {r.code}
              </div>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { icon: "⏱", title: "Deadline Tracking", desc: "Never miss a regulatory window" },
              { icon: "📊", title: "Regulatory Mapping", desc: "Know which regulator applies" },
              { icon: "📄", title: "Evidence Management", desc: "Immutable audit trail" },
              { icon: "📦", title: "Escalation Timers", desc: "Automated compliance workflow" },
            ].map((f) => (
              <div key={f.title} className="card text-center hover:border-green-500 hover:bg-green-500/5">
                <div className="mb-2 text-2xl">{f.icon}</div>
                <h4 className="text-[13px] font-semibold">{f.title}</h4>
                <p className="mt-1 text-xs text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-base leading-relaxed text-slate-400">
            Regulatory obligations embedded directly into your workflow.<br />No spreadsheets. No missed deadlines. No guesswork.
          </p>
        </section>

        {/* Board Intelligence */}
        <section id="board" className="mx-auto max-w-[1100px] px-12 py-20">
          <div className="grid grid-cols-2 items-center gap-12">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Board-ready in under<br />5 minutes.</h2>
              <p className="text-base leading-relaxed text-slate-400">
                Every incident automatically generates a structured board paper — situation, risk, stakeholders, regulatory position, and recommended decisions. Your board gets what it needs, when it needs it.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Board Papers", "Decision Requests", "Risk Register", "Incident Summary", "Regulatory Exposure", "Required Actions"].map((f) => (
                  <span key={f} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-slate-400 backdrop-blur-md">{f}</span>
                ))}
              </div>
            </div>
            <div className="card !p-0 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-4">
                📄 <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">Board Brief</span>
              </div>
              {["Situation Overview", "Risk Exposure", "Stakeholder Impact", "Regulatory Position", "Required Decisions", "Recommended Action"].map((item, i) => (
                <div key={item} className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-3.5 text-sm text-slate-400 transition-colors last:border-0 hover:bg-white/[0.03]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500/15 text-orange-400 text-sm">
                    {["○", "⚠", "👥", "⚖", "✓", "→"][i]}
                  </div>
                  <span className="font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Copilot */}
        <section className="mx-auto max-w-[1100px] px-12 py-20">
          <div className="card !p-12">
            <div className="grid grid-cols-2 items-center gap-12">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-[13px] text-slate-400 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse-dot rounded-full bg-green-500" /> Powered by Workers AI
                </div>
                <h2 className="mb-4 text-3xl font-bold">Governance Copilot</h2>
                <ul className="flex flex-col gap-3">
                  {["Incident Classification", "Board Brief Generation", "Statement Drafting", "Risk Explanation", "Situation Summaries", "Regulatory Mapping"].map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-black/80 p-6 font-mono text-[13px] leading-relaxed text-slate-400 backdrop-blur-md">
                <div><span className="text-orange-400">&quot;incident&quot;</span>: <span className="text-green-400">&quot;Product Recall&quot;</span>,</div>
                <div><span className="text-orange-400">&quot;severity&quot;</span>: <span className="text-green-400">&quot;High&quot;</span>,</div>
                <div>&nbsp;</div>
                <div><span className="text-orange-400">&quot;regulators&quot;</span>: [</div>
                <div>&nbsp;&nbsp;&nbsp;<span className="text-green-400">&quot;JPDP&quot;</span>,</div>
                <div>&nbsp;&nbsp;&nbsp;<span className="text-green-400">&quot;Bursa&quot;</span></div>
                <div>],</div>
                <div>&nbsp;</div>
                <div><span className="text-orange-400">&quot;obligations&quot;</span>: <span className="text-amber-400">4</span>,</div>
                <div><span className="text-orange-400">&quot;boardEscalation&quot;</span>: <span className="text-red-400">true</span>,</div>
                <div><span className="text-orange-400">&quot;nextCriticalDeadline&quot;</span>:</div>
                <div>&nbsp;&nbsp;<span className="text-green-400">&quot;2h 14m&quot;</span><span className="ml-1 inline-block h-4 w-2 animate-blink bg-orange-500 align-bottom" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mx-auto max-w-[1100px] px-12 py-20">
          <h2 className="mb-3 text-center text-4xl font-bold">How It Works</h2>
          <p className="mx-auto mb-12 max-w-[560px] text-center text-base text-slate-500">A structured framework that guides your team through every phase of crisis management.</p>
          <div className="flex flex-wrap items-start justify-center gap-0">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.num} className="flex items-start">
                <div className="px-5 text-center" style={{ minWidth: 120 }}>
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/[0.12] bg-white/[0.03] text-lg font-bold text-orange-400 backdrop-blur-md transition-all hover:scale-110 hover:border-orange-500 hover:bg-orange-500/15 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    {step.num}
                  </div>
                  <h4 className="text-sm font-semibold">{step.title}</h4>
                  <p className="mt-1.5 text-xs text-slate-500">{step.detail}</p>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && <div className="flex h-14 items-center text-xl text-slate-600">→</div>}
              </div>
            ))}
          </div>
        </section>

        {/* MCP Ecosystem */}
        <section id="mcp" className="mx-auto max-w-[1100px] px-12 py-20 text-center">
          <h2 className="mb-3 text-4xl font-bold">MCP Ecosystem</h2>
          <p className="mx-auto mb-12 max-w-[560px] text-center text-base text-slate-500">Keep your existing tools. Escalate sits above them.</p>
          <div className="mb-6 flex flex-wrap justify-center gap-2.5">
            {MCP_TOOLS.map((tool) => (
              <span key={tool} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-slate-400 backdrop-blur-md transition-all hover:border-orange-500 hover:text-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.2)]">{tool}</span>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="text-2xl text-slate-600">→</div>
            <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-500 px-10 py-4 text-lg font-bold text-white shadow-[0_8px_32px_rgba(249,115,22,0.3)]">ESCALATE OS</div>
            <div className="text-2xl text-slate-600">→</div>
            <div className="flex gap-6">
              {["Decision", "Governance", "Accountability"].map((item) => (
                <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2 text-sm font-semibold text-slate-400 backdrop-blur-md">{item}</span>
              ))}
            </div>
          </div>
          <p className="mt-8 text-lg text-slate-400">Keep your existing tools. Escalate sits above them.</p>
        </section>

        {/* CTA */}
        <section id="cta" className="mx-auto max-w-[800px] px-12 py-24 text-center">
          <h2 className="mb-4 text-[44px] font-bold">Ready to take control?</h2>
          <p className="mb-8 text-lg text-slate-400">Turn signals into decisions, and decisions into accountability.</p>
          <div className="flex justify-center gap-3.5">
            <Link href="/dashboard" className="btn-primary !px-9 !py-4 !text-base">Explore Situation Room</Link>
            <a href="#" className="btn-ghost !px-9 !py-4 !text-base">Contact Sales</a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-[1100px] border-t border-white/[0.08] px-12 py-12">
          <div className="mb-8 grid grid-cols-[2fr_1fr_1fr] gap-12">
            <div>
              <div className="flex items-center gap-2.5">
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2L3 7v6c0 5.5 4.5 10.5 11 13 6.5-2.5 11-7.5 11-13V7L14 2z" stroke="#F97316" strokeWidth="2" fill="rgba(249,115,22,0.15)" />
                </svg>
                <span className="text-base font-extrabold">ESCALATE</span>
              </div>
              <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-slate-500">Governance Intelligence Platform for Malaysia's most critical organizations.</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Product</h4>
              <a href="#pillars" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Features</a>
              <Link href="/dashboard" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Dashboard</Link>
              <a href="#mcp" className="mb-2 block text-[13px] text-slate-400 hover:text-white">MCP Ecosystem</a>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Legal</h4>
              <a href="#" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Privacy</a>
              <a href="#" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Terms</a>
              <a href="#" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Security</a>
              <a href="#" className="mb-2 block text-[13px] text-slate-400 hover:text-white">Audit Trail</a>
            </div>
          </div>
          <div className="border-t border-white/[0.08] pt-6 text-xs text-slate-600">© 2026 Escalate OS. Governance Intelligence Platform.</div>
        </footer>
      </div>
    </div>
  );
}

import Link from "next/link";

const rooms = [
  { href: "/dashboard", label: "Situation" },
  { href: "/dashboard/governance", label: "Governance" },
  { href: "/dashboard/stakeholders", label: "Stakeholders" },
  { href: "/dashboard/board", label: "Board" },
  { href: "/dashboard/intelligence", label: "Intelligence" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 border-r border-slate-800 p-4 space-y-1">
        <div className="mb-6 px-2">
          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white">
            ← Escalate OS
          </Link>
        </div>
        {rooms.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="block px-3 py-2 rounded text-sm hover:bg-slate-800 transition"
          >
            {r.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}

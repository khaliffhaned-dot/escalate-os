"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS, ROLES, INCIDENTS } from "@/lib/data";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState("ceo");
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const currentRole = ROLES.find((r) => r.id === role)!;
  const activeIncidents = INCIDENTS.filter((i) => i.status === "active").length;

  let lastSection = "";

  return (
    <div className="flex h-full w-60 flex-shrink-0 flex-col border-r border-white/[0.08] bg-[#0a0a0c] z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 border-b border-white/[0.08] px-5 py-5">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path d="M14 2L3 7v6c0 5.5 4.5 10.5 11 13 6.5-2.5 11-7.5 11-13V7L14 2z" stroke="#F97316" strokeWidth="2" fill="rgba(249,115,22,0.15)" />
          <path d="M14 9v6M14 18v.5" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <div>
          <div className="text-[15px] font-extrabold tracking-wider">ESCALATE</div>
          <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Governance Intel</div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV_ITEMS.filter((item) => currentRole.views.includes(item.key)).map((item) => {
          const showLabel = item.section !== lastSection;
          lastSection = item.section;
          const href = item.key === "situation" ? "/dashboard" : "/dashboard/" + (item.key);
          const isActive = pathname === href;
          return (
            <div key={item.key}>
              {showLabel && (
                <div className="px-5 pb-1.5 pt-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-slate-600">{item.section}</div>
              )}
              <Link
                href={href}
                className={"flex items-center gap-2.5 px-5 py-2.5 text-[13px] font-medium transition-all border-l-2 " + (
                  isActive
                    ? "border-orange-500 bg-orange-500/15 text-orange-400"
                    : "border-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white"
                )}
              >
                <span className="w-[18px] text-center text-[15px]">{item.icon}</span>
                <span>{item.label}</span>
                {item.key === "situation" && (
                  <span className="ml-auto rounded-lg bg-red-500 px-1.5 py-px text-[10px] font-bold text-white">{activeIncidents}</span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Role Switcher */}
      <div className="border-t border-white/[0.08] px-5 py-3 relative">
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 transition-all hover:border-white/[0.18]"
          onClick={() => setShowRoleMenu(!showRoleMenu)}
        >
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-[11px] font-bold text-white">
            {currentRole.short}
          </div>
          <div>
            <div className="text-xs font-semibold text-white">{currentRole.fullName}</div>
            <div className="text-[10px] text-slate-500">{currentRole.name}</div>
          </div>
        </div>
        {showRoleMenu && (
          <div className="absolute bottom-16 left-5 z-60 w-48 rounded-xl border border-white/[0.12] bg-[#0a0a0c] p-2 shadow-2xl">
            {ROLES.map((r) => (
              <div
                key={r.id}
                className={"flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-xs " + (
                  r.id === role ? "bg-orange-500/15 text-orange-400" : "text-slate-400 hover:bg-white/[0.03]"
                )}
                onClick={() => {
                  setRole(r.id);
                  setShowRoleMenu(false);
                }}
              >
                <span className={"h-2 w-2 rounded-full " + (r.id === role ? "bg-orange-500" : "bg-slate-600")} />
                {r.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

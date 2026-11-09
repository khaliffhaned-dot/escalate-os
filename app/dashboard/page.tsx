import SituationClient from "./situation-client";

export default function SituationPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Situation Room</h1>
        <p className="text-slate-400 text-sm mt-1">
          Active incidents, status changes, and decisions — all audited.
        </p>
      </header>
      <SituationClient />
    </div>
  );
}

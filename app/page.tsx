import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Escalate OS
        </h1>
        <p className="text-lg text-slate-300">
          Governance Intelligence Platform for Malaysia’s most critical organizations.
          From signal to decision to accountability.
        </p>
        <p className="text-sm text-slate-500">
          Runs on Cloudflare Workers. Data stays in-region. No third-party SaaS holds the records.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md font-medium transition"
          >
            Enter Situation Room
          </Link>
          <Link
            href="/dashboard/governance"
            className="px-6 py-3 border border-slate-600 hover:border-slate-400 rounded-md font-medium transition"
          >
            View Governance
          </Link>
        </div>
      </div>
    </main>
  );
}

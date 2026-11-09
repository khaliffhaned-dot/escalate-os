import { loginAction } from "@/lib/actions";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form action={loginAction} className="w-full max-w-sm space-y-4 border border-slate-800 rounded-lg p-6">
        <h1 className="text-xl font-semibold">Escalate OS</h1>
        <p className="text-sm text-slate-400">Sign in with your account</p>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2"
          placeholder="Password"
        />
        <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium">
          Sign in
        </button>
        <p className="text-xs text-slate-500 text-center">
          Demo: demo@escalate.local / demo
        </p>
      </form>
    </main>
  );
}

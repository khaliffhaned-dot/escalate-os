"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === "demo") {
      document.cookie = "escalate-session=demo; path=/; max-age=86400";
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Incorrect. Use \"demo\" for this presentation.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 border border-slate-800 rounded-lg p-6"
      >
        <h1 className="text-xl font-semibold">Escalate OS</h1>
        <p className="text-sm text-slate-400">
          Demo access for investor / agency presentation.
        </p>
        <input
          type="password"
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-medium"
        >
          Enter
        </button>
        <p className="text-xs text-slate-500 text-center">Password: demo</p>
      </form>
    </main>
  );
}

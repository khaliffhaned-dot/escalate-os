import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escalate OS",
  description: "Governance Intelligence Platform — from signal to decision to accountability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

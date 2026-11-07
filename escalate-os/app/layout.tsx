import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Escalate OS — Governance Intelligence Platform",
  description:
    "The Governance Intelligence Platform for Malaysia's most critical organizations. From signal to decision to accountability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable + " " + jetbrains.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

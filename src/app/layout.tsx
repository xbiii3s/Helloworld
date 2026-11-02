import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "VN Hold'em Hub · 越南德州赛事中心", template: "%s · VN Hold'em Hub" },
  description: "越南各德州扑克俱乐部的比赛赛程、买入与奖励结构、系列赛和比赛实况。",
};

const NAV = [
  { href: "/", label: "首页" },
  { href: "/schedule", label: "赛程" },
  { href: "/clubs", label: "俱乐部" },
  { href: "/series", label: "系列赛" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-[#07110c]/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="text-xl">♠</span>
              <span>VN Hold&apos;em Hub</span>
              <span className="hidden text-xs font-normal text-slate-400 sm:inline">越南德州赛事中心</span>
            </Link>
            <nav className="flex gap-4 text-sm text-slate-300">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-slate-500">
          所有时间均为越南时间 (GMT+7)。金额单位：越南盾 (₫)。当前为演示数据。
        </footer>
      </body>
    </html>
  );
}

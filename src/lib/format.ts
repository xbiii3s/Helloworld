const vnd = new Intl.NumberFormat("vi-VN");

export function formatVND(n: number): string {
  return `${vnd.format(Math.round(n))} ₫`;
}

/** 16500000 -> "16.5M"、70000000000 -> "70B" */
export function compactVND(n: number): string {
  if (n >= 1_000_000_000) return `${+(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function formatChips(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

const WD = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

/** "2026-11-18" -> "2026/11/18 周三" */
export function formatDay(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${y}/${String(m).padStart(2, "0")}/${String(d).padStart(2, "0")} ${WD[wd]}`;
}

export function formatRange(a: string, b?: string): string {
  if (!b || a === b) return formatDay(a);
  return `${a.replaceAll("-", "/")} – ${b.slice(5).replace("-", "/")}`;
}

/** 越南时间的今天 YYYY-MM-DD */
export function todayVN(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(now);
}

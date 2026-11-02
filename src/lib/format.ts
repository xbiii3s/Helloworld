const vnd = new Intl.NumberFormat("vi-VN");

/** 5500000 -> "5.500.000 ₫" */
export function formatVND(n: number): string {
  return `${vnd.format(Math.round(n))} ₫`;
}

/** 5500000 -> "5.5M"，用于紧凑展示 */
export function compactVND(n: number): string {
  if (n >= 1_000_000_000) return `${+(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(0)}K`;
  return String(n);
}

export function formatChips(n: number): string {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

const TZ = "Asia/Ho_Chi_Minh";

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: TZ, month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(new Date(iso));
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

/** 按越南时区取 YYYY-MM-DD，用于按日分组 */
export function dayKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(iso));
}

export function reentryLabel(r: "freezeout" | "unlimited" | number): string {
  if (r === "freezeout") return "不可重入";
  if (r === "unlimited") return "无限重入";
  return `可重入 ${r} 次`;
}

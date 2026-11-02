import type { Status } from "@/lib/types";

const MAP: Record<Status, { label: string; cls: string }> = {
  upcoming: { label: "即将开始", cls: "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40" },
  running: { label: "● 进行中", cls: "bg-red-600/20 text-red-300 ring-1 ring-red-500/50" },
  finished: { label: "已结束", cls: "bg-slate-800 text-slate-400" },
};

export function StatusBadge({ status }: { status: Status }) {
  const s = MAP[status];
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

import type { TournamentStatus } from "@/lib/types";

const MAP: Record<TournamentStatus, { label: string; cls: string }> = {
  upcoming: { label: "即将开始", cls: "bg-slate-700 text-slate-200" },
  registering: { label: "报名中", cls: "bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40" },
  live: { label: "● 进行中", cls: "bg-red-600/20 text-red-300 ring-1 ring-red-500/50" },
  break: { label: "休息中", cls: "bg-sky-500/20 text-sky-300 ring-1 ring-sky-500/40" },
  finished: { label: "已结束", cls: "bg-slate-800 text-slate-400" },
};

export function StatusBadge({ status }: { status: TournamentStatus }) {
  const s = MAP[status];
  return <span className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>;
}

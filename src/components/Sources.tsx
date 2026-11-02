import type { Source } from "@/lib/types";

export function Sources({ sources, notes }: { sources: Source[]; notes?: string[] }) {
  return (
    <div className="space-y-2 text-xs text-slate-400">
      {notes?.map((n) => <p key={n} className="rounded bg-amber-500/10 px-3 py-2 text-amber-200">⚠ {n}</p>)}
      <div>
        数据来源：
        {sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && " · "}
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">{s.label}</a>
          </span>
        ))}
      </div>
    </div>
  );
}

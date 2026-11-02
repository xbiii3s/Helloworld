import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { LivePanel } from "@/components/LivePanel";
import { StatusBadge } from "@/components/StatusBadge";
import { STANDARD_STRUCTURE } from "@/lib/blinds";
import { formatChips, formatDateTime, formatVND, reentryLabel } from "@/lib/format";
import { getLiveSnapshot } from "@/lib/live";
import { payoutStructure, prizeForPlace } from "@/lib/payouts";
import { getClub, getSeries, getTournament } from "@/lib/repo";

export const dynamic = "force-dynamic";

type P = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: P }) {
  const t = await getTournament((await params).id);
  return { title: t ? `${t.name}${t.flight ? ` ${t.flight}` : ""}` : "比赛" };
}

export default async function TournamentPage({ params }: { params: P }) {
  const { id } = await params;
  const t = await getTournament(id);
  if (!t) notFound();
  const [club, series] = await Promise.all([getClub(t.clubSlug), t.seriesSlug ? getSeries(t.seriesSlug) : undefined]);
  const snap = getLiveSnapshot(t);

  // 奖励结构：开赛后按实际人次，开赛前按预估人次 & 保底
  const entries = snap.entries > 0 && snap.status !== "registering" ? snap.entries : t.expectedEntries;
  const pool = Math.max(t.guarantee, entries * t.buyIn);
  const rules = payoutStructure(entries);

  return (
    <div className="space-y-8">
      <nav className="text-sm text-slate-400">
        {club && <Link href={`/clubs/${club.slug}`} className="hover:text-white">{club.name}</Link>}
        {series && <> / <Link href={`/series/${series.slug}`} className="hover:text-white">{series.shortName}</Link></>}
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {t.eventNo && <span className="mr-2 text-slate-400">#{t.eventNo}</span>}
            {t.name} {t.flight && <span className="text-amber-300">{t.flight}</span>}
          </h1>
          <div className="mt-1 text-slate-300">{formatDateTime(t.startTime)} · {t.gameType}</div>
        </div>
        <StatusBadge status={t.liveStatus} />
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="买入" value={formatVND(t.buyIn + t.fee)} sub={`${formatVND(t.buyIn)} 奖池 + ${formatVND(t.fee)} 服务费`} />
        <Info label="保底" value={formatVND(t.guarantee)} gold />
        <Info label="起始筹码" value={formatChips(t.startingStack)} sub={`每级 ${t.levelMinutes} 分钟`} />
        <Info label="报名 / 重入" value={t.lateRegLevel ? `截止 Level ${t.lateRegLevel}` : "不开放报名"} sub={reentryLabel(t.reentry)} />
      </section>
      {t.notes && <p className="rounded-lg bg-white/5 px-4 py-3 text-sm text-slate-300">ℹ️ {t.notes}</p>}

      {t.results?.length ? (
        <section>
          <h2 className="mb-3 text-xl font-semibold">🏆 最终结果</h2>
          <table className="w-full max-w-xl text-sm">
            <tbody className="divide-y divide-white/5">
              {t.results.map((r) => (
                <tr key={r.place}>
                  <td className="py-2 pr-3 text-slate-400">{r.place}</td>
                  <td className="py-2">{r.player} <span className="text-xs text-slate-500">{r.country}</span></td>
                  <td className="py-2 text-right font-mono text-chip-gold">{formatVND(r.prize)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <LivePanel id={t.id} initial={snap} />
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="mb-1 text-xl font-semibold">奖励结构</h2>
          <p className="mb-3 text-xs text-slate-400">按 {entries} 人次计算，奖池 {formatVND(pool)}（以现场公布为准）</p>
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-slate-400"><tr><th className="py-1">名次</th><th>比例</th><th className="text-right">奖金</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {rules.map((r) => (
                <tr key={r.places[0]}>
                  <td className="py-1.5">{r.places[0] === r.places[1] ? r.places[0] : `${r.places[0]}–${r.places[1]}`}</td>
                  <td>{r.percent}%</td>
                  <td className="text-right font-mono">{formatVND(prizeForPlace(rules, pool, r.places[0]))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-semibold">盲注结构</h2>
          <div className="max-h-[480px] overflow-y-auto rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[#0b1a12] text-left text-xs text-slate-400">
                <tr><th className="px-3 py-1">级别</th><th>小盲/大盲</th><th>BB Ante</th><th>时长</th></tr>
              </thead>
              <tbody>
                {STANDARD_STRUCTURE.slice(0, 24).map((l) => (
                  <Fragment key={l.level}>
                    <tr className={`${snap.level?.level === l.level ? "bg-felt-500/30" : ""} ${l.level === t.lateRegLevel ? "border-b-2 border-amber-500/60" : ""}`}>
                      <td className="px-3 py-1">{l.level}</td>
                      <td className="font-mono">{formatChips(l.sb)}/{formatChips(l.bb)}</td>
                      <td className="font-mono">{l.ante ? formatChips(l.ante) : "-"}</td>
                      <td>{t.levelMinutes}′</td>
                    </tr>
                    {l.breakAfter && (
                      <tr className="text-xs text-sky-300"><td className="px-3 py-1" colSpan={4}>休息 {l.breakAfter} 分钟</td></tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {t.lateRegLevel > 0 && <p className="mt-2 text-xs text-amber-300">橙线：Level {t.lateRegLevel} 结束后截止报名</p>}
        </section>
      </div>
    </div>
  );
}

function Info({ label, value, sub, gold }: { label: string; value: string; sub?: string; gold?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className={`text-lg font-bold ${gold ? "text-chip-gold" : ""}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

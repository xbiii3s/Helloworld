import type { Tournament } from "../types";

/**
 * 单场比赛（目前只收录查到具体信息的主赛事等）。
 * 完整的每日赛程需要俱乐部提供或从官网同步，见 README 中的数据采集方案。
 */
export const tournaments: Tournament[] = [
  {
    id: "hsop-gs3-main", seriesSlug: "hsop-grinder-series-iii-2026", clubSlug: "vpl",
    name: "Main Event", gameType: "NLH", startDate: "2026-10-28", endDate: "2026-11-08",
    buyIn: 16_500_000, guarantee: 15_000_000_000,
    notes: ["Flight 具体日期未查到，显示为系列赛日期，请以官方赛程为准。"],
    sources: [{ label: "pokercalendar.asia", url: "https://pokercalendar.asia/en/hsop-grinder-series-iii-2026" }],
  },
  {
    id: "glpc6-main", seriesSlug: "glpc-vi-2026", clubSlug: "grand-loyal",
    name: "Main Event", gameType: "NLH", startDate: "2026-11-18", endDate: "2026-11-29",
    guarantee: 16_000_000_000,
    notes: ["买入与具体日期待官方公布（显示为系列赛日期）。"],
    sources: [{ label: "SoMuchPoker · GLPC VI", url: "https://somuchpoker.com/news/glpc-vi-arch-angel-trophies-hanoi-2026" }],
  },
  {
    id: "glpc6-high-roller", seriesSlug: "glpc-vi-2026", clubSlug: "grand-loyal",
    name: "High Roller Series（10 场）", gameType: "NLH", startDate: "2026-11-19", endDate: "2026-11-27",
    notes: ["买入分 22M / 33M / 44M ₫ 三档，单场日期待公布。"],
    sources: [{ label: "SoMuchPoker · GLPC VI", url: "https://somuchpoker.com/news/glpc-vi-arch-angel-trophies-hanoi-2026" }],
  },
  {
    id: "qpc-circuit-main", seriesSlug: "qpc-circuit-2026", clubSlug: "quads-hanoi", eventNo: 30,
    name: "Main Event", gameType: "NLH", startDate: "2026-10-18", endDate: "2026-10-21",
    buyIn: 11_000_000, guarantee: 10_000_000_000, entries: 1583,
    results: [{ place: 1, player: "Zou Fangwei" }],
    notes: ["冠军与人次来自 Quads 官网首页，单一来源。"],
    sources: [
      { label: "quadspoker.vn", url: "https://quadspoker.vn/" },
      { label: "Global Poker Index", url: "https://www.globalpokerindex.com/tournaments/2026/vietnam/quads-poker-championship-qpc-circuit-2026-mega-satellite-to-qpc-circuit-signature-event-s9-1623036/" },
    ],
  },
  {
    id: "qpc-circuit-star", seriesSlug: "qpc-circuit-2026", clubSlug: "quads-hanoi",
    name: "Quads Star Challenge", gameType: "NLH", startDate: "2026-10-18", buyIn: 55_000_000,
    sources: [{ label: "Global Poker Index", url: "https://www.globalpokerindex.com/tournaments/2026/vietnam/quads-poker-championship-qpc-circuit-2026-mega-satellite-to-qpc-circuit-signature-event-s9-1623036/" }],
  },
  {
    id: "qpc-circuit-saver", seriesSlug: "qpc-circuit-2026", clubSlug: "quads-hanoi",
    name: "Supreme Saver", gameType: "NLH", startDate: "2026-10-21", buyIn: 5_500_000,
    sources: [{ label: "Global Poker Index", url: "https://www.globalpokerindex.com/tournaments/2026/vietnam/quads-poker-championship-qpc-circuit-2026-mega-satellite-to-qpc-circuit-signature-event-s9-1623036/" }],
  },
  {
    id: "rpt4-main", seriesSlug: "rpt-championship-iv-2026", clubSlug: "royal-poker-club",
    name: "RPT Main Event", gameType: "NLH", startDate: "2026-09-18", endDate: "2026-09-22",
    buyIn: 27_500_000, guarantee: 20_000_000_000,
    sources: [{ label: "SoMuchPoker · RPT Championship IV", url: "https://somuchpoker.com/news/rpt-championship-iv-hanoi-2026" }],
  },
  {
    id: "usop-hlb2-main", seriesSlug: "usop-halong-bay-ii-2026", clubSlug: "usop",
    name: "Main Event", gameType: "NLH", startDate: "2026-09-05", endDate: "2026-09-09",
    buyIn: 30_000_000, guarantee: 30_000_000_000,
    sources: [{ label: "SoMuchPoker · USOP HaLong Bay II", url: "https://somuchpoker.com/events-calendar/usop/2026/usop-vietnam-series-2026" }],
  },
  {
    id: "hsop-gs-main", seriesSlug: "hsop-grinder-series-2026", clubSlug: "vpl",
    name: "Main Event", gameType: "NLH", startDate: "2026-07-09", endDate: "2026-07-13",
    guarantee: 12_000_000_000,
    sources: [{ label: "SoMuchPoker · HSOP Grinder Series 2026", url: "https://somuchpoker.com/events-calendar/hsop/2026/hsop-grinder-series-2026" }],
  },
  {
    id: "qpc1-main", seriesSlug: "quads-poker-championship-i-2026", clubSlug: "quads-hanoi",
    name: "Main Event", gameType: "NLH", startDate: "2026-06-17", endDate: "2026-06-29",
    buyIn: 27_500_000, guarantee: 20_000_000_000,
    notes: ["具体日期未查到，显示为系列赛日期。"],
    sources: [{ label: "SoMuchPoker · Quads Summer 2026", url: "https://somuchpoker.com/events-calendar/qpc/2026/quads-poker-championship-i-2026" }],
  },
  {
    id: "usop-hlb-main", seriesSlug: "usop-halong-bay-2026", clubSlug: "usop",
    name: "Main Event", gameType: "NLH", startDate: "2026-05-28", endDate: "2026-06-01",
    buyIn: 30_000_000, guarantee: 30_000_000_000,
    sources: [{ label: "SoMuchPoker · USOP HaLong Bay 2026", url: "https://somuchpoker.com/events-calendar/usop/2026/usop-vietnam-halong-bay-2026" }],
  },
  {
    id: "vpl3-main", seriesSlug: "vpl-iii-2026", clubSlug: "vpl",
    name: "Main Event", gameType: "NLH", startDate: "2026-04-29", endDate: "2026-05-11",
    guarantee: 20_000_000_000,
    notes: ["具体日期未查到，显示为系列赛日期。"],
    sources: [{ label: "WikiPoker · VPL Hanoi 2026", url: "https://wikipoker.net/vpl-hanoi-2026-chinh-thuc-khoi-tranh/" }],
  },
  {
    id: "vpl3-championship", seriesSlug: "vpl-iii-2026", clubSlug: "vpl",
    name: "Championship Event", gameType: "NLH", startDate: "2026-04-29", endDate: "2026-05-11",
    guarantee: 15_000_000_000,
    notes: ["具体日期未查到，显示为系列赛日期。"],
    sources: [{ label: "WikiPoker · VPL Hanoi 2026", url: "https://wikipoker.net/vpl-hanoi-2026-chinh-thuc-khoi-tranh/" }],
  },
];

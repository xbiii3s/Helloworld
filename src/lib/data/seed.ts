import type { Series, Tournament } from "../types";

/**
 * 示例赛程。所有时间都相对“今天”生成，这样演示时总能看到
 * 进行中 / 即将开始 / 已结束的比赛。接入真实数据后删除此文件即可。
 */
const VN_OFFSET = "+07:00";

function at(base: string, dayOffset: number, hhmm: string): string {
  const d = new Date(`${base}T00:00:00${VN_OFFSET}`);
  d.setUTCDate(d.getUTCDate() + dayOffset);
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh" }).format(d);
  return new Date(`${ymd}T${hhmm}:00${VN_OFFSET}`).toISOString();
}

export function buildSeed(today: string): { series: Series[]; tournaments: Tournament[] } {
  const series: Series[] = [
    {
      slug: "srcs-2026-winter",
      name: "Saigon Royal Championship Series · 冬季站",
      shortName: "SRCS 冬季站",
      clubSlug: "saigon-royal",
      startDate: at(today, -2, "12:00"),
      endDate: at(today, 6, "23:00"),
      description: "为期 9 天、共 8 场赛事的系列赛，主赛事保底 50 亿越南盾。",
      totalGuarantee: 8_500_000_000,
      highlights: ["主赛事 Main Event 保底 50 亿 ₫", "多个 Flight，Day 1 可多次参赛", "系列赛积分榜（Player of the Series）"],
    },
    {
      slug: "hanoi-ace-festival-2026",
      name: "Hanoi Ace Poker Festival 2026",
      shortName: "Hanoi Ace Festival",
      clubSlug: "hanoi-ace",
      startDate: at(today, 10, "12:00"),
      endDate: at(today, 16, "23:00"),
      description: "北越年度盛会，NLH 与 PLO 双线，含 High Roller 与 Ladies Event。",
      totalGuarantee: 4_000_000_000,
      highlights: ["PLO Championship", "Ladies Event", "High Roller 1 亿 ₫ 买入"],
    },
  ];

  const T: Tournament[] = [
    // ---------- SRCS 冬季站 ----------
    {
      id: "srcs-e1", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 1,
      name: "Opening Event", gameType: "NLH", startTime: at(today, -2, "13:00"),
      buyIn: 2_500_000, fee: 500_000, guarantee: 300_000_000, startingStack: 30000,
      levelMinutes: 20, lateRegLevel: 10, reentry: "unlimited", expectedEntries: 214, status: "finished",
      results: [
        { place: 1, player: "Nguyễn Văn An", country: "VN", prize: 128_400_000 },
        { place: 2, player: "Lee Min-ho", country: "KR", prize: 82_900_000 },
        { place: 3, player: "Trần Minh Đức", country: "VN", prize: 58_800_000 },
        { place: 4, player: "Wang Lei", country: "CN", prize: 43_900_000 },
        { place: 5, player: "Phạm Thu Hà", country: "VN", prize: 34_200_000 },
      ],
    },
    {
      id: "srcs-e2", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 2,
      name: "PLO Bounty", gameType: "PLO", startTime: at(today, -1, "15:00"),
      buyIn: 4_000_000, fee: 700_000, guarantee: 200_000_000, startingStack: 40000,
      levelMinutes: 25, lateRegLevel: 9, reentry: 2, expectedEntries: 88, status: "finished",
      results: [
        { place: 1, player: "Hoàng Gia Bảo", country: "VN", prize: 99_700_000 },
        { place: 2, player: "Tanaka Hiroshi", country: "JP", prize: 63_100_000 },
        { place: 3, player: "Lê Quang Huy", country: "VN", prize: 43_200_000 },
      ],
    },
    {
      id: "srcs-me-1a", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 3,
      name: "Main Event", flight: "Day 1A", gameType: "NLH", startTime: at(today, 0, "12:00"),
      buyIn: 15_000_000, fee: 2_000_000, guarantee: 5_000_000_000, startingStack: 50000,
      levelMinutes: 40, lateRegLevel: 12, reentry: 1, expectedEntries: 186,
      notes: "Day 1 各 Flight 晋级选手带筹码进入 Day 2；同一 Flight 可重入 1 次。",
    },
    {
      id: "srcs-e4", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 4,
      name: "Turbo Deepstack", gameType: "NLH", startTime: at(today, 0, "17:00"),
      buyIn: 3_000_000, fee: 500_000, guarantee: 250_000_000, startingStack: 40000,
      levelMinutes: 15, lateRegLevel: 8, reentry: "unlimited", expectedEntries: 132,
    },
    {
      id: "srcs-me-1b", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 3,
      name: "Main Event", flight: "Day 1B", gameType: "NLH", startTime: at(today, 1, "12:00"),
      buyIn: 15_000_000, fee: 2_000_000, guarantee: 5_000_000_000, startingStack: 50000,
      levelMinutes: 40, lateRegLevel: 12, reentry: 1, expectedEntries: 240,
    },
    {
      id: "srcs-me-d2", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 3,
      name: "Main Event", flight: "Day 2", gameType: "NLH", startTime: at(today, 2, "13:00"),
      buyIn: 15_000_000, fee: 2_000_000, guarantee: 5_000_000_000, startingStack: 50000,
      levelMinutes: 60, lateRegLevel: 0, reentry: "freezeout", expectedEntries: 426,
    },
    {
      id: "srcs-hr", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 6,
      name: "High Roller", gameType: "NLH", startTime: at(today, 4, "14:00"),
      buyIn: 45_000_000, fee: 5_000_000, guarantee: 2_000_000_000, startingStack: 60000,
      levelMinutes: 40, lateRegLevel: 10, reentry: 1, expectedEntries: 58,
    },
    {
      id: "srcs-e8", clubSlug: "saigon-royal", seriesSlug: "srcs-2026-winter", eventNo: 8,
      name: "Closing Event", gameType: "NLH", startTime: at(today, 6, "13:00"),
      buyIn: 2_500_000, fee: 500_000, guarantee: 300_000_000, startingStack: 30000,
      levelMinutes: 20, lateRegLevel: 10, reentry: "unlimited", expectedEntries: 190,
    },

    // ---------- Saigon Royal 常规赛 ----------
    {
      id: "sr-daily-today", clubSlug: "saigon-royal", name: "Daily Deepstack 19:00", gameType: "NLH",
      startTime: at(today, 0, "19:00"), buyIn: 1_200_000, fee: 300_000, guarantee: 60_000_000,
      startingStack: 25000, levelMinutes: 20, lateRegLevel: 8, reentry: "unlimited", expectedEntries: 64,
    },
    {
      id: "sr-daily-tmr", clubSlug: "saigon-royal", name: "Daily Deepstack 19:00", gameType: "NLH",
      startTime: at(today, 1, "19:00"), buyIn: 1_200_000, fee: 300_000, guarantee: 60_000_000,
      startingStack: 25000, levelMinutes: 20, lateRegLevel: 8, reentry: "unlimited", expectedEntries: 60,
    },

    // ---------- Hanoi Ace ----------
    {
      id: "ha-weekly-plo", clubSlug: "hanoi-ace", name: "Weekly PLO Deepstack", gameType: "PLO",
      startTime: at(today, 0, "14:00"), buyIn: 2_000_000, fee: 400_000, guarantee: 100_000_000,
      startingStack: 30000, levelMinutes: 25, lateRegLevel: 9, reentry: 2, expectedEntries: 47,
    },
    {
      id: "ha-sunday", clubSlug: "hanoi-ace", name: "Weekly Major", gameType: "NLH",
      startTime: at(today, 3, "13:00"), buyIn: 5_000_000, fee: 800_000, guarantee: 400_000_000,
      startingStack: 40000, levelMinutes: 30, lateRegLevel: 10, reentry: 1, expectedEntries: 96,
    },
    {
      id: "haf-e1", clubSlug: "hanoi-ace", seriesSlug: "hanoi-ace-festival-2026", eventNo: 1,
      name: "Kick-off NLH", gameType: "NLH", startTime: at(today, 10, "13:00"),
      buyIn: 3_000_000, fee: 500_000, guarantee: 300_000_000, startingStack: 30000,
      levelMinutes: 20, lateRegLevel: 10, reentry: "unlimited", expectedEntries: 150,
    },
    {
      id: "haf-plo", clubSlug: "hanoi-ace", seriesSlug: "hanoi-ace-festival-2026", eventNo: 2,
      name: "PLO Championship", gameType: "PLO", startTime: at(today, 11, "14:00"),
      buyIn: 10_000_000, fee: 1_500_000, guarantee: 800_000_000, startingStack: 50000,
      levelMinutes: 30, lateRegLevel: 10, reentry: 1, expectedEntries: 90,
    },
    {
      id: "haf-ladies", clubSlug: "hanoi-ace", seriesSlug: "hanoi-ace-festival-2026", eventNo: 3,
      name: "Ladies Event", gameType: "NLH", startTime: at(today, 12, "15:00"),
      buyIn: 2_000_000, fee: 400_000, guarantee: 50_000_000, startingStack: 30000,
      levelMinutes: 20, lateRegLevel: 8, reentry: "freezeout", expectedEntries: 30,
    },
    {
      id: "haf-main", clubSlug: "hanoi-ace", seriesSlug: "hanoi-ace-festival-2026", eventNo: 5,
      name: "Main Event", flight: "Day 1", gameType: "NLH", startTime: at(today, 13, "12:00"),
      buyIn: 12_000_000, fee: 1_500_000, guarantee: 2_500_000_000, startingStack: 50000,
      levelMinutes: 40, lateRegLevel: 12, reentry: 1, expectedEntries: 260,
    },
    {
      id: "haf-hr", clubSlug: "hanoi-ace", seriesSlug: "hanoi-ace-festival-2026", eventNo: 6,
      name: "High Roller", gameType: "NLH", startTime: at(today, 15, "14:00"),
      buyIn: 90_000_000, fee: 10_000_000, guarantee: 1_500_000_000, startingStack: 60000,
      levelMinutes: 40, lateRegLevel: 10, reentry: 1, expectedEntries: 22,
    },

    // ---------- Da Nang Beach ----------
    {
      id: "dn-weekend", clubSlug: "danang-beach", name: "Weekend Deepstack", gameType: "NLH",
      startTime: at(today, 0, "15:00"), buyIn: 1_500_000, fee: 300_000, guarantee: 80_000_000,
      startingStack: 30000, levelMinutes: 20, lateRegLevel: 8, reentry: "unlimited", expectedEntries: 52,
    },
    {
      id: "dn-monthly-hr", clubSlug: "danang-beach", name: "Monthly High Roller", gameType: "NLH",
      startTime: at(today, 5, "16:00"), buyIn: 20_000_000, fee: 2_000_000, guarantee: 500_000_000,
      startingStack: 50000, levelMinutes: 30, lateRegLevel: 9, reentry: 1, expectedEntries: 26,
    },
  ];

  return { series, tournaments: T };
}

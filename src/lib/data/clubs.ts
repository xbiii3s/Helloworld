import type { Club } from "../types";

/**
 * 越南真实德州扑克俱乐部 / 赛事主办方。
 * 数据来自公开的赛事日历、扑克数据库和新闻（见每条 sources），最后核实：2026-11-02。
 * 电话、地址等不同来源有出入的，已在 warnings 中注明，请以俱乐部官方渠道为准。
 */
export const clubs: Club[] = [
  // ---------------- 河内 ----------------
  {
    slug: "royal-poker-club",
    name: "Royal Poker Club",
    kind: "club",
    city: "河内",
    address: "Tầng 2–4, Tòa nhà Home, 195 Khâm Thiên, Đống Đa, Hà Nội",
    phone: "+84 32 632 5686",
    email: "Royalpokerhn@gmail.com",
    website: "https://royal-poker.com",
    facebook: "https://www.facebook.com/p/RPT-Royal-Poker-Tour-61557629392903/",
    description: "河内老牌赛事俱乐部，Royal Poker Tour（RPT）系列赛的主场，2026 年已举办 RPT Championship III、IV，年底举办 RPT V Grand Final。",
    color: "#b91c1c",
    warnings: [
      "据《河内新报》(Hà Nội Mới) 报道，越南桥牌与扑克体育协会 (VBPA) 于 2026-04-10 发文（23/2026/VBPA-CV）终止了该俱乐部的组织会员资格，协会不再对其专业活动负责。",
    ],
    sources: [
      { label: "Hendon Mob · Royal Poker Club", url: "https://pokerdb.thehendonmob.com/venues/royal-poker-club-3893" },
      { label: "PokerDiscover · Royal Poker Club", url: "https://pokerdiscover.com/clubs/vietnam/hanoi/royal-poker-club" },
      { label: "SoMuchPoker · Royal Poker Club Hanoi", url: "https://somuchpoker.com/poker-guides/venue/royal-poker-club" },
      { label: "Hà Nội Mới · CLB poker không thuộc hệ thống Hiệp hội", url: "https://hanoimoi.vn/poker-va-nhung-van-de-con-bo-ngo-bai-2-clb-poker-khong-thuoc-he-thong-hiep-hoi-to-chuc-nao-se-quan-ly-va-giam-sat-hoat-dong-chuyen-mon-1160509.html" },
    ],
  },
  {
    slug: "grand-loyal",
    name: "Grand Loyal Poker Club",
    kind: "club",
    city: "河内",
    address: "146 Giảng Võ, Ba Đình, Hà Nội（Grand Vista 酒店内）",
    phone: "+84 24 3835 3388",
    website: "https://grandloyal.vn",
    description: "原 Loyal Poker Club，Grand Loyal Poker Championship（GLPC）主场，2026 年已举办 GLPC IV、V，11 月举办 GLPC VI。HSOP 早期也在此举办。",
    color: "#a16207",
    warnings: ["营业时间各来源不一致（24/7 与上午不营业两种说法），请先电话确认。"],
    sources: [
      { label: "grandloyal.vn 官网", url: "https://grandloyal.vn/" },
      { label: "PokerAtlas · Grand Loyal", url: "https://www.pokeratlas.com/poker-room/grand-loyal-poker-club" },
      { label: "Hendon Mob · Grand Loyal 系列赛", url: "https://pokerdb.thehendonmob.com/venues/grand-loyal-poker-club-3217/festivals" },
      { label: "PokerDiscover · Grand Loyal Club", url: "https://pokerdiscover.com/clubs/vietnam/hanoi/grand-loyal-club" },
    ],
  },
  {
    slug: "quads-hanoi",
    name: "Quads Hanoi Poker Club",
    kind: "club",
    city: "河内",
    address: "Tầng 2 – R6, Royal City, 72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
    phone: "+84 98 588 29 39",
    website: "https://quadspoker.vn",
    description: "2026 年在 Royal City 开业的新俱乐部，举办 Quads Poker Championship（QPC）系列：夏季站、秋季站与 10 月的 QPC Circuit。",
    color: "#7c3aed",
    sources: [
      { label: "quadspoker.vn 官网", url: "https://quadspoker.vn/" },
      { label: "Hendon Mob · Quads Hanoi", url: "https://pokerdb.thehendonmob.com/venues/quads-hanoi-poker-club-4741" },
      { label: "SoMuchPoker · Quads Poker Club Hanoi", url: "https://somuchpoker.com/poker-guides/venue/quads-hanoi-poker-club" },
      { label: "Life of Poker · Quads 开业报道", url: "https://www.lifeofpoker.com/news/2026/05/quads-poker-club-brings-a-fresh-new-poker-destination-to-hanois-royal-city" },
    ],
  },
  {
    slug: "vsop-poker-club",
    name: "VSOP Poker Club",
    kind: "club",
    city: "河内",
    address: "Tầng 6, Viet Tower, 1 Thái Hà, Đống Đa, Hà Nội",
    phone: "+84 33 365 9779",
    description: "位于栋多郡 Viet Tower 的俱乐部。暂未查到 2026 年的系列赛信息。",
    color: "#0f766e",
    sources: [{ label: "PokerDiscover · 河内俱乐部列表", url: "https://pokerdiscover.com/clubs/vietnam/hanoi" }],
  },
  {
    slug: "vpl",
    name: "Vietnam Poker League (VPL) / HSOP",
    kind: "organizer",
    city: "河内",
    address: "比赛场地：Grand Plaza Hotel Hanoi",
    website: "https://vietnampokerleague.com",
    facebook: "https://www.facebook.com/vietnampokerleagueVPL/",
    description: "赛事主办方。主办 VPL Vietnam Poker League 与 Hanoi Series of Poker（HSOP）系列，2026 年赛事主要在 Grand Plaza Hotel Hanoi 举行。",
    color: "#15803d",
    sources: [
      { label: "vietnampokerleague.com 官网", url: "https://vietnampokerleague.com" },
      { label: "VPL Facebook", url: "https://www.facebook.com/vietnampokerleagueVPL/" },
      { label: "HSOP Facebook", url: "https://www.facebook.com/HanoiSOPoker/" },
      { label: "SoMuchPoker · Hanoi Series of Poker", url: "https://somuchpoker.com/events-calendar/tour/hanoi-series-of-poker" },
    ],
  },

  // ---------------- 胡志明市 ----------------
  {
    slug: "pro-poker-club",
    name: "Pro Poker Club",
    kind: "club",
    city: "胡志明市",
    address: "Trương Định, Quận 3, TP. Hồ Chí Minh（门牌号待核实）",
    phone: "+84 93 185 16 61",
    description: "据报道是胡志明市第一家获准公开举办扑克比赛的场所，买入从约 100 万到 1 亿越南盾以上。",
    color: "#1d4ed8",
    warnings: [
      "门牌号来源不一致：72 / 147 / 149A Trương Định。",
      "PokerAtlas 显示目前没有在办的比赛；暂未查到 2026 年赛程。",
    ],
    sources: [
      { label: "PokerAtlas · Pro Poker Club", url: "https://www.pokeratlas.com/poker-room/pro-poker-club" },
      { label: "PokerDiscover · Pro Poker Club", url: "https://pokerdiscover.com/clubs/vietnam/ho-chi-minh-city/pro-poker-club" },
      { label: "SoMuchPoker · Pro Poker Club HCMC", url: "https://somuchpoker.com/poker-guides/venue/pro-poker-club-hcmc" },
    ],
  },
  {
    slug: "saigon-poker-club",
    name: "Saigon Poker Club",
    kind: "club",
    city: "胡志明市",
    address: "Nam Kỳ Khởi Nghĩa, Quận 3, TP. Hồ Chí Minh（门牌号待核实）",
    phone: "+84 88 900 64 64",
    description: "胡志明市赛事场地，曾承办 Vietnam Poker Games（VPG）与 APT Vietnam。",
    color: "#be123c",
    warnings: [
      "地址来源不一致：280 / 278 / 28 Nam Kỳ Khởi Nghĩa；电话另有 +84 93 525 2738 的说法。",
      "Hendon Mob 显示暂无即将举办的系列赛，最近一次记录为 2024 年 11 月。",
    ],
    sources: [
      { label: "Hendon Mob · Saigon Poker Club", url: "https://pokerdb.thehendonmob.com/venues/saigon-poker-club-3423" },
      { label: "PokerDiscover · Saigon Poker Club", url: "https://pokerdiscover.com/clubs/vietnam/ho-chi-minh-city/saigon-poker-club" },
      { label: "SoMuchPoker · Saigon Poker Club", url: "https://somuchpoker.com/poker-guides/venue/saigon-poker-club" },
    ],
  },

  // ---------------- 其他 ----------------
  {
    slug: "usop",
    name: "USOP Vietnam",
    kind: "organizer",
    city: "下龙湾",
    address: "InterContinental Halong Bay Resort",
    description: "国际巡回赛 USOP 的越南站，2026 年在下龙湾举办了两站。",
    color: "#0e7490",
    sources: [
      { label: "SoMuchPoker · USOP Vietnam HaLong Bay II 2026", url: "https://somuchpoker.com/events-calendar/usop/2026/usop-vietnam-series-2026" },
      { label: "SoMuchPoker · USOP Vietnam HaLong Bay 2026", url: "https://somuchpoker.com/events-calendar/usop/2026/usop-vietnam-halong-bay-2026" },
    ],
  },
];

import type { PayoutRule } from "./types";

/** 按参赛人数生成奖励结构（约 12-15% 进钱圈）。 */
export function payoutStructure(entries: number): PayoutRule[] {
  if (entries <= 20) return [{ places: [1, 1], percent: 50 }, { places: [2, 2], percent: 30 }, { places: [3, 3], percent: 20 }];
  if (entries <= 50)
    return [
      { places: [1, 1], percent: 36 }, { places: [2, 2], percent: 23 }, { places: [3, 3], percent: 15 },
      { places: [4, 4], percent: 11 }, { places: [5, 5], percent: 8.5 }, { places: [6, 6], percent: 6.5 },
    ];
  if (entries <= 120)
    return [
      { places: [1, 1], percent: 30 }, { places: [2, 2], percent: 19 }, { places: [3, 3], percent: 13 },
      { places: [4, 4], percent: 9.5 }, { places: [5, 5], percent: 7.5 }, { places: [6, 6], percent: 6 },
      { places: [7, 7], percent: 5 }, { places: [8, 8], percent: 4 }, { places: [9, 9], percent: 3 },
      { places: [10, 12], percent: 1 },
    ];
  return [
    { places: [1, 1], percent: 24 }, { places: [2, 2], percent: 15.5 }, { places: [3, 3], percent: 11 },
    { places: [4, 4], percent: 8.2 }, { places: [5, 5], percent: 6.4 }, { places: [6, 6], percent: 5 },
    { places: [7, 7], percent: 4 }, { places: [8, 8], percent: 3.2 }, { places: [9, 9], percent: 2.6 },
    { places: [10, 12], percent: 1.7 }, { places: [13, 18], percent: 1.3 }, { places: [19, 27], percent: 0.8 },
  ];
}

export function prizeForPlace(rules: PayoutRule[], pool: number, place: number): number {
  const r = rules.find((x) => place >= x.places[0] && place <= x.places[1]);
  return r ? (pool * r.percent) / 100 : 0;
}

export function paidPlaces(rules: PayoutRule[]): number {
  return rules[rules.length - 1].places[1];
}

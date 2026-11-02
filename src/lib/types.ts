/**
 * 核心数据模型。
 * 原则：只收录能查到来源的真实信息；查不到的字段留空，页面显示“待确认”，绝不编造。
 */

export type GameType = "NLH" | "PLO" | "PLO5" | "Mixed";
export type Status = "upcoming" | "running" | "finished";

export interface Source {
  label: string;
  url: string;
}

export interface Club {
  slug: string;
  name: string;
  kind: "club" | "organizer";
  city: "河内" | "胡志明市" | "下龙湾" | string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebook?: string;
  description: string;
  color: string;
  /** 需要用户注意的事项（来源矛盾、资质变动等） */
  warnings?: string[];
  sources: Source[];
}

export interface Series {
  slug: string;
  name: string;
  /** 主办俱乐部 / 组织方 */
  clubSlug: string;
  venue: string;
  startDate: string; // YYYY-MM-DD（越南时间）
  endDate: string;
  totalGuarantee?: number; // VND
  eventCount?: number;
  description: string;
  highlights: string[];
  notes?: string[];
  sources: Source[];
}

export interface Result {
  place: number;
  player: string;
  prize?: number;
}

export interface Tournament {
  id: string;
  seriesSlug?: string;
  clubSlug: string;
  eventNo?: number;
  name: string;
  gameType: GameType;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // 多日赛
  startTime?: string; // HH:mm
  /** 总买入（含服务费），VND */
  buyIn?: number;
  guarantee?: number;
  entries?: number;
  results?: Result[];
  notes?: string[];
  sources: Source[];
}

/** 比赛实况（由俱乐部/工作人员录入，或对接计时系统）。没有录入时为空。 */
export interface LiveSnapshot {
  tournamentId: string;
  updatedAt: string;
  level?: number;
  blinds?: string; // "2,000/4,000 (4,000)"
  entries?: number;
  playersLeft?: number;
  prizePool?: number;
  avgStack?: number;
  chipLeaders?: { player: string; chips: number }[];
  feed?: { time: string; text: string }[];
}

import type { LiveSnapshot } from "../types";

/**
 * 比赛实况快照。只放真实录入的数据（由俱乐部/现场工作人员提供）。
 * key 为 tournament id。为空时页面显示“实况未接入”，不会生成假数据。
 */
export const liveSnapshots: Record<string, LiveSnapshot> = {};

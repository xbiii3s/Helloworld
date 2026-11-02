import type { Club } from "../types";

// 示例俱乐部（虚构）。上线时替换为真实合作俱乐部信息。
export const clubs: Club[] = [
  {
    slug: "saigon-royal",
    name: "Saigon Royal Poker Club",
    localName: "CLB Poker Hoàng Gia Sài Gòn",
    city: "胡志明市",
    address: "Quận 1, TP. Hồ Chí Minh",
    description: "胡志明市第一郡的大型赛事俱乐部，每天 13:00 / 19:00 两场常规赛，每季度举办 SRCS 系列赛。",
    color: "#b91c1c",
    contact: { phone: "+84 28 0000 0001", zalo: "saigonroyal", telegram: "@saigonroyal" },
  },
  {
    slug: "hanoi-ace",
    name: "Hanoi Ace Poker Club",
    localName: "CLB Poker Ace Hà Nội",
    city: "河内",
    address: "Quận Tây Hồ, Hà Nội",
    description: "河内西湖区俱乐部，以深筹码结构和 PLO 比赛著称，每年举办 Hanoi Ace Poker Festival。",
    color: "#1d4ed8",
    contact: { phone: "+84 24 0000 0002", zalo: "hanoiace" },
  },
  {
    slug: "danang-beach",
    name: "Da Nang Beach Poker Club",
    localName: "CLB Poker Biển Đà Nẵng",
    city: "岘港",
    address: "Sơn Trà, Đà Nẵng",
    description: "海滨度假型俱乐部，周末 Deepstack 与月度 High Roller。",
    color: "#0e7490",
    contact: { telegram: "@danangbeachpoker", facebook: "danangbeachpoker" },
  },
];

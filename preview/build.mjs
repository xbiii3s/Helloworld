// 生成单文件手机预览页：node preview/build.mjs  →  preview/dist/vn-holdem-hub.html
// 数据直接取自 src/lib/data（先用 tsc 编译成 JS）。
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const out = "preview/.data";
execSync(`npx tsc src/lib/data/clubs.ts src/lib/data/series.ts src/lib/data/tournaments.ts --outDir ${out} --module commonjs --target es2020 --skipLibCheck`, { stdio: "inherit" });
const require = createRequire(import.meta.url);
const d = `../${out}/data/`;
const data = {
  clubs: require(d + "clubs.js").clubs,
  series: require(d + "series.js").series,
  tournaments: require(d + "tournaments.js").tournaments,
};
const html = readFileSync("preview/template.html", "utf8").replace("__DATA__", JSON.stringify(data).replace(/</g, "\\u003c"));
mkdirSync("preview/dist", { recursive: true });
writeFileSync("preview/dist/vn-holdem-hub.html", html);
console.log("preview/dist/vn-holdem-hub.html");

/* 批量重构：9 个结构同构的 ScreenPage → BigScreen + MetricGrid
 * 用法：node scripts/refactor-isomorphic-pages.cjs
 */
const fs = require("fs");
const path = require("path");

const DIRS = [
  "Ganzhou",
  "Fengxin",
  "XinjianEco",
  "XinjianExp",
  "Shanggao",
  "Pingshan",
  "Yongxin",
  "Xiaofuchaye",
  "Mjy",
];

/** 去掉单行 HTML 注释，避免注释里的 <div> 干扰层级统计 */
const clean = (line) => line.replace(/<!--[\s\S]*?-->/g, "");

/** 从 openIdx 开始，返回"闭合本层 div"的那一行下标 */
function blockEnd(lines, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < lines.length; i++) {
    const l = clean(lines[i]);
    const opens = (l.match(/<div\b/g) || []).length;
    const closes = (l.match(/<\/div>/g) || []).length;
    depth += opens - closes;
    if (depth <= 0) return i;
  }
  return -1;
}

/** 解析一个 .current-wrap 块里的 10 个指标 */
function parseItems(blockText) {
  const lines = blockText.split("\n");
  const items = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/class="wrap-item"/.test(lines[i])) continue;
    const end = blockEnd(lines, i);
    if (end < 0) continue;
    const chunk = lines.slice(i, end + 1).join("\n");

    const icon = (chunk.match(/<img[^>]+src="([^"]+)"/) || [])[1] || "";
    const expr = ((chunk.match(/\{\{([\s\S]*?)\}\}/) || [])[1] || "").trim();
    const label = ((chunk.match(/class="text-h2">([\s\S]*?)<\/div>/) || [])[1] || "")
      .replace(/<[^>]+>/g, "")
      .trim();
    const h1 = (chunk.match(/class="text-h1">([\s\S]*?)<\/div>/) || [])[1] || "";
    const unit = h1
      .replace(/<b[\s\S]*?<\/b\s*>/g, "")
      .replace(/\{\{[\s\S]*?\}\}/g, "")
      .replace(/<[^>]+>/g, "")
      .trim();

    if (icon && expr && label) items.push({ icon, expr, unit, label });
  }
  return items;
}

/** 文件名 → 变量名：PM2.5.png → pm25Icon */
function iconIdent(src) {
  const base = path.basename(src, path.extname(src));
  return base.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + "Icon";
}

let ok = 0;
const skipped = [];

for (const dir of DIRS) {
  const F = path.join("src/views", dir, "ScreenPage.vue");
  let text = fs.readFileSync(F, "utf8");

  if (text.includes("<BigScreen")) {
    skipped.push(dir + "（已重构）");
    continue;
  }

  let lines = text.split("\n");

  // ---------- ① 标题 ----------
  const titleRaw = (text.match(/<div class="title">([\s\S]*?)<\/div>/) || [])[1] || "";
  const title = titleRaw.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

  // 捕获 page-top 上的内联样式（个别页面用它调整标题栏高度）
  const topTag = (text.match(/<div class="page-top"[^>]*>/) || [])[0] || "";
  const styleStr = (topTag.match(/style="([^"]*)"/) || [])[1] || "";
  const styleObj = styleStr
    ? "{" + styleStr.split(";").filter(Boolean).map((s) => {
        const [k, v] = s.split(":");
        return `${k.trim().replace(/-([a-z])/g, (m, x) => x.toUpperCase())}: '${(v || "").trim()}'`;
      }).join(", ") + "}"
    : "";
  const topStyleAttr = styleObj ? ` :top-style="${styleObj}"` : "";

  // ---------- ② 替换指标块 ----------
  const iMetric = lines.findIndex((l) => /<div class="current-wrap border">/.test(l));
  if (iMetric < 0) {
    skipped.push(dir + "（无指标块）");
    continue;
  }
  const eMetric = blockEnd(lines, iMetric);
  const metricBlock = lines.slice(iMetric, eMetric + 1).join("\n");
  const items = parseItems(metricBlock);
  if (items.length < 6) {
    skipped.push(`${dir}（只解析到 ${items.length} 个指标）`);
    continue;
  }
  lines.splice(iMetric, eMetric - iMetric + 1, '          <MetricGrid :items="metrics" />');

  // ---------- ③ 切分六大区域 ----------
  const find = (re, from = 0) => {
    for (let i = from; i < lines.length; i++) if (re.test(lines[i])) return i;
    return -1;
  };
  const iT = find(/^<template>$/);
  const iEndT = find(/^<\/template>$/, iT + 1);
  const iLeft = find(/class="left"/, iT);
  const iCenter = find(/class="center"/, iLeft);
  const iRight = find(/class="right"/, iCenter);
  const iBottom = find(/class="page-bottom"/, iRight);
  const iBL = find(/class="bottom-left"/, iBottom);
  const iBC = find(/class="bottom-center"/, iBL);
  const iBR = find(/class="bottom-right"/, iBC);

  if ([iT, iEndT, iLeft, iCenter, iRight, iBottom, iBL, iBC, iBR].some((x) => x < 0)) {
    skipped.push(dir + "（结构标记不全）");
    continue;
  }

  const content = (openIdx) => lines.slice(openIdx + 1, blockEnd(lines, openIdx)).join("\n");

  const newTemplate = `<template>
  <BigScreen title="${title}"${topStyleAttr}>
    <template #left>
${content(iLeft)}
    </template>

    <template #center>
${content(iCenter)}
    </template>

    <template #right>
${content(iRight)}
    </template>

    <template #bottom-left>
${content(iBL)}
    </template>

    <template #bottom-center>
${content(iBC)}
    </template>

    <template #bottom-right>
${content(iBR)}
    </template>
  </BigScreen>
</template>`;

  text = lines.slice(0, iT).join("\n") + "\n" + newTemplate + "\n" + lines.slice(iEndT + 1).join("\n");

  // ---------- ④ script：imports ----------
  const icons = [...new Set(items.map((it) => it.icon))];
  const iconImports = icons
    .map((src) => `import ${iconIdent(src)} from "${src}";`)
    .join("\n");

  const importLines = text.split("\n");
  let lastImport = -1;
  importLines.forEach((l, i) => {
    if (/^import\s.+from\s+["'].+["'];?\s*$/.test(l)) lastImport = i;
  });
  importLines.splice(
    lastImport + 1,
    0,
    'import BigScreen from "../../components/layout/BigScreen.vue";',
    'import MetricGrid from "../../components/layout/MetricGrid.vue";',
    iconImports
  );
  text = importLines.join("\n");

  // ---------- ⑤ script：components ----------
  text = text.replace(/components:\s*\{\n/, (m) => `${m}    BigScreen,\n    MetricGrid,\n`);

  // ---------- ⑥ script：computed.metrics ----------
  const metricsArr = items
    .map(
      (it) =>
        `      { icon: ${iconIdent(it.icon)}, value: this.${it.expr}, unit: ${JSON.stringify(
          it.unit
        )}, label: ${JSON.stringify(it.label)} },`
    )
    .join("\n");
  const computedBlock = `  computed: {
    // 实时指标：配置化，模板里只留一行 <MetricGrid :items="metrics" />
    metrics() {
      return [
${metricsArr}
      ];
    },
  },
  methods: {`;
  text = text.replace(/^  methods: \{/m, computedBlock);

  fs.writeFileSync(F, text, "utf8");
  ok++;
  console.log(`${dir}: ${items.length} 个指标, 模板 ${(text.split("\n").findIndex((l) => l === "</template>") + 1)} 行`);
}

console.log(`\n完成 ${ok} 个，跳过 ${skipped.length} 个`);
if (skipped.length) console.log("跳过：", skipped.join("、"));

// 用法：node scripts/refactor-jgs-to-bigscreen.cjs（把井冈山页改成 BigScreen + MetricGrid 结构）
/* 一次性重构脚本：把 JgMountain/ScreenPage.vue 改成 BigScreen + MetricGrid 结构 */
const fs = require("fs");

const F = require("path").join(__dirname, "..", "src/views/JgMountain/ScreenPage.vue");
let text = fs.readFileSync(F, "utf8");
let lines = text.split("\n");

const find = (re, from = 0) => {
  for (let i = from; i < lines.length; i++) if (re.test(lines[i])) return i;
  return -1;
};

// ---------- ① 把 10 个手写指标块换成 <MetricGrid> ----------
const iMetricStart = find(/<div class="current-wrap border">/);
let iMetricEnd = -1;
for (let i = iMetricStart + 1; i < lines.length; i++) {
  if (/^ {10}<\/div>\s*$/.test(lines[i])) {
    iMetricEnd = i;
    break;
  }
}
if (iMetricStart < 0 || iMetricEnd < 0) throw new Error("找不到指标块边界");
lines.splice(iMetricStart, iMetricEnd - iMetricStart + 1, '          <MetricGrid :items="metrics" />');

// ---------- ② 按标记切出各区域内容 ----------
const iTemplate = find(/^<template>$/);
const iEndTemplate = find(/^<\/template>$/, iTemplate);
const iLeftOpen = find(/^ {6}<div class="left">$/, iTemplate);
const iCenterOpen = find(/<div class="center" style="position: relative">/, iLeftOpen);
const iRightOpen = find(/^ {6}<div class="right">$/, iCenterOpen);
const iBottomOpen = find(/^ {4}<div class="page-bottom">$/, iRightOpen);
const iBL = find(/^ {6}<div class="bottom-left">$/, iBottomOpen);
const iBC = find(/^ {6}<div class="bottom-center">$/, iBL);
const iBR = find(/^ {6}<div class="bottom-right">$/, iBC);
const iPbClose = find(/^ {4}<\/div>$/, iBR);

const idxs = { iTemplate, iEndTemplate, iLeftOpen, iCenterOpen, iRightOpen, iBottomOpen, iBL, iBC, iBR, iPbClose };
for (const [k, v] of Object.entries(idxs)) if (v < 0) throw new Error("标记未找到: " + k);

const slice = (a, b) => lines.slice(a, b + 1).join("\n");
const left = slice(iLeftOpen + 1, iCenterOpen - 2);
const center = slice(iCenterOpen + 1, iRightOpen - 2);
const right = slice(iRightOpen + 1, iBottomOpen - 3);
const bottomLeft = slice(iBL + 1, iBC - 2);
const bottomCenter = slice(iBC + 1, iBR - 2);
const bottomRight = slice(iBR + 1, iPbClose - 2);

// ---------- ③ 组装新模板 ----------
const newTemplate = `<template>
  <BigScreen title="井冈山黄桃种植可视化大屏">
    <template #left>
${left}
    </template>

    <template #center>
${center}
    </template>

    <template #right>
${right}
    </template>

    <template #bottom-left>
${bottomLeft}
    </template>

    <template #bottom-center>
${bottomCenter}
    </template>

    <template #bottom-right>
${bottomRight}
    </template>
  </BigScreen>
</template>`;

const head = lines.slice(0, iTemplate).join("\n");
const tail = lines.slice(iEndTemplate + 1).join("\n");
text = (head ? head + "\n" : "") + newTemplate + "\n" + tail;

// ---------- ④ script：补 import / 组件注册 / metrics 计算属性 ----------
const iconImports = [
  ["waterIcon", "water.png"],
  ["conductIcon", "conduct.png"],
  ["co2Icon", "co2.png"],
  ["pm25Icon", "PM2.5.png"],
  ["pm10Icon", "PM10.png"],
  ["soiltemIcon", "soiltem.png"],
  ["soilhumIcon", "soilhum.png"],
  ["airtemIcon", "airtem.png"],
  ["airhumIcon", "airhum.png"],
  ["sunradioIcon", "sunradio.png"],
]
  .map(([name, file]) => `import ${name} from "../../assets/images/${file}";`)
  .join("\n");

text = text.replace(
  'import SunBar from "../../components/large-cpns/SunBar.vue";',
  `import SunBar from "../../components/large-cpns/SunBar.vue";
import BigScreen from "../../components/layout/BigScreen.vue";
import MetricGrid from "../../components/layout/MetricGrid.vue";
${iconImports}`
);

text = text.replace(
  /components: \{\s*\n(\s*)TemCurve,/,
  (m, pad) => `components: {\n${pad}BigScreen,\n${pad}MetricGrid,\n${pad}TemCurve,`
);

const metricsBlock = `  computed: {
    // 实时指标改成"配置数组"，模板里只留一行 <MetricGrid :items="metrics" />
    metrics() {
      return [
        { icon: waterIcon, value: this.allRainfall, unit: "mm", label: "总雨量" },
        { icon: conductIcon, value: this.soilConduct, unit: "us/cm", label: "土壤电导率" },
        { icon: co2Icon, value: this.co2Data, unit: "ppm", label: "CO2浓度" },
        { icon: pm25Icon, value: this.pm_25, unit: "μg/m3", label: "PM2.5" },
        { icon: pm10Icon, value: this.pm_10, unit: "μg/m3", label: "PM10" },
        { icon: soiltemIcon, value: this.real_soilTemData, unit: "℃", label: "土壤温度" },
        { icon: soilhumIcon, value: this.real_soilHumData, unit: "%rh", label: "土壤湿度" },
        { icon: airtemIcon, value: this.real_airTemData, unit: "℃", label: "空气温度" },
        { icon: airhumIcon, value: this.real_airHumData, unit: "%rh", label: "空气湿度" },
        { icon: sunradioIcon, value: this.real_sunData, unit: "W/(㎡)", label: "太阳辐射" },
      ];
    },
  },
  methods: {`;

// 在 methods 前插入 computed（原文件是 methods 直接跟在 data() 后面）
text = text.replace(/^  methods: \{/m, metricsBlock);

fs.writeFileSync(F, text, "utf8");

const after = text.split("\n");
console.log("模板行数:", after.findIndex((l) => l === "</template>") + 1, "/ 总行数:", after.length);
console.log("含 BigScreen:", /<BigScreen/.test(text), "含 MetricGrid:", /<MetricGrid/.test(text));
console.log("metrics computed:", /metrics\(\) \{/.test(text));

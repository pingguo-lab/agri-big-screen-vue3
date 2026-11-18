// 用法：node scripts/migrate-vue3.cjs（在项目根目录执行）
/* eslint-disable */
// Vue2 → Vue3 批量语法转换脚本（一次性工具，不参与构建）
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "src");
const SKIP_DIRS = ["compat"];
const SKIP_FILES = ["main.js", "router/index.js", "store/store.js"];

const stats = {};

function bump(k, n = 1) {
  stats[k] = (stats[k] || 0) + n;
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).split(path.sep).join("/");
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.includes(name)) continue;
      walk(full);
      continue;
    }
    if (!/\.(vue|js)$/.test(name)) continue;
    if (SKIP_FILES.includes(rel)) continue;
    convert(full, rel);
  }
}

function convert(file, rel) {
  let code = fs.readFileSync(file, "utf8");
  const before = code;

  // 1. 生命周期改名
  code = code.replace(/\bbeforeDestroy\b/g, () => (bump("beforeDestroy→beforeUnmount"), "beforeUnmount"));

  // 2. 移除 swiper 的具名插槽属性（兼容组件用 class 识别，不需要 slot）
  code = code.replace(/\s+slot="button-(prev|next)"/g, () => (bump("移除 slot=button-*"), ""));

  // 3. .sync → v-model（el-dialog 的 visible）
  code = code.replace(/:visible\.sync=/g, () => (bump(".sync→v-model"), "v-model="));
  code = code.replace(/:([a-zA-Z0-9_-]+)\.sync=/g, (m, p) => (bump(".sync→v-model:prop"), `v-model:${p}=`));

  // 4. Vue 2 专用库换成本地兼容层
  code = code.replace(/from\s+["']vue-awesome-swiper["']/g, () => (bump("swiper 兼容层"), 'from "@/compat/swiper"'));
  code = code.replace(/from\s+["']@jiaminghi\/data-view["']/g, () => (bump("data-view 兼容层"), 'from "@/compat/data-view"'));
  code = code.replace(/from\s+["']vue-seamless-scroll["']/g, () => (bump("seamless-scroll 兼容层"), 'from "@/compat/seamless-scroll"'));
  code = code.replace(/from\s+["']element-ui["']/g, () => (bump("element-ui→element-plus"), 'from "element-plus"'));
  code = code.replace(/["']element-ui\/lib\/theme-chalk\/index\.css["']/g, () => (bump("element-ui css"), '"element-plus/dist/index.css"'));

  // 5. 干掉 Vue.use(...) 的逐行调用（兼容层已在 main.js 全局注册）
  code = code.replace(/^[ \t]*Vue\.use\([^\n]*?\)[ \t]*;?[ \t]*\r?\n/gm, () => (bump("移除 Vue.use(...)"), ""));

  // 6. 干掉 vue-animate-number 的 import（模板里并未使用）
  code = code.replace(/^[ \t]*import\s+VueAnimateNumber\s+from\s+["']vue-animate-number["'][ \t]*;?[ \t]*\r?\n/gm, () => (bump("移除 animate-number"), ""));

  // 7. <template slot="header"> → <template #header>
  code = code.replace(/<template\s+slot="([a-z-]+)"\s*>/g, (m, n) => (bump("template slot→#slot"), `<template #${n}>`));

  if (code !== before) {
    fs.writeFileSync(file, code, "utf8");
    bump("改动文件数");
  }
}

walk(ROOT);

console.log("=== 转换统计 ===");
for (const [k, v] of Object.entries(stats)) console.log(`${k}: ${v}`);

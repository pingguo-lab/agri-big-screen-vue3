/**
 * data-view 兼容层（Vue 3）
 *
 * 原来的 @jiaminghi/data-view 只支持 Vue 2。这里改用社区维护的 Vue 3 移植版
 * @kjgl77/datav-vue3 —— 组件名、props 与原库一致，因此页面模板无需改动，
 * 边框流光、滚动榜等视觉效果都能恢复。
 *
 * 对上层暴露两套名字：
 *   - 驼峰：borderBox1 / decoration5 / scrollBoard（业务代码 import 用）
 *   - 短横线：dv-border-box-1 / dv-decoration-5 / dv-scroll-board（模板里用）
 */
import {
  BorderBox1,
  BorderBox8,
  BorderBox10,
  BorderBox11,
  BorderBox12,
  BorderBox13,
  Decoration5,
} from "@kjgl77/datav-vue3";
import "@kjgl77/datav-vue3/dist/style.css";
import { computed, h, ref, onMounted, onBeforeUnmount } from "vue";

/**
 * 自研滚动表 / 滚动榜
 * 说明：datav-vue3 的 scroll-board 与原库行为差异较大（行高撑满、表头错位），
 * 这里按原库的视觉规格自己实现一份，配置字段保持一致：
 *   { header, data, headerBGC, oddRowBGC, evenRowBGC, headerHeight, rowHeight, rowNum, waitTime, align }
 */
const ScrollBoard = {
  name: "ScrollBoardCompat",
  props: { config: { type: Object, default: () => ({}) } },
  setup(props) {
    const offset = ref(0);
    let timer = null;

    const cfg = computed(() => ({
      headerHeight: 30,
      rowHeight: 30,
      rowNum: 5,
      waitTime: 2000,
      headerBGC: "rgba(0,130,255,0.35)",
      oddRowBGC: "rgba(0,130,255,0.12)",
      evenRowBGC: "transparent",
      ...(props.config || {}),
    }));

    const rows = computed(() => (cfg.value.data || []).map((r) => (Array.isArray(r) ? r : [r])));
    const visible = computed(() => {
      const n = cfg.value.rowNum || 5;
      if (rows.value.length <= n) return rows.value;
      return Array.from({ length: n }, (_, i) => rows.value[(offset.value + i) % rows.value.length]);
    });

    onMounted(() => {
      timer = setInterval(() => {
        if (rows.value.length > (cfg.value.rowNum || 5)) {
          offset.value = (offset.value + 1) % rows.value.length;
        }
      }, cfg.value.waitTime || 2000);
    });
    onBeforeUnmount(() => timer && clearInterval(timer));

    const cell = (text, i) =>
      h(
        "span",
        { key: i, style: { flex: 1, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" } },
        String(text == null ? "" : text)
      );

    return () =>
      h(
        "div",
        { style: { width: "100%", height: "100%", overflow: "hidden", fontSize: "12px", color: "#fff" } },
        [
          cfg.value.header
            ? h(
                "div",
                {
                  key: "h",
                  style: {
                    display: "flex",
                    height: cfg.value.headerHeight + "px",
                    lineHeight: cfg.value.headerHeight + "px",
                    background: cfg.value.headerBGC,
                    fontWeight: "bold",
                  },
                },
                cfg.value.header.map(cell)
              )
            : null,
          ...visible.value.map((row, ri) =>
            h(
              "div",
              {
                key: "r" + ri,
                style: {
                  display: "flex",
                  height: cfg.value.rowHeight + "px",
                  lineHeight: cfg.value.rowHeight + "px",
                  background: ri % 2 ? cfg.value.evenRowBGC : cfg.value.oddRowBGC,
                },
              },
              row.map(cell)
            )
          ),
        ]
      );
  },
};

const ScrollRankingBoard = {
  name: "ScrollRankingBoardCompat",
  props: { config: { type: Object, default: () => ({}) } },
  setup(props) {
    const cfg = computed(() => ({ rowHeight: 30, rowNum: 5, unit: "", ...(props.config || {}) }));
    const rows = computed(() => cfg.value.data || []);
    return () =>
      h(
        "div",
        { style: { width: "100%", height: "100%", overflow: "hidden", fontSize: "12px", color: "#fff" } },
        rows.value.slice(0, cfg.value.rowNum).map((item, i) =>
          h(
            "div",
            {
              key: i,
              style: {
                display: "flex",
                justifyContent: "space-between",
                height: cfg.value.rowHeight + "px",
                lineHeight: cfg.value.rowHeight + "px",
                padding: "0 8px",
                background: i % 2 ? "transparent" : "rgba(0,130,255,0.12)",
              },
            },
            [
              h("span", { style: { color: "#00d8ff" } }, String(item.name == null ? "" : item.name)),
              h("span", {}, String(item.value == null ? "" : item.value) + (cfg.value.unit || "")),
            ]
          )
        )
      );
  },
};

// ---- 驼峰导出（兼容原项目 import { borderBox8 } 的写法）----
export const borderBox1 = BorderBox1;
export const borderBox8 = BorderBox8;
export const borderBox10 = BorderBox10;
export const borderBox11 = BorderBox11;
export const borderBox12 = BorderBox12;
export const borderBox13 = BorderBox13;
export const decoration5 = Decoration5;
export const scrollBoard = ScrollBoard;
export const scrollRankingBoard = ScrollRankingBoard;

const registry = [
  ["dv-border-box-1", BorderBox1],
  ["dv-border-box-8", BorderBox8],
  ["dv-border-box-10", BorderBox10],
  ["dv-border-box-11", BorderBox11],
  ["dv-border-box-12", BorderBox12],
  ["dv-border-box-13", BorderBox13],
  ["dv-decoration-5", Decoration5],
  ["dv-scroll-board", scrollBoard],
  ["dv-scroll-ranking-board", scrollRankingBoard],
  // 兼容 components: { borderBox8 } 这种局部注册的写法
  ["borderBox1", BorderBox1],
  ["borderBox8", BorderBox8],
  ["borderBox10", BorderBox10],
  ["borderBox11", BorderBox11],
  ["borderBox12", BorderBox12],
  ["borderBox13", BorderBox13],
  ["decoration5", Decoration5],
  ["scrollBoard", ScrollBoard],
  ["scrollRankingBoard", ScrollRankingBoard],
];

export default {
  install(app) {
    registry.forEach(([name, comp]) => app.component(name, comp));
  },
};

import { defineComponent, h } from "vue";

/**
 * @jiaminghi/data-view 是 Vue 2 专用库，Vue 3 无法使用。
 * 这里提供"占位实现"：保留组件名与插槽，视觉上用简洁描边代替原来的科技感边框。
 * 想恢复视觉效果，可以换成 Vue 3 版的大屏组件库（如 @kjgl77/datav-vue3）。
 */
const boxStyle = {
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  position: "relative",
  border: "1px solid rgba(0, 191, 255, 0.35)",
  boxShadow: "inset 0 0 12px rgba(0, 191, 255, 0.15)",
};

function makeBox(name) {
  return defineComponent({
    name,
    setup(_, { slots }) {
      return () => h("div", { class: "dv-compat-box", style: boxStyle }, slots.default ? slots.default() : []);
    },
  });
}

export const borderBox1 = makeBox("borderBox1");
export const borderBox8 = makeBox("borderBox8");
export const borderBox10 = makeBox("borderBox10");
export const borderBox11 = makeBox("borderBox11");
export const borderBox12 = makeBox("borderBox12");
export const borderBox13 = makeBox("borderBox13");

export const decoration5 = defineComponent({
  name: "decoration5",
  setup(_, { slots }) {
    return () =>
      h(
        "div",
        {
          class: "dv-compat-decoration",
          style: { width: "100%", height: "100%", background: "rgba(0,191,255,0.12)", overflow: "hidden" },
        },
        slots.default ? slots.default() : []
      );
  },
});

const listStyle = { width: "100%", height: "100%", overflow: "hidden", color: "#fff", fontSize: "12px" };

export const scrollBoard = defineComponent({
  name: "scrollBoard",
  props: {
    config: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) },
  },
  setup(props) {
    const rows = (cfg) => {
      if (!cfg) return [];
      if (Array.isArray(cfg.data)) return cfg.data;
      return [];
    };
    return () => {
      const cfg = props.config || props.option || {};
      const data = rows(cfg);
      return h(
        "div",
        { class: "dv-compat-scroll-board", style: listStyle },
        data.map((row, i) =>
          h(
            "div",
            {
              key: i,
              style: {
                display: "flex",
                lineHeight: "24px",
                borderBottom: "1px solid rgba(0,191,255,0.15)",
              },
            },
            (Array.isArray(row) ? row : [row]).map((cell, j) =>
              h("span", { key: j, style: { flex: 1, textAlign: "center", color: cfg.color || "#00d8ff" } }, String(cell))
            )
          )
        )
      );
    };
  },
});

export const scrollRankingBoard = defineComponent({
  name: "scrollRankingBoard",
  props: {
    config: { type: Object, default: () => ({}) },
    option: { type: Object, default: () => ({}) },
  },
  setup(props) {
    return () => {
      const cfg = props.config || props.option || {};
      const data = Array.isArray(cfg.data) ? cfg.data : [];
      return h(
        "div",
        { class: "dv-compat-ranking", style: listStyle },
        data.map((item, i) =>
          h(
            "div",
            {
              key: i,
              style: {
                display: "flex",
                justifyContent: "space-between",
                lineHeight: "24px",
                borderBottom: "1px solid rgba(0,191,255,0.15)",
                padding: "0 6px",
              },
            },
            [
              h("span", { style: { color: "#00d8ff" } }, String(item.name ?? item.label ?? "")),
              h("span", {}, String(item.value ?? "")),
            ]
          )
        )
      );
    };
  },
});

export default {
  install(app) {
    app.component("dv-border-box-1", borderBox1);
    app.component("dv-border-box-8", borderBox8);
    app.component("dv-border-box-10", borderBox10);
    app.component("dv-border-box-11", borderBox11);
    app.component("dv-border-box-12", borderBox12);
    app.component("dv-border-box-13", borderBox13);
    app.component("dv-decoration-5", decoration5);
    app.component("dv-scroll-board", scrollBoard);
    app.component("dv-scroll-ranking-board", scrollRankingBoard);

    // 兼容以驼峰组件名注册的写法（components: { borderBox8 }）
    app.component("borderBox1", borderBox1);
    app.component("borderBox8", borderBox8);
    app.component("borderBox10", borderBox10);
    app.component("borderBox11", borderBox11);
    app.component("borderBox12", borderBox12);
    app.component("borderBox13", borderBox13);
    app.component("decoration5", decoration5);
    app.component("scrollBoard", scrollBoard);
    app.component("scrollRankingBoard", scrollRankingBoard);
  },
};

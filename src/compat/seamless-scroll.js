import { defineComponent, h } from "vue";

/**
 * vue-seamless-scroll 只支持 Vue 2。
 * 这里退化成一个"可滚动容器"，保留插槽内容，去掉滚动动画。
 */
export default defineComponent({
  name: "vueSeamlessScroll",
  props: {
    data: { type: Array, default: () => [] },
    classOption: { type: Object, default: () => ({}) },
    limitMoveNum: { type: Number, default: 5 },
    hover: { type: Boolean, default: false },
  },
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        {
          ...attrs,
          class: ["seamless-scroll-compat", attrs.class],
          style: [{ width: "100%", height: "100%", overflow: "hidden" }, attrs.style],
        },
        slots.default ? slots.default() : []
      );
  },
});

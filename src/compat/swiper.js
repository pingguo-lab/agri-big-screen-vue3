import { defineComponent, h, onMounted, onBeforeUnmount, ref, nextTick } from "vue";

/**
 * vue-awesome-swiper 只支持 Vue 2。
 * 这里实现一个"够用就好"的兼容轮播：
 *  - 支持 <swiper :options="swiperOption"> 的 options 写法
 *  - 支持 autoplay.delay / loop
 *  - 支持点击 .swiper-button-prev / .swiper-button-next 切换
 *  - 幻灯片用绝对定位叠放，通过 display 控制显隐
 */
export const swiperSlide = defineComponent({
  name: "swiperSlide",
  setup(_, { slots, attrs }) {
    return () =>
      h(
        "div",
        { ...attrs, class: ["swiper-slide", attrs.class], style: attrs.style },
        slots.default ? slots.default() : []
      );
  },
});

export const swiper = defineComponent({
  name: "swiper",
  props: {
    options: { type: Object, default: () => ({}) },
    modules: { type: Array, default: () => [] },
  },
  setup(props, { slots, attrs }) {
    const root = ref(null);
    let index = 0;
    let timer = null;
    let slides = [];

    const collect = () => {
      const el = root.value;
      if (!el) return;
      slides = Array.from(el.children).filter((c) => c.classList && c.classList.contains("swiper-slide"));
    };

    const paint = () => {
      slides.forEach((s, i) => {
        s.style.position = "absolute";
        s.style.left = "0";
        s.style.top = "0";
        s.style.width = "100%";
        s.style.height = "100%";
        s.style.display = i === index ? "" : "none";
      });
      // 分页小圆点（如果模板里提供了）
      const dots = root.value ? root.value.querySelectorAll(".swiper-pagination-bullet") : [];
      dots.forEach((d, i) => {
        d.classList.toggle("swiper-pagination-bullet-active", i === index);
      });
    };

    const go = (n) => {
      if (!slides.length) return;
      const loop = props.options && props.options.loop;
      if (n < 0) index = loop ? slides.length - 1 : 0;
      else if (n >= slides.length) index = loop ? 0 : slides.length - 1;
      else index = n;
      paint();
    };

    const delay = () => {
      const a = props.options && props.options.autoplay;
      if (!a) return 0;
      if (typeof a === "object") return a.delay || 3000;
      return 3000;
    };

    const start = () => {
      const d = delay();
      if (!d) return;
      stop();
      timer = setInterval(() => go(index + 1), d);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const onClick = (e) => {
      const t = e.target;
      if (t.closest && t.closest(".swiper-button-prev")) {
        go(index - 1);
        start();
        return;
      }
      if (t.closest && t.closest(".swiper-button-next")) {
        go(index + 1);
        start();
      }
    };

    onMounted(async () => {
      await nextTick();
      collect();
      paint();
      start();
    });

    onBeforeUnmount(stop);

    return () =>
      h(
        "div",
        {
          ref: root,
          ...attrs,
          class: ["swiper-compat", attrs.class],
          style: [{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }, attrs.style],
          onClick,
        },
        slots.default ? slots.default() : []
      );
  },
});

export const directive = {};
export const Swiper = swiper;
export const SwiperSlide = swiperSlide;

export default {
  install(app) {
    app.component("swiper", swiper);
    app.component("swiper-slide", swiperSlide);
    app.component("Swiper", swiper);
    app.component("SwiperSlide", swiperSlide);
    app.config.globalProperties.$swiper = {};
  },
};

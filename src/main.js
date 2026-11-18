import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

// 第三方
import * as echarts from "echarts";
import axios from "axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css"; // Vue 2 是 element-ui/lib/theme-chalk/index.css

// 本地工具
import { postRequest, getRequest } from "./utils/request.js";
import { average, pushData, getBarTime } from "./utils/average.js";

// 副作用引入：chalk.js 内部执行 echarts.registerTheme('chalk', ...)
import "./assets/js/chalk";
import "./assets/css/global.css";

// Vue 3 兼容层（替换 Vue 2 专用库）
import DataViewCompat from "./compat/data-view";
import SwiperCompat from "./compat/swiper";
import SeamlessScroll from "./compat/seamless-scroll";

// 请求拦截器：原版用 == 全等比对一个写错的 URL，这里改成后缀匹配
axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token && (config.url || "").includes("/export")) {
    config.headers.Authorization = token;
  }
  return config;
});

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus);
app.use(DataViewCompat);
app.use(SwiperCompat);

// vue-seamless-scroll 的替代组件，全局注册成 <vue-seamless-scroll>
app.component("vue-seamless-scroll", SeamlessScroll);
app.component("VueSeamlessScroll", SeamlessScroll);

// Vue 2: Vue.prototype.$xxx  →  Vue 3: app.config.globalProperties.$xxx
Object.assign(app.config.globalProperties, {
  $echarts: echarts,
  $post: postRequest,
  $get: getRequest,
  $average: average,
  $pushData: pushData,
  $getBarTime: getBarTime,
  $axios: axios,
});

// 全局错误兜底（可保留：把组件名打出来，方便定位）
app.config.errorHandler = (err, instance, info) => {
  const name =
    (instance && instance.$options && (instance.$options.name || instance.$options.__file)) || "unknown";
  console.error("[VUE-ERR]", err && err.message, "| component:", name, "| info:", info);
};

app.mount("#app");

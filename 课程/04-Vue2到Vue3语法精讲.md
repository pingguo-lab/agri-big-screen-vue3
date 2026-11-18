# 第 04 课 · Vue 2 → Vue 3 语法精讲

> 全部例子的"改前 / 改后"都来自本项目的真实代码，可以直接在 VS Code 里对照看。
> 对应的迁移成品：`D:\projects\jinggangshan-vue3`

---

## 一、先理解"根"上的三个变化

语法差异都是这三个变化的表象。**先懂这三个，剩下的都是查表。**

### 1.1 从"全局构造函数"到"应用实例"

```js
// Vue 2：全局只有一个 Vue，所有配置都挂在它身上（全局污染）
import Vue from "vue";
Vue.use(ElementUI);
Vue.prototype.$get = getRequest;

new Vue({ router, store, render: (h) => h(App) }).$mount("#app");

// Vue 3：每个应用是一个独立实例
import { createApp } from "vue";
const app = createApp(App);
app.use(ElementPlus);
app.config.globalProperties.$get = getRequest;
app.mount("#app");
```

**为什么要改**：Vue 2 里你在一个页面改了 `Vue.prototype`，全站都受影响；也不能在同一页面里跑两个配置不同的 Vue 应用
（微前端、组件库演示场景就会撞车）。Vue 3 把"配置"收进实例，互不干扰。

### 1.2 从"选项式 API"到"可选的组合式 API"

```js
// 选项式（本项目 100% 都是这种）：按"类型"分块
export default {
  data() { return { a: 1 } },
  computed: { b() { return this.a + 1 } },
  mounted() { ... },
  methods: { fn() {} },
};

// 组合式（Vue 3 新增，可选）：按"功能"分块
import { ref, computed, onMounted } from "vue";
const a = ref(1);
const b = computed(() => a.value + 1);
onMounted(() => {});
function fn() {}
```

**关键认知**：Vue 3 **没有废弃**选项式 API。本项目迁移时**一行没改写法**，只改了钩子名。
所以"Vue3 = 组合式"是误解；迁移的第一原则是**能不动就不动**。

### 1.3 响应式：`defineProperty` → `Proxy`（这条会咬人）

| | Vue 2 | Vue 3 |
|---|---|---|
| 实现 | `Object.defineProperty` | `Proxy` |
| 新增属性 | ❌ 检测不到，必须 `$set` | ✅ 直接赋值即可 |
| 删除属性 | ❌ 必须 `$delete` | ✅ `delete` 即可 |
| 数组下标 | ❌ 检测不到 | ✅ 可以 |
| 代价 | —— | **对象会被"包一层"，class 实例也不例外** |

最后一行就是本项目 `/fish` 页面报错的根因，第三节详讲。

---

## 二、逐条对照（12 条）

### 2.1 入口

| | 代码 |
|---|---|
| Vue 2 | `new Vue({ router, store, render: h => h(App) }).$mount("#app")` |
| Vue 3 | `createApp(App).use(router).use(store).mount("#app")` |

`render: (h) => h(App)` 不再需要 —— `createApp` 的第一个参数就是根组件。

### 2.2 全局属性（`Vue.prototype` → `app.config.globalProperties`）

```js
// Vue 2
Vue.prototype.$echarts = echarts;
Vue.prototype.$get = getRequest;

// Vue 3
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$get = getRequest;
```

**模板里的写法完全不变**：`this.$get(...)` 照旧，因为最终还是挂在实例上。

### 2.3 插件注册

```js
Vue.use(ElementUI)        →  app.use(ElementPlus)
```

⚠️ 但 **`Vue.use(某个组件)` 这种"给组件装插件"的用法没了**。
本项目 11 个文件里写着 `Vue.use(borderBox8)`（data-view 的组件），Vue 3 下必须换成：

```js
// Vue 2
Vue.use(borderBox8).use(borderBox12);

// Vue 3（main.js 里统一注册）
app.component("dv-border-box-8", borderBox8);
app.component("dv-border-box-12", borderBox12);
```

### 2.4 路由

```js
// Vue 2
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({ mode: "hash", routes });

// Vue 3
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),   // 或 createWebHistory()
  routes,
});
```

三个细节：

1. `mode: "hash"` 拆成了两个函数：`createWebHashHistory()` / `createWebHistory()`；
2. **vue-router 4 没有默认导出**，`import VueRouter from "vue-router"` 会报
   `export 'default' was not found`（本项目 `FinshIndex/ScreenPage.vue` 就中招了）；
3. `router.beforeEach((to, from, next) => {})` **完全不变**。

### 2.5 状态管理

```js
// Vue 2: new Vuex.Store({ mutations, state, getters })
// Vue 3: createStore({ mutations, state, getters })     ← 就换这一个词
```

`store.commit` / `store.state` / `this.$store.getters.xxx` 全部不变。
**Vuex 4 是整个迁移里最省心的部分**（本项目 `store/store.js` 只改了两行）。

### 2.6 生命周期改名（本项目 26 处）

| Vue 2 | Vue 3 |
|---|---|
| `beforeDestroy` | `beforeUnmount` |
| `destroyed` | `unmounted` |
| 其余（created/mounted/updated…） | 不变 |

```js
// 改前
beforeDestroy() { clearInterval(this.timer); }
// 改后
beforeUnmount() { clearInterval(this.timer); }
```

### 2.7 具名插槽（本项目 3 处 el-dialog）

```html
<!-- Vue 2：靠 slot 属性 -->
<div slot="footer" class="dialog-footer">
  <el-button>取消</el-button>
</div>

<!-- Vue 3：靠 <template #名字> -->
<template #footer>
  <div class="dialog-footer">
    <el-button>取消</el-button>
  </div>
</template>
```

**为什么必须改**：`slot="xxx"` 在 Vue 3 里只是一个普通的 HTML 属性，会被当作 attribute 丢到 DOM 上，
插槽根本不生效（弹窗的按钮会跑到 body 里）。

### 2.8 `.sync` → `v-model`（本项目 3 处）

```html
<!-- Vue 2 -->
<el-dialog :visible.sync="dialogFormVisible">
<!-- Vue 3（element-plus 用 v-model 控制显隐） -->
<el-dialog v-model="dialogFormVisible">
```

通用规则：`Vue 2 的 :foo.sync="x"` ≈ `Vue 3 的 v-model:foo="x"`。

### 2.9 `$set` 不再需要（本项目 4 处，YuganFish）

```js
// Vue 2：对象新增 key，直接赋值不会触发更新
this.$set(this.doData, topicId, arr);

// Vue 3：Proxy 能感知新增属性
this.doData[topicId] = arr;
```

### 2.10 组件注册与 `<component :is>`

Vue 3 里动态组件用 `:is` 时，传**字符串**只认全局注册的组件；局部组件要传组件对象。
本项目没用到，但改代码时要注意。

### 2.11 多根节点（Fragment）

```html
<!-- Vue 2：模板必须只有一个根元素，否则报错 -->
<!-- Vue 3：可以这样 -->
<template>
  <header>...</header>
  <main>...</main>
</template>
```

**好处**：少写一层没用的 `<div>`；**代价**：`$attrs` 的自动继承行为变了（多根时不再自动透传 attribute）。

### 2.12 `v-model` 的默认值变了

```html
<!-- 组件上的 v-model -->
<!-- Vue 2：默认 prop 名是 value，事件名是 input -->
<!-- Vue 3：默认 prop 名是 modelValue，事件名是 update:modelValue -->
```

本项目 `v-model` 全用在 element 组件上，所以没受影响；**自己写组件时要注意**。

---

## 三、本课重点案例：`markRaw` —— Proxy 咬人的地方

### 3.1 现象

`/#/fish` 页面（水产大屏）迁移后报：

```
Uncaught TypeError: Cannot read properties of undefined (reading 'type')
    at LineView.render (echarts/lib/chart/line/LineView.js)
```

页面其它部分正常，只有图表崩。

### 3.2 根因

```js
data() {
  return { myChart: null };     // ← 它进了响应式系统
},
methods: {
  initChart() {
    if (this.myChart === null) {
      this.myChart = this.$echarts.init(this.$refs.curve, "chalk");   // ← 实例被 Proxy 包住
    }
    return this.myChart;
  },
}
```

Vue 3 判断"要不要包 Proxy"用的是 `Object.prototype.toString` 的结果。
ECharts 实例是 `new ECharts(...)` 出来的 class 实例，`toString()` 依然是 `"[object Object]"` →
**Vue 3 把它当普通对象代理了**。

一旦被代理，ECharts 内部访问 `this._model`、`this._chartsViews` 之类的私有字段时，
拿到的都是代理层，`instanceof` / 内部缓存的对应关系全乱 → 渲染时读到 `undefined.type`。

**Vue 2 为什么没事**：`defineProperty` 只处理**声明时就存在**的属性，ECharts 的私有字段是运行期才加的，
Vue 2 根本不会去碰它。这就是"同样的代码，换个版本就炸"的典型原因。

### 3.3 修法

```js
import { markRaw } from "vue";   // ★

initChart() {
  if (this.myChart === null) {
    this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
    //             ^^^^^^^^ 告诉 Vue：这个对象不要代理
  }
  return this.myChart;
}
```

本项目 29 个图表组件全部加了 `markRaw`，一次性解决。

### 3.4 通用规则（记这一条就够）

> **凡是"第三方实例"（ECharts、Three.js、地图、播放器、编辑器），放进 `data` 前一律 `markRaw`。**

同类还要注意：
- 大数组/大对象只读展示 → `shallowRef` / `shallowReactive`（只代理第一层，性能好）；
- 定时器 id、DOM 引用不需要响应式 → 可以不放进 `data`，放在 `this` 之外的模块变量，或用 `markRaw`。

---

## 四、把 `TemCurve.vue` 改写成组合式 API（进阶示范）

本项目迁移时**没有**改写成组合式，但你应该知道怎么写。下面是同一个组件的两种写法。

### 4.1 现在（选项式，Vue 3 也能用）

```vue
<script>
import { markRaw } from "vue";
export default {
  props: { cAirTem: Array, cSoilTem: Array, cTemTime: Array },
  data() {
    return { myChart: null };
  },
  mounted() {
    this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
    this.render();
    window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.myChart && this.myChart.dispose();
  },
  methods: {
    onResize() { this.myChart && this.myChart.resize(); },
    render() { this.myChart.setOption({ /* ... */ }); },
  },
};
</script>
```

### 4.2 组合式写法（`<script setup>`）

```vue
<template>
  <div class="border"><div class="chart-curve" ref="curveRef"></div></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, markRaw } from "vue";
import { useEcharts } from "@/composables/useEcharts";   // 见下

const props = defineProps({
  cAirTem: { type: Array, default: () => [] },
  cSoilTem: { type: Array, default: () => [] },
  cTemTime: { type: Array, default: () => [] },
});

const curveRef = ref(null);
const { chart } = useEcharts(curveRef, "chalk");

function render() {
  chart.value.setOption({
    xAxis: { type: "category", data: [...props.cTemTime].slice(0, 10).reverse() },
    series: [
      { type: "line", data: [...props.cAirTem].slice(0, 10).reverse() },
    ],
  });
}

onMounted(render);
watch(() => [props.cAirTem, props.cSoilTem], render);
</script>
```

### 4.3 抽出来的 `useEcharts`（可复用，这是组合式最大的好处）

```js
// src/composables/useEcharts.js
import { ref, onMounted, onBeforeUnmount, markRaw } from "vue";
import * as echarts from "echarts";

export function useEcharts(elRef, theme = "chalk") {
  const chart = ref(null);
  let onResize = null;

  onMounted(() => {
    chart.value = markRaw(echarts.init(elRef.value, theme));   // ★ 必须 markRaw
    onResize = () => chart.value && chart.value.resize();
    window.addEventListener("resize", onResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", onResize);
    if (chart.value) {
      chart.value.dispose();
      chart.value = null;
    }
  });

  return { chart };
}
```

> 这段代码顺手修掉了本项目的一个老问题：**每个组件每秒 `addEventListener("resize")` 且从不移除**（第 06 课会讲）。

---

## 五、迁移检查清单（照着搜就行）

| 搜索关键词 | 说明 | 处理 |
|---|---|---|
| `Vue.prototype` | 全局属性 | → `app.config.globalProperties` |
| `Vue.use(` | 插件/组件注册 | 插件→`app.use`；组件→`app.component` |
| `new VueRouter` | 路由构造 | → `createRouter` + `createWebHashHistory` |
| `mode: "hash"` | 路由模式 | 已并入 history 参数 |
| `new Vuex.Store` | 状态 | → `createStore` |
| `beforeDestroy` | 生命周期 | → `beforeUnmount` |
| `destroyed` | 生命周期 | → `unmounted` |
| `slot="` | 具名插槽 | → `<template #name>` |
| `.sync` | 双向绑定 | → `v-model:prop` |
| `$set(` / `$delete` | 响应式补丁 | 直接赋值 / `delete` |
| `$on(` / `$off(` / `$once` | 事件总线 | 换成 mitt / provide-inject |
| `$children` | 父子链 | 换 ref |
| `filters:` | 过滤器 | 换成 computed / 方法 |
| `this.myChart = .*echarts.init` | 图表实例 | 加 `markRaw` |
| `import Vue from "vue"` | 默认导出 | Vue 3 没有默认导出，删掉 |

---

## 六、自测题

1. `Vue.prototype.$get` 在 Vue 3 里对应什么？模板里的 `this.$get` 要不要改？
2. 为什么 `import VueRouter from "vue-router"` 在 Vue 3 里会报错？
3. `beforeDestroy` 改成什么？`beforeCreate` 要改吗？
4. `:visible.sync="x"` 在 Vue 3 里怎么写？换成自定义组件又该怎么写？
5. 为什么 ECharts 实例放进 `data` 会导致崩溃？举出三个同样需要 `markRaw` 的库。
6. Vue 3 里还需要 `$set` 吗？为什么？

### 答案

1. `app.config.globalProperties.$get`；模板里不用改，`this.$get` 照旧能用。
2. vue-router 4 只提供具名导出（`createRouter` 等），没有 `export default`。
3. `beforeUnmount`；`beforeCreate` 不变（Vue 3 里仍然存在，只是组合式里改用 `setup`）。
4. element-plus 的 `el-dialog` 用 `v-model="x"`；自定义组件用 `v-model:visible="x"`。
5. Vue 3 用 Proxy 动态代理对象，class 实例也会被包住，导致库内部私有字段访问异常。
   同类：Three.js（scene/renderer）、地图（高德/百度实例）、视频播放器（EZUIKit/Video.js）、富文本编辑器。
6. 不需要。Proxy 能感知新增/删除属性，直接赋值即可。

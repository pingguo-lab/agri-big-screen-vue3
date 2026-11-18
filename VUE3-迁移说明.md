# Vue 2 → Vue 3 迁移说明

> 迁移后的项目在 `D:\projects\jinggangshan-vue3`，**原来的 Vue 2 项目没有被改动**。
> 迁移方式：先搭 Vue 3 骨架 → 用脚本做机械转换（`migrate.cjs`）→ 手工修编译错误和运行时问题。

---

## 一、结果速览

| 项目 | 状态 |
|---|---|
| 目录 | `D:\projects\jinggangshan-vue3` |
| 安装 | `npm install`（887 个包，约 10 分钟） |
| 开发 | `npm run serve` → http://localhost:8080 |
| 生产构建 | ✅ 通过（`npm run build`） |
| 已验证页面 | `/#/navigation`（首页 8 张卡片地图）、`/#/jinggang`（井冈山大屏，实时数据正常）、`/#/fish`（鱼塘 3D + 雷达图 + 折线图，已修好） |
| 已知问题 | 无阻塞性错误（`data-view` 视觉简化，见第六节） |

---

## 二、技术栈对照

| Vue 2 项目 | Vue 3 项目 | 说明 |
|---|---|---|
| vue 2.6 | vue 3.4 | —— |
| vue-router 3 | vue-router 4 | `mode: "hash"` → `createWebHashHistory()` |
| vuex 3 | vuex 4 | `new Vuex.Store` → `createStore`，其余 API 不变 |
| element-ui 2.15 | **element-plus 2.7** | 组件名基本一致，插槽/属性有差异 |
| @vue/cli-service 4.5（webpack 4） | @vue/cli-service 5.0（**webpack 5**） | 仍用 `vue-cli-service serve`，命令不变 |
| vue-awesome-swiper 3 | **自写兼容层** `src/compat/swiper.js` | 原库不支持 Vue 3 |
| @jiaminghi/data-view | **自写兼容层** `src/compat/data-view.js` | 原库不支持 Vue 3 |
| vue-seamless-scroll | **自写兼容层** `src/compat/seamless-scroll.js` | 原库不支持 Vue 3 |
| vue-animate-number | 删除 | 模板里其实没用到 |
| less-loader 7 / sass-loader 10 | 11 / 13 | 配合 webpack 5 |
| eslint（构建内联） | 移除 | 迁移期先不卡 lint |

---

## 三、语法对照（改了什么）

### 1. 应用入口

```js
// Vue 2
import Vue from "vue";
new Vue({ router, store, render: (h) => h(App) }).$mount("#app");
Vue.prototype.$get = getRequest;
Vue.use(ElementUI);

// Vue 3
import { createApp } from "vue";
const app = createApp(App);
app.use(router);
app.use(store);
app.config.globalProperties.$get = getRequest;   // 原型挂载的新写法
app.mount("#app");
```

### 2. 路由

```js
// Vue 2
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({ mode: "hash", routes });

// Vue 3
import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({ history: createWebHashHistory(), routes });
// 注意：vue-router 4 没有默认导出，`import VueRouter from "vue-router"` 会警告
```

### 3. 状态

```js
// Vue 2: new Vuex.Store({ mutations, state, getters })
// Vue 3: createStore({ mutations, state, getters })      —— 其余完全一致
```

### 4. 生命周期改名（26 处）

```js
beforeDestroy() {}   →   beforeUnmount() {}
```

### 5. 具名插槽（3 处 el-dialog + 1 处 el-table）

```html
<!-- Vue 2 -->
<div slot="footer" class="dialog-footer"> ... </div>

<!-- Vue 3 -->
<template #footer>
  <div class="dialog-footer"> ... </div>
</template>
```

### 6. 双向绑定

```html
<!-- Vue 2 -->
<el-dialog :visible.sync="dialogFormVisible">
<!-- Vue 3（element-plus 用 v-model） -->
<el-dialog v-model="dialogFormVisible">
```

### 7. 响应式补丁 `$set`（4 处，YuganFish）

```js
// Vue 2：给对象新增 key 需要 $set 才能触发更新
this.$set(this.doData, topicId, arr);

// Vue 3：Proxy 代理整个对象，直接赋值即可
this.doData[topicId] = arr;
```

### 8. 全局插件注册

```js
// Vue 2: Vue.use(borderBox8)
// Vue 3: 组件在 main.js 里统一 app.component("dv-border-box-8", C)
```

### 9. 移除的 API（本项目未使用，但要知道）

`$on / $off / $once`、`$children`、`filters`、`$listeners`、`v-model` 的 `.sync`、`functional` 组件、
`Vue.extend`、`Vue.observable`、事件总线 `new Vue()`。

---

## 四、第三方库替换（真正的工作量）

### `@jiaminghi/data-view`（11 个文件在用）

Vue 2 专用，没有 Vue 3 版本。换成 `src/compat/data-view.js`：

- 保留组件名（`dv-border-box-1/8/10/11/12/13`、`dv-decoration-5`、`dv-scroll-board`、`dv-scroll-ranking-board`）
- 边框退化成一个青色描边 div（**视觉会变，但不是报错**）
- 滚动列表退化成静态列表（没有滚动动画）
- 想恢复视觉效果，可换 `@kjgl77/datav-vue3` 这类 Vue 3 版大屏库

### `vue-awesome-swiper`（23 个文件在用）

Vue 2 专用。换成 `src/compat/swiper.js`：

- 支持原来的 `<swiper :options="swiperOption">` 写法（不用改模板）
- 只实现：autoplay.delay、loop、点击 `.swiper-button-prev/next` 切换
- 没实现：触摸滑动、分页小圆点（原来那套 `pagination.el: ".pagination-home"` 本来就是死配置，指向不存在的元素）

### `vue-seamless-scroll`（1 个文件）

退化成可滚动容器，没有滚动动画。

---

## 五、迁移中踩到的 6 个坑（都是真实报错）

| # | 报错 | 原因 | 处理 |
|---|---|---|---|
| 1 | `Can't resolve 'url'`（mqtt） | webpack 5 不再自动 polyfill Node 内置模块 | mqtt 改用浏览器构建 `mqtt/dist/mqtt.min.js` |
| 2 | `Can't resolve 'axios'` | 原项目 axios 用的是 0.21，我重写 package.json 时漏了 | 补 `axios@^1.6.8` |
| 3 | `'return' outside of function`（chalk.js） | 原来的 UMD 包装在 webpack 5 下走了不同分支；我把 UMD 拆成 ESM 后，函数体里的 `return` 变成顶层 return | 改成 `import` + IIFE 包一层 |
| 4 | `export 'MessageBox' was not found in 'element-plus'` | element-plus 改名了 | 换成 `ElMessageBox` |
| 5 | `export 'default' (imported as 'VueRouter') was not found` | vue-router 4 没有默认导出 | 删除该 import |
| 6 | `Cannot read properties of undefined (reading 'type')`（ECharts） | 图表组件里 `getOption()` 再 `setOption()` 回灌，ECharts 5 下不稳定 | 改成按下标局部合并（FishMap1/2 已改，但 /fish 仍有残留，见下） |

---

## 六、已知问题 / 需要人判断的地方

### 1. `/#/fish` 的 ECharts 报错 —— ✅ 已修复（`markRaw`）

- 现象：`Cannot read properties of undefined (reading 'type')`，栈在 `echarts/lib/chart/line/LineView.js`。
- **根因**：`data() { return { myChart: null } }` 里的图表实例被 Vue 3 的 **Proxy 代理**了。
  Vue 3 用 `Object.prototype.toString` 判断类型，ECharts 的 class 实例同样返回 `[object Object]`，
  于是被当成普通对象包了一层代理，库内部访问私有字段时就乱了。
  Vue 2 用 `defineProperty`，只处理"声明时就存在"的属性，所以不会碰运行期新增的字段 —— 这就是"同样代码换版本就炸"的原因。
- **修法**：`this.myChart = markRaw(this.$echarts.init(el, "chalk"))`，29 个图表组件全部加上。
- 通用规则：**第三方实例（ECharts / Three.js / 地图 / 播放器）放进 `data` 前必须 `markRaw`**。

### 2. `/fish` 的三维场景不渲染（未解决，已知退化）

- 现象：页面布局、雷达图、折线图都正常，但左侧 three.js 的"全方位鱼塘3D模型"区域是空的。
- 已排查：
  - canvas 存在且尺寸一致（225×340），说明 `WebGLRenderer` 创建成功；
  - 无 `Uncaught`、无 `[VUE-ERR]`，说明没有抛异常；
  - 给 scene/camera/renderer 加 `markRaw` **没有解决** → 不是响应式代理问题。
- 待查方向：`updateSun()`（PMREMGenerator）在无头环境下是否失败、`animate()` 是否真的在跑、
  canvas 是否被同级元素盖住（z-index）。
- 影响：仅这一个页面的 3D 部分；数据、图表、视频壳都正常。

### 3. data-view 的视觉退化（未处理）

边框从"科技感流光"变成一个描边盒子。要恢复就得换 Vue 3 版大屏组件库，或自己重画 CSS。

### 3. swiper 兼容层的能力缺口

没有触摸滑动、没有分页点。大屏场景一般用不上，但如果要放移动端需要补。

### 4. element-plus 的属性差异

`el-date-picker` 的 `format` 用的是 dayjs token（`YYYY年MM月DD日`），原来的 `yyyy年MM月dd日` 会告警。

---

## 七、新增的文件

```
src/compat/
  data-view.js        替代 @jiaminghi/data-view
  swiper.js           替代 vue-awesome-swiper
  seamless-scroll.js  替代 vue-seamless-scroll
migrate.cjs           批量转换脚本（可重跑，幂等）
fix-*.cjs             一次性修复脚本（可以删）
```

`migrate.cjs` 做了什么（幂等，可重复执行）：

| 规则 | 次数 |
|---|---|
| `beforeDestroy` → `beforeUnmount` | 26 |
| 移除 `slot="button-prev/next"` | 28 |
| `.sync` → `v-model` | 3 |
| `vue-awesome-swiper` → `@/compat/swiper` | 23 |
| `@jiaminghi/data-view` → `@/compat/data-view` | 12 |
| `vue-seamless-scroll` → `@/compat/seamless-scroll` | 1 |
| 删除 `Vue.use(...)` 行 | 20 |
| `element-ui` → `element-plus` | 2 |
| `<template slot="x">` → `<template #x>` | 1 |

---

## 八、怎么跑起来

```powershell
Set-Location -LiteralPath "D:\projects\jinggangshan-vue3"
npm install          # 已装过，可跳过
npm run serve        # http://localhost:8080
npm run build        # 产物在 dist/
```

> 注意：`npm run serve` 默认占 8080，和原来的 Vue 2 项目冲突，同时跑要把其中一个的 `devServer.port` 改掉。

---

## 九、如果还要继续优化（建议顺序）

1. 修 `/#/fish` 的 ECharts 报错（把传给 echarts 的数据 `toRaw` 掉）
2. 把 `data-view` 换成 Vue 3 版大屏库，恢复边框视觉
3. 给 16 个 `ScreenPage.vue` 抽公共布局组件（现在还是复制粘贴）
4. 用 Pinia 替换 Vuex（Vue 3 的官方推荐）
5. 把 webpack 换成 Vite（启动从 18 秒降到 1~2 秒，但要处理 `require()` 残留）
6. 补 `eslint + prettier`，把 55MB 图片压缩掉

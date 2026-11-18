<template>
    <div id="app">
        <!-- 留坑，非常重要 -->
         

        <router-view></router-view>
    </div>
</template>
<style>
/* ✅ 全局样式：强制让 EZUIKit 的 iframe 撑满容器 */
#video5-container iframe {
  height: 100% !important;
  width: 100% !important;
}
#FxVideo1-container iframe {
  height: 100% !important;
  width: 100% !important;
}
#FxVideo2-container iframe {
  height: 100% !important;
  width: 100% !important;
}
</style>
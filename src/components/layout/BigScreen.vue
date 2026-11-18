<template>
  <div class="page">
    <!-- 顶部标题条 -->
    <div class="page-top">
      <div class="title">{{ title }}</div>
      <slot name="top-extra" />
    </div>

    <!-- 中部三栏 -->
    <div class="page-content">
      <div class="left"><slot name="left" /></div>
      <div class="center" style="position: relative"><slot name="center" /></div>
      <div class="right"><slot name="right" /></div>
    </div>

    <!-- 底部三栏 -->
    <div class="page-bottom">
      <div class="bottom-left"><slot name="bottom-left" /></div>
      <div class="bottom-center"><slot name="bottom-center" /></div>
      <div class="bottom-right"><slot name="bottom-right" /></div>
    </div>
  </div>
</template>

<script>
/**
 * 大屏公共骨架（三段式布局）
 * 把 16 个 ScreenPage 里重复的 .page / .page-top / .left / .center / .right / .page-bottom
 * 收成一个组件，页面只负责往里塞内容。
 *
 * 用法：
 *   <BigScreen title="井冈山黄桃种植可视化大屏">
 *     <template #left>...</template>
 *     <template #center>...</template>
 *     <template #right>...</template>
 *     <template #bottom-left>...</template>
 *     <template #bottom-center>...</template>
 *     <template #bottom-right>...</template>
 *   </BigScreen>
 */
export default {
  name: "BigScreen",
  props: {
    title: { type: String, default: "" },
  },
};
</script>

<style>
/* 布局骨架必须是全局样式：
   slot 内容由父组件编译（带父组件 scopeId），而 .page/.left/.center 等容器由本组件渲染，
   若用 scoped，两边 scopeId 不一致会导致布局样式失效。 */
@import url("../../style/screenPage.css");
</style>

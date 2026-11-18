<template>
  <div class="error-container">
    <div class="not-found">
      <div class="text">错误！未找到页面！</div>
      <div class="text">Error! Page Not Found!</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.error-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .not-found {
    margin: auto;
    .text {
      text-align: center;
      font-size: 6rem;
      color: aliceblue;
      transition: 0.8s;
    }
    .text:hover {
      color: #34a3d6;
    }
  }
}
</style>

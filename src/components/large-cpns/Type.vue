<template>
  <div class="item-type">
    <div class="type-title">
      <span>查看方式</span>
    </div>
    <div class="type-button">
      <span @click="changeState((dataType = 'realtime'))">
        实时
      </span>
      <span @click="changeState((dataType = 'hour'))">
        小时
      </span>
      <span @click="changeState((dataType = 'day'))">
        天数
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataType: "realtime",
    };
  },
  methods: {
    changeState(type) {
      this.$emit("changeType", type);
      return type;
    },
  },
};
</script>

<style lang="less" scoped>
.item-type {
  box-sizing: border-box;
  width: 50%;
  margin-left: 0%;
  display: flex;
  justify-content: space-around;
  color: #00d8ff;
  height: 20px;
  line-height: 20px;
  margin-top: -2px;
  .type-title {
    height: 100%;
    margin-top: -4px;
    font-size: 13px;
    margin-left: 2px;
  }
  .type-button {
    height: 100%;
    line-height: 100%;
    font-size: 12px;
    margin-left: 2px;
    span {
      border: solid 1px;
      display: inline-block;
      margin: 0 2px;
      margin-bottom: 2px;
      padding-bottom: 2px;
      border-radius: 2px;
      width: 40px;
      text-align: center;
      cursor: pointer;
      font-weight: 800;
      &:hover {
        color: #0e9bca;
      }
    }
  }
}
</style>

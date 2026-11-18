<template>
  <div class="home-container">
    <!-- 头部  height="80px" solid #eee-->
    <div id="example1" class="header-container">
      <div class="project-name">
        智慧农业采集信息展示系统
      </div>
    </div>
    <div class="menu">
      <div class="item">
        <yongxinLarge />
      </div>
      <!-- <div class="item">
        <farmLand />
      </div> -->
      <div class="item">
        <ganzhouOrange />
      </div>
      <div class="item">
        <jinggangShan />
      </div>
      <!-- <div class="item">
        <yibinPlum />
      </div> -->
      <div class="item">
        <XinjianEcoGarden />
      </div>
      <div class="item">
        <Shanggao />
      </div>
      <div class="item">
        <Fengxin></Fengxin>
      </div>
      <div class="item">
        <yuganFish />
      </div>
      <!-- <div class="item">
        <yuganAqua />
      </div> -->
      <!-- <div  class="item">
        <xiaofuchaye/>
      </div> -->
      
      <div  class="item">
        <mjy/>
      </div>
      <!-- 保证每排 4 个组件，如果不符，此处的数字 -->
      <div class="item" v-for="(o, i) in 2" :key="i"></div>
    </div>
    <div class="copyright">
      <div class="icp">
        <a href="https://beian.miit.gov.cn" target="_blank" rel="nofollow">
          <p>
            赣ICP备2021011411号-1
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import yongxinLarge from "../components/yongxinLarge";
//import farmLand from "../components/farmLand";
import ganzhouOrange from "../components/ganzhouOrange";
import jinggangShan from "../components/jinggangShan";
//import yibinPlum from "../components/yibinPlum";
import XinjianEcoGarden from "../components/xinjianEcoGarden.vue";
import Shanggao from "../components/shanggao.vue";
import Fengxin from "../components/fengxin.vue";
import yuganFish from "../components/yuganFish.vue";
//import yuganAqua from "../components/yuganAqua.vue";
//import xiaofuchaye from "../components/xiaofuchaye.vue";
import mjy from "../components/mjy.vue";
/**       ↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘↘
 * !!!!! ⚠ 保证每排 4 个组件，如果不符，修改上方 v-for 中的数字 ⚠ !!!!
 **/
export default {
  components: {
    yongxinLarge,
   // farmLand,
    ganzhouOrange,
    jinggangShan,
    //yibinPlum,
    XinjianEcoGarden,
    Shanggao,
    Fengxin,
    yuganFish,
    //yuganAqua,
    //xiaofuchaye,
    mjy,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
.menu {
  display: flex;
  height: 85%;
  overflow: auto;
  margin: 0 auto;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .item {
    margin: 20px auto;
    width: 400px;
    height: 250px;
  }
}
.menu::-webkit-scrollbar {
  display: none;
}

.header-container {
  width: 102.5%;
  height: 8%;
  background: url("../assets/images/topbg.gif") no-repeat;
  background-size: 100% 100%;
}
.project-name {
  font-size: 2vw;
  color: white;
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
}
.copyright {
  width: 100%;
  height: 5%;
  position: absolute;
  bottom: 1%;
  .icp {
    width: 200px;
    margin: 0 auto;
    a {
      color: ghostwhite;
      text-decoration: none;
      transition: 0.5s;
    }
    a:hover {
      color: #34a3d6;
    }
  }
}
</style>

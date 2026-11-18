<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">奉新猕猴桃种植基地数据总览</div>
    </div>

    <div class="grid2x2" style="width: 100%; height: 92vh;/*之前为92 */ text-align: center; color: #fff;">
      <!-- <a href="https://cloud.reemoon.com"   style="width:70%; height: 100%;">
      
      <dv-border-box-11   class="ponter"  title=" 绿萌云智慧果蔬加工管理系统"   style="width:90%; height: 90%;" >
        <img src="../img/img1.png" style="margin-top: 20%;width: 90%;height: 60%;padding: 5%;">
      </dv-border-box-11></a> -->

      <!-- <iframe src="http://bigdata.reemoon.com/webroot/decision/view/duchamp?viewlet=RMFC20230467.fvs&ref_t=design&ref_c=aa643247-908a-4487-a9b6-d7a0c9315f43&page_number=1"   class="frameDom"  style="width:100%; height: 100%;  aspect-ratio: 1920/1080;"></iframe> -->
      <iframe src="http://bigdata.reemoon.com/webroot/decision/view/duchamp?viewlet=RMFC20230467.fvs&ref_t=design&ref_c=aa643247-908a-4487-a9b6-d7a0c9315f43&page_number=1"   class="frameDom"  style="width:100%; height: 100%;  aspect-ratio: 1920/1080;"></iframe>          

      <!-- <a href="http://bigdata.reemoon.com/webroot/decision/view/duchamp?viewlet=RMFC20230467.fvs&ref_t=design&ref_c=aa643247-908a-4487-a9b6-d7a0c9315f43&page_number=1"   style="width:70%; height: 100%;">
      <dv-border-box-11   class="ponter"  title="数智加工大数据看版"   style="width:90%; height: 90%; " >
        <img src="../img/img2.jpg" style="margin-top: 20%;width: 90%;height: 60%;padding: 5%;">
      </dv-border-box-11></a>-->

      <!-- :8090  -->
      <iframe src=" http://121.5.9.113/#/fengxin"  class="frameDom" style="width:100%; height: 100%;  aspect-ratio: 1920/1080;"></iframe>


      <iframe src=" http://121.5.9.113/#/monitor"  class="frameDom"   style="width:100%; height: 100%;  aspect-ratio: 1920/1080;"></iframe> 
            
     
       <iframe src=" http://121.5.9.113/#/clodStorage"   class="frameDom" style="width:100%; height: 100%; aspect-ratio: 1920/1080;" ></iframe> 
       
      
     
     


      <!-- <router-link to="/fengxin"   style="width:70%; height: 100%;"> 
      <dv-border-box-11   class="ponter"  title="奉新猕猴桃种植可视化大屏"  style="width:90%; height: 90%;" >
        <img src="../img/img4.jpg" style="margin-top: 20%;width: 90%;height: 60%;padding: 5%;">
      </dv-border-box-11></router-link>
      <router-link to="/monitor"   style="width:70%; height: 100%;"> -->
      <!-- <dv-border-box-11  class="ponter"   title="监控系统"  style="width:90%; height: 90%;" >
        <img src="../img/monitor.jpg" style="margin-top: 20%;width: 90%;height: 60%;padding: 5%;">
      </dv-border-box-11>
    </router-link> -->
  
    <!-- <a href="http://121.5.9.113:8090/lengku"   style="width:70%; height: 100%;">
      
      <dv-border-box-11   class="ponter"  title="冷库大屏"  style="width:90%; height: 90%;">
        <img src="../img/img3.jpg" style="margin-top: 20%;width: 90%;height: 60%;padding: 5%;">
      </dv-border-box-11></a>  -->
 </div>

  </div>
 
</template>
<script>
import { borderBox11 } from "@/compat/data-view"
import axios from 'axios'

export default {
  mounted() {
    // 连通测试代码 
    axios.get("http://121.5.9.113:8090/")
      .then(res => {
        console.log("✅ 服务通的！", res)
      })
      .catch(err => {
        console.log("❌ 不通 or 跨域！", err)
      })
  }
};
</script>

<style scoped>
@import url("../../../style/screenPage.css");

.grid2x2 {
  display: grid;
  place-items: center center; 
  grid-template-columns: repeat(2, 1fr); 
  /* 两列 */
  grid-template-rows: repeat(2, 1fr); 
  /* 两行*/
  /* opacity: 1; 添加伪元素使不报css样式为空的警告  */
}

.ponter {
  cursor: pointer;
}
.frameDom{

object-fit: contain;
  
}
.page-top {
  width: 100%;
  height: 4%;
  background-size: 100% 100%;
  margin-bottom: 0px;
}
</style>
<template>
  <div class="hello-ezuikit-js" style="height:100%;width:86%;margin:0 auto;overflow:hidden;">
    <div :id="videoId" style="width:100%;height:100%;overflow:hidden;"></div> 
    <div style="position:absolute;bottom:0;right:7rem;top:0.2rem;">
      <img src="../assets/images/left.png" style="position:absolute;width:2rem; cursor:pointer;left:-2rem;top:2rem;" @click="btn_click(2)"/>
      <img src="../assets/images/up.png"  style="position:absolute;width:2rem;cursor:pointer;"  @click="btn_click(0)"/>
      <img src="../assets/images/down.png" style="position:absolute;width:2rem;cursor:pointer;top:4rem;"  @click="btn_click(1)"/>
      <img src="../assets/images/right.png" style="position:absolute;width:2rem;cursor:pointer;left:2rem;top:2rem;"  @click="btn_click(3)"/>
      <img src="../assets/images/stop.png" style="position:absolute;width:2rem;cursor:pointer;top:2rem;"  @click="center_click()"/>
    </div>
  </div>
</template>

<script>
import EZUIKit from "ezuikit-js";
import axios from 'axios'
var player = null;
export default({
  data(){
    return{
      accToken:'',
      videoId:''
    }
  },
  props: {
        cVideoId: {
        type: String,
        default: null,
        }
    },
  mounted(){
    this.videoId=this.cVideoId;
    this.getVideo();
  },
  methods:{
    getVideo(){
      axios({
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'post',
        url: 'https://open.ys7.com/api/lapp/token/get?appKey=10a4eeedd6e447fcb4640711df627c0f&appSecret=01354834fe219f5465a3ab5ff1d80aae'
        /*data: {
          appKey:'10a4eeedd6e447fcb4640711df627c0f',
          appSecret:'01354834fe219f5465a3ab5ff1d80aae'
        }*/}).then(res=>{
        this.accToken=res.data.data.accessToken;
        console.log(this.accToken);
        //let that=this;
        player = new EZUIKit.EZUIKitPlayer({
        autoplay: true,
        id: this.videoId,
        accessToken:this.accToken,
        url: "ezopen://open.ys7.com/"+this.videoId+"/1.hd.live",
       //accessToken:that.accToken,
       template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
      //plugin: ['talk'],                       // 加载插件，talk-对讲
      // 视频下方底部控件
      // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
      // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      // openSoundCallBack: data => console.log("开启声音回调", data),
      // closeSoundCallBack: data => console.log("关闭声音回调", data),
      // startSaveCallBack: data => console.log("开始录像回调", data),
      // stopSaveCallBack: data => console.log("录像回调", data),
      // capturePictureCallBack: data => console.log("截图成功回调", data),
       //fullScreenCallBack: data => console.log("全屏回调", data),
      // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
    });
      });
    },
    /*摄像头方向控制，direction为0表示向上，为1表示向下，为2表示向左，为3表示向右*/
    btn_click(direction){
      this.$post('https://open.ys7.com/api/lapp/device/ptz/start?accessToken='+this.accToken+'&deviceSerial=J73936896&channelNo=1&direction='+direction+'&speed=1').then(res=>{
        console.log(res)
      })
    },
    /*控制摄像头停止转动*/
    center_click(){
       this.$post('https://open.ys7.com/api/lapp/device/ptz/stop?accessToken='+this.accToken+'&deviceSerial=J73936896&channelNo=1&speed=1').then(res=>{
        console.log(res)
      })
    }
  }
})
</script>
<style>
img:active{
  background:#999;
}
</style>

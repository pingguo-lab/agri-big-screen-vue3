<template>
  <div
    class="hello-ezuikit-js"
    :style="`height:${height}%;width:${width}%;margin:0 auto;overflow:hidden;`"
  >
    <div
      :id="videoId + videoNum"
      style="width:100%;height:100%;overflow:hidden;"
    ></div>
    <!--控制摄像头转动的图标-->
    <div style="position:absolute;bottom:0;right:7rem;top:0.2rem;" v-if="show">
      <img
        src="../../assets/images/left.png"
        style="position:absolute;width:2rem; cursor:pointer;left:-2rem;top:2rem;"
        @click="btn_click(2)"
      />
      <img
        src="../../assets/images/up.png"
        style="position:absolute;width:2rem;cursor:pointer;"
        @click="btn_click(0)"
      />
      <img
        src="../../assets/images/down.png"
        style="position:absolute;width:2rem;cursor:pointer;top:4rem;"
        @click="btn_click(1)"
      />
      <img
        src="../../assets/images/right.png"
        style="position:absolute;width:2rem;cursor:pointer;left:2rem;top:2rem;"
        @click="btn_click(3)"
      />
      <img
        src="../../assets/images/stop.png"
        style="position:absolute;width:2rem;cursor:pointer;top:2rem;"
        @click="center_click()"
      />
    </div>
    <!--触发显示摄像头转动控件的图标-->
    <img
      src="../../assets/images/control.png"
      style="position:absolute;bottom:0;right:1rem;top:0.2rem;width:3rem;"
      v-if="!show"
      @click="dialogFormVisible = true"
    />

    <!--弹出的对话框-->
    <el-dialog
      title="转动摄像头需输入密码"
      v-model="dialogFormVisible"
      :center="true"
      :append-to-body="true"
    >
      <el-form>
        <el-input
          v-model="pwd"
          autocomplete="off"
          placeholder="请输入转动摄像头许可密码"
          show-password
        ></el-input>
      </el-form>
      <span style="color:red;" v-if="tip">密码错误，请重新输入</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkPwd()">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--底部云控制图标-->
    <div
      style="position:absolute;bottom:0;left:50%;height:32px;padding:10px 0;"
      v-if="show"
    >
      <!--放大-->
      <img
        src="../../assets/images/zoom+.png"
        title="放大"
        class="bottom_icon"
        @click="btn_click(8)"
      />
      <!--缩小-->
      <img
        src="../../assets/images/zoom-.png"
        title="缩小"
        class="bottom_icon"
        @click="btn_click(9)"
      />
      <!--近焦距-->
      <img
        src="../../assets/images/focus-.png"
        title="近焦距"
        class="bottom_icon"
        @click="btn_click(10)"
      />
      <!--远焦距-->
      <img
        src="../../assets/images/focus+.png"
        title="远焦距"
        class="bottom_icon"
        @click="btn_click(11)"
      />
    </div>
  </div>
</template>

<script>
import EZUIKit from "ezuikit-js";
import axios from "axios";
import { number } from "echarts";
var player = null;
export default {
  data() {
    return {
      accToken: "",
      videoId: "",
      videoNum: 0,
      show: false,
      dialogFormVisible: false,
      pwd: "", //摄像头密码,
      tip: false, //密码错误提示是否显示，默认不显示
    };
  },
  props: {
    cVideoId: {
      type: String,
      default: null,
    },
    cVideoNum: {
      type: number,
      default: 1,
    },
    playList: {
      type: Array,
      default: () => [0, 1, 2],
    },
    width: {
      type: number,
      default: 86,
    },
    height: {
      type: number,
      default: 100,
    },
  },
  watch: {
    // playList() {
    //   console.log(this.playList);
    //   if (this.playList.includes(this.videoNum)) {
    //     player.play();
    //   } else {
    //     player.stop();
    //   }
    // },
  },
  mounted() {
    this.videoId = this.cVideoId;
    this.videoNum = this.cVideoNum;
    setTimeout(() => {
        this.getVideo()
      }, 2000);
   
  },
  methods: {
    getVideo() {
      // axios({
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   method: "post",
      //   // url: "https://open.ys7.com/api/lapp/token/get?appKey=10a4eeedd6e447fcb4640711df627c0f&appSecret=01354834fe219f5465a3ab5ff1d80aae",
      //   url:
      //     "https://open.ys7.com/api/lapp/token/get?appKey=2eeb667f0ae6498e85ea82588ab8a471&appSecret=9f6f98585fc5cb518be9524850910586",
      //   /*data: {
      //     appKey:'10a4eeedd6e447fcb4640711df627c0f',
      //     appSecret:'01354834fe219f5465a3ab5ff1d80aae'
      //   }*/
      // }).then((res) => {
        this.accToken = "at.97tp9hsj7l7szakk98wdhgf77awxpm4w-969rqm3su7-0l4tmma-amr5wo9xi";
        // console.log(this.accToken);
        //let that=this;
        player = new EZUIKit.EZUIKitPlayer({
          autoplay: true,
          id: this.videoId + this.videoNum,
          accessToken: this.accToken,
          url: `ezopen://open.ys7.com/${this.videoId}/${this.videoNum}.hd.live`,
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
    
    },
    /*摄像头方向控制，direction为0表示向上，为1表示向下，为2表示向左，为3表示向右,8表示放大，9表示缩小，10表示近焦距，11表示远焦距*/
    btn_click(direction) {
      this.$post(
        "https://open.ys7.com/api/lapp/device/ptz/start?accessToken=" +
          this.accToken +
          "&deviceSerial=" +
          this.videoId +
          "&channelNo=1&direction=" +
          direction +
          "&speed=1"
      ).then((res) => {
        console.log(res);
      });
    },
    /*控制摄像头停止转动*/
    center_click() {
      this.$post(
        "https://open.ys7.com/api/lapp/device/ptz/stop?accessToken=" +
          this.accToken +
          "&deviceSerial=" +
          this.videoId +
          "&channelNo=1&speed=1"
      ).then((res) => {
        console.log(res);
      });
    },
    /*验证摄像头转动许可密码是否正确，正确则显示控制转动的控件*/
    checkPwd() {
      if (this.pwd == "123456") {
        this.show = true;
        this.dialogFormVisible = false;
        this.tip = false;
      } else {
        this.tip = true;
      }
    },
  },
};
</script>
<style>
img:active {
  background: #999;
}
.bottom_icon {
  width: 32px;
  cursor: pointer;
  margin-right: 5px;
}
</style>

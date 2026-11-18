<template>

    <!-- 播放器 -->
    <div title="视频播放" :visible="dialogPlay" style="height: 100%;">

        <div id="app-container" class="video-box">
            <video ref="videoAug" :src="videoUrls" id="videoAug" controls muted style="width: 100%; height: 100%; 
                   object-fit: fill">
            </video>
        </div>

    </div>

</template>
<script>
import hlsjs from 'hls.js'
export default {
    data() {
        return {
            // videoUrl: "https://play.pushhuanuolive.com/live/KRIPC_84542121_68.m3u8",//视频流地址
        
            //videoUrls:"https:playyinhua.pushhuanuolive.com/live/035c0002006ced8aabdf.m3u8",
            videoUrls:"https://playyinhua.pushhuanuolive.com/live/035c0002006ceddfacea.m3u8",
            video: '',
            dialogPlay:"false"
        }
    },


    props: {
        videoUrl: {
            type: String,
            default: null,
        },
    },
    /* 如果无法播放，可以在Dom元素挂载后执行一次↓*/

    mounted() {
        setTimeout(()=>{
            // this.videoUrls= this.videoUrl
            this.videoPlay(true)
        },1000)
        
        
    },

    /* 如果无法播放，可以在Dom元素挂载后执行一次 ↑*/

    methods: {
        //开始播放
        
        videoPlay(flag) {
            this.video = this.$refs.videoAug; //定义挂载
            if (hlsjs.isSupported()) {
                this.hlsjs = new hlsjs();
                this.hlsjs.loadSource(this.videoUrls); //加载播放地址
                this.hlsjs.attachMedia(this.video); //解析到video标签上
                if (flag) {
                    this.dialogPlay = true
                }
                this.hlsjs.on(hlsjs.Events.MANIFEST_PARSED, () => {
                    this.video.play(); //开始播放
                    console.log("加载成功");
                });
                this.hlsjs.on(hlsjs.Events.ERROR, (event, data) => {
                    // 监听出错事件
                    console.log("加载失败");
                });
            } else {
                console.log("不支持的格式");
                return;
            }
        },

        //停止播放
        closeVideo() {
            if (this.hlsjs) {
                this.$refs.videoAug.pause();
                this.video.pause();
                this.hlsjs.destroy();
                this.hlsjs = null;
            }
        }
    }

}
</script>

<style scoped>
.video-box{
    height: 100%;
}
</style>
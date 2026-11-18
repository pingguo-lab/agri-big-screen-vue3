<template>
  <div class="fx-video-box">
    <div id="FxVideo2-container" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import EZUIKit from 'ezuikit-js';

export default {
  name: 'FxVideo2',
  data() {
    return {
      player: null,
      accessToken: '',
      tokenTimer: null,
      APP_KEY: 'dccc97b05a624cfe927a1d3b1b17a29a',
      APP_SECRET: '98c5b605dc14da756b5e218ddc4e5b1d',
      deviceSerial: 'FM6472001',
      channelNo: '2', // 果园监控通道，将4改成2
    };
  },
  async mounted() {
    await this.fetchToken();
    this.initPlayer();
    // 每 4 小时刷新
    this.tokenTimer = setInterval(async () => {
      await this.fetchToken();
      this.rebuildPlayer();
    }, 4 * 60 * 60 * 1000);
  },
  beforeUnmount() {
    clearInterval(this.tokenTimer);
    if (this.player) this.player.destroy();
  },
  methods: {
    async fetchToken() {
      try {
        const params = new URLSearchParams({ appKey: this.APP_KEY, appSecret: this.APP_SECRET });
        const { data } = await axios.post(
          //
          'https://open.ys7.com/api/lapp/token/get',
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (data.code === '200') {
          this.accessToken = data.data.accessToken;
          console.log('[FxVideo2] 新 Token:', this.accessToken);
        } else {
          throw new Error(data.msg);
        }
      } catch (e) {
        console.error('[FxVideo2] 获取 Token 失败', e);
      }
    },
    initPlayer() {
      if (!this.accessToken) return;
      if (this.player) this.player.destroy();
      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'FxVideo2-container',
        autoplay: true,
        accessToken: this.accessToken,
        url: `ezopen://open.ys7.com/${this.deviceSerial}/${this.channelNo}.hd.live`,
        template: 'standard',
        width: '100%',
        height: '100%',
      });
    },
    rebuildPlayer() {
      this.initPlayer();
    },
  },
};
</script>

<style scoped>
.fx-video-box {
  width: 100%;
  height: 100%;
}
</style>
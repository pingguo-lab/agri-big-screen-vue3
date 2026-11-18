<template>
  <div></div>
</template>

<script>
import mqtt from "mqtt/dist/mqtt.min.js";

export default {
  name: "mqttComp",
  props: {
    topic: {
      type: String, // 订阅主题
      default: "FYBOX"
    },
    mqttUrl: {
      type: Object,
      default: () => {
        return {
          head: "ws", // 必须是 ws 或 wss （mqtt:// 或 mqtts:// 必须让后端开放websocket服务）
          host: "219.229.216.16", // ip地址
          port: 8083, // 服务端口
          tailPath: "mqtt", // 服务路径
        };
      },
    }, // 服务地址
    mqttOpts: {
      type: Object,
      default: () => {
        return {
          keepalive: 60,
          clientId: "clientId-" + Math.random().toString(16).substr(2, 8),
          username: "corxtest",
          password: "corx123456",
          connectTimeout: 10 * 1000,
          // path: ""
        };
      },
    }, // 连接配置
  },
  data() {
    return {
      client: "",
      clientCount: 0,
      receivedMessage: null, // 用于存储接收到的消息
    };
  },
  watch: {
    topic(newTopic) {
      if (newTopic && this.client) {
        this.client.unsubscribe(this.topic);
        this.client.subscribe(newTopic);
      }
    },
  },
  methods: {
    async initMqtt() {
      // let opts = JSON.parse(JSON.stringify(this.mqttOpts));
      this.client = mqtt.connect(
        `${this.mqttUrl.head}://${this.mqttUrl.host}:${this.mqttUrl.port}/${this.mqttUrl.tailPath}`,
        // "ws://pet.corxnet.com:8083/mqtt",
        this.mqttOpts
      );
      this.client.on("connect", this.handleConnect);
      this.client.on("message", this.handleMessage);
      this.client.on("reconnect", this.handleReconnect);
      this.client.on("error", this.handleError);
    },

    handleConnect() {
      console.log("mqtt_连接成功");
      this.client.subscribe(this.topic);
    },

    handleMessage(topic, message) {
      this.receivedMessage = JSON.parse(message?.toString() || {});
     console.log(this.receivedMessage,"mqttttttttt");
     
    },

    handleReconnect(error) {
      console.log(`正在第${this.clientCount}重连`, error);
      this.clientCount++;
      if (this.clientCount >= 10) {
        this.client.end();
      }
    },

    handleError(error) {
      console.log("连接失败", error);
    },

    mqttPublish(topic, message) {
      this.client.publish(topic, JSON.stringify(message));
    },
  },
  async mounted() {
    await this.initMqtt();
  },

  beforeUnmount() {
    this.$emit("mqtt-close") // 关闭mqtt链接需要的前置操作
    // 使用延迟确保消息发送完成后再关闭连接
    setTimeout(() => {
      this.client.end(true, {}, () => {
        console.log("MQTT连接已成功关闭");
      });
    }, 100); // 延迟时间根据实际情况调整，确保消息发送完成
    // this.client.end();
  },
};
</script>

<style lang="scss" scoped></style>

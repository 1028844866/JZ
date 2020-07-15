<template>
  <div>
    <p id="msg">{{msg}}</p>
    <input type="number" v-model="username" @change="setName" />
    <button @click="getParent">子拿父</button>
    <!-- <video autoplay></video>
    <button id="btnGetAudioTracks" @click="userMedia.getAudioTracks()">getAudioTracks()</button>
    <button id="btnGetTrackById" @click="userMedia.getTrackById()">getTrackById()</button>
    <button id="btnGetTracks" @click="userMedia.getTracks()">getTracks()</button>
    <button id="btnGetVideoTracks" @click="userMedia.getVideoTracks()">getVideoTracks()</button>
    <button id="btnRemoveAudioTrack" @click="userMedia.removeAudioTrack()">removeAudioTrack()</button>
    <button id="btnRemoveVideoTrack" @click="userMedia.removeVideoTrack()">removeVideoTrack()</button> -->
  </div>
</template>

<script>
// import homeValue from "./home1";
// import {userMedia} from './home11';
// Vue.prototype.$userMedia = userMedia;
export default {
  data() {
    return {
      // path: "ws://192.168.0.200:8005/qrCodePage/ID=1/refreshTime=5",
      socket: "",
      username: ""
    };
  },
  props: ["msg"],
  mounted() {
    this.init(); //初始化
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket连接成功");
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      console.log(msg.data);
    },
    send() {
      this.socket.send(params);
    },
    close() {
      console.log("socket已经关闭");
    },
    // 子组件传值给父组件  子组件通过$emit方法遍历changeName事件并返回this.username
    setName() {
      this.$emit("changeName", this.username);
    },
    //    子组件方法
    add() {
      if (this.username) {
        this.username++;
      }
    },
    getParent() {
      //    通过ref拿到父组件的值
      console.log(this.$parent.msg);
    },
    
  // destroyed() {
  //   // 销毁监听
  //   this.socket.onclose = this.close;
  // }
}
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
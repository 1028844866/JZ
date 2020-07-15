<template>
  <div>
    <button @click="send">发送消息</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      path:'ws://192.168.0.200:8005/qrCodePage/ID=1/refreshTime=5',
      socket:''
    };
  },
  mounted(){
    this.init() //初始化
  },
  methods: {
   init(){
     if(typeof(WebSocket)==="undefined"){
       alert("您的浏览器不支持socket")
     }else{
       this.socket=new WebSocket(this.path) //实例化socket
       this.socket.onopen=this.open //监听socket连接
       this.socket.onerror=this.error //监听socket错误信息
       this.socket.onmessage=this.getMessage //监听socket消息
     }
   },
   open(){
     console.log("连接成功")
   },
   error(){
     console.log("连接错误")
   },
   getMessage(msg){
     console.log(msg.data)
   },
   send(){
     this.socket.send(params)
   },
   close(){
     console.log("socket已关闭")
   }
   },
destroyed(){
  this.socket.onclose=this.close  //销毁监听
}
};


</script>

<style rel="stylesheet/scss" lang="scss">
</style>
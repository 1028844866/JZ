<template>
  <div>
    
  </div>
</template>

<script>
import homeValue from "./home1";

export default {
  data() {
    return {
      
    };
  },
//   socket2.js使用案例保存到vuex中
  mounted(){
    this.$store.state.WS.message(data=>{
      console.log(data)
    })
    //或者用mapState放在computed中，个人喜欢
  },
  
  methods: {
      socket(){
          this.socketApi.sendSock(agentData,this.getConfigResult);   //agentData：发送的参数；this.getConfigResult：回调方法
      }
}
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
<template>
  <header>
    <el-menu
  class="el-menu-demo"
  mode="horizontal"
  background-color="#304156"
  text-color="#fff"
  active-text-color="none">
  <el-menu-item index="1"><div id="logo">{{logo}} 智能控制中心</div></el-menu-item>
  <el-submenu index="2" style="float:right;min-width:180px;border:none;margin-right:10px;">
    <template slot="title"><i class="el-icon-s-custom"></i><span v-show="isLogin">{{current}}</span></template>
    <el-menu-item index="2-1" @click="_ModifyPwd">修改密码</el-menu-item>
    <el-menu-item index="2-3"><router-link to="/login" v-show="isLogin">退出</router-link></el-menu-item>
  </el-submenu>
</el-menu>
  </header>
</template>

<script>

export default {
  name: "headerbar",
  data() {
      return {
      
       };
    },
    props:['logo'],
    computed:{
      isLogin(){
        return this.$store.getters.getIsLogin;
      },
      current(){
        return this.$store.getters.getCurrentuser;
      }
    },
    methods: {
      _ModifyPwd() {
      // this.$store.dispatch('ModifyDialog', true)
    },
      logout() {
      this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // window.sessionStorage.clear();
          this.$router.push({ path: "/login" });
          // location.reload(); // 为了重新实例化vue-router对象 避免bug
        }).catch(() => {
                 
        });
          
    }
    }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu-item{
  text-align: center;
}
.el-menu--horizontal>.el-menu .el-menu-item {
        text-align: center;
        color: #fff;
        font-size: 14px;
    }
    .el-menu.el-menu--horizontal{
      border:none;
    }
    .el-menu--horizontal>.el-menu-item{
      border:none;
      width:180px;
      text-align: center;
      padding:0;
    }
    .el-submenu [class^=el-icon-]{
font-size:20px;
vertical-align: inherit;
    }
</style>
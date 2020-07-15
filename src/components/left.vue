<template>
  <div class="div-left">
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <el-menu class="side-container"
      mode="vertical"
      default-active="1"
        :show-timeout="200"
        unique-opened
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#247495">
      <el-menu-item index="1" @click="goTo('../views/home/index')">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>矩阵智能车</span>
        </template>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <router-link to="../views/home/home1">导航二</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
    name:"leftbar",
    data(){
        return {
     
    
        }
    },
    methods:{
      goTo(path) {
      this.$router.replace(path);
    }
    }
    
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .div-left{
//   width:200px;
//   background-color:#304156;
// }
.el-menu.el-menu--horizontal{
border:none;
}
.scrollbar-wrapper.el-scrollbar__wrap{
  margin-right: -19px!important;
}
</style>
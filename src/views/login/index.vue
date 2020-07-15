<template>
  <div>
    <div class="login-container">
      <el-form class="login-form animated zoomInDown" autocomplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <h3 class="title animated bounceInDown delay-1s" ref="htitle">智能操控系统</h3>
        <el-form-item prop="username" class="animated fadeInDown delay-2s">
          <span class="svg-container svg-container_login">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input name="userId" type="text" v-model="loginForm.username" autocomplete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password" class="animated fadeInDown delay-3s">
          <span class="svg-container">
            <i class="iconfont icon-mima"></i>
          </span>
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLoginClick"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="密码"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <i class="iconfont icon-yanjing"></i>
          </span>
        </el-form-item>
        <el-form-item class="item-button animated fadeInUp delay-4s">
          <el-button
            type="primary"
            style="width:100%;"
            :loading="loading"
            @click.native.prevent="handleLoginClick('loginForm')"
            class="sub-button"
          >登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import {mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: "login",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "admin"
      },
      loginRules: {
        password: [
          { required: true, trigger: "blur", validator: validatePass }
        ],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      loading: false,
      pwdType: "password"
    };
  },
  // 路由守卫，退出后清空用户信息
    beforeRouteEnter(to, from, next) {
      // ...
         next(vm => {
         vm.$store.dispatch("setUser", null);
            });
    },
  mounted() {
    // if (localStorage && localStorage.getItem("userInfo")) {
    //   clearLoginInfo();
    //   window.location.reload();
    // }
    setTimeout(() => {
      this.$refs.htitle.className = "title animated rubberBand infinite";
    }, 2000);
    this.initAnimate();
  },
  methods: {
    // ...mapActions(['setUser']),
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLoginClick() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          // 点击登录
          this.$axios.get("../../static/data.json").then(res => {
                        let users = [];
                            for (let key in res.data.data) {
                                users.push(res.data.data[key]);
                            }
                            let isUser=users.filter(item=>{
                                return (
                                    item.username==this.loginForm.username && item.password==this.loginForm.password
                                )
                            })
                            // console.log(isUser)
                            if(isUser!=null&&isUser.length>0){
                              // 把登录信息保存到localStorge
                              // const userInfo=isUser;
                              // localStorage.setItem("userInfo")
                               this.$store.dispatch("setUser",isUser[0].username);
                               this.$router.push({path: this.redirect || "/mains"});
                            }else{
                              this.$message({
                                         showClose: true,
                                         message: '请输入有效的用户名和密码！',
                                         type: 'error'
                                 });
                              this.$store.dsipatch("setUser",null);
                            }
                    }).catch(err => {
                        // reject(err);
                    })
        } else {
          return false;
        }
      });
    },
    
    initAnimate() {
      var mx, my;
      var z = 2;
      $(document).on("click", (e) => {
        mx = e.pageX;
        my = e.pageY;
        z = z + 1;
        this.waveMove(mx, my, z);
      });
    },
    waveMove(i, j, k) {
      $('.login-container').prepend(
    '<div class="wave-position water' + k + '" style="z-index:' + k + ';top:' + (j) + 'px;left:' + (i) + 'px;position:absolute;">' +
    '<div class="wave-body">' +
    '<div class="wave wave2"></div>' +
    '<div class="wave wave1"></div>' +
    '<div class="wave wave0"></div>' +
    '</div>' +
    '</div>'
  );
      setTimeout(function() {
        $(".water" + k).remove();
      }, 3000);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/bj04.jpg") no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  overflow: hidden;
  cursor: pointer;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    position: relative;
    top: 2px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .sub-button {
    display: block;
    position: relative;
    font-family: "Ubuntu", sans-serif;
    font-size: 15px;
    text-decoration: none;
    overflow: hidden;
    -webkit-transition: all 0.15s ease-out;
    transition: all 0.15s ease-out;
    background-color:#247494;
    border:none;
  }
  .sub-button:before {
    content: " ";
    position: absolute;
    background: #fff;
    width: 25px;
    height: 50px;
    top: 0;
    left: -60px;
    opacity: 0.3;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
    -webkit-transform: skewX(-50deg);
    transform: skewX(-50deg);
  }
  .sub-button:hover {
    background: #009999;
  }
  .sub-button:hover:before {
    width: 45px;
    left: 470px;
  }

  .g-position {
    position: absolute;
    width: 80vmin;
    height: 80vmin;
  }
  .g-center {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .wave {
    position: absolute;
    top: calc((100% - 30px) / 2);
    left: calc((100% - 30px) / 2);
    width: 0;
    height: 0;
    border-radius: 350px;
    background: url("../../assets/images/bj04.jpg");
    background-attachment: fixed;
    background-position: center center;
  }
  .wave0 {
    z-index: 2;
    background-size: auto 106%;
    animation: w 1s forwards;
  }
  .wave1 {
    z-index: 3;
    background-size: auto 102%;
    animation: w 1s 0.2s forwards;
  }
  .wave2 {
    z-index: 4;
    background-size: auto 104%;
    animation: w 1s 0.4s forwards;
  }
  @keyframes w {
    0% {
      top: calc((100% - 30px) / 2);
      left: calc((100% - 30px) / 2);
      width: 30px;
      height: 30px;
    }
    100% {
      top: calc((100% - 400px) / 2);
      left: calc((100% - 400px) / 2);
      width: 400px;
      height: 400px;
      opacity: 0;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px;
    margin: 10% auto;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    z-index: 99999;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    font-size: 20px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .item-button {
    position: relative;
    top: 10px;
  }

  // animate

  @import url("./login.scss");
}
</style>
<template>
  <div class="welcome-wrapper clearfix">
    <h3 class="medium">欢迎来到豪驰智能操控系统！</h3>
    <!-- <h2 class="medium">{{this.$store.state.count}}</h2> -->
    <!-- <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ name }}，欢迎来到豪驰智能操控系统！</h3>
      </el-carousel-item>
    </el-carousel>-->
    <!-- <home-value :msg="msg" @changeName="getName" ref="mycom"></home-value>
    <p ref="myp">用户名：{{user}}</p>
    <button @click="fun">点我</button>
    <input type="number" v-model="something"><button @click="addState(something)">点击增加</button>-->
    <!-- 获取state和getters中的数据 -->
    <!-- <h3 v-show="isShow">state中的数据：{{this.$store.state.count}}</h3> -->
    <!-- <h3 v-show="isShow">getters中的数据：{{this.$store.getters.getCount}}</h3> -->
    <!-- <h3 v-show="isShow">...map獲取：{{count1}}</h3> -->
    <el-table :data="tableData" style="width: 300px;height:100%;float:left;">
      <el-table-column fixed prop="date" label="日期" width="100"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="province" label="省份" width="100"></el-table-column>
    </el-table>
    <!-- <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
      </div>
    </div>-->
    <div id="container"></div>
    <button type="button" @click="socket">点击获取websocket</button>
    <button type="button" @click="socketSend">点击发送websocket</button>
    <!-- <p>{{this.$store.state.socketmsg}}</p> -->
    <div id="container2"></div>
    <video
      id="myPlayer"
      src=""
      width="400"
    height="300"
    autoplay
      controls
      playsinline
      webkit-playsinline
    ></video>
    <div class="btn-container">
      <button type="button" @click="play1">初始化播放</button>
      <button type="button" id="stop">结束</button>
    </div>
  </div>
</template>

<script>
import { HandleGetAPI, HandlePostAPI } from "@/utils/api";
// import homeValue from "./home1";
import { mapState, mapGetters, mapActions } from "vuex";
import qs from "qs";
import "@/assets/js/ezuikit";

export default {
  name: "home",
  components: {
    // homeValue
  },
  data() {
    return {
      // socket: null,
      msg: "这是父组件中的值",
      value: "1111111",
      user: "",
      something: null,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海"
        }
      ],
      pointList: [
        //地图数据
        {
          lng: 116.397428,
          lat: 39.90923
        },
        {
          lng: 116.397428,
          lat: 39.90923
        },
        {
          lng: 116.397428,
          lat: 39.90923
        },
        {
          lng: 116.397428,
          lat: 39.90923
        }
      ],
    };
  },
  computed: {
    // 练习vuex
    // 通过map  ...扩展运算符获取vuex数据简写代码  推荐使用
    // ...mapState({
    //   count1:state=>state.count
    // }),
    // 通过getters中的方法获取值或方法跟通过actions中的方法获取效果是一样的
    // ...mapGetters([
    //   'getCount',
    //   'isShow'
    // ]),
    // ...mapActions([
    //   'getAddCount',
    //   'isShow'
    // ]),
    // socket数据 监听数据变化
    // getWsMsg() {
    //   //  在核心代码接收到的服务端信息存储到vuex的属性
    //   return this.$store.state.socketmsg;
    // }
  },
  created() {
    // this.initWeb();
    // socket3建立连接
    // this.$setWs.initWebSocket("/spring_websocket_war/websocket");
    // console.log(this.$store.state.socketmsg);
    // this.$setWs.wsMsg = msg => {
    //   console.log(msg.data);
    // };
  },
  mounted() {
    // 海康
   
    //要异步一下，加个延迟就好了，等页面上的数据都加载好了在执行初始化地图
    setTimeout(() => {
      this.initMap();
      // this.initMap2();
      // this.initroad();
    }, 1000);
  },
  watch: {
    // getWsMsg(val) {
    //   //  监听socket数据变化
    //   if (val) {
    //     let reData = "";
    //     this.$store.commit("resetwebsocketmsg", reData);
    //   }
    // }
  },
  methods: {
    // 监控直播
    play1(){
      var url = "http://hls.open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8";
      $('#myPlayer').attr("src", url);
      var player = new EZUIKit.EZUIPlayer('myPlayer');
      // 日志
      player.on();
      $("#stop").click(function () {
        player.stop();
      })
    },
    // socket3请求方法调用
    socket() {
      //   // 请求方法
      let params = { name: 111 };
      // post请求
      // HandlePostAPI("postTest", qs.stringify(params))
      //   .then(res => {
      //     if (res.code == 200) {
      //       this.$message({
      //         message: "请求成功",
      //         type: "success"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error(err.msg);
      //   });
      // // get请求
      // HandleGetAPI("getTest", params, "params")
      //   .then(res => {
      //     if (res.code == 200) {
      //       this.$message({
      //         message: "请求成功",
      //         type: "success"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.$message.error(err.msg);
      //   });
      // socket请求
      this.$setWs.initWebSocket('/spring_websocket_war/websocket');
      // this.$setWs.wsMsg=(msg)=>{
      //   console.log(msg.data)
      // }
    },
    socketSend() {
      let action = { test: "12345" };
      this.$setWs.wsSend(JSON.stringify(action));
    },
    // 创建地图
    initMap() {
      //创建地图
      var map = new AMap.Map("container", {
        zoom: 4
      });

      AMapUI.load(["ui/misc/PathSimplifier", "lib/$"], function(
        PathSimplifier,
        $
      ) {
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }

        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          //autoSetFitView:false,
          map: map, //所属的地图实例

          getPath: function(pathData, pathIndex) {
            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              //point
              return (
                pathData.name +
                "，点：" +
                pointIndex +
                "/" +
                pathData.path.length
              );
            }

            return pathData.name + "，点数量" + pathData.path.length;
          },
          renderOptions: {
            renderAllPointsIfNumberBelow: 100 //绘制路线节点，如不需要可设置为-1
          }
        });

        window.pathSimplifierIns = pathSimplifierIns;

        //设置数据
        pathSimplifierIns.setData([
          {
            name: "路线0",
            path: [
              [116.405289, 39.904987],
              [113.964458, 40.54664],
              [111.47836, 41.135964],
              [108.949297, 41.670904],
              [106.380111, 42.149509],
              [103.774185, 42.56996],
              [101.135432, 42.930601],
              [98.46826, 43.229964],
              [95.777529, 43.466798],
              [93.068486, 43.64009],
              [90.34669, 43.749086],
              [87.61792, 43.793308]
            ]
          }
        ]);

        //对第一条线路（即索引 0）创建一个巡航器
        var navg1 = pathSimplifierIns.createPathNavigator(0, {
          loop: true, //循环播放
          speed: 1000000 //巡航速度，单位千米/小时
        });
        navg1.start();
      });
    }

    // 练习vuex
    // addState(something) {
    //   // this.$store.commit("addCount", 2); // 直接调用mutations中的方法时用addCount
    //   this.$store.dispatch('getAddCount',parseInt(something)) // 调用actions中方法时用dispatch  推荐使用此方法
    // },
    // 父组件里用changeName事件调用getName方法获取从子组件传递过来的username
    // getName(msg) {
    //   this.user = msg;
    //   //  console.log(this.$refs.son.user)
    // },
    // fun() {
    //   console.log(this.$refs.myp.innerText);
    //   console.log(this.$refs.mycom.username);
    // }
  },
  // 清除定时
  destroyed() {
    //结束
    // socket3销毁监听 关闭连接
    // this.$setWs.wsClose();
  }
};
</script>

<style scoped lang="scss">
.welcome-wrapper {
  width: 100%;
}
.el-carousel__container {
  height: 300px !important;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 25px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: rgb(48, 65, 86);
  h3 {
    color: rgb(191, 203, 217);
  }
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: rgb(191, 203, 217);
  h3 {
    color: rgb(48, 65, 86);
  }
}
.amap-page-container {
  width: 500px;
  height: 500px;
  float: left;
  margin-left: 10px;
}
.video-js {
  width: 400px;
  height: 300px;
  overflow: hidden;
  margin: 0 auto;
}
#container {
  width: 500px;
  height: 500px;
  float: left;
  margin-left: 10px;
}

// .video-js{
//     width:100%;
//     height:100%; 
//   }
</style>
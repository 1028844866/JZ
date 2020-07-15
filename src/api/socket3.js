 //这里需要引入vuex
 import store from '@/store';

 let wsConnection = {
     $ws: null,
     lockReturn: false,
     timeout: 60 * 1000 * 5,
     timeoutObj: null,
     timeoutNum: null,
     serverTimeoutObj: null,
     //初始化webSocket长连接
     initWebSocket: function(wsurl) {　
         if ('WebSocket' in window) {
             this.$ws = new WebSocket("ws://192.168.1.72:8088" + wsurl); //写入地址 这里的地址可以在initWebSocket方法加入参数
         } else if ('MozWebSocket' in window) {
             this.$ws = new MozWebSocket("ws://192.168.1.72:8088" + wsurl);
         }　　
         this.$ws.onopen = this.wsOpen;
         this.$ws.onclose = this.wsClose;
         this.$ws.onmessage = this.wsMsg;
         this.$ws.onerror = this.wsError;
     },
     //打开websocket
     wsOpen: function(e) {
         //开始websocket心跳
         wsConnection.startWsHeartbeat();
         //  let actions = { "test": "12345" };
         //  this.wsSend(JSON.stringify(actions))
         console.log('ws success')
     },
     wsSend: function(data) {
         this.$ws.send(data)
         console.log('ws send')
     },
     wsClose: function(e) {
         console.log(e, 'ws close')
     },
     wsMsg: function(msg) {
         //每次接收到服务端消息后 重置websocket心跳
         wsConnection.resetHeartbeat();
         //服务端发送来的消息存到vuex
         store.commit('websocketmsg', msg)
     },
     wsError: function(err) {
         console.log(err, 'ws error');
         wsConnection.reconnect()
     },
     //重启websocket
     reconnect: function() {
         let _this = this;
         if (_this.lockReturn) {
             return;
         }
         _this.lockReturn = true;
         _this.timeoutNum && clearTimeout(_this.timeoutNum);
         _this.timeoutNum = setTimeout(function() {
             _this.initWebSocket();
             _this.lockReturn = false;
         }, 3000);
     },
     startWsHeartbeat: function() {
         let _this = this;
         _this.timeoutObj && clearTimeout(_this.timeoutObj);
         _this.serverTimeoutObj && clearTimeout(_this.serverTimeoutObj);
         _this.timeoutObj = setInterval(function() {
             //判断websocket当前状态
             if (_this.$ws.readyState != 1) {
                 _this.reconnect()
             }
         }, _this.timeout);
     },
     //重置websocket心跳
     resetHeartbeat: function() {
         let _this = this;
         clearTimeout(_this.timeoutObj);
         clearTimeout(_this.serverTimeoutObj);
         _this.startWsHeartbeat()
     }
 };
 // 使用方法 在使用地方调用
 //   this.$setWs.initWebSocket();

 //  //在需要使用服务端推送过来的消息时
 //  //在computed方法声明
 //  getWsMsg() {
 //     //在核心代码接收到的服务端信息存储到vuex的属性
 //      return this.$store.state.websocketmsg
 //  }
 //  //在watch方法   监听  getWsMsg  
 //   getWsMsg: function (data, val) {
 //     console.log(data);
 //     //.......
 //  }      
 //抛出websocket对象
 export default wsConnection
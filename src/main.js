// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAMap from 'vue-amap'
VueAMap.initAMapApiLoader({
    key: 'e6db44ba03aab8320e500b1618a57134',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.Riding'],
    uiVersion: '1.0', // ui库版本，不配置不加载,
    v: '1.4.4'
});

Vue.use(VueAMap);

// 引入vue-video-player
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
    // import * as socketApi from './api/socket'
    // Vue.prototype.socketApi = socketApi
    //路由权限
    // import "./permission"

Vue.config.productionTip = false
    // elementUI 导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import jQuery from 'jquery'
window.$ = jQuery

// 调用插件
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios)
import "@/styles/index.scss"; // global css
/* eslint-disable no-new */

router.beforeEach(function(to, from, next) {
    if (store.state.currentuser || to.path === '/') {
        next();
    } else {
        next({ path: '/' })
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
import Vue from 'vue'
import Vuex from 'vuex'
import wsConnection from '@/api/socket3'
//挂载vue原型链
Vue.prototype.$setWs = wsConnection;
Vue.use(Vuex) //使用vuex

const store = new Vuex.Store({
    state: { //存储数据
        // 'WS': socket,
        socketmsg: null,
        // 练习demo
        // count: 0,
        // // 练习demo
        // changeShow: true,
        // commitsum: {},
        // isLogin: false, //用来显示是否登录
        // currentuser: null //用来显示用户信息是否显示
    },
    mutations: { //用来更改数据状态
        // 练习demo
        // addCount(state, num) {
        //     state.count = state.count + num;
        // },
        // // 练习demo
        // show(state) { //自定义改变state初始值的方法，参数除了state之外还可以传其他的参数（变量或对象）
        //     state.changeShow = true;
        // },
        // socket数据
        websocketmsg(state, resdata) {
            state.socketmsg = resdata;
        },
        resetwebsocketmsg(state, resdata) {
            state.socketmsg = resdata;
        }
        // setcommit(state, data) {
        //     state.commitsum = data
        // },
        // remove(state, data) {
        //     state.commitsum.forEach((item, index) => {
        //         if (item == data) {
        //             state.commitsum.splice(index, 1)
        //         }
        //     })
        // },
        // adddata(state, data) {
        //     state.commitsum.push(data)
        // },
        // // 更改用户状态信息
        // userStatus(state, user) {
        //     if (user) {
        //         state.currentuser = user;
        //         state.isLogin = true
        //     } else {
        //         state.currentuser = null;
        //         state.isLogin = false
        //     }
        // }
    },
    actions: { //应用mutations
        // 类似于mutations  调用mutations里面的方法 context与store实例具有相同的方法和属性
        // 练习demo
        // getAddCount(context, num) {
        //     context.commit('addCount', num)
        // },
        // // 练习demo
        // isShow(context) {
        //     context.commit('mutations/show')
        // },
        // setUser({ commit }, user) {
        //     commit("userStatus", user)
        // }
    },
    getters: { //获得数据状态 监听state值得变化（最新状态）类似于组件的computed,方便直接生成一些可以直接用的数据，当组装的数据在多个页面使用时可以使用getters来做
        // 练习demo
        // getCount(state) {
        //     return state.count
        // },
        // isShow(state) {
        //     return state.changeShow
        // },
        // getIsLogin: state => state.isLogin,
        // getCurrentuser: state => state.currentuser,

        // socket数据
        socketmsg: state => state.socketmsg
    }
})

export default store //导出store文件
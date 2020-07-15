import Vue from "vue"
import Router from "vue-router"
// import login from '@/views/login/index'
import home from '@/views/home/index'
import mains from '@/views/mains/Appmain'

// 这里导入可以让让用户访问的组件

Vue.use(Router);

export default new Router({
    // 设置路由模式为‘history’，去掉默认的#
    // mode: "history",
    base: process.env.BASE_URL,
    routes: [
        // 路由列表
        // {
        //     path: '/',
        //     name: 'login',
        //     component: login,
        // },
        {
            path: "/",
            name: 'mains',
            component: mains,
            children: [{
                path: '',
                component: home
            }]
        },


    ]
})
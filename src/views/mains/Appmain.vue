<template>
    <div class="app-wrapper">
        <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div> -->
        <header-bar class="sidebar-container" :logo="logo"></header-bar>
        <section style="height:calc(100vh-61px);display:flex">
            <left-bar></left-bar> 
            <article class="main-container" style="box-sizing:border-box;" :style="{width:'calc(100vw-'+leftWidth+'px)'}">
                <transition name="el-fade-in-linear" mode="out-in">
                 <router-view></router-view>
                </transition>
            </article>
        </section>
    </div>
</template>

<script>
    import HeaderBar from '@/components/Header'
    import LeftBar from '@/components/left'
    
    export default {
        name: 'mains',
        components: {
            HeaderBar,
            LeftBar
        },
        data() {
            return {
               leftWidth:201,
               logo:"这是logo"
            }
        },
        
        methods: {

        }
           
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>

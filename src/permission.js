import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式'

//设置白名单页面
const whiteList = ['/login', '/404']

//前置路由守卫 
router.beforeEach(async (to, from, next) => {
    //开始进度条
    NProgress.start()
    //跳转前判断是否有token
    if (store.getters.token) {
        //判断跳转的是否是登录页
        if (to.path === '/login') {
            //跳转主页
            next('/')
        } else {
            //要访问的不是登录页
            //判断是否获取了用户信息、
            if (!store.getters.userId) {
                //没有用户资料，获取
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    } else {
        //没有token
        // 判断是否要访问白名单页面
        if (whiteList.indexOf(to.path) > -1) {
            //要访问白名单页面
            next()//放行
        } else {
            //访问的不是白名单页面
            next('/login')//跳转登录页
        }
    }
    NProgress.done()
})
//后置路由守卫
router.afterEach((to, from) => {
    NProgress.done()
})
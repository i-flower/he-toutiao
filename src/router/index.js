// 进行路由发热初始化 和配置
// 导入vue-router
import VueRouter from 'vue-router'
// 注册 vue
import Vue from 'vue'
Vue.use(VueRouter)

// 导入login组件
import Login from '@/views/login'
// 导入home组件
import Home from '@/views/home'
// 导入欢迎页面组件
import Welcome from '@/views/welcome'
// 导入404页面组件
import NotFount from '@/views/404'

// 初始化router 
const router = new VueRouter({
    routes: [
        // 登录
        { path: '/login', component: Login },
        // 首页
        { path: '/', component: Home ,children:[
            // 欢迎页面
            { path: '/', component: Welcome},

        ]},
        // 404页面  通配以上规则没有的地址
        // 注意：该路由规则应该写在所有规则的下面。
        { path: '*', component: NotFount}
    ]
})
// 导出 router实例
export default router

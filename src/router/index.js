// 进行路由发热初始化 和配置
// 导入
import VueRouter from 'vue-router'
// 注册
import Vue from 'vue'
Vue.use(VueRouter)

// 导入login组件
import Login from '@/views/login'

// 导入home组件
import Home from '@/views/home'
// 初始化
const router = new VueRouter({
    routes: [
        // 登录
        { path: '/login', component: Login },
        { path: '/', component: Home }
    ]
})
// 导出
export default router

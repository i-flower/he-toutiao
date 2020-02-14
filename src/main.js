// 导包（第三方|自己的）
import Vue from 'vue'
import App from './App.vue'

// 导入axios
// import axios from 'axios'
import axios from '@/api'

// 导入路由
// import router from './router/index.js'
// 1.如果 router/index.js 可以省略router 默认访问index.js文件
// 2. ./ ../ 去找到对应的目录并不是很准确  使用vue-cli提供的@（相当于src路径）
import router from '@/router'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 注册全局面包屑组件
// import MyBread from '@/components/my-bread'
// Vue.component('my-bread', MyBread)

// 使用自己注册的面包屑插件
import Plugin from '@/plugin'
Vue.use(Plugin)

// 导入自己的样式
import '@/styles/index.less'

// 导入

// 使用饿了么ui
Vue.use(ElementUI);
//  使用axios
Vue.prototype.$http = axios

// 配置vue框架的日志级别 productTip
// false 不是生产环境级别日志，开发环境日志，日志详细
// true 生产环境级别日志，上线之后部署服务器之后，日志简单
Vue.config.productionTip = false

// 根实例
// 使用App.vue徐建渲染到 #app容器中
// (conmponents公用级别组件) (views 页面级别的组件)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// main.js 的职责
// 项目需要的资源需要导入到main.js
// 常见一个vue根实例
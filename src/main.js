// 导包（第三方|自己的）
import Vue from 'vue'
import App from './App.vue'

// 配置vue框架的日志级别 productTip
// false 不是生产环境级别日志，开发环境日志，日志详细
// true 生产环境级别日志，上线之后部署服务器之后，日志简单
Vue.config.productionTip = false

// 根实例
// 使用App.vue徐建渲染到 #app容器中
// (conmponents公用级别组件) (views 页面级别的组件)
new Vue({
  render: h => h(App)
}).$mount('#app')

// main.js 的职责
// 项目需要的资源需要导入到main.js
// 常见一个vue根实例
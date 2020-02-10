// 导入axios
import axios from 'axios'
// 导入auth
import auth from '@/utils/auth'
// 导入router
import router from '@/router'

// 进行默认配置
// 请求的时候：基准地址
axios.defaults.baseURL ='http://ttapi.research.itcast.cn/mp/v1_0/'

// 默认配置：headers
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 配置请求拦截器
axios.interceptors.request.use(config => {
    // 获取到用户信息
    const user = auth.getUser()
    // 每次请求后台的时候，如果有token，需要给请求头携带token 
    if (user.token) config.headers.Authorization ='Bearer ${user.token}'
    // config表示配置，返回配置好的config在发请求的时候使用
    return config
},error => {
    // 把错误封装成一个错误的promise对象，提供给axios使用，固定写法
    return Promise.reject(error)
})

// 配置响应拦截器
axios.interceptors.response.use(res => {
    // 响应成功  触发该函数
    // response 就是响应对象（响应状态行|响应头|响应主体）
    // 对响应数据做点什么
  	// 将来 then(res) 就是这个response
    return res
}, err => {
     // 根据当前的响应状态码是不是401去跳转登录页面
     // err 对象包含 错误的时候响应对象 err.response
     // 状态码  err.response.status 就是
       if(err.response && err.response.status === 401) {
         // 如果是vue组件中：this.$router.push('/login')  路由实例$router提供push函数
         // 如果在js模块中：导入创建好的实例对象调用push函数即可
         router.push('/login')
       }
    return Promise.reject(err)
})

export default axios
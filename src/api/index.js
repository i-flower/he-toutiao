// 导入axios
import axios from 'axios'
// 导入auth
import auth from '@/utils/auth'

// 进行默认配置
// 请求的时候：基准地址
axios.defaults.baseURL ='http://ttapi.research.itcast.cn/mp/v1_0/'

// 默认配置：headers
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

// 配置请求拦截器
axios.interceptors.request.use((config) => {
    // 获取到用户信息
    const user = auth.getUser()
    // 每次请求后台的时候，如果有token，需要给请求头携带token 
    if (user.token) config.headers.Authorization ='Bearer ${user.token}'
    // config表示配置，返回配置好的config在发请求的时候使用
    return config
},(error) => {
    // 把错误封装成一个错误的promise对象，提供给axios使用，固定写法
    return Promise.reject(error)
})

export default axios
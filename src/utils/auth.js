// 封装一个工具模块，操作本地的用户信息
// 提供 操作本地用户信息的 工具函数
// 定义一个具有语义化的数据名称 value是json字符串
const KEY = 'hm-toutiao-pc-user'

// 获取用户信息
const setUser = (user) => {
    // sessionStorage.setItem('数据名称','具体数据')
    // 考虑：有可能之前为存储过用户信息 获取到的值为空null
    // 返回： 最好是独享，需要转换成对象，如果没有获取到值，默认一个{}  空对象即可
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
}
// 获取用户信息
const getUser = () => {
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
// 删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(KEY)
}

// 导出
export default {
    setUser,
    getUser,
    delUser
}

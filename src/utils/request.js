import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeKey } from '@/utils/auth'
import router from '@/router'
//设置token失效时间
const TimeOut = 3600
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            //有token，检查是否超时
            if (!checkTimeOut(getTimeKey())) {
                //超时，跳转登录页，清空token
                store.dispatch('user/logout')
                router.push('/login')
                //报错
                return Promise.reject(new Error('身份验证失效，请重新登陆！'))
            }
            config.headers['Authorization'] = 'Bearer ' + store.getters.token
        }
        return config
    }, error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 结构数据，去除axios自动添加的data
        const { success, message, data } = response.data
        if (success) {
            return data
        } else {
            Message.error(message)
            return Promise.reject(new Error(message))
        }
    }, error => {
        //查验token
        if (error.response && error.response.data && error.response.data.code === 10002) {
            //后端表示token失效
            store.dispatch('user/logout')
            router.push('/login')
            return Promise.reject(error)
        }
        Message.error(error.message)
        return Promise.reject(error)
    }
)

function checkTimeOut(timeOut) {
    const nowTime = Date.now()
    return (nowTime - timeOut) / 1000 < TimeOut
}
export default service // 导出axios实例

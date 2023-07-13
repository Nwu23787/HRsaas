import request from '@/utils/request'


/**
 * 登陆接口路由
 */
export function login(data) {
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

/**
 * 
 * 获取用户信息接口 
 */
export function getUserInfo() {
    return request({
        url: '/sys/profile',
        method: 'get',
    })
}

export function logout() {

}

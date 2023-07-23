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
        method: 'post',
    })
}

/**
 * 根据用户ID获取用户基本信息
 */
export function getUserDetailById(id) {
    return request({
        url: `/sys/user/${id}`
    })
}



export function logout() {

}

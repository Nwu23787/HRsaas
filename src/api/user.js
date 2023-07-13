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

export function getInfo(token) {

}

export function logout() {

}

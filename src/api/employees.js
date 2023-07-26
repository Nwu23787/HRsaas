import request from '@/utils/request'

/***
 * 
 * 获取员工简单信息接口
 * 
 */
export function getSimpleEmployees() {
    return request({
        url: '/sys/user/simple'
    })
}


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


/***
 * 
 * 获取员工列表接口
 * 
 */
export function getEmployeeList(params) {
    return request({
        url: '/sys/user',
        params
    })
}

/***
 * 
 * 删除员工接口
 * 
 */
export function delEmployee(id) {
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}
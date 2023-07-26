import request from '@/utils/request'

/***
 * 
 * 获取公司部门结构信息
 * 
 */
export function getDepartmentList() {
    return request({
        url: '/company/department'
    })
}

/***
 * 
 * 删除部门
 * 
 */
export function delteDepartment(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'delete'
    })
}

/***
 * 
 * 添加部门接口
 * 
 */
export function addDepartment(data) {
    return request({
        url: '/company/department',
        method: 'post',
        data
    })
}

/***
 * 
 * 根据id获取部门详情
 * 
 */
export function getDepartmentDetail(id) {
    return request({
        url: `/company/department/${id}`,
    })
}

/**
 * 
 * 提交编辑部门
 *
 * ***/
export function updateDepartments(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'put',
        data
    })
}
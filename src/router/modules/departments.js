//部门设置的路由规则
import Layout from '@/layout'

export default {
    path: '/departments',
    name: 'departments',
    component: Layout,
    children: [{
        path: '',
        component: () => import('@/views/departments'),
        meta: {
            title: '部门设置',
            icon: 'tree'
        }
    }]
}
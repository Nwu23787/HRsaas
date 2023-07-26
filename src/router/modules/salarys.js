//工资管理的路由规则
import Layout from '@/layout'

export default {
    path: '/salarys',
    name: 'salarys',
    component: Layout,
    children: [{
        path: '',
        component: () => import('@/views/salarys'),
        meta: {
            title: '工资管理',
            icon: 'money'
        }
    }]
}
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)// 读取所有的.svg后缀的文件
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
// 以上两行代码就是将svg目录下的所有的.svg后缀的文件全都引入到项目里

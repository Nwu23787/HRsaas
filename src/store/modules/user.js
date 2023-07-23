//引入操作cookie的模块
import { getToken, setToken, removeToken, setTimeKey, getTimeKey } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
}

const mutations = {
  //设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  //设置用户信息
  setUserInfo(state, result) {
    state.userInfo = result
  },
  //删除用户信息
  deleteUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  //登录
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    //设置时间戳
    setTimeKey()
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    //获取用户详情，得到头像数据
    const baseInfo = await getUserDetailById(result.userId)
    //合并接口数据
    const obj = { ...result, ...baseInfo }
    context.commit('setUserInfo', obj)//提交到mutations
    return result
  },
  //退出登录
  logout(context) {
    context.commit('removeToken')
    context.commit('deleteUserInfo')
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

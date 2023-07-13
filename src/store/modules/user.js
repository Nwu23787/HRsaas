//引入操作cookie的模块
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
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
  }
}

const actions = {
  async login(context, data) {
    const result = await login(data)
    console.log(result);
    context.commit('setToken', result)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

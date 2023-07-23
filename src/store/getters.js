const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 在根级的getters上 开放子模块的属性
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto//头像
}
export default getters

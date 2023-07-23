import Cookies from 'js-cookie'

const TokenKey = 'saas_token'
//时间戳
const timeKey = 'saas-timeStamp-key'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

//获取时间戳
export function getTimeKey() {
  return Cookies.get(timeKey)
}

//设置时间戳
export function setTimeKey() {
  return Cookies.set(timeKey, Date.now())
}
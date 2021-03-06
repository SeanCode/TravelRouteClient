import Store from 'store'
import Const from './const'
import Config from './config'

export default {
  set: set,
  get: get,
  setToken: setToken,
  getToken: getToken,
  setUser: setUser,
  getUser: getUser,
  isGuest: isGuest,
  logout: logout,
  getAll: getAll,
  clear: clear,
  getUploadUrl: getUploadUrl
}

//  cache data
var tokenData
var userData

function getKey (key) {
  return Const.DATA.KEY_PREFIX + key
}

function get (key) {
  key = getKey(key)
  return Store.get(key)
}

function set (key, value) {
  key = getKey(key)
  return Store.set(key, value)
}

function setToken (token) {
  tokenData = token
  set(Const.DATA.KEY_TOKEN, token)
}

function getToken () {
  if (!tokenData) {
    tokenData = get(Const.DATA.KEY_TOKEN)
  }
  return tokenData
}

function setUser (user) {
  userData = user
  set(Const.DATA.KEY_USER, user)
}

function getUser () {
  if (!userData) {
    userData = get(Const.DATA.KEY_USER)
  }
  return userData
}

function isGuest () {
  return !getToken()
}

function logout () {
  setToken(undefined)
  setUser(undefined)
}

function getAll () {
  return Store.getAll()
}

function clear () {
  tokenData = undefined
  userData = undefined
  Store.clear()
}

function getUploadUrl () {
  var endPoint = Config.IS_DEBUG ? Const.NET.END_POINT_DEBUG : Const.NET.END_POINT_RELEASE
  return endPoint + Const.NET.API_PATH + Const.NET.API.UPLOAD_IMG
}

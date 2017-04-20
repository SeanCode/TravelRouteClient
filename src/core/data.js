import Store from 'store'
import Const from './const'

export default {
  set: set,
  get: get,
  setToken: setToken,
  getToken: getToken,
  setUser: setUser,
  getUser: getUser,
  setAdmin: setAdmin,
  getAdmin: getAdmin,
  isGuest: isGuest,
  logout: logout,
  getAll: getAll,
  clear: clear
}

//  cache data
var tokenData
var userData
var adminData

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

function setAdmin (admin) {
  adminData = admin
  set(Const.DATA.KEY_ADMIN, admin)
}

function getAdmin () {
  if (!adminData) {
    adminData = get(Const.DATA.KEY_ADMIN)
  }
  return adminData
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
  adminData = undefined
  userData = undefined
  Store.clear()
}

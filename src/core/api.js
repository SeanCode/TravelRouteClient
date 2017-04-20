import Const from './const'
import Log from './log'
import Data from './data'
import Util from './util'
import Config from './config'
import Vue from 'vue'

export default {
  USER: {
    login: function (username, password) {
      var hash = 'Basic ' + Util.Base64.encode(username + ':' + password)
      return post(Const.NET.API.USER_LOGIN, {}, {Authorization: hash}, true)
    },
    register: function (username, name, phone, password) {
      return post(Const.NET.API.USER_REGISTER, {
        username: username,
        name: name,
        phone: phone,
        password: password
      })
    },
    update: function (name, username, password, phone, email) {
      return post(Const.NET.API.USER_UPDATE, {
        name: name,
        username: username,
        password: password,
        phone: phone,
        email: email
      })
    },
    addAdmin: function (username, name, phone, password, role) {
      return post(Const.NET.API.USER_ADD_ADMIN, {
        username: username,
        name: name,
        phone: phone,
        password: password,
        role: role
      })
    },
    deleteUser: function (username) {
      return post(Const.NET.API.USER_DELETE, {
        username: username
      })
    },
    getUserList: function (role, page) {
      return get(Const.NET.API.USER_LIST, {
        role: role,
        page: page
      })
    }
  },
  DESTINATION: {
    query: function (dest) {
      return get(Const.NET.API.DEST_LIST, {
        dest: dest
      })
    },
    getDestDetail: function (id) {
      return get(Const.NET.API.DEST_DETAIL, {
        id: id
      })
    },
    saveDestination: function (id, name, intro, info, dest, img) {
      return post(Const.NET.API.DEST_SAVE, {
        id: id,
        name: name,
        intro: intro,
        info: info,
        dest: dest,
        img: img
      })
    },
    delete: function (id) {
      return post(Const.NET.API.DEST_DELETE, {
        id: id
      })
    }
  },
  ROUTE: {
    getRouteList: function (destId) {
      return get(Const.NET.API.ROUTE_LIST, {
        dest_id: destId
      })
    },
    getRouteDetail: function (id) {
      return get(Const.NET.API.ROUTE_DETAIL, {
        id: id
      })
    },
    saveRoute: function (id, destId, name, price, intro, info, notice, img) {
      return post(Const.NET.API.ROUTE_SAVE, {
        id: id,
        dest_id: destId,
        name: name,
        price: price,
        intro: intro,
        info: info,
        notice: notice,
        img: img
      })
    },
    deleteRoute: function (id) {
      return post(Const.NET.API.ROUTE_DELETE, {
        id: id
      })
    }
  },
  ORDER: {
    createOrder: function (destId, routeId, beginTime, count, money, username, phone, note) {
      return post(Const.NET.API.ORDER_CREATE, {
        dest_id: destId,
        route_id: routeId,
        begin_time: beginTime,
        count: count,
        money: money,
        username: username,
        phone: phone,
        note: note
      })
    },
    getListCreated: function (page) {
      return get(Const.NET.API.ORDER_LIST_CREATED, {
        page: page
      })
    },
    getListReceived: function (page) {
      return get(Const.NET.API.ORDER_LIST_RECEIVED, {
        page: page
      })
    },
    updateStatus: function (id, status) {
      return post(Const.NET.API.ORDER_UPDATE_STATUS, {
        id: id,
        status: status
      })
    },
    deleteOrder: function (id) {
      return post(Const.NET.API.ORDER_DELETE, {
        id: id
      })
    }
  }
}

function post (api, data, requestHeaders, raw) {
  var endPoint = Config.IS_DEBUG ? Const.NET.END_POINT_DEBUG : Const.NET.END_POINT_RELEASE
  var url = endPoint + Const.NET.API_PATH + api
  Log.d(url + '?' + transformObjectToUrlencodedData(data))

  return Vue.http.post(url, transformObjectToUrlencodedData(data), {
    headers: configurePostHeaders(requestHeaders)
  }).then((response) => {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      Log.e(response.data)
      return Promise.reject(response.data)
    }
    return raw ? response : response.data.data
  }, function (error) {
    Log.e(error)
    return Promise.reject(error)
  })
}

function get (api, params, requestHeaders, raw) {
  var endPoint = Config.IS_DEBUG ? Const.NET.END_POINT_DEBUG : Const.NET.END_POINT_RELEASE
  var url = endPoint + Const.NET.API_PATH + api
  Log.d(url + '?' + transformObjectToUrlencodedData(params))

  return Vue.http.get(url, {
    params: params,
    headers: configureGetHeaders(requestHeaders)
  }).then(function (response) {
    if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
      return Promise.reject(response.data)
    }
    return raw ? response : response.data.data
  }, function (error) {
    Log.e(error)
    return Promise.reject(error)
  })
}

//  方便查看参数
function transformObjectToUrlencodedData (obj) {
  var p = []
  if (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === undefined) {
          obj[key] = ''
        }
        p.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      }
    }
  }
  return p.join('&')
}

// 如果已经登录则把token通过header发往server
function configureGetHeaders (requestHeaders) {
  if (!requestHeaders) {
    requestHeaders = {}
  }
  if (!requestHeaders.hasOwnProperty('Authorization')) {
    var token = Data.getToken
    if (token) {
      requestHeaders['Authorization'] = 'Basic ' + token
    }
  }
  return requestHeaders
}

function configurePostHeaders (requestHeaders) {
  if (!requestHeaders) {
    requestHeaders = {}
  }
  requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
  if (!requestHeaders.hasOwnProperty('Authorization')) {
    var token = Data.getToken()
    if (token) {
      requestHeaders['Authorization'] = 'Basic ' + token
    }
  }
  return requestHeaders
}

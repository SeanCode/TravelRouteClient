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

// function get (api, params, requestHeaders, raw) {
//   var endPoint = Config.IS_DEBUG ? Const.NET.END_POINT_DEBUG : Const.NET.END_POINT_RELEASE
//   var url = endPoint + Const.NET.API_PATH + api
//   Log.d(url + '?' + transformObjectToUrlencodedData(params))

//   return Vue.http.get(url, {
//     params: params,
//     headers: configureGetHeaders(requestHeaders)
//   }).then(function (response) {
//     if (!response.data.hasOwnProperty('code') || response.data.code !== 0) {
//       return Promise.reject(response.data)
//     }
//     return raw ? response : response.data.data
//   }, function (error) {
//     Log.e(error)
//     return Promise.reject(error)
//   })
// }

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

//  如果已经登录则把token通过header发往server
// function configureGetHeaders (requestHeaders) {
//   if (!requestHeaders) {
//     requestHeaders = {}
//   }
//   if (!requestHeaders.hasOwnProperty('Authorization')) {
//     var token = Data.getToken
//     if (token) {
//       requestHeaders['Authorization'] = 'Basic ' + token
//     }
//   }
//   return requestHeaders
// }

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

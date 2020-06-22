/**
 * 标准接口处理
 * token = sessionStorage.getItem('access_token') 
 * lng = sessionStorage.getItem('access_lng')
 * 修改时间：2019.8.23
 * 
 */
import axios from 'axios'
import qs from 'qs'

const WRT_config = window.WRT_config

// ??
//axios.defaults.withCredentials=true;
let defaultAxios = null;
// 提示信息
let defaultHint = {};
// 全局内容
let defaultGlobal = {};
let defaultAxiosCompatible = null;

/**
 * 配置默认的错误处理
 * @param {} hint .msg 提示信息
 */
export function setDefaultHint(hint) {
  hint = hint || {}
  defaultHint = hint
}

/**
 * @param {*} name 
 * local 语言： zh-CN en-US
 * auvo 登录信息
 *   .au_username
 *   .au_userid
 *   .au_right
 * csvo 经销商信息
 * 应用信息： 
 *   应用编码_名称
 * @param {*} value 
 */
export function setGlobal(name, value) {
  defaultGlobal[name] = value
}

export function hint(err) {
  if (defaultHint.msg) {
    return defaultHint.msg(err)
  }
  return false
}
let busyCount = 0;
export function showBusy() {
  busyCount++;
  if (defaultHint.showBusy) {
    defaultHint.showBusy()
    return true
  }
  return false
}
export function hideBusy() {
  busyCount--;
  if (defaultHint.hideBusy && busyCount <= 0) {
    busyCount = 0;
    defaultHint.hideBusy()
    return true
  }
  return false
}
export function getGlobal(name, defaultValue) {
  if (defaultGlobal[name]) {
    return defaultGlobal[name]
  }
  return defaultValue
}

export function getDefaultAxios() {
  if (!defaultAxios) {
    defaultAxios = getAxiosInstance();
  }
  return defaultAxios;
}

export function getDefaultAxiosCompatible() {
  if (!defaultAxiosCompatible) {
    defaultAxiosCompatible = getAxiosCompatibleInstance();
  }
  return defaultAxiosCompatible;
}

function getAxiosInstance(o) {
  o = o || {}
  var instance = axios.create({
    baseURL: o.server || WRT_config.server
    //headers: { 'Access-Token': "test", "Accept-Language":"*" }
  });
  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';

  instance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      config.headers["Authorization"] = token
    } else if (config.headers["Authorization"]) {
      delete config.headers["Authorization"]
    }
    const lng = sessionStorage.getItem('access_lng')
    if (lng) {
      config.headers["Accept-Language"] = lng
    } else if (config.headers["Accept-Language"]) {
      delete config.headers["Accept-Language"]
    }
    return config;
  }, err => {
    // 请求超时!

    // Promise.resolve ??
    return Promise.reject(err);
  });

  instance.interceptors.response.use(data => {
    if (data.errors) {
      // 处理错误？？
    }
    return data
  }, err => {
    //==============  错误处理  ====================
    if (err && err.response) {
      if (err.response.data && err.response.data.errors) {
        err.message = err.response.data.errors[0].title;
      } else {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)';
            break;
          case 401:
            err.message = '未授权，请重新登录(401)';
            break;
          case 403:
            err.message = '拒绝访问(403)';
            break;
          case 404:
            err.message = '请求出错(404)';
            break;
          case 408:
            err.message = '请求超时(408)';
            break;
          case 500:
            err.message = '服务器错误(500)';
            break;
          case 501:
            err.message = '服务未实现(501)';
            break;
          case 502:
            err.message = '网络错误(502)';
            break;
          case 503:
            err.message = '服务不可用(503)';
            break;
          case 504:
            err.message = '网络超时(504)';
            break;
          case 505:
            err.message = 'HTTP版本不受支持(505)';
            break;
          default:
            err.message = `连接出错(${err.response.status})!`;
        }
      }
    } else {
      err.message = '连接服务器失败!'
    }
    hint(err)
    return Promise.reject(err);
  })
  return instance;
}


export function getAxiosCompatibleInstance(o) {
  o = o || {};
  var instance = axios.create({
    baseURL: o.server || WRT_config.serverCompatible
  });
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  instance.interceptors.request.use(function (config) {
    showBusy();
    if (config.method === 'post') {
      if (typeof config.data === "object" && !config.data.t) {
        config.data.t = WRT_config.defaultT;
      }
      config.data = qs.stringify(config.data)
    }

    if (config.method === 'get') {
      if (typeof config.params === "object" && !config.params.t) {
        config.params.t = WRT_config.defaultT;
      }
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use(data => {
    hideBusy();
    /*if (data.data.rtnmsg && data.data.rtnmsg != "ok") {
      hint({message:data.data.rtnmsg})
      reject(data.data)
      return null
    }*/
    return data
  }, err => {
    hideBusy();
    //==============  错误处理  ====================
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误(400)';
          break;
        case 401:
          err.message = '未授权，请重新登录(401)';
          break;
        case 403:
          err.message = '拒绝访问(403)';
          break;
        case 404:
          err.message = '请求出错(404)';
          break;
        case 408:
          err.message = '请求超时(408)';
          break;
        case 500:
          err.message = '服务器错误(500)';
          break;
        case 501:
          err.message = '服务未实现(501)';
          break;
        case 502:
          err.message = '网络错误(502)';
          break;
        case 503:
          err.message = '服务不可用(503)';
          break;
        case 504:
          err.message = '网络超时(504)';
          break;
        case 505:
          err.message = 'HTTP版本不受支持(505)';
          break;
        default:
          err.message = '连接出错(${err.response.status})';
          break;
      }
    } else {
      err.message = '当前网络不适用，请连接政务网络!'
    }
    return Promise.reject(err);
  })
  return instance;
}

export default getAxiosInstance
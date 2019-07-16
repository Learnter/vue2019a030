
import axios from 'axios';

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {

  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg);
  }     
  // if (res.data && (!res.data.data)) {
  //   alert(res.data.msg)
  // }
  return res;
}

export default {
  post (url,data,fileType) {
    //判断是否已经登录...
    let token;
    sessionStorage.getItem("user")? token = JSON.parse(sessionStorage.getItem("user")).token : token = '';

    return axios({
      method: 'post',
      baseURL: 'http://2019a030api.jiafuw.com/v1',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'content-type':fileType ? fileType : 'application/json',
        'token':token
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
     //判断是否已经登录...
    let token;
    sessionStorage.getItem("user")? token = JSON.parse(sessionStorage.getItem("user")).token : token = '';
    return axios({
      method: 'get',
      baseURL: 'http://2019a030api.jiafuw.com/v1',
      // baseURL: 'http://rest.apizza.net/mock/39803a938ae791610110c61f6d51194b/',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
        'token':token
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
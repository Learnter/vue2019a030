
import router from '@/router';
import axios from 'axios';

axios.interceptors.request.use(config => {
  // loading 
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
   //根据响应data中的状态码判断是否需要重新登录
  if(response.data.code === 1003 || response.data.code == 1004 || response.data.code == 1006 ){
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
    localStorage.removeItem("LOGININFO");
  }
  return response
}, error => { 
  return Promise.resolve(error.response)
})

export default {
  post (url,data,fileType) {
    //判断是否已经登录...
    let token;
    localStorage.getItem("LOGININFO")? token = JSON.parse(localStorage.getItem("LOGININFO")).token : token = '';

    return axios({
      method:'post',
      baseURL:'http://api.huyouhulian.com/v1',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'content-type':fileType ? fileType : 'application/json',
        'token':token
      }
    })
  },
  get (url, params) {
     //判断是否已经登录...
    let token;
    localStorage.getItem("LOGININFO")? token = JSON.parse(localStorage.getItem("LOGININFO")).token : token = '';
    return axios({
      method: 'get',
      baseURL: 'http://api.huyouhulian.com/v1',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
        'token':token
      }
    })
  }
}
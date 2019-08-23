
import router from '@/router';
import axios from 'axios';
import crypto from "crypto"; //md5加密

let timeStamp; //时间戳
let random; //随机数
let encryptSign; //签名

function encryFunc (){ //加密方法
     const md5 = crypto.createHash('md5');
     timeStamp = new Date().getTime().toString().slice(0,10);//获取当前时间戳的前10位
    //  console.log(timeStamp);
     random = Math.floor(Math.random()*1000); //获取三位随机数
     let beforeSign = 'AyPxmiZY3i9jIeJ3';
     let encrypt = timeStamp+beforeSign+random;
    //  console.log(encrypt);
     md5.update(encrypt);
     encryptSign = md5.digest('hex');
};



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

    encryFunc();
    // console.log(encryptSign,timeStamp,random);
    return axios({
      method:'post',
      baseURL:'http://api.huyouhulian.com/v1',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'content-type':fileType ? fileType : 'application/json',
        'token':token,
        'sign':encryptSign,
        'time-stamp':timeStamp,
        'random':random
      }
    })
  },
  get (url, params) {
     //判断是否已经登录...
    let token;
    localStorage.getItem("LOGININFO")? token = JSON.parse(localStorage.getItem("LOGININFO")).token : token = '';

    encryFunc();
    
    return axios({
      method: 'get',
      baseURL: 'http://api.huyouhulian.com/v1',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'content-type': 'application/json',
        'token':token,
        'sign':encryptSign,
        'time-stamp':timeStamp,
        'random':random
      }
    })
  }
}
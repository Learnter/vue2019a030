// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from "reset-css";
import store from './store';


import VueVideoPlayer from 'vue-video-player' 
// require videojs style
import 'video.js/dist/video-js.css'
//使用VueVideoPlayer组件
Vue.use(VueVideoPlayer);




//使用vantUI框架
import Vant from 'vant'
import 'vant/lib/index.css';
Vue.use(Vant)


//图片懒加载插件
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)



//引用axios请求后端数据
import https from "../src/axios/https.js";
Vue.prototype.$https = https;


// 状态数据
Vue.prototype.$store = store;

Vue.config.productionTip = false;

Vue.use(reset);


Vue.filter('timeFormat', function (value) {  //全局日期过滤器
      if (!value) return ''
      let time = parseInt(value);
      let timeStr = '';
      let stringFormat = (i) => {
          return i < 10 ? `0${i}` : `${i}`;
      }
      let minuteTime = 0;
      let secondTime = 0;
      let hourTime = 0;
      if(time < 60) {
          timeStr = `00:${stringFormat(time)}`
      } else if(time >= 60 && time < 3600) {
          minuteTime = parseInt(time / 60);
          secondTime = parseInt(time % 60);
          timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
      } else if(time >= 3600) {
          let _t = parseInt(time % 3600);
          hourTime = parseInt(time / 3600);
          minuteTime = parseInt(_t / 60);
          secondTime = parseInt(_t % 60);
          timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
      }
      return timeStr;
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


router.beforeEach((to, from, next) => { //全局路由守卫
  // console.log(JSON.parse(localStorage.getItem("user")));
   let user = JSON.parse(localStorage.getItem("user"))
  //如果有token的话说明你已经登录,让你正常登录
  if (user && user.token) {
    next();
  } else {
    //如果没有登录你访问的不是login就让你强制跳转到login页面
    if(to.path == "/register" || to.path == "/protocol" ||to.path == "/login"){
      next();
    }else if(to.path !== "/login"){
      next({path:"/login"});
     }
   }
})


document.documentElement.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, false);

 //禁止双击放大
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
  var now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

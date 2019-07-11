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



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
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

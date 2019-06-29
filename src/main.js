// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import reset from "reset-css";
import store from './store';
import Video from "video.js";
import 'video.js/dist/video-js.css';


//使用video.js插件
Vue.prototype.$video = Video;

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

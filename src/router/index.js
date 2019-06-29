import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/smallVideo"
    },
    {
      path:"/smallVideo",
      name:"SmallVideo",
      component: resolve => require(["@/components/smallVideo"],resolve),
      meta:{
        KeepAlive:false
      }
    },
    {
      path:"/shortVideo",
      name:"ShortVideo",
      component: resolve => require(["@/components/shortVideo"],resolve),
      meta:{
        KeepAlive:false
      }
    },
    {
      path:"/me",
      name:"Me",
      component: resolve => require(["@/components/me"],resolve)
    }
  ]
})

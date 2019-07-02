import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
},
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
        KeepAlive:true
      }
    },
    {
      path:"/shortVideo",
      name:"ShortVideo",
      component: resolve => require(["@/components/shortVideo"],resolve),
      meta:{
       KeepAlive:true
      }
    },
    {
      path:"/me",
      name:"Me",
      component: resolve => require(["@/components/personCenter/me"],resolve)
    },
    {
      path:"/personCenter/recharge",
      name:"Recharge",
      component: resolve => require(["@/components/personCenter/recharge"],resolve)
    },
    {
      path:"/personCenter/userAccount",
      name:"userAccount",
      component: resolve => require(["@/components/personCenter/userAccount"],resolve)
    }
  ]
})

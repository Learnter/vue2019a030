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
      redirect:"/personCenter/news"
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
    },
    {
      path:"/personCenter/assetDetails",
      name:"assetDetails",
      component: resolve => require(["@/components/personCenter/assetDetails"],resolve)
    },
    {
      path:"/personCenter/share",
      name:"share",
      component: resolve => require(["@/components/personCenter/share"],resolve)
    },
    {
      path:"/login/login",
      name:"login",
      component: resolve => require(["@/components/login/login"],resolve)
    },
    {
      path:"/login/register",
      name:"register",
      component: resolve => require(["@/components/login/register"],resolve)
    },
    {
      path:"/personCenter/team",
      name:"team",
      component: resolve => require(["@/components/personCenter/team"],resolve)
    },
    {
      path:"/personCenter/news",
      name:"news",
      component: resolve => require(["@/components/personCenter/news"],resolve)
    }

  ]
})

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
      redirect:"/login"
    },
    {
      path:"/smallVideo",//小视频
      name:"SmallVideo",
      component: resolve => require(["@/components/smallVideo"],resolve),
      meta:{
        KeepAlive:true
      }
    },
    {
      path:"/shortVideoTwo",//短视频2
      name:"shortVideoTwo",
      component: resolve => require(["@/components/shortVideoTwo"],resolve),
      meta:{
        KeepAlive:true
       }
    },
    {
      path:"/me", // 个人中心
      name:"Me",
      component: resolve => require(["@/components/personCenter/me"],resolve),
      meta:{
        KeepAlive:true
      }
    },
    {
      path:"/personCenter/recharge", //充值
      name:"Recharge",
      component: resolve => require(["@/components/personCenter/recharge"],resolve)
    },
    {
      path:"/personCenter/userAccount", //账户
      name:"userAccount",
      component: resolve => require(["@/components/personCenter/userAccount"],resolve)
    },
    {
      path:"/personCenter/assetDetails",//资产详情
      name:"assetDetails",
      component: resolve => require(["@/components/personCenter/assetDetails"],resolve)
    },
    {
      path:"/personCenter/share",//分享
      name:"share",
      component: resolve => require(["@/components/personCenter/share"],resolve)
    },
    {
      path:"/login", //登录
      name:"login",
      component: resolve => require(["@/components/login/login"],resolve)
    },
    {
      path:"/register",//注册
      name:"register",
      component: resolve => require(["@/components/login/register"],resolve)
    },
    {
      path:"/protocol",//注册协议
      name:"protocol",
      component: resolve => require(["@/components/login/protocol"],resolve)
    },
    {
      path:"/personCenter/team",//我的团队
      name:"team",
      component: resolve => require(["@/components/personCenter/team"],resolve)
    },
    {
      path:"/personCenter/news",//新闻中心
      name:"news",
      component: resolve => require(["@/components/personCenter/news"],resolve)
    }, 
    {
      path:"/personCenter/digitalAsset",//数字资产
      name:"digitalAsset",
      component: resolve => require(["@/components/personCenter/digitalAsset"],resolve)
    },
    {
      path:"/personCenter/exchange",//邮币兑换
      name:"exchange",
      component: resolve => require(["@/components/personCenter/exchange"],resolve)
    },
    {
      path:"/release",//发布页面
      name:"release",
      component: resolve => require(["@/components/releaseVideo"],resolve)
    },
    {
      path:"/video/parseVideo",//视频解析
      name:"parseVideo",
      component: resolve => require(["@/components/video/parseVideo"],resolve)
    },
    {
      path:"/video/fullScreen",//全屏页面
      name:"fullScreen",
      component: resolve => require(["@/components/video/fullScreen"],resolve)
    },
    {
      path:"/video/reward",//打赏
      name:"reward",
      component: resolve => require(["@/components/video/reward"],resolve)
    }
  ]
})

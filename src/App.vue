<template>
  <div id="app">
   <keep-alive>
        <router-view v-if="$route.meta.KeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.KeepAlive"></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/tabbar/tabbar";
export default {
  name: 'App',
  components:{
    tabbar
  },
  created(){
    this.fetchConfig();
  },
  methods:{
    fetchConfig(){ //获取平台全局配置
      let url = "config/getInfo";
      this.$https.get(url).then( res => {
        if( res && res.data && res.data.data){
           let webConfig = JSON.stringify(res.data.data);
           sessionStorage.setItem("config",webConfig);
         }
      })
    }
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:16px;
  color: #2c3e50;
  position: relative;
  width:100vw;
  height:100vh;
}

.uni-flex{
  display:flex;
  flex-direction:row;
}


video,img{
  width:100%;
  height:100%;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;    
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */

}

button{
  outline:none;
}

/*vue-video-player插件配置*/
/* 视频填充满容器 */
.vjs-tech{
  object-fit:fill;
}

.van-cell{
    padding:0;
  } 

.video-js .vjs-control-bar{
  bottom:35px;
}  

.video-js .vjs-control{
  width:3em;
}

/*vantUI框架样式*/
.van-list__finished-text{
 line-height:24px;
 margin:10px auto;
}
</style>

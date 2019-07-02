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
  }
}
</script>

<style>

#app {
  font-family:cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:16px;
  color: #2c3e50;
  position: relative;
}

.uni-flex{
  display:flex;
  flex-direction:row;
}


video,img{
  width:100%;
  height:100%;
}

button{
  outline:none;
}

/* 视频填充满容器 */
.vjs-tech{
  object-fit:fill;
}


</style>

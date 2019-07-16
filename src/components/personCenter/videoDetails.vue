<template>
  <section class="videoDetails">
    <van-nav-bar title="我的视频" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <div class="video_user">
      <div class="user_photo">
        <img :src="user_info.head"/>
      </div>
      <div class="user_info">
        <h2>{{user_info.nickname}}</h2>
        <p>ID:<span>{{user_info.account}}</span></p>
      </div>
    </div>
    <div class="video_main">
        <div class="video_tab">
            <p @click="fetchsmallVideo">小视频</p>
            <p @click="fetchShortVideo">短视频</p>
        </div>
        <div class="videos_box">
            <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">  
                <div class="multiple_video">
                    <div class="single_video" v-for="(item,index) in videoList" :key="index">
                        <img v-lazy="item.poster" alt="">
                    </div>
                </div>
            </van-list>
        </div> 
    </div>
  </section>
</template>
<script>
export default {
  name: "videoDetails",
  data() {
    return {
        loading: false,
        finished: false,
        user_info:{},//用户信息
        videoList:[],//视频列表
    };
  },
  created(){
      this.user_info = JSON.parse(sessionStorage.getItem("user")).userInfo; //获取用户信息
  },
  methods: {
    fetchsmallVideo(){
        let url = "video/smallVideoList";
        let data = {
            page:1,
            row:10,
            uid:this.user_info.user_id
        }
        this.$https.get(url,data).then(res => {
            if(res.data.code === 200 && res.data.data){
                this.videoList = res.data.data;
                this.loading = false;
                this.finished = true;
            }
        })
     },
     fetchShortVideo(){
        let url = "video/shortVideoList";
        let data = {
            page:1,
            row:10,
            uid:this.user_info.user_id
        }
        this.$https.get(url,data).then(res => {
            if(res.data.code === 200 && res.data.data){
                this.videoList = res.data.data;
                this.loading = false;
                this.finished = true;
            }
        })
     },
     onLoad(){
         this.fetchsmallVideo();
     }
  }
};
</script>
<style lang="scss">
.videoDetails {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #000000;

  .van-nav-bar {
    height: 54px;
    line-height: 54px;
    background: #000000;
    .van-nav-bar__title {
      font-size: 18px;
      color: #ffffff;
    }
    .van-icon {
      font-size: 24px;
      color: white;
    }
  }

  .video_user {
    padding: 20px;
    display: flex;
    letter-spacing: 2px;
    .user_photo {
      width: 80px;
      height: 80px;
      background:#793DFF;
      border-radius: 50%;
      overflow: hidden;
    }
    .user_info {
      flex: 1;
      padding: 15px;
      text-align: left;
      color: #ffffff;
      h2 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        height: 18px;
        line-height: 18px;
        span {
          font-size: 14px;
          color: antiquewhite;
        }
      }
    }
  }
  .video_main {
    position: absolute;
    width: 100%;
    top: 174px;
    left: 0;
    bottom: 0;
    .video_tab{
       height:45px;
       background:#191B28;
       display:flex;
       justify-content:space-between;
       align-items:center;
       p{
           width:50%;
           height:100%;
           line-height:45px;
           text-align:center;
           color:#ffffff;
           font-size:18px;
           letter-spacing:2px;
       } 
    }
    
       .videos_box{
        overflow:scroll;
        position:absolute;
        left:0;
        top:45px;
        width:100%;
        box-sizing:border-box;
        bottom:0px;
        padding: 10px 0 10px 3%;
        .multiple_video{
            display:flex;
            flex-wrap:wrap;
        }
        .single_video{
            box-sizing:border-box;
            width:47%;
            height:220px;
            margin-right:3%;
            margin-bottom:10px;
            border-radius:10px;
            overflow:hidden;
            background:#191B28;
        }
    }
  }
}
</style>


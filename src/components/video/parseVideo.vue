<template>
  <section class="parseVideo">
    <van-nav-bar class="returnBar" left-text="返回" @click-left="$router.go(-1)" />
    <video
      class="video_box"
      width="100%"
      height="100%"
      webkit-playsinline="true"
      x5-playsinline
      x5-video-player-type="h5"
      x5-video-player-fullscreen
      playsinline
      autoplay
      loop
      preload="auto"
      :src="video.video_url"
      x-webkit-airplay="allow"
      x5-video-orientation="portrait"
    ></video>

    <div class="playOrPause">
        <van-icon
        name="pause-circle"
        class="icon_play"
        @click="pauseVideo"
      />
    </div>
      
    <div class="publishVideo">
      <van-cell-group>
        <van-field
          v-model="video_title"
          maxlength="20"
          autofocus
          center
          clearable
          placeholder="请输入视频描述(少于20个字)"
        >
          <van-button slot="button" size="small" type="primary" @click="publishVideo">发布视频</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </section>
</template>
<script>
import {mapState,mapGetters} from "vuex";
export default {
  name: "parseVideo",
  data() {
    return {
      playOrPause:true,//播放或暂停
      video_title: "", //视频标题
      video:{}, //视频对象
    };
  },
  created(){
    this.video = JSON.parse(this.$route.query.video);
  },
   computed:{
    ...mapState(['uploadType']) //视频类型
  },
  methods: {
    publishVideo() {
      if (this.video_title.trim().length === 0) {
        //标题非空判断
        this.$notify({
                message:"请输入视频标题",
                duration:5000,
                className:"notifyClass"
                });
          return ;
       }

      let url;
      if (this.uploadType == 1 ) {
        //根据videoType判断上传的是小视频还是短视频，调用不同的接口
        url = "video/addSmallVideoideo";
      } else if (this.uploadType == 2 ) {
        url = "video/addShortVideo";
      }else{
        this.$notify({
                message:"不清楚视频类型,请重新发布",
                duration:5000,
                className:"notifyClass"
              });
        setTimeout(() => {
            this.$router.push("/me");
          }, 1000);
        return;
      }

      let videoTime = Math.ceil(document.querySelectorAll("video")[0].duration); //获取视频播放时长

      let data = {
        title: this.video_title,
        video_url: this.video.video_url,
        video_duration:videoTime
      };

      this.$https.post(url, data).then(res => {
        if (res.data.code === 200) {
          this.$notify({
                    message:'视频上传成功',
                    duration: 2000,
                    background:"#07C160",
                    className:"notifyClass"
                  });
            this.$store.commit("updateVideo"); //增加视频数量
            setTimeout(() => {
              this.$router.push("/me");
            }, 2000);
        }else{
          this.$notify({
                message:res.data.msg,
                duration:5000,
                className:"notifyClass"
              });
           }
       });
    },
    pauseVideo(){ //暂停按钮
      let video = document.querySelectorAll("video")[0];
      if(this.playOrPause){
         video.pause();
      }else{
        video.play();
      }
     this.playOrPause = !this.playOrPause;
    }
  }
};
</script>
<style lang="scss">
.parseVideo {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: #ffffff;
}

.returnBar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  background: transparent;
  z-index: 1000 !important;
  .van-nav-bar__text {
    color: #ffffff;
    font-size: 16px;
  }
}

.video_box {
  object-fit: fill !important;
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

video {
  object-position: 0 0;
}

.playOrPause {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .icon_play {
    font-size:60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.3);
  }
}

.publishVideo {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 1000;
  background: transparent;
  box-sizing: border-box;
  padding: 20px;
  .van-button--primary {
    background: linear-gradient(to right, #ff4500cd, #ff8c00);
    border: none;
  }
  .van-cell-group {
    background: transparent;
    .van-cell {
      background: transparent;
    }
    .van-field__control {
      color: #ffffff;
      caret-color: red;
      &::-webkit-input-placeholder {
        color: #ffffff;
      }
    }
  }
}
</style>

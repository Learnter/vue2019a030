<template>
  <section class="fullScreen">
    <video-player
      v-if="playerOptions.length != 0"
      :options="playerOptions"
      :playsinline="true"
      ref="videoPlayer"
    ></video-player>

    <!-- 判断playerOptions数组中有没数据
          <video-player
            v-if="playerOptions.length != 0"
            :playsinline="true"
            class="videoStyle video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            @play="onPlayerPlay($event,index)"
            @pause="onPlayerPause($event)"
            @ended="onPlayerEnded($event)"
    ></video-player>-->
    <!-- <img src="../../assets/tabImg/2019_a030_4.png" alt=""> -->

    <div class="mask_top">
      <h2>邮票</h2>
      <p>{{videoConfig.amount}}</p>
    </div>

    <div class="mask_middle">
      <div class="mask_user_img">
        <img :src="videoConfig.avatar"/>
      </div>
      <van-icon name="youzan-shield" :info="videoConfig.praise_num" />
      <van-icon name="like" :info="videoConfig.collect_num" />
      <van-icon name="wechat"/>
    </div>

    <div class="mask_bottom">
      <div>
        <div class="mask_user_name">
          <p>@{{videoConfig.username}}</p>
          <div class="mask_user_level">
            <img src="@/assets/tabImg/2019_a030_50.png"/>
          </div>
        </div>
        <div class="mask_user_icon">
          <img src="@/assets/tabImg/2019_a030_49.png"/>
        </div>
      </div>
      <div class="mask_user_gift">
        <img src="@/assets/tabImg/2019_a030_48.png"/>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "fullScreen",
  data() {
    return {
      video_id:'',//视频Id
      videoConfig: {}, //视频数据
      playerOptions: {
        muted:false,
        language: "en",
        sources: [
          {
            type: "video/mp4",
            src:
              "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }
        ]
      }
    };
  },
  created(){
    // this.video_id = this.$route.query.id;
   this.fetchVideoData();
  },
  computed:{
    player(){
      return this.$refs.videoPlayer.player;
    },
    // videoOptions(){
    //   let video_url = this.videoConfig.video_url;
    //   let playerOptions = {
    //     muted:false,
    //     language: "en",
    //     sources: [
    //       {
    //         type: "video/mp4",
    //         src: video_url
    //       }
    //     ]
    //   }
    //   return playerOptions;
    // }
  },
  methods:{
     fetchVideoData(){
        let url = "video/smallVideoInfo";
        let data = {
          id:this.$route.query.id
        }
        this.$https.get(url,data).then(res => {
            if(res.data.code === 200 && res.data.data){
              console.log(res.data.data);
              this.videoConfig = res.data.data;
              this.playerOptions.sources[0].src = res.data.data.video_url;
            }
        })
     }
  }
};
</script>
<style lang="scss">
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #ffffff;

  .video-player {
    width: 100%;
    height: 100%;
    .vjs_video_3-dimensions {
      width: 100%;
      height: 100%;
    }
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      transform: translate(-50%);
    }
  }

  .mask_middle {
    position: absolute;
    right: 0;
    top: 18%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .mask_user_img {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius:50%;
      background: linear-gradient(to right, #B40CFF, #793DFF);
      img{
        border-radius:50%;
      }
    }
    .van-icon {
      font-size: 35px;
      margin-top: 30px;
      color: #ffffff;
      .van-info {
        right: 90%;
      }
    }
  }

  .mask_top {
    position: absolute;
    right: 0;
    top: 8%;
    display: flex;
    color: #ffffff;
    h2 {
      position: absolute;
      left: -30px;
      top: 1px;
      background: rgba(255, 255, 255, 0.3);
      padding-right: 3px;
      border-radius: 5px;
      font-size: 18px;
    }
    p {
      background: rgba(0, 0, 0, 0.2);
      padding: 0 10px;
      border-radius: 0 10px 10px 0;
      line-height: 20px;
      font-size: 12px;
    }
  }

  .mask_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .mask_user_name {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #ffffff;
      .mask_user_level {
        width: 14px;
        height: 14px;
      }
    }
    .mask_user_icon {
      margin-top: 5px;
      width: 14px;
      height: 14px;
    }
    .mask_user_gift {
      width: 40px;
      height: 40px;
    }
  }
}
</style>



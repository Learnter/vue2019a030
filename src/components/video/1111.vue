<template>
  <section class="fullScreen">
    <van-swipe style="height:100vh;" :show-indicators='false' vertical>
      <van-swipe-item v-for="(item,index) in 10" :key="index">
          <!-- <video-player v-if="playerOptions.length != 0" :options="playerOptions" :playsinline="true" ref="videoPlayer"></video-player> -->

      </van-swipe-item>

      <!-- <div class="mask_middle">
      <div class="mask_user_img" @click="photoBtn">
        <img :src="videoConfig.avatar"/>
      </div>
      <van-icon name="youzan-shield" :info="videoConfig.praise_num" :class="videoConfig.is_praise == true ? 'active_icon':''"  @click="praiseBtn(videoConfig.id)" />
      <van-icon name="like" :class="videoConfig.is_collect == true ? 'active_icon':''" :info="videoConfig.collect_num"  @click="collectBtn(videoConfig.id)"/>
      <van-icon name="wechat"  @click="transpond" />
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
    </div> -->

    </van-swipe>
    <!-- <video-player
      v-if="playerOptions.length != 0"
      :options="playerOptions"
      :playsinline="true"
      ref="videoPlayer"
    ></video-player> -->

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
      <div class="mask_user_img" @click="photoBtn">
        <img :src="videoConfig.avatar"/>
      </div>
      <van-icon name="youzan-shield" :info="videoConfig.praise_num" :class="videoConfig.is_praise == true ? 'active_icon':''"  @click="praiseBtn(videoConfig.id)" />
      <van-icon name="like" :class="videoConfig.is_collect == true ? 'active_icon':''" :info="videoConfig.collect_num"  @click="collectBtn(videoConfig.id)"/>
      <van-icon name="wechat"  @click="transpond" />
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
        muted:true,
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
              // console.log(res.data.data);
              this.videoConfig = res.data.data;
              this.playerOptions.sources[0].src = res.data.data.video_url;
            }
        })
     },
     praiseBtn(ID){ //点赞按钮
       let url = "video/praiseVideo";
       let data = { id:ID };
        this.$https.post(url,data).then(res => {
          if (res.data.code === 200) {
            if( this.videoConfig.is_praise == true){
              this.$toast("已取消点赞");
              this.videoConfig.praise_num--;
              this.videoConfig.is_praise = false;
            }else{
              this.$toast("已点赞");
              this.videoConfig.praise_num++;
              this.videoConfig.is_praise = true;
            }
          }else{
            this.$toast(res.data.msg);
          }
        });
     },
     collectBtn(ID){ //收藏按钮
        let url = "video/collectVideo";
        let data = { id:ID };
        this.$https.post(url,data).then(res => {
          if (res.data.code === 200) {
            if( this.videoConfig.is_collect == true){
              this.$toast("已取消收藏");
              this.videoConfig.collect_num--;
              this.videoConfig.is_collect = false;
            }else{
              this.$toast("已收藏");
              this.videoConfig.collect_num++;
              this.videoConfig.is_collect = true;
            }
          }else{
            this.$toast(res.data.msg);
          }
        });
     },
     transpond(){
       this.$toast("点击转发按钮");
     },
     photoBtn(){
       this.$toast("点击用户头像");
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
    .active_icon{
      color:red;
      animation: showHeart 1s;
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
@keyframes showHeart {
  0%{
    color:#f44;
    transform: scale(1);
  }
  25%{
    color:#fff;
    transform: scale(0);
  }
  80%{
    color:#f44;
    transform:scale(1.2);
  }
  100%{
    color:#f44;
    transform: scale(1);
  }
}

</style>

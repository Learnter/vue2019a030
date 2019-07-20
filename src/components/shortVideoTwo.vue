<template>
  <section class="shortVideoTwo">
    <van-search v-model="search_text" placeholder="请输入搜索关键词" show-action clearable shape="round">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!--<van-tabs>
      <van-tab v-for="(item,index) in 8" :title="'推荐' + index" :key="index"></van-tab>
    </van-tabs>-->
    <div class="video_main">
<!-- 
      <van-swipe style="height:100%"  vertical  :show-indicators="false"  @change="onChange"  :loop="false">
          <van-swipe-item class="video_item" v-for="(vItem,vIndex) in videosList" :key="vIndex">
              <div class="video_content">
                <div class="video_title">
                  <span>{{vItem.title}}</span>
                </div>
                <div class="video_container" style="width:100%;height:200px">
                  <video
                    class="video_box"
                    width="100%"
                    height="100%"
                    webkit-playsinline="true"
                    x5-playsinline
                    x5-video-player-type="h5"
                    playsinline
                    preload="auto"
                    :poster="vItem.poster"
                    :src="vItem.video_url"
                    :playOrPause="playOrPause"
                    x-webkit-airplay="allow"
                    x5-video-orientation="landscape"
                    @click="pauseVideo(vIndex)"
                    @ended="onPlayerEnded($event)"
                  ></video>
                  <div class="playOrPause" v-if="vItem.isPlay||vItem.isPause">
                    <van-icon
                      name="play-circle"
                      v-show="vItem.isPlay"
                      class="play"
                      @click="playVideo(vIndex)"
                    />
                     <van-icon
                      name="pause-circle"
                      v-show="vItem.isPause"
                      class="icon_play"
                      @click="pauseVideo(vIndex)"
                    />
                  </div>
                </div>
              </div>
              <div class="video_info">
                <div class="video_info_left">
                  <div class="video_info_img">
                    <img :src="vItem.avatar" alt />
                  </div>
                  <div v-if="vItem.uid !== 0">
                       <van-tag color="#f2826a" v-if="!vItem.is_follow" class="video_info_title" @click="attentionBtn(vItem,vIndex)">+关注</van-tag>
                       <van-tag color="#F00" v-else class="video_info_title" @click="attentionBtn(vItem,vIndex)">已关注</van-tag>
                  </div>
                </div>
                <div class="video_info_icons">
                  <p>{{vItem.collect_num}}</p>
                  <van-icon :class="vItem.is_collect == true ? 'follow_active':''"  name="like" @click.stop="likeBtn(vItem,vIndex)"/>
                </div>
              </div>

          </van-swipe-item>
      </van-swipe> -->


    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="100"
        >
          <ul>
            <li class="video_item" v-for="(vItem,vIndex) in videosList" :key="vIndex">
              <div class="video_content">
                <div class="video_title">
                  <span>{{vItem.title}}</span>
                </div>
                <div class="video_container" style="width:100%;height:300px">
                  <video
                    class="video_box"
                    width="100%"
                    height="100%"
                    webkit-playsinline="true"
                    x5-playsinline
                    x5-video-player-type="h5"
                    playsinline
                    preload="auto"
                    :poster="vItem.poster"
                    :src="vItem.video_url"
                    :playOrPause="playOrPause"
                    x-webkit-airplay="allow"
                    x5-video-orientation="landscape"
                    @click="pauseVideo(vIndex)"
                    @ended="onPlayerEnded($event)"
                  ></video>


                  <!-- <video-player  class="video-player-box"
                          ref="videoPlayer"
                          :options="playerOptions"
                          :playsinline="true"
          
                          @play="onPlayerPlay($event)"
                          @pause="onPlayerPause($event)"
                          @ended="onPlayerEnded($event)"
                          @waiting="onPlayerWaiting($event)"
                          @playing="onPlayerPlaying($event)"
                          @loadeddata="onPlayerLoadeddata($event)"
                          @timeupdate="onPlayerTimeupdate($event)"
                          @canplay="onPlayerCanplay($event)"
                          @canplaythrough="onPlayerCanplaythrough($event)"
          
                          @statechanged="playerStateChanged($event)"
                          @ready="playerReadied">
                   </video-player> -->






                  <div class="playOrPause" v-if="vItem.isPlay||vItem.isPause">
                    <van-icon
                      name="play-circle"
                      v-show="vItem.isPlay"
                      class="play"
                      @click="playVideo(vIndex)"
                    />

                   <van-icon
                      name="pause-circle"
                      v-show="vItem.isPause"
                      class="icon_play"
                      @click="pauseVideo(vIndex)"
                    />
                  </div>
                </div>
              </div>
              <div class="video_info">
                <div class="video_info_left">
                  <div class="video_info_img">
                    <img :src="vItem.avatar" alt />
                  </div>
                  <div v-if="vItem.uid !== 0">
                       <van-tag color="#f2826a" v-if="!vItem.is_follow" class="video_info_title" @click="attentionBtn(vItem,vIndex)">+关注</van-tag>
                       <van-tag color="#F00" v-else class="video_info_title" @click="attentionBtn(vItem,vIndex)">已关注</van-tag>
                  </div>
                </div>
                <div class="video_info_icons">

                <!-- 
                 <van-icon
                    name="thumb-circle-o"
                    :class="vItem.is_praise?'follow_active':''"
                    :info="vItem.praise_num"
                    @click="shortLike(vItem,vIndex)"
                  />
                  <van-icon name="chat-o" :info="vItem.collect_num" />
                  <van-icon name="ellipsis" /> -->


                  <p>{{vItem.collect_num}}</p>
                  <van-icon :class="vItem.is_collect == true ? 'follow_active':''"  name="like" @click.stop="likeBtn(vItem,vIndex)"/>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </section>
</template>
<script>
export default {
  name: "shortVideoTwo",
  data() {
    let u = navigator.userAgent;
    return {
      current: 0, //当前播放视频索引
      playOrPause: true,
      isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // android终端
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      search_text: "",
      loading: false,
      finished: false,
      isLoading: false,
      videosList: [],
      playerOptions: {
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
       },
       shortVideoConfig:{ //短视频请求配置
         page:1,
         row:10,
         uid:''
        }
     }
  },
  created(){
    this.fetchVideoList();
  },
  methods: {
    fetchVideoList() {
      //获取短视频列表
      let url = "video/shortVideoList";
      this.$https.get(url,this.shortVideoConfig).then(res => {
        if (res.data.code === 200 && res.data.data) {
          let list = res.data.data;
          for (let i = 0; i < list.length; i++){
            list[i].isPlay = true;
            list[i].isPause = false;
          }
          this.videosList = list;
          this.isLoading = false;
          this.loading = false;
          this.finished = true;
        }
      });
    },
    playVideo(index) { //点击播放按钮

      this.current = index;

      let video = document.querySelectorAll("video")[this.current];
 
      this.otherVideoPause(index);
    
      this.videosList[this.current].isPlay = false; //隐藏播放按钮

      video.play();
    },
    pauseVideo(index) { //暂停\播放
      this.current = index;
      let video = document.querySelectorAll("video")[this.current];
      if (this.playOrPause) {
        video.pause();
        this.videosList[this.current].isPause = true; //显示暂停按钮
      } else {
        this.otherVideoPause(index);
        video.play();
        this.videosList[this.current].isPause = false; //隐藏暂停按钮
      }
      this.playOrPause = !this.playOrPause;
    },
    otherVideoPause(index){ //暂停其他视频播放
        let allVideo = document.querySelectorAll("video");
        for(let i = 0; i < allVideo.length ;i++){
            if(index === i){
              continue;
            }else{
              allVideo[i].pause();
            }
        }
    },
    onPlayerEnded(player) { //视频结束
      this.videosList[this.current].isPlay = true; //显示播放按钮
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
        // this.isLoading = false;
        this.fetchVideoList();
      }, 500);
    },
    // shortLike(item, val) { //短视频点赞
    //   let objVideo = this.videosList[val];
    //   if (!objVideo.is_praise) {
    //     let url = "video/praiseVideo";
    //     let data = {
    //       id:item.id
    //     };
    //     this.$https.post(url, data).then(res => {
    //       if (res.data.code === 200) {
    //         objVideo.is_praise = true;
    //         objVideo.praise_num++;
    //       } else {
    //         this.$toast(res.data.msg);
    //       }
    //     });
    //   } else {
    //     this.$toast("今天已点赞");
    //   }
    // },
    //收藏按钮
    likeBtn(item,index) {
        let url = "video/collectVideo";
        let data = { id:item.id };
        this.$https.post(url,data).then(res => {
          if (res.data.code === 200) {
            if( this.videosList[index].is_collect == true){
              this.$toast("已取消收藏");
              this.videosList[index].collect_num--;
              this.videosList[index].is_collect = false;
            }else{
              this.$toast("已收藏");
              this.videosList[index].collect_num++;
              this.videosList[index].is_collect = true;
            }
          }else{
            this.$toast(res.data.msg);
          }
        });
    },
    attentionBtn(item,index){ //点击关注按钮
         let url = "user/followUser";
         let data = {
              uid:item.user_id
          }
          this.$https.post(url,data).then(res => {
              if(res.data.code === 200){
                this.videosList[index].is_follow = !this.videosList[index].is_follow;
                this.$toast(res.data.data); 
             }else{
               this.$toast(res.data.msg);
             }
         })
    },
    onSearch() {
      console.log("点击搜索按钮" + this.search_text);
    },
    onLoad() {
      this.fetchVideoList();
    }
  }
};
</script>
<style lang="scss">

.product_swiper{
  width:100%;
  height:250px;
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

/*.icon_play {
  font-size: 50px;
  position: absolute;
  top: 44%;
  right: 0;
  left: 0;
  bottom: auto;
  margin: auto;
  z-index:999;
  height: 60px;
  border-radius: 50%;
  color: blueviolet;
}

.play {
  font-size: 50px;
  position: absolute;
  top: 44%;
  right: 0;
  left: 0;
  bottom: auto;
  margin: auto;
  z-index:999;
  height: 60px;
  border-radius: 50%;
  color: blueviolet;
}*/

.playOrPause {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .icon_play {
    font-size: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.4);
  }

  .play {
    font-size: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    color: rgba(0, 0, 0, 0.4);
  }
}

.shortVideoTwo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #ffffff;
  .van-field__control {
    color: #000000;
  }
  .van-tab--active {
    font-size: 16px;
    font-weight: bold;
  }
  .van-tabs__line {
    background: linear-gradient(to right, #b40cff, #793dff);
  }

  .video_main {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    bottom: 60px;
    box-sizing:border-box;
    padding: 0 5px;
    overflow: scroll;

   .video_item{
     margin-bottom:10px;
   }

    .video_content {
      position: relative;
      .video_title {
        text-align: left;
        color:#000000;
        font-size: 15px;
        line-height: 24px;
        font-weight:500;
        padding:10px 0;
        letter-spacing:2px;
        border-top:1px solid rgba(0,0,0,0.1);
      }
      .video_container{
        width:100%;
        height:200px;
        position: relative;
      }
    }

    .video_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      padding:5px 10px;
      border-bottom:1px solid rgba(0,0,0,0.1);
      .video_info_left {
        flex: 1;
        display: flex;
        text-align: left;
        align-items:center;
        .video_info_img {
          width: 40px;
          height: 40px;
          margin-right:15px;
          overflow: hidden;
          img {
            border-radius: 50%;
          }
        }
        .video_info_title {
          height:18px;
          line-height:19px;
          letter-spacing:2px;
          padding:2px;
          
        }
      }
      .video_info_icons {
        width: 30%;
        display: flex;
        align-items: center;
        font-size: 20px;
        color:gray;
        P{
          margin-right:10px;
          font-size:16px;
          color:black;
        }
        .follow_active {
          color: #f44;
          animation: showHeart 0.5s ease-in-out 0s;
        }
      }
    }
  }
}
</style>


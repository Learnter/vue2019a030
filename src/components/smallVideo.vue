<template>
  <div class="page">
    <div class="switchBox">
      <div class="navBtn uni-flex">
        <p
          class="nav_item"
          :class="actived == index ? 'actived' :''"
          v-for="(item,index) in navList"
          :key="index"
          @click="toggleNav(item)"
          v-text="item.title"
        ></p>
      </div>
    </div>
    <van-list class="main_content" v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
      <div class="main_ul">
        <van-cell class="main_item" v-for="(item,index) in videoList" :key="index">
          <img  v-lazy="item.poster" alt="加载失败" />

          <!-- 视频信息栏 -->
          <div class="min_item_info uni-flex">
            <div class="min_item_info_left">
              <div class="user_img">
                <img src="@/assets/tabImg/2019_a030_1.png" />
              </div>
              <p>{{item.title}}</p>
            </div>
            <div class="min_item_info_right">
              <van-icon
                :class="item.is_collect == true ? 'van_icon':''"
                name="like"
                @click.stop="likeBtn(index,item)"
              />
              <p>{{item.collect_num}}</p>
            </div>
          </div>

           <!--播放按钮-->
           <van-icon name="play-circle" class="play" @click.stop="playVideo(index)" />

        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: "samllVideo",
  data() {
    return {
      isCollect: "", //是否已收藏
      loading: false,
      finished: false,
      actived: 0,
      navList: [
        { id: 0, title: "热门" },
        { id: 1, title: "关注" },
        { id: 2, title: "附近" }
      ],
      videoList: [] //视频列表
    };
  },
  created() {
    // this.fetchVideos();
  },
  methods: {
    //获取视频列表
    fetchVideos() {
      let url = "video/smallVideoList";
      this.$https.get(url).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.videoList = res.data.data;
          // console.log( this.videoList);
          this.loading = false;
          this.finished = true;
        }
      });
    },
    //切换导航栏
    toggleNav(item) {
      this.actived = item.id; 
    },
    //点击图片跳转视频详情
    playVideo(val) {
      this.$router.push({
        path: "video/fullScreen",
        query:{vIndex:val}
      });
    },
    //收藏按钮
    likeBtn(index,item) {

        let url = "video/collectVideo";
        let data = { id:item.id };
        this.$https.post(url,data).then(res => {
          if (res.data.code === 200) {
            if( this.videoList[index].is_collect == true){
              this.$toast("已取消收藏");
              this.videoList[index].collect_num--;
              this.videoList[index].is_collect = false;
            }else{
              this.$toast("已收藏");
              this.videoList[index].collect_num++;
              this.videoList[index].is_collect = true;
            }
          }else{
            this.$toast(res.data.msg);
          }
        });
    },
    onLoad(){
      this.fetchVideos();
    }
  },
  components:{}
};
</script>

<style lang="scss" scoped>
/*点击播放隐藏视频信息栏,时间栏*/
.videoStart {
  visibility: hidden;
}

/*视频播放完、暂停显示信息栏跟时间栏*/
.videoEnd {
  visibility: visible;
}

.video-js {
  width: 100% !important;
  height: 100% !important;
}

.vjs-big-play-button {
  height: 40px !important;
  width: 40px !important;
  line-height: 40px !important;
  text-align: center;
  background: rgba(0, 0, 0, 0.8) !important;
  border-radius: 50% !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -60%);
}

.videoStyle {
  width: 100% !important;
  height: 100% !important;
  object-fit: fill;
}

.switchBox {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  padding-bottom: 10px;
  z-index:999;
  background: linear-gradient(to right, #b40cff, #793dff);
}

.navBtn {
  margin: 0 auto;
  width: 60%;
  height: 100%;
  font-size: 14px;
  color: white;
  justify-content: space-between;
  align-items: flex-end;
}

.actived {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: #fff700;
  transition: all 0.5 linear;
  &::after {
    content: "";
    position: absolute;
    bottom: -30%;
    left: 0;
    width: 100%;
    border-bottom: 2px solid #fff700;
    border-radius: 1px;
  }
}

.main_content {
  padding: 62px 10px 70px;
  background: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .main_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .main_item {
      position: relative;
      width: 49%;
      height: 240px;
      margin-bottom: 8px;
      border-radius: 5px;
      border:1px solid rgba(0, 0, 0, 0.1);
    }

      .play {
        font-size:40px;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%);
        border-radius: 50%;
        color: rgba(0,0,0,0.5);
      }

    .min_item_info {
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
      font-size: 12px;
      color: white;
      background: rgba(0, 0, 0, 0.1);
      align-items: center;
      justify-content: space-between;
    }

    .min_item_info_left {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      p{
        margin-left: 5px;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
      }
      .user_img {
        width: 20px;
        height: 20px;
      }
    }

    .min_item_info_right{
      display:flex;
      justify-content:center;
      align-items:center;
       .van_icon {
        font-size:16px;
        color: brown;
      }
      p{
        margin-left: 5px;
      }
    }

    // .heart_img {
    //   width: 14px;
    //   height: 14px;
    //   line-height: 14px;
    //   margin-right: 5px;
    // }

  //   .duration {
  //     position: absolute;
  //     font-size: 12px;
  //     top: 5px;
  //     right: 5px;
  //     padding: 5px;
  //     line-height: 1.1;
  //     color: white;
  //     border-radius: 4px;
  //     background: #ff8585;
  //     z-index: 2;
  //   }
  }
}
</style>
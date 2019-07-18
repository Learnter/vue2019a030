<template>
  <div class="smallVideo">
    <div class="switchBox">
      <div class="navBtn uni-flex">
        <p class="nav_item" :class="actived == index ? 'actived' :''" v-for="(item,index) in navList" :key="index"  @click="toggleNav(item)" v-text="item.title"></p>
      </div>
    </div>
    <div class="main_content">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了"  @load="onLoad">
              <div class="main_ul">
                <van-cell class="main_item" v-for="(item,index) in videoList" :key="index" @click.stop="playVideo(index)">
                  <img  v-lazy="item.poster" alt="加载失败" />

                  <!-- 视频信息栏 -->
                  <div class="min_item_info uni-flex">
                    <div class="min_item_info_left">
                      <div class="user_img">
                        <img :src="item.avatar"/>
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
                  <!-- <van-icon name="play-circle" class="play" @click.stop="playVideo(index)" /> -->

                  <!-- 视频时长 -->
                  <van-tag round class="duration">{{item.video_duration|timeFormat()}}</van-tag>

                </van-cell>
              </div>
            </van-list>
      </van-pull-refresh>
    </div>  
  </div>
</template>

<script>
export default {
  name: "smallVideo",
  data() {
    return {
      isCollect: "", //是否已收藏
      loading: false,
      finished: false,
      isLoading:false,
      actived: 0,
      navList: [
        { id: 0, title: "热门" },
        { id: 1, title: "关注" },
        { id: 2, title: "附近" }
      ],
      videoList: [] //视频列表
    };
  },
   created(){
      this.fetchAccountMoney();
  },
  methods: {
     fetchAccountMoney(){ //获取会员账号资产
          let url = 'money/getUserWalletAmount';
          this.$https.get(url).then(res => {
            // console.log(res);
            if( res.data.code === 200 && res.data.data){
                // this.accountData = res.data.data;
                this.$store.commit("change_user_asset",res.data.data); //将用户资产存储到vuex中
             }
          })
      },
    //获取视频列表
    fetchVideos() {
      let url = "video/smallVideoList";
      this.$https.get(url).then(res => {
        if (res.data.code === 200 && res.data.data) {
          this.videoList = res.data.data;
          // console.log(this.videoList);
          this.isLoading = false;
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
    onLoad(){ //上拉加载
      this.fetchVideos();
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
        this.fetchVideos();
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>

.smallVideo{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  bottom:60px;
}

.switchBox {
  width: 100%;
  height: 44px;
  padding-bottom: 10px;
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
  position: absolute;
  top:54px;
  left:0;
  width:100%;
  bottom:0;
  box-sizing:border-box;
  padding-left:3%;
  background: white;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .main_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .main_item {
      position: relative;
      width:47%;
      height:240px;
      margin-right:3%;
      margin-top:10px;
      border-radius:5px;
      border:1px solid rgba(0, 0, 0, 0.1);
    }

      // .play {
      //   font-size:40px;
      //   position: absolute;
      //   top:50%;
      //   left:50%;
      //   transform:translate(-50%);
      //   border-radius: 50%;
      //   color: rgba(0,0,0,0.5);
      // }

     .duration{
        position: absolute;
        right:5px;
        top:5px;
        background:rgba(0,0,0,0.5) !important;
        padding:2px 10px;
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
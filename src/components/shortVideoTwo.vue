<template>
  <section class="shortVideoTwo">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">

        <van-search v-model="search_text" placeholder="请输入搜索关键词" show-action clearable shape="round">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="video_main" ref="shortScroll">
              <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false" :initial-swipe="current" :duration="800" :height="500">
                <van-swipe-item v-for="(vItem, vIndex) in videosList" :key="vIndex" class="product_swiper" style="width:100%;height:500px">
                  <div class="video_content">
                    <div class="video_title">{{vItem.title}}</div>
                    <div class="video_container" style="width:100%;height:400px">
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
                        :playOrPause="playOrPause"
                        x-webkit-airplay="allow"
                        x5-video-orientation="landscape"
                        style="display:inline"
                        controls
                        controlslist="nodownload"
                      >
                      <source :data-src="vItem.video_url" type="video/mp4">
                      </video>
                    </div>
                  </div>
                  <div class="video_info">
                    <div class="video_info_left">
                      <div class="video_info_img"  @click="photoBtn(vItem.user_id,vItem.username)">
                        <img :src="vItem.avatar" alt />
                      </div>
                      <div class="video_info_watch">
                          <div v-if="vItem.uid !== 0">
                              <van-tag color="#f2826a" v-if="!vItem.is_follow" class="video_info_title" @click="attentionBtn(vItem,vIndex)">关注</van-tag>
                              <van-tag color="#F00" v-else class="video_info_title" @click="attentionBtn(vItem,vIndex)">已关注</van-tag>
                          </div>
                          <p>@<span style="color:#ae8ee8">{{vItem.username}}</span></p>
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

                      <van-icon class="iconfont" class-prefix='icon' name='dashang' @click.stop="vItem.isReward = true"/>
                      <div class="icons_right">
                        <span class="collect_num">{{vItem.collect_num}}</span>
                        <van-icon :class="vItem.is_collect == true ? 'follow_active':''"  name="like" @click.stop="likeBtn(vItem,vIndex)"/>
                      </div>
                    </div>
                  </div>
                  <!-- 底部礼物列表 -->
              <div class="mask_bottom" v-if="vItem.isReward">
                <van-icon
                  name="close"
                  class="closeBtn"
                  @click.stop="vItem.isReward = false"
                />
                <h3>使用积分送礼物&nbsp;奖励12%邮票</h3>
                <div>
                  <ul class="mask_bottom_gifts">
                    <li class="mask_gift_item" :class="selGiftIndex == gIndex ?'selActive':''" v-for="(gItem,gIndex) in giftList" :key="gIndex" @click.stop="selGiftIndex = gIndex">
                      <div class="mask_gift_img">
                        <img :src="gItem.picture" />
                      </div>
                      <p>{{gItem.amount*1}}积分</p>
                    </li>
                  </ul>
                </div>
                <div class="gift_queryBox">
                  请选择数量:&nbsp;<van-stepper v-model="sel_gift_number" integer min="1"/>
                </div>
                <div class="mask_bottom_column">
                  <div class="mask_bottom_left">
                    <p >可用积分&nbsp;{{statistics.integral|numberFilter}}</p>
                    <van-button round type="primary" size="small" class="rechargeBtn" @click.stop="$router.push('/personCenter/recharge')">充值</van-button>
                  </div>
                  <van-button round size="small" class="presentBtn" @click.stop="presentBtn(vItem,vIndex)">赠送</van-button>
                </div>
              </div>
              </van-swipe-item>  
            </van-swipe>   
        </div>
     </van-pull-refresh> 
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "shortVideoTwo",
  data() {
    return {
      isPresent:false,//是否赠送礼物
      giftList:[],//礼物列表
      selGiftIndex:0,//选中礼物索引
      sel_gift_number:1,//选择礼物数量
      current: 0, //当前播放视频索引
      // currentVideoId:'',//当前视频id
      // currentVideoAttr:{},//当前视频参数
      playOrPause: true,
      search_text: "",
      loading: false,
      finished: false,
      isLoading: false,
      videosList: [],
      shortVideoConfig:{ //短视频请求配置
         page:1,
         row:10,
         uid:''
        },
      scrollPosition:0 //页面滚动位置
     }
  },
  created(){
    this.fetchGifts();
    this.fetchVideoList();
  },
  mounted(){
     this.$refs.shortScroll.addEventListener('scroll', this.handleScroll);
  },
  computed:{
    ...mapGetters(["statistics"])
  },
  methods: {
    //  fetchCurrentVideo(){ //获取当前视频参数
    //   let stampUrl = "video/smallVideoInfo";
    //   let data = {id:this.currentVideoId };
    //   this.$https.get(stampUrl,data).then( res => {
    //     if(res.data.code === 200 && res.data.data != {}){
    //       this.currentVideoAttr = res.data.data;
    //     }
    //   })
    // },
    onChange(index){ //视频滑动

      this.isPlayEnd(index);

      let video = document.querySelectorAll("video")[this.current]; //关闭前一个视频播放
      this.videosList[this.current].isReward = false; //关闭前一个视频的赠送页面
      this.sel_gift_number = 1; //礼物数量重新初始化为1
      video.pause();

      this.playOrPause = false;

      this.current = index; //播放当前视频
      this.playVideo();
    },
     isPlayEnd(index){ //列表播放到最后增加数据
    
       let len = this.videosList.length; //视频列表长度

       if((len-1) === index){  //滑动到最后追加数据
          let url = "video/shortVideoList";
          this.$https.get(url,this.shortVideoConfig).then(res => {
            if(res.data.code === 200 && res.data.data.length > 0){
                this.videosList = this.videosList.concat(res.data.data);
                this.shortVideoConfig.page++;
              }
          });
       }
    },
     playVideo(){ //播放视频
      let curVideo = document.querySelectorAll("video")[this.current];
      if(curVideo.src){
         curVideo.play();
      }else{
         let curVideoSrc = document.querySelectorAll("source")[this.current];
         curVideo.src = curVideoSrc.getAttribute('data-src');
         curVideo.play();
      }
    },
     fetchGifts(){ //获取礼物列表
      let giftUrl = "video/giftList";  
      this.$https.get(giftUrl).then(res => {
        if(res.data.code === 200 && res.data.data){
          this.giftList = res.data.data;
        }
      });
    },
    fetchVideoList() { //获取短视频列表
      let url = "video/shortVideoList";
      this.$https.get(url,this.shortVideoConfig).then(res => {
        if (res.data.code === 200 && res.data.data && res.data.data.length > 0) {
          let list = res.data.data;
          for (let i = 0; i < list.length; i++){
            list[i].isReward = false;
          }
          this.videosList = list;
          this.shortVideoConfig.page++;
        }
        this.isLoading = false; 
      });
    },
     //查看视频资料
    photoBtn(id,name){
     this.$router.push({path:"/personCenter/videoDetails",query:{user_id:id,user_name:name}});
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
         this.shortVideoConfig.page = 1; //将page设置为1获取最新数据
         let url = "video/shortVideoList";
          this.$https.get(url,this.shortVideoConfig).then(res => {
            if (res.data.code === 200 && res.data.data && res.data.data.length > 0) {
              this.videosList = []; //清空视频数组
              let list = res.data.data;
              for (let i = 0; i < list.length; i++){
                list[i].isReward = false;
              }
              this.videosList = list;
              this.current = 0; //视频跳回到第一个视频
              this.shortVideoConfig.page++;
            }
            this.isLoading = false; 
          });
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
              this.videosList[index].collect_num--;
              this.videosList[index].is_collect = false;
              this.$notify({
                    message:'取消收藏',
                    duration: 2000,
                    className:"notifyClass",
                    });
            }else{
             this.$notify({
                    message:'已收藏',
                    duration: 2000,
                    className:"notifyClass",
                    background:"#07C160"
                    });
              this.videosList[index].collect_num++;
              this.videosList[index].is_collect = true;
            }
          }else{
            this.$notify({
                    message:res.data.msg,
                    duration: 3000,
                    className:"notifyClass",
                    });
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
                if(this.videosList[index].is_follow){ //增加、减少关注的数量
                  this.$store.commit("follow");
                  this.$notify({
                    message:"关注成功",
                    duration: 3000,
                    className:"notifyClass",
                    background:"#07C160"
                    });
                }else{
                    this.$store.commit("unfollow");
                    this.$notify({
                    message:"取消关注",
                    duration:3000,
                    className:"notifyClass",
                    });
                }    
             }else{
               this.$notify({
                    message:res.data.msg,
                    duration: 3000,
                    className:"notifyClass",
                    });
              }
         })
    },
    //赠送礼物
    presentBtn(obj,index){
      let selGift = this.giftList[this.selGiftIndex]; //选中的礼物
      let number = this.sel_gift_number; //礼物的数量
      let url = "video/sendAGift";
      let data = {
        video_id:obj.id,
        gift_id:selGift.id,
        num:number
      }
       this.$https.post(url,data).then(res => {
          if(res.data.code == 200 ){          
            let integral  = selGift.amount * number; //赠送成功扣除积分
            this.$store.commit("reduceIntegral",integral);
            let returnStamp = selGift.amount * number * 0.12; //使用积分打赏返回12%的邮票;
            this.videosList[index].amount = parseInt(this.videosList[index].amount)+selGift.amount * number*0.02; //每次赠送礼物视频自身增加2%邮票
            this.$store.commit("increaseStamp",returnStamp);
            this.$notify({
                  message:'礼物赠送成功',
                  className:"notifyClass",
                  duration: 5000,
                  background:"#07C160"
                });
          }else{
           this.$notify({
                  message:res.data.msg,
                  className:"notifyClass",
                  duration: 5000,
                });
            } 
         })
      },
    onSearch() {
      // console.log("点击搜索按钮" + this.search_text);
    },
    handleScroll(){ //页面滚动位置
         console.log(this.$refs.shortScroll.scrollTop);
         this.scrollPosition  = this.$refs.shortScroll.scrollTop;
     }
  },
  activated() {
      if(this.scrollPosition > 0){
        this.$refs.shortScroll.scrollTo(0, this.scrollPosition);
      }
      this.scrollPosition = 0;
      this.$refs.shortScroll.addEventListener('scroll', this.handleScroll);
   },
   deactivated(){
     this.$refs.shortScroll.removeEventListener('scroll', this.handleScroll);
    }
};
</script>
<style lang="scss" scoped>

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
    font-size: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    color: rgba(255,255,255,0.4);
  }
  .play {
    font-size: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    border-radius: 50%;
    color: rgba(255,255,255,0.4);
  }
}
.shortVideoTwo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom:60px;
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

  // 下拉刷新样式
  .van-pull-refresh{ 
    width:100%;
    height:100%;
  }

  .video_main {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    bottom:0;
    box-sizing:border-box;
    padding: 0 5px;
    // overflow: scroll;
   
   .video_item{
     margin-bottom:15px;
     position: relative;
   }
    .video_content {
      position: relative;
      .video_title {
        text-align: left;
        color:#000000;
        font-size: 15px;
        line-height: 24px;
        font-weight:500;
        height:40px;
        line-height:40px;
        letter-spacing:2px;
        // border-top:1px solid rgba(0,0,0,0.1);
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
      height:50px;
      padding:5px 10px;
      box-shadow: rgba(0,0,0,.2) 0 1px 5px 0px;
      border-radius: 0 0 10px 10px;
      .video_info_left {
        height:100%;
        flex: 1;
        display: flex;
        text-align: left;
        align-items:center;
        .video_info_img {
          width: 40px;
          height: 40px;
          margin-right:15px;
          overflow: hidden;
          border-radius:50%;
        }
        .video_info_watch{
          height:100%;
          text-align:left;
          font-size:14px;
          p{
            padding-top:5px;
          }
        }
        .video_info_title {
          height:18px;
          line-height:18px;
          letter-spacing:3px;
          padding:1px 4px;
          
        }
      }
      .video_info_icons {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content:space-between;
        font-size: 20px;
        color:gray;
        .icon-dashang{
          font-size:30px;
          color:#1478DF;
        }
        .icons_right{
            display: flex;
            align-items: center;
        }
        .collect_num{
          margin-right:5px;
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
// 礼物列表
.mask_bottom {
    z-index:1002;
    position: absolute;
    bottom:0px;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding:10px;
    border-radius: 10px 10px 0 0;
    text-align: left;
    color: #ffffff;
     h3{
      text-align:center;
      color:yellow;
    }
    .selActive{
      transition: color .5s ease,border-radius 1s ease;
      color:yellow;
      border:1px solid rgba(255,255,0,0.5);
      border-radius:10px;
     }
     .closeBtn{
        font-size:25px;
        position: absolute;
        z-index:1005;
        right:5px;
        top:5px;
        color:gray;
      }
     .gift_queryBox{
        display:flex;
        align-items:center;
        margin:10px 0;
        font-size:16px;
     } 
    .mask_bottom_gifts{
        min-height:123px;
        display:-webkit-box;
        overflow-x:scroll;
        .mask_gift_item{
         margin-top:8px;
         box-sizing:border-box;
         text-align:center;
         .mask_gift_img{
           width:100px;
           height:100px;
         }
        }
    }
    .mask_bottom_column {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .mask_bottom_left{
        flex:1;
        display:flex;
        align-items:center;
        .rechargeBtn {
          margin-left:10px;
          font-size:12px;
          height:24px;
          line-height:24px;
        }
      }
      .presentBtn {
        background: linear-gradient(to right, #f94620, #fba102);
        color: #ffffff;
        font-size: 14px;
        border: none;
        height:24px;
        line-height:24px;
      }
    }
  }
</style>


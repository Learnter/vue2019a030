<template>
  <div class="container_box" id="video_box">
    <div class="van_swipe">
      <!--vant van-swipe 滑动组件 -->
      <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false" :initial-swipe="current" :duration="1000">
        <van-swipe-item v-for="(vItem, vIndex) in videoList" :key="vIndex" class="product_swiper">
          <div class="video_container">
            <!--video属性
                webkit-playsinline ios 小窗播放，使视频不脱离文本流，安卓则无效
                微信内置x5内核，
                x5-video-player-type="h5" 启用H5播放器,是wechat安卓版特性，添加此属性，微信浏览器会自动将视频置为全屏
                x5-video-player-fullscreen="true" 全屏设置，设置为 true 是防止横屏
                x5-video-orientation 控制横竖屏 landscape 横屏，portrain竖屏； 默认portrain
                x5-playsinline="" 使安卓实现h5同层播放，实现与ios同样效果，但兼容部分机型
                poster：封面
                src：播放地址
            -->
            <video
              class="video_box"
              width="100%"
              height="100%"
              webkit-playsinline="true"
              x5-playsinline
              x5-video-player-type="h5"
              x5-video-player-fullscreen
              playsinline
              preload="auto"
              :poster="vItem.poster"
              :src="vItem.video_url"
              :playOrPause="playOrPause"
              x-webkit-airplay="allow"
              x5-video-orientation="portrait"
              loop
              @click="pauseVideo"
              @ended="onPlayerEnded($event)"
            ></video>

            <!-- <div v-if="iconPlayShow" class="playOrPause" @click="pauseVideo"> -->
              <!-- 封面 -->
              <!-- <img v-show="isVideoShow" class="play" @click="playvideo" :src="item.cover" /> -->
              <!-- <van-icon name="play-circle" v-show="isVideoShow" class="play" @click="playvideo" /> -->
              <!-- 播放暂停按钮 -->
              <!-- <img v-show="iconPlayShow" class="icon_play" @click="playvideo" src="/video/icon_play.png" /> -->
              <!-- <van-icon name="pause-circle" class="icon_play"/>
            </div> -->
          </div>

          <!-- 顶部邮票功能 -->
          <div class="tools_top">
            <h2>邮票</h2>
            <p>{{vItem.amount}}</p>
          </div>

          <!-- 右侧点赞、分享功能 -->
          <div class="tools_right">
            <div class="tools_r_li" @click="photoBtn(vItem.user_id,vItem.username)">
              <img :src="vItem.avatar" />
            </div>
            <div class="tools_r_li" @click.stop="changeFollow(vItem,vIndex)">
              <van-tag type="danger">{{likeNum}}</van-tag>
              <van-icon
                name="youzan-shield"
                class="iconfont icon-shoucang icon_right"
                :class="vItem.is_praise?'follow_active':''"
              />
              <div class="tools_r_num">{{vItem.praise_num}}</div>
            </div>
            <div class="tools_r_li" @click.stop="changeShare">
              <van-icon name="chat" class="iconfont icon-iconfontforward icon_right" />
              <div class="tools_r_num">{{vItem.collect_num}}</div>
            </div>
            <div class="tools_r_li" @click.stop="changeShare">
              <van-icon name="weapp-nav" class="iconfont icon-iconfontforward icon_right" />
              <div class="tools_r_num">{{vItem.collect_num}}</div>
            </div>
          </div>
          <!-- 底部作品描述 -->
          <div class="production_box">
            <div>
              <div class="production_name">@{{vItem.username}}</div>
              <div class="production_des">{{vItem.title}}</div>
            </div>
            <div class="mask_user_gift" @click.stop="giftBtn">
              <img src="@/assets/tabImg/2019_a030_48.png" />
            </div>
          </div>

          <!-- 底部礼物列表 -->
          <div class="mask_bottom" v-if="isPresent">
             <van-icon
              name="close"
              class="closeBtn"
              @click.stop="isPresent = false"
            />
            <p>使用积分送礼物最高暴击10倍邮票</p>
            <div>
              <ul class="mask_bottom_gifts">
                <li class="mask_gift_item" :class="gItem.id == sel_gift_id ?'selActive':''" v-for="(gItem,gIndex) in giftList" :key="gIndex" @click.stop="sel_gift_id = gItem.id">
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
                 <p>可用积分&nbsp;{{integral}}</p>
                <van-button round type="primary" size="small" class="rechargeBtn" @click.stop="$router.push('/personCenter/recharge')">充值</van-button>
              </div>
              <van-button round size="small" class="presentBtn" @click.stop="presentBtn(vItem.id)">赠送</van-button>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>

      <!-- 顶部返回栏 -->
      <van-nav-bar left-arrow @click-left="$router.go(-1)"/>

      <!--底部操作栏-->
      <div class="container_bottom">
        <!-- <div class="bottom_tab" :class="tabIndex==0?'tab_active':''" @click="changeTab(0)">
          <span class="bottom_tab_span">首页</span>
        </div>
        <div class="bottom_tab" :class="tabIndex==1?'tab_active':''" @click="changeTab(1)">
          <span class="bottom_tab_span">我的</span>
        </div>-->
      </div>
      <!--分享弹框-->
      <!-- <div class="share_hover" v-show="showShareBox"></div> -->
      <div class="share_box" :class="showShareBox?'share_active':''">
        <div class="share_tips">分享到</div>
        <ul class="share_ul">
          <li class="share_li pengyouquan_li">
            <i class="iconfont icon-pengyouquan pengyouquan"></i>
          </li>
          <li class="share_li">
            <i class="iconfont icon-weixin weixin"></i>
          </li>
          <li class="share_li" @click="copyUrl">
            <i class="iconfont icon-lianjie lianjie"></i>
          </li>
          <div class="clear"></div>
        </ul>
        <div class="share_cancel" @click="cancelShare">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "videoChild",
  data() {
    let u = navigator.userAgent;
    return {
      likeNum:'',//每日点赞数
      isPresent:false,//是否赠送礼物
      sel_gift_id:'',//选择礼物的id
      sel_gift_number:1,//选择礼物数量
      selActive:0,
      current: 0, //当前视频索引
      isVideoShow: true,
      playOrPause: true, //播放或暂停
      video: null,
      iconPlayShow: false,
      isAndroid: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1, // android终端
      isiOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      tabIndex: 0,
      showShareBox: false,
      videoList: [], //视频列表
      giftList: [], //礼物列表
      videoConfig:{ //视频请求配置参数
        page:1,
        row:10,
        uid:''
      }
    };
  },
  created(){
    this.current =  parseInt(this.$route.query.vIndex); //获取传过来的视频索引;
    this.videoConfig.uid = this.$route.query.uid; //获取传过来的会员id;
    console.log(this.videoConfig.uid);
    this.fetchVideos();
  },
  computed:{
    ...mapGetters(["integral"])
  },
  methods: {
    fetchVideos() { //获取数据
      let url = "video/smallVideoList"; //获取视频列表
      this.$https.get(url,this.videoConfig).then(res => {
        if (res.data.code === 200 && res.data.data){
          this.videoList = res.data.data;
          console.log(this.videoList);
           this.$nextTick(()=>{
               document.querySelectorAll("video")[this.current].play(); //一进来就播放
           })
         }
      });

      let likeUrl = "user/userTodayLavePraiseNum"; //获取点赞数
      this.$https.get(likeUrl).then(res => {
         if(res.data.code === 200){
            this.likeNum = res.data.data;
         } 
      })

      let giftUrl = "video/giftList";  //获取礼物列表
      this.$https.get(giftUrl).then(res => {
        if(res.data.code === 200 && res.data.data){
          // console.log(res.data.data);
          this.giftList = res.data.data;
        }
      });
    },
    //改变菜单
    // changeTab(index) {
    //   this.tabIndex = index;
    // },
    //查看视频资料
    photoBtn(id,name){
     this.$router.push({path:"/personCenter/videoDetails",query:{user_id:id,user_name:name}});
    },
    //点赞
    changeFollow(item,index) {
     let objVideo = this.videoList[index];
     if( this.likeNum < 0){
       this.$toast("今天点赞数已用完");
     }else{

       if(!objVideo.is_praise){
          let url = "video/praiseVideo";
          let data = {
            id:item.id
          }
          this.$https.post(url,data).then(res => {
              if(res.data.code === 200){
                objVideo.is_praise = true;
                objVideo.praise_num++;
                this.likeNum--;
                this.$toast("今天还剩下"+this.likeNum+"点赞");
              }else{
                this.$toast({
                  position:"bottom",
                  message:res.data.msg
                });
              }
          })   
     }else{
       this.$toast({
         position:"bottom",
         message:"今天已点赞"
       });
     }
     }
    },
    //展示分享弹窗
    changeShare() {
      this.showShareBox = true;
    },
    //取消分享
    cancelShare() {
      this.showShareBox = false;
    },
    //滑动改变播放的视频
    onChange(index){
      //改变的时候 暂停当前播放的视频
      let video = document.querySelectorAll("video")[this.current];
      video.pause();
      this.playOrPause = false;
      this.current = index;
      // console.log("滑动改变视频");
      if (this.isiOS) {
        //ios切换直接自动播放下一个
        this.isVideoShow = false;
        this.pauseVideo();
      } else {
        //安卓播放时重置显示封面。图标等
        this.isVideoShow = true;
        this.iconPlayShow = true;
      }
    },
    // playvideo(event) {
    //   let video = document.querySelectorAll("video")[this.current];
    //   console.log("播放当前视频索引" + this.current);
    //   this.isVideoShow = false;
    //   this.iconPlayShow = false;
    //   video.play();
    //   window.onresize = function() {
    //     video.style.width = window.innerWidth + "px";
    //     video.style.height = window.innerHeight + "px";
    //   };
    // },
    pauseVideo() { //暂停\播放
      let video = document.querySelectorAll("video")[this.current];
      // if (this.playOrPause) {
      //   video.pause();
      //   // this.iconPlayShow = true;
      // } else {
        video.play();
        // this.iconPlayShow = false;
      // }
      // this.playOrPause = !this.playOrPause;
    },
    onPlayerEnded(player) {
      //视频结束
      // this.isVideoShow = true;
    },
    //复制当前链接
    copyUrl() {
      let httpUrl = window.location.href;
      var oInput = document.createElement("input");
      oInput.value = httpUrl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      alert("链接复制成功");
    },
    //礼物按钮
    giftBtn() {
      this.isPresent = true;
    },
    //切换礼物
    toggleGift(id){
      
    },
    //赠送礼物
    presentBtn(ID,val){

      if(!this.sel_gift_id){
        this.$toast('请选择礼物');
        return;
      }
      let url = "video/sendAGift";
      let data = {
        video_id:ID,
        gift_id:this.sel_gift_id,
        num:this.sel_gift_number
      }
      this.$https.post(url,data).then(res => {
          if(res.data.code == 200 ){
            this.$toast("礼物赠送成功");
          }else{
            this.$toast(res.data.msg);
          }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.selActive{
    transition: color .5s ease,border-radius 1s ease;
    color:yellow;
    border:1px solid rgba(255,255,0,0.5);
    border-radius:10px;
}
.clear {
  clear: both;
}

.video-player {
  height: 100vh;
  width: 100vw;
}

.product_swiper {
  width: 100vw;
  height: 100vh;
}

.van_swipe {
  width: 100vw;
  height: 100vh;
}

.van-swipe {
  width: 100%;
  height: 100%;
}

.container_box {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background:#ffffff;
}
.video_box {
  object-fit: fill !important;
  z-index:999;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

.van-nav-bar{
  position: absolute;
  left:0;
  top:0;
  width:100%;
  background:transparent;
  .van-icon{
    color:#ffffff;
    font-size:30px;
  }
}

video {
  object-position: 0 0;
}

.playOrPause{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  z-index:999;
  .icon_play {
  font-size: 50px;
  position: absolute;
  // top: 44%;
  // right: 0;
  // left: 0;
  // bottom: auto;
  // margin: auto;
  // z-index: 999;
  // height: 60px;
  left:50%;
  top:50%;
  transform:translate(-50%);
  border-radius:50%;
  color:rgba(0,0,0,0.5);
}

.play {
  font-size: 50px;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%);
  // top: 44%;
  // right: 0;
  // left: 0;
  // bottom: auto;
  // margin: auto;
  // z-index: 999;
  // height: 60px;
  border-radius: 50%;
  color:rgba(0,0,0,0.5);
}

}

.platStart {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

/* 邮票 */
.tools_top {
  z-index: 1000;
  position: absolute;
  top: 8%;
  right: 0;
  display: flex;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.2);
  border-radius:10px;
  line-height:20px;
  padding: 0 10px;
  font-size:14px;
  p {
    margin-left:5px;
    line-height:20px;
    height:100%;
    font-size:12px;
  }
}

/* 点赞，转发 */
.tools_right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 238px;
}

.tools_r_li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 14px;
  position: relative;
  .van-tag{
    border-radius:50%;
    padding:2px;
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

}

.tools_r_li:last-child {
  margin-bottom: 0px;
}

.icon_right {
  margin-bottom: 5px;
  font-size: 35px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}

.production_box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 60px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  .mask_user_gift {
    width: 50px;
    height: 50px;
  }
}

.production_name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.production_des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 62px;
}

/* 礼物 */
.mask_bottom {
    z-index:1002;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    padding:10px;
    border-radius: 10px 10px 0 0;
    text-align: left;
    color: #ffffff;
    .mask_bottom_gifts{
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

  .gift_queryBox{
    display:flex;
    align-items:center;
    margin:10px 0;
    font-size:16px;
  }

  .closeBtn{
    font-size:25px;
    position: absolute;
    z-index:1003;
    right:5px;
    top:5px;
    color:gray;
  }

// .container_bottom {
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   background: rgba(0, 0, 0, 0.2);
//   height: 60px;
//   border-top: 1px solid rgba(255, 255, 255, 0.7);
// }

.production_top {
  display: inline-block;
  padding: 6px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 5px;
}

.product_go {
  color: #fbdd21;
}

.production_title {
  margin-left: 4px;
}

.bottom_tab {
  width: 50%;
  text-align: center;
  float: left;
  color: #c9c9c9;
  padding: 10px 0;
}

.bottom_tab_span {
  line-height: 38px;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 0 4px;
  transition: 0.5s all;
}

.tab_active .bottom_tab_span {
  border-bottom: 2px solid #fff;
  color: #fff;
}

.icon-shoucang {
  transition: 0.5s all;
}

.follow_active {
  color: #f44;
  animation: showHeart 0.5s ease-in-out 0s;
}

/*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
/*animation-duration ：指定元素播放动画所持续的时间*/
/*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
/*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
/*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
/*animation-direction：主要用来设置动画播放方向*/
@keyframes showHeart {
  0% {
    color: #f44;
    transform: scale(1);
  }

  25% {
    color: #fff;
    transform: scale(0);
  }

  80% {
    color: #f44;
    transform: scale(1.2);
  }

  100% {
    color: #f44;
    transform: scale(1);
  }
}

/*分享样式*/
.share_hover {
  position: fixed;
  display: none;
}

.share_box {
  position: fixed;
  bottom: -300px;
  width: 100%;
  z-index: 1002;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
}

.share_tips {
  text-align: center;
  line-height: 38px;
  color: #333;
}

.share_ul {
  box-sizing: border-box;
  padding: 0 25px 25px;
  border-bottom: 1px solid #e8e8e8;
}

.share_li {
  float: left;
  width: 33%;
  text-align: center;
}

.share_li i {
  font-size: 44px;
}

.share_cancel {
  text-align: center;
  line-height: 48px;
  color: #777;
  text-align: center;
}

.pengyouquan {
  color: #47d000;
}

.pengyouquan_li {
  animation: rotating 8s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.weixin {
  color: #20ca2e;
}

.lianjie {
  color: #cdcdcd;
}

.share_active {
  bottom: 0px;
}
</style>


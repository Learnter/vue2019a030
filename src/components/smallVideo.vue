<template>
  <div class="smallVideo" >
    <div class="switchBox">
      <div class="navBtn uni-flex">
        <p class="nav_item" :class="actived == index ? 'actived' :''" v-for="(item,index) in navList" :key="index"  @click="toggleNav(item)" v-text="item.title"></p>
      </div>
    </div>
    <div class="main_content"  ref="smallScroll">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list v-model="loading" :finished="finished" finished-text="暂时没有更多了"  @load="onLoad" >
              <div class="main_ul">
                <van-cell class="main_item" v-for="(item,index) in videoList" :key="index" @click.stop="playVideo(index)">

                    <van-image fit="fill" round lazy-load :src="item.poster">
                        <template v-slot:loading>
                          <van-loading type="spinner" size="20" />
                        </template>
                    </van-image>
                    <!-- <img v-lazy="item.poster" > -->
                  <!-- 视频信息栏 -->
                  <div class="min_item_info uni-flex">
                    <div class="min_item_info_left">
                        <van-image  class="user_img" fit="fill"  round  lazy-load :src="item.avatar"/>
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
       videoConfig:{ //视频请求配置参数
        page:1,
        row:10,
        uid:''
      },
      videoList: [],//视频列表
      scrollPosition:0 //页面滚动位置
    };
  },
   created(){
      this.getStatistics();
      this.getUserInfo();
  },
  mounted(){
    this.$refs.smallScroll.addEventListener('scroll', this.handleScroll);
  },
  methods: {
       getStatistics(){ //获取资产统计信息
        let url = "user/getStatistics"; 
        this.$https.get(url).then(res => {
          if(res.data.code === 200 && res.data.data){
             this.$store.commit("set_user_statistics",res.data.data);
          }
        })
       }, 
       getUserInfo(){ //获取用户信息存储到vuex
        let url = "user/getUserInfo";
        this.$https.get(url).then(res => {
          if(res.data.code === 200 && Object.keys(res.data.data).length != 0){
                this.$store.commit("set_user_info",res.data.data);
           }
        })},
    fetchVideos(){//获取视频列表
      let url = "video/smallVideoList";
      this.$https.get(url,this.videoConfig).then(res => {
        //  console.log(res);
        if (res.data.code === 200 && res.data.data.length > 0){
          // console.log(this.videoList);
          this.videoList = this.videoList.concat(res.data.data);
          this.videoConfig.page++;
          this.loading = false;
        }else{
            this.loading = false;
            this.finished = true;
        }
        this.isLoading = false;
      });
    },
    //切换导航栏
    toggleNav(item) {
      this.actived = item.id; 
    },
    //点击图片跳转视频详情
    playVideo(val) {
      let videoArray = JSON.stringify(this.videoList); //视频列表数组
      let videoPage = this.videoConfig.page;//视频列表页数
      this.$router.push({path:"video/fullScreen",query:{vIndex:val,list:videoArray,page:videoPage}});
    },
    //收藏按钮
    likeBtn(index,item) {
        let url = "video/collectVideo";
        let data = { id:item.id };
        this.$https.post(url,data).then(res => {
          if (res.data.code === 200) {
            if( this.videoList[index].is_collect == true){
               this.$notify({
                       message:"取消收藏",
                       className:"notifyClass",
                       duration: 3000,
                   });
              this.videoList[index].collect_num--;
              this.videoList[index].is_collect = false;
            }else{
               this.$notify({
                       message:"已收藏",
                       className:"notifyClass",
                       duration:3000,
                       background:"#07C160"
                   });
              this.videoList[index].collect_num++;
              this.videoList[index].is_collect = true;
            }
          }else{
            this.$notify({
                      message:res.data.msg,
                      className:"notifyClass",
                      duration: 3000,
                   });
              }
        });
    },
    onLoad(){ //上拉加载
      this.fetchVideos();
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
        let url = "video/smallVideoList";
        this.videoConfig.page = 1;
        this.$https.get(url,this.videoConfig).then(res => {
        if (res.data.code === 200 && res.data.data.length > 0){
          this.videoList = res.data.data;
          this.videoConfig.page++;
          this.loading = false;
        }else{
            this.loading = false;
            this.finished = true;
        }
        this.isLoading = false;
        })
       }, 1000);
     },
     handleScroll(){ //页面滚动位置
         this.scrollPosition  = this.$refs.smallScroll.scrollTop
     }
  },
  activated(){
      if(this.scrollPosition > 0){
        this.$refs.smallScroll.scrollTo(0, this.scrollPosition);
      }
      this.scrollPosition = 0;
      this.$refs.smallScroll.addEventListener('scroll', this.handleScroll);
   },
   deactivated(){
     this.$refs.smallScroll.removeEventListener('scroll', this.handleScroll);
    },
    // watch:{
    //    $route (to,from){
    //     if(from.path =="/video/fullScreen"){
    //       this.scrollPosition = 0; //回到顶部
    //       this.onRefresh(); //重新获取新数据 
    //     }
    //   }
    // }
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
    padding-bottom:10px;
    .main_item {
      position: relative;
      width:47%;
      height:280px;
      margin-right:3%;
      margin-top:10px;
      border-radius:5px;
      border:1px solid rgba(0, 0, 0, 0.1);
      object-fit:fill;
    }

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
        border-radius:50%;
        overflow: hidden;
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
  }
}
</style>
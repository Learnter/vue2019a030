<template>
  <section class="videoDetails">
    <van-nav-bar :title="returnTitle" left-arrow @click-left="$router.go(-1)"></van-nav-bar>
    <!--<return-nav style="background:#B522FD">
      <template v-slot:middle>{{returnTitle}}</template>
    </return-nav>-->
    <div class="video_user">
      <div class="user_photo">
        <img :src="user_info.avatar"/>
      </div>
      <div class="user_info">
         <div class="user_info_top">
             <h2>{{user_info.nickname}}</h2> 
             <div v-if="user_info.user_id != oneselfId">
                <van-button round v-if="!user_info.is_follow" class="attention" @click="attentionBtn">关注</van-button>
                 <van-button round v-if="user_info.is_follow" class="cancelAttention" @click="attentionBtn">取消关注</van-button>
             </div>
         </div>
        <p>ID:<span style="color:#B40CFF">{{user_info.user_id}}</span></p>
      </div>
    </div>
    <div class="video_main">
        <div class="video_tab">
            <p v-for="(item,index) in navList" :class="currentTabComponent == item.type ? 'active':''" :key="index" @click="coverTab(item.type)">{{item.title}}</p>
        </div>
        <div class="videos_box">
            <keep-alive>
                <component v-bind:is="currentTabComponent" :uid="user_id"></component>
            </keep-alive>
        </div> 
    </div>
  </section>
</template>
<script>
import personSmall from "@/components/common/personSmall";
import personShort from "@/components/common/personShort";
import returnNav from "@/components/common/returnNav";
export default {
  name: "videoDetails",
  data() {
    return {
        navList:[{id:1,title:"小视频",type:"personSmall"},{id:2,title:"短视频",type:"personShort"}],
        videoType:"small",//视频类型
        videoList:[],//视频列表
        user_id:'',//视频页面传入的会员的id
        user_info:{},//用户信息  
        currentTabComponent:'personSmall'
    };
  },
  created(){  
      this.user_id = this.$route.query.user_id;
      this.fetchUserInfo();
  },
  computed:{
      oneselfId(){ //返回账户本身ID   
        return JSON.parse(localStorage.getItem("LOGININFO")).userInfo.user_id;
      },
      returnTitle(){ //返回栏标题
         let title 
         if(this.user_info.user_id != this.oneselfId){  //判断是否进入的是自己的视频页面
           title = this.user_info.nickname + "的作品";
         }else{  
           title = "我的作品"
         }
         return title;
      } 
  },
  methods: {
    fetchUserInfo(){ //获取用户信息
      let url = "user/getUserInfo";
      let data = {
        user_id:this.user_id
      }
      this.$https.get(url,data).then(res => {
        if(res.data.code === 200 && res.data.data){
            this.user_info = res.data.data;
         }
      })
    },
     coverTab(type){ //切换导航
         if(type == "personSmall"){
          this.currentTabComponent = 'personSmall';
         }else{
           this.currentTabComponent = 'personShort';
         }
     },

     attentionBtn(){ //点击关注按钮
      let url = "user/followUser";
       let data = {
           uid:this.user_info.user_id
       }
       this.$https.post(url,data).then(res => {

          if(res.data.code === 200){

            this.user_info.is_follow ? this.user_info.is_follow = false : this.user_info.is_follow = true;
            if( this.user_info.is_follow){
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
                    duration: 3000,
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
     }
  },
  components:{
    personSmall,
    personShort,
    returnNav
  }
};
</script>
<style lang="scss" scoped>
.videoDetails {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .van-nav-bar {
    height:54px;
    line-height:54px;
    background-color:#6495ED !important;
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
    margin:10px;
    background: #E6E6FA;
    border-radius:10px;
    .user_photo {
      width: 65px;
      height: 65px;
      padding: 2px;
      border-radius: 50%;
      margin-right: 15px;
      background: linear-gradient(to right, #B40CFF, #793DFF);
      overflow: hidden;
      background:#fff;
      img{
        width:100%;
        height:100%;
        border-radius:50%;
      }
    }
    .user_info {
      flex: 1;
      padding:10px 0;
      text-align: left;
      color: #B40CFF;
      .user_info_top{
        display:flex;
        justify-content:space-between;
        align-items:center;
        font-size:16px;
        padding:8px 0;
         .attention{
            height:25px;
            line-height:25px;
            font-size:13px;
            border:none;
            background: linear-gradient(to right, #f94620, #fba102);
            color:white;
            letter-spacing:2px;
         }
         .cancelAttention{
           height:25px;
           line-height:25px;
           font-size:13px;
           color:white;
           background:transparent;
           letter-spacing:2px;
         }
      }
      p {
        font-size:15px;
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
    top: 184px;
    left: 0;
    bottom: 0;
    background:#fff;
    .video_tab{
       height:45px;
       background:#D8BFD8;
       display:flex;
       justify-content:space-between;
       align-items:center;
       border-radius:5px;
       p{
           width:50%;
           height:100%;
           line-height:45px;
           text-align:center;
           color:#696969;
           font-size:16px;
           letter-spacing:2px;
       } 
       .active{
         font-size:18px;
         color:#9370DB;
         transition:font-weight .5s ease,color 1s ease-in-out;
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
    }
  }
}
</style>


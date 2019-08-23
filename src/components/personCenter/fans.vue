<template>
  <section class="fans">
    <van-nav-bar title="我的粉丝"  left-arrow  @click-left="$router.go(-1)"></van-nav-bar>

    <div class="fans_main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="暂时没有更多了"
            @load="onLoad"
            :offset="100"
            >
            <van-cell  v-for="(item,index) in fansList" :key="index"> 
                <div class="fans_left" @click="fansDetail(item.user_id)">
                    <div class="fl_img">
                        <img :src="item.avatar" alt="">
                    </div>
                    <span>{{item.username}}</span>
                </div>

                <van-button round v-if="!item.is_follow" class="attention" @click="attentionBtn(item,index)">关注</van-button>
                <van-button round v-if="item.is_follow" class="cancelAttention" @click="attentionBtn(item,index)">取消关注</van-button>
            </van-cell>
          </van-list>
      </van-pull-refresh>
    </div>
      
  </section>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  name: "fans",
  data() {
    return {
      isLoading:false,
      loading: false,
      finished: false,
      fansConfig: {
        page: 1,
        row: 10
      },
      fansList: []
    };
  },
  computed:{
    ...mapGetters(["statistics"])
  },
  methods: {
    fetchData() {
      let url = "user/getFansList";
      this.$https.get(url, this.fansConfig).then(res => {
          // console.log(res);
        if (res.data.code === 200 && res.data.data.length > 0) {
          this.fansList = this.fansList.concat(res.data.data);
          // console.log(this.fansList);
          this.fansConfig.page++;
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
        this.isLoading = false;
      });
    },
    attentionBtn(item,index){ //点击关注按钮
       let url = "user/followUser";
       let data = {
           uid:item.user_id
       }
       this.$https.post(url,data).then(res => {
          if(res.data.code === 200){
            this.fansList[index].is_follow = !this.fansList[index].is_follow; //是否关注
            if(this.fansList[index].is_follow){
              this.$store.commit("follow");
            }else{
              this.$store.commit("unfollow");
            }
            this.$toast({
               position:"bottom",
               message:res.data.data
            });  
          }
       })
    },
    onLoad() {
      this.fetchData();
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
        this.fansConfig.page = 1;
        this.fansList = [];
        this.fetchData();
       }, 500);
     },
    fansDetail(id){ //跳转视频页面
      this.$router.push({path:"/personCenter/videoDetails",query:{user_id:id}});
    }
  }
};
</script>
<style lang="scss" scoped>


.fans {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #000000;
  // background:#F8F8FF;
  .van-nav-bar{
      height:54px;
      line-height:54px;
      background-color:#000000;
      // background-color:#9F79EE !important;
      .van-nav-bar__title{
          font-size:18px;
          color:#ffffff;
      }
      .van-icon{
         font-size: 24px;
         color: white;
      }

  }

  .fans_main{
      position:absolute;
      left:0;
      top:54px;
      width:100%;
      bottom:0;
      overflow:scroll;
  }

    .van-list{
    padding:10px;
  }

  .van-cell{
      background:#000000;
      /*background:linear-gradient(30deg,#EEE685,#E0FFFF,#EE7AE9);*/
      // background:linear-gradient(120deg,#E0FFFF,#EEE685,#F8F8FF)!important;
      border-bottom:1px solid rgba(255,255,255,0.1);
      margin-bottom:10px;
      // border-radius:10px;
  }
  .van-cell__value{
     color:#ffffff;
     display:flex;
     align-items:center;
     justify-content:space-between;
     padding:8px 15px;
     letter-spacing:2px;
     .fans_left{
      flex:1;
      display:flex;
      align-items:center;
      // color:#8B008B;
      color:#fff;
      .fl_img{
        box-sizing:border-box;
        z-index:999;
        width:50px;
        height:50px;
        margin-right:10px;
        padding:5px;
        background:#E6E6FA;
        border-radius:50%;
          img{   
            width:100%;
            height:100%;
            border-radius:50%;  
        }
      }
     
    }
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
      font-size:12px;
      color:white;
      // color:#AB82FF;
      background: transparent;
      // background:linear-gradient(120deg,#EE7AE9,#E0FFFF,#EEE685);
      letter-spacing:2px;
       }
   }
}
</style>

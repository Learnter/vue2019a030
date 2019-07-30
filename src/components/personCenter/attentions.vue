<template>
  <section class="attentions">
    <van-nav-bar title="我的关注"  left-arrow  @click-left="$router.go(-1)"></van-nav-bar>

    <div class="fans_main">
          <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="100"
        >
        <van-cell  v-for="(item,index) in attentionList" :key="index"> 
            <div class="fans_left" @click="attentionDetail(item.user_id)">
                <img :src="item.avatar">
                <span>{{item.username}}</span>
            </div>
            <van-button round class="cancelAttention" @click="attentionBtn(item,index)">取消关注</van-button>
        </van-cell>
      </van-list>
    </div>
      
  </section>
</template>
<script>
export default {
  name: "attentions",
  data() {
    return {
      loading: false,
      finished: false,
      attConfig: {
        page:1,
        row:10
      },
      attentionList: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let url = "user/getFollowList";
      this.$https.get(url, this.attConfig).then(res => {
          // console.log(res);
        if (res.data.code === 200 && res.data.data.length > 0) {
          this.attentionList = res.data.data;
          this.attConfig.page++;
          this.loading = false;
        } else {
          this.loading = false;
          this.finished = true;
        }
      });
    },
    attentionBtn(item,index){   
       let url = "user/followUser";
       let data = {
           uid:item.user_id
       }
       this.$https.post(url,data).then(res => {
          if(res.data.code === 200){
            this.attentionList.splice(index,1);
            this.$toast(res.data.data); 
            this.$store.commit("unfollow");
          }
       })
    },
    attentionDetail(id){ //跳转视频页面
      this.$router.push({path:"/personCenter/videoDetails",query:{user_id:id}});
    },
    onLoad() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.attentions {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #000000;

  .van-nav-bar{
      height:54px;
      line-height:54px;
      background:#000000;
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

  .van-cell{
      background:#000000;
      border-bottom:1px solid rgba(255,255,255,0.1);
      margin-bottom:10px;
  }

  .van-cell__value{
     color:#ffffff;
     display:flex;
     align-items:center;
     justify-content:space-between;
     padding:10px 15px;
     letter-spacing:2px;
     .fans_left{
      flex:1;
      display:flex;
      align-items:center;
      img{
          width:50px;
          height:50px;
          border-radius:50%;
          margin-right:10px;
      }
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
}
</style>

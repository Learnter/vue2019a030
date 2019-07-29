<template>
  <section class="page">

    <div class="user_main">

      <div class="userTop">

        <img src="@/assets/tabImg/2019_a030_64.png" />

        <div class="setup" @click="setUp">
           <van-icon name="setting-o" />
        </div>

        <div class="user_content">
          <div class="userInfo uni-flex">
            <div class="user_img">
              <img :src="userInfo.avatar" />
            </div>
            <div class="user_detail">
              <div class="user_name uni-flex">
                <p>{{userInfo.nickname}}</p>
                <div class="user_tag">
                  <img src="@/assets/tabImg/2019_a030_20.png" />
                </div>
              </div>
              <p class="user_account">ID:{{userInfo.user_id}}</p>
            </div>
          </div>

          <div class="user_watch uni-flex">
            <div class="uni_watch_item" @click="videosBtn">
              <div>{{statistics.video_num|numberFilter}}</div>
              <div>视频</div>
            </div>
            <div class="split_line"></div>
            <div class="uni_watch_item" @click="attentionsBtn">
              <div>{{statistics.follow_num|numberFilter}}</div>
              <div>关注</div>
            </div>
            <div class="split_line"></div>
            <div class="uni_watch_item" @click="fansBtn">
              <div>{{statistics.fans_num|numberFilter}}</div>
              <div>粉丝</div>
            </div>
            <div class="split_line"></div> 
            <div class="uni_watch_item">
              <div>{{statistics.team_num|numberFilter}}</div>
              <div>团队</div>
            </div>
          </div>
        </div>
      </div>

      <div class="user_assets">
        <div class="user_operation uni-flex">
          <div class="user_operation_item uni_watch_item" @click="recharge">
            <div class=" operation_icon" style="color:#0ECDFF">
              <van-icon name="cash-back-record"/>
            </div>
            <p>充值</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="deposit">
            <div class="operation_icon" style="color:#0ECDFF">
              <van-icon name="pending-payment"/>
            </div>
            <p>提现</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="numberAssets">
            <div class="operation_icon">
               <van-icon name="gem-o"/>
            </div>
            <p>数字资产</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="convert">
            <div class="operation_icon">
              <van-icon name="point-gift-o"/>
            </div>
            <p>邮票兑换</p>
          </div>
        </div>

        <div class="user_money uni-flex">
          <div class="uni_watch_item" > 
            <p>余额</p>
            <p>{{statistics.balance|numberFilter}}</p>
          </div>
          <div class="uni_watch_item">
            <p>今日回馈</p>
            <p>{{statistics.dividend_today|numberFilter}}</p>
          </div>
          <div class="uni_watch_item">
            <p>佣金</p>
            <p>{{statistics.brokerage|numberFilter}}</p>
          </div>
          <div class="uni_watch_item">
            <p>总收入</p>
            <p>{{statistics.total_bonus|numberFilter}}</p>
          </div>
        </div>
        <div class="user_integral uni-flex">
          <div class="uni_watch_item">
            <p>邮币</p>
            <p>{{statistics.postal_currency|numberFilter}}</p>
          </div>
          <div class="uni_watch_item">
            <p>邮票</p>
            <p>{{statistics.stamp|numberFilter}}</p>
          </div>
          <div class="uni_watch_item">
            <p>积分</p>
            <p>{{statistics.integral|numberFilter}}</p>
          </div>
        </div>
      </div>

      <div class="user_config">
        <div class="user_config_item uni-flex">
          <div class="user_icon ">
            <van-icon name="chat-o" />
          </div>
          <p>消息</p>
        </div>
        <div class="user_config_item uni-flex" @click="$router.push('/personCenter/assetDetails')">
          <div class="user_icon ">
            <van-icon name="balance-o" />
          </div>
          <p>钱包明细</p>
        </div>
        <div class="user_config_item uni-flex">
          <div class="user_icon ">
            <van-icon name="manager-o" />
          </div>
          <p>主播认证</p>
        </div>
        <div class="user_config_item uni-flex" @click="$router.push('/personCenter/team')">
          <div class="user_icon ">
            <van-icon name="medel-o" />
          </div>
          <p>我的团队</p>
        </div>
        <div class="user_config_item uni-flex" @click="inviteFriends">
          <div class="user_icon ">
            <van-icon name="friends-o" />
          </div>
          <p>邀请好友</p>
        </div>
        <div class="user_config_item uni-flex" @click="gameGuide">
          <div class="user_icon ">
            <van-icon name="question-o" />
          </div>
          <p>玩法攻略</p>
        </div>
        <div class="user_config_item uni-flex" @click='updateVersion'>
          <div class="user_icon">
            <van-icon name="upgrade" />
          </div>
          <p>版本更新</p>
        </div>
        <div class="user_config_item uni-flex" @click='exit'>
          <div class="user_icon">
            <van-icon name="qr" />
          </div>
          <p>退出</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name:"personCenter",
    data(){
      return {
        statisticsData:{},//统计数据
      };
    },
    beforeRouteEnter (to, from, next) { //此路由守卫用于判断是否从第三方充值成功页面进入;
      if(from.path == "/"){
          next(vm => {
            vm.uploadStatistics();
          })
      }else{
         next();
      }
   },
    created(){
      this.getUserInfo();
    },
    computed:{
      ...mapGetters(['userInfo','statistics'])
    },
    methods: { 
      uploadStatistics(){ //此方法用户充值成功后、重新获取用户新的资产数据、并重新存储到vuex;
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
          //  console.log(res);
          if(res.data.code === 200 && Object.keys(res.data.data).length != 0){
                // this.userInfo = res.data.data;
                this.$store.commit("set_user_info",res.data.data);
           }
        })
      },
      setUp() { //设置按钮
       this.$router.push('/personCenter/editPersonInfo')
      },
      recharge() { //充值
        this.$router.push("/personCenter/recharge");
      },
      deposit() { //提现
        this.$router.push("/personCenter/userAccount");
      },
      numberAssets() { //查看资产
        this.$router.push("/personCenter/digitalAsset");
      },
      gameGuide(){ //游戏攻略
        this.$router.push("/personCenter/gameGuide");
      },
      convert() { //邮票兑换
        this.$router.push("/personCenter/exchange");
      },
      inviteFriends() { //邀请好友
        this.$router.push("/personCenter/share");
        // this.$toast("功能尚未开启");
      },
      updateVersion(){ //更新版本
        this.$toast("已经是最新版本");
      },
      fansBtn(){ //粉丝列表
         this.$router.push("/personCenter/fans");
      },
      attentionsBtn(){ //关注列表
        this.$router.push("/personCenter/attentions");
      },
      videosBtn(){ //视频列表
        this.$router.push({path:"/personCenter/videoDetails",query:{user_id:this.userInfo.user_id}});
      },
      exit(){ //用户退出
        this.$dialog.confirm({
          title:"重要提示",
          message: '您确定要退出吗'
        }).then(()=>{
            localStorage.removeItem("user"); //移除永久缓存信息
            this.$store.commit("clearState"); //退出清空vuex数据
            this.$router.push('/login'); //跳转到登录页面
        }).catch(()=>{
           return ;
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .user_main {
    padding-bottom: 60px;
    font-size: 14px;
  }

  .user_icon {
    font-size:25px;
    margin-right:5px;
  }

  .userTop {
    position: relative;
    min-width: 100%;
    min-height: 196px;
    letter-spacing: 1px;
    color: white;
  }

  .setup {
    position: absolute;
    top: 20px;
    right: 13px;
    width: 20px;
    height: 23px;
    font-size:25px;
  }

  .user_content {
    position: absolute;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding: 0px 15px 10px;
  }

  .userInfo {
    align-items: flex-start;
    margin-bottom: 30px;
  }


  .user_img {
    width: 65px;
    height: 65px;
    padding: 2px;
    border-radius: 50%;
    margin-right: 15px;
    background: linear-gradient(to right, #B40CFF, #793DFF);
    overflow: hidden;
    img{
      width:100%;
      height:100%;
      border-radius:50%;
    }
  }

  .user_name {
    align-items: center;
    line-height: 1.5;
  }

  .user_tag {
    width: 13px;
    height: 13px;
    line-height: 13px;
    margin-left: 5px;
  }

  .user_account {
    font-size: 11px;
    margin-top:10px;
  }

  .user_detail {
    text-align: left;
  }


  .user_watch {
    justify-content: space-around;
    align-items: center;
  }

  .split_line {
    width: 2px;
    height: 16px;
    background: white;
  }

  .uni_watch_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.5;
  }


  .user_assets {
    padding: 15px;
  }

  .user_operation {
    justify-content: space-around;
  }

  .operation_icon {
    font-size:30px;
    color:#FABD03;
    line-height:1.2;
  }

  .user_money {
    justify-content: space-around;
    padding: 15px 0;
    margin: 15px 0;
    color: white;
    border-radius: 5px;
    background: linear-gradient(to right, #B40CFF, #793DFF);
  }

  .user_integral {
    justify-content: space-around;
  }

  .user_config {
    padding: 0 15px;
  }


  .user_config_item {
    align-items: center;
    padding: 10px 0;
  }

</style>
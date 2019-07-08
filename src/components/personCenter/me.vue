<template>
  <section class="page">

    <div class="user_main">

      <div class="userTop">

        <img src="@/assets/tabImg/2019_a030_18.png" />

        <div class="setup" @click="setUp">
          <img src="@/assets/tabImg/2019_a030_21.png" />
        </div>

        <div class="user_content">
          <div class="userInfo uni-flex">
            <div class="user_img">
              <img src="@/assets/tabImg/2019_a030_19.png" />
            </div>
            <div class="user_detail">
              <div class="user_name uni-flex">
                <p>钟馗收妖、</p>
                <div class="user_tag">
                  <img src="@/assets/tabImg/2019_a030_20.png" />
                </div>
              </div>
              <p class="user_account">ID:153446</p>
            </div>
          </div>

          <div class="user_watch uni-flex">
            <div class="uni_watch_item">
              <div>{{statisticsData.video_num}}</div>
              <div>视频</div>
            </div>
            <div class="split_line"></div>
            <div class="uni_watch_item">
              <div>{{statisticsData.follow_num}}</div>
              <div>关注</div>
            </div>
            <div class="split_line"></div>
            <div class="uni_watch_item">
              <div>{{statisticsData.fans_num}}</div>
              <div>粉丝</div>
            </div>
            <div class="split_line"></div>
            <div class="uni_watch_item">
              <div>{{statisticsData.team_num}}</div>
              <div>团队</div>
            </div>
          </div>
        </div>
      </div>

      <div class="user_assets">
        <div class="user_operation uni-flex">
          <div class="user_operation_item uni_watch_item" @click="recharge">
            <div class="user_icon operation_icon">
              <img src="@/assets/tabImg/2019_a030_22.png" />
            </div>
            <p>充值</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="deposit">
            <div class="user_icon operation_icon">
              <img src="@/assets/tabImg/2019_a030_23.png" />
            </div>
            <p>提现</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="numberAssets">
            <div class="user_icon operation_icon">
              <img src="@/assets/tabImg/2019_a030_24.png" />
            </div>
            <p>数字资产</p>
          </div>
          <div class="user_operation_item uni_watch_item" @click="convert">
            <div class="user_icon operation_icon">
              <img src="@/assets/tabImg/2019_a030_25.png" />
            </div>
            <p>邮票兑换</p>
          </div>
        </div>

        <div class="user_money uni-flex">
          <div class="uni_watch_item" v-if="accountData['1']">
            <p>{{accountData['1']['wallet_name']}}</p>
            <p>{{accountData['1']['money']}}</p>
          </div>
          <div class="uni_watch_item">
            <p>今日回馈</p>
            <p>66678789</p>
          </div>
          <div class="uni_watch_item">
            <p>佣金</p>
            <p>66152165</p>
          </div>
          <div class="uni_watch_item">
            <p>总收入</p>
            <p>64565</p>
          </div>
        </div>

        <div class="user_integral uni-flex">
          <div class="uni_watch_item" v-if="accountData['2']">
            <p>{{accountData['2']['wallet_name']}}</p>
            <p>{{accountData['2']['money']}}</p>
          </div>
          <div class="uni_watch_item" v-if="accountData['3']">
            <p>{{accountData['3']['wallet_name']}}</p>
            <p>{{accountData['3']['money']}}</p>
          </div>
          <div class="uni_watch_item" v-if="accountData['4']">
            <p>{{accountData['4']['wallet_name']}}</p>
            <p>{{accountData['4']['money']}}</p>
          </div>
        </div>
      </div>

      <div class="user_config">
        <div class="user_config_item uni-flex">
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_26.png" />
          </div>
          <p>消息</p>
        </div>
        <div class="user_config_item uni-flex">
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_27.png" />
          </div>
          <p>主播认证</p>
        </div>
        <div class="user_config_item uni-flex">
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_28.png" />
          </div>
          <p>我的团队</p>
        </div>
        <div class="user_config_item uni-flex" @click="inviteFriends">
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_29.png" />
          </div>
          <p>邀请好友</p>
        </div>
        <div class="user_config_item uni-flex">
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_30.png" />
          </div>
          <p>玩法攻略</p>
        </div>
        <div class="user_config_item uni-flex" @click='$router.push("/login/register")'>
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_31.png" />
          </div>
          <p>版本更新</p>
        </div>
        <div class="user_config_item uni-flex" @click='exit'>
          <div class="user_icon config_icon">
            <img src="@/assets/tabImg/2019_a030_32.png" />
          </div>
          <p>退出</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "personCenter",
    data(){
      return {
          statisticsData:{}, //统计数据
          accountData:{} //账号资产信息
      };
    },
    created() {
      this.getStatistics();
      this.fetchAccountMoney();
    },
    methods: {
      getStatistics() { //获取统计信息
        let url = "user/getStatistics";
        this.$https.get(url).then(res => {
          if(res.data.code === 200 && res.data.data){
             this.statisticsData = res.data.data;
          }
        })
      },
      fetchAccountMoney(){ //获取账号资产
          let url = 'money/getUserWalletAmount';
          this.$https.get(url).then(res => {
            // console.log(res);
            if( res.data.code === 200 && res.data.data){
                this.accountData = res.data.data;
             }
          })
      },
      setUp() { //设置按钮
        console.log("点击设置按钮");
      },
      recharge() { //充值
        console.log("我要充值");
        this.$router.push("/personCenter/recharge");
      },
      deposit() { //提现
        console.log("我要提现");
        this.$router.push("/personCenter/userAccount");
      },
      numberAssets() { //查看资产
        console.log("我要看的资产");
      },
      convert() { //邮票兑换
        console.log("我要兑换邮票");
      },
      inviteFriends() { //邀请好友
        this.$router.push("/personCenter/share");
      },
      exit(){ //用户退出
        this.$dialog.confirm({
          title:"重要提示",
          message: '您确定要退出吗'
        }).then(()=>{
            sessionStorage.removeItem('user');//移除缓存信息
            this.$router.push('/login'); //跳转到登录页面
        }).catch(()=>{
           return ;
        })
      }
    },
    components: {

    }
  }

</script>

<style lang="scss" scoped>
  .user_main {
    padding-bottom: 60px;
    font-size: 14px;
  }

  .user_icon {
    width: 24px;
    height: 24px;
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
  }

  .user_name {
    align-items: center;
    font-family: cursive;
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
    margin-bottom: 8px;
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

  .config_icon {
    margin-right: 5px;
  }
</style>
<template>
  <section class="register">
    <div class="company_logo">
      <img src="@/assets/tabImg/logo.png" alt="logo" />
    </div>
    <div class="register_info">
      <van-cell-group>
        <van-field v-model="user.reg_code" label="推荐码" placeholder="请输入推荐码" clearable />
        <van-field v-model="user.account" label="手机号" placeholder="请输入手机号" clearable />
        <van-field 
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          clearable
        />
        <van-field v-if="smsSwitch"  v-model="user.verify_code" center clearable label="短信验证" placeholder="请输入手机验证码">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="getVerifyCode"
          >{{verifyCode}}</van-button>
        </van-field>
      </van-cell-group>
      <!-- <div class="read_prototype">
        <van-checkbox v-model="checked">阅读并同意</van-checkbox>
        <van-button slot="button" size="small" class="register_pro" @click="$router.push('/protocol')">[注册协议]</van-button>
      </div> -->
      <van-button
        class="registerBtn"
        icon="https://img.yzcdn.cn/vant/logo.png"
        type="info"
        round
        @click="toRegister"
      >立即注册</van-button>
    </div>
  </section>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      user:{
        reg_code: "",
        account: "",
        password: "",
        verify_code: ""
      },
      checked: true, //阅读协议
      verifyCode: "获取验证码",
      time:0,//倒计时
      isSendMessage:false,//是否正在发送信息期间
      timeOut:{},//全局计时器对象
      smsSwitch:false //短息验证码开关
    };
  },
  created(){
    this.fetchConfig();
  },
  mounted(){
     this.user.reg_code =  this.getQueryVariable("reg_code"); //获取用户邀请码
  },
  computed: {
    verifyInfo() {//获取用户验证码信息
      return {
        mobile: this.user.account,
        type: 1
      };
    }
  },
  methods: {
     fetchConfig(){ //获取平台全局配置
      let url = "config/getInfo";
      this.$https.get(url).then( res => {
        if( res && res.data && res.data.data){
           this.time = res.data.data.send_sms_time_out;
           this.smsSwitch = res.data.data.register_sms_switch;
         }
      })
     },
    getQueryVariable (variable){ //获取路由后邀请码参数
        var query = window.location.hash;
        // alert(query);
        if(query.indexOf(variable) != -1){

          var vars = query.split("=");

          //  alert(vars);
          if(vars[1].indexOf("&") != -1){ //解决微信中在后面拼接其他参数,

             var wx = vars[1].split("&");
            //  alert(wx[0]); 
             return wx[0]; 
          }

          return vars[1];
        }
      return '';
      },
    toRegister() {//注册账号
      if(!(/^[a-zA-Z0-9]{4,}$/).test(this.user.reg_code)){
          this.$toast("请输入正确的推荐码!");
          return false;
        }else if(!/^1[3456789]\d{9}$/.test(this.user.account)) {
          this.$toast("请输入正确的手机号!");
          return false;
       }else if(!(/^[a-zA-Z0-9]{6,}$/).test(this.user.password)){
          this.$toast("密码至少为6位字母,数字、下划线!"); 
          return false;
       }   
      // else if(!(/^[0-9]{4}$/).test(this.user.verify_code)){
      //     this.$toast("验证码输入有误!");
      //     return false;
      //  }else if(!this.checked){
      //     this.$toast("请先阅读协议!");
      //  }

      let url = "user/reg";
      this.$https.post(url, this.user).then(res => {
        // console.log(res);
        if (res && res.data) {
          let data = res.data;
          if (data.code === 200) {
            this.$toast("注册成功");
            // alert(res.data.data.app_download_url);
            setTimeout(() => {
              // this.$router.push("/login");
              // window.location.href = res.data.data.app_download_url;
              window.location.replace(res.data.data.app_download_url)
            }, 1000);
          } else {
            this.$toast(data.msg);
          }
        }
      });
    },
    getVerifyCode() { //获取短信验证码
      if(!/^1[3456789]\d{9}$/.test(this.user.account)) {
          this.$toast("请输入正确的手机号!");
          return false;
       }
       if(this.isSendMessage){ //防止重复点击发送按钮
          this.$toast("亲,请稍安勿躁!");
          return;
       }
      let url = "sendPhoneVerifyCode"; 
      this.$https.post(url,this.verifyInfo).then(res => {
        
        if (res && res.data && res.data.code === 200){

          this.isSendMessage = true;

          this.$toast("信息已发送,请注意查收!");

          this.timeOut = setInterval(() => {  //验证码倒计时
             this.verifyCode = this.time-- + "(S)";
            if(this.time === 0) {
                this.verifyCode = "重新获取";
                this.time = 60;
                this.isSendMessage = false;
                clearInterval(this.timeOut);
            }
          }, 1000);
        }
      });
    }
  },
  destroyed(){ //退出清除定时器
    clearInterval(this.timeOut);
  }
};
</script>
<style lang="scss">
.register {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  overflow-y: scroll;
  background: url("../../assets/tabImg/2019_a030_42.png") no-repeat;
  background-position: center center;
  background-size: cover;
  .company_logo {
    width: 80%;
    min-height: 100px;
    margin: 0 auto;
  }
  .register_info {
    width: 80%;
    padding: 20px;
    margin: auto;
    .van-cell-group {
      background: transparent;
      .van-cell {
        padding: 15px 10px;
        background: linear-gradient(30deg, #9d33ff, #756afd);
        color: white;
        margin-bottom: 10px;
        border-radius: 5px;
      }
    }
    // .read_prototype {
    //   display: flex;
    //   .van-checkbox__label {
    //     color: blue;
    //     font-weight: 700;
    //   }
    //   .register_pro {
    //     background: transparent;
    //     border: none;
    //     font-size: 16px;
    //     font-weight: bold;
    //   }
    // }
    .registerBtn {
      margin: 15px 0;
      font-size: 18px;
      width: 100%;
      border: none;
      background: linear-gradient(to right, #6495ed, #9d33ff, #756afd);
      letter-spacing: 4px;
    }
  }
}
</style>
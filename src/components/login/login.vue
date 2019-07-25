<template>
  <section class="login">
    <div class="company_logo">
      <img src="@/assets/tabImg/logo.png" alt="logo" />
    </div>
    <div class="login_info">
      <van-cell-group>
        <van-field
          v-model="user.account"
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
        />

        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          clearable
        />
      </van-cell-group>
      <van-button
        class="loginBtn"
        icon="https://img.yzcdn.cn/vant/logo.png"
        type="info"
        round
        @click="toLogin"
      >立即登录</van-button>
      <div class="login_tips">
        <van-button
          class="regestBtn"
          style="color:#007A"
          size="mini"
          @click="$router.push('/register')">立即注册</van-button>
        <div class="delimiter"></div>
        <van-button class="regestBtn" type="info" size="mini" @click="getVerifyCode">手机验证码登录</van-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name:"login",
  data() {
    return {
      user: {
        account: "",
        password: ""
      }
    };
  },
  created(){
     this.beforLogin();
  },
  methods:{
    beforLogin(){ //判断以前是否有登陆
      let user = JSON.parse(localStorage.getItem("user"));
      if(user && user.token){
        this.$router.push("/smallVideo");
      }
    },
    toLogin(){ //登录
     
      // /* 账号/密码非空判断*/
      // if (!(/^1[34578]\d{9}$/).test(user.account) ) {
      //   this.$toast("手机号码不存在!");
      //   return false;
      // } else if (!(/^[a-zA-Z0-9]{6,}$/).test(user.password)) {/* 密码规则最少需要6位数*/
      //   this.$toast("密码输入有误!");
      //   return false;
      // }

      let url = "user/login";  
      this.$https.post(url, this.user).then(res => {

        if (res.data.code == 200 && res.data.data) {

            this.$toast({
              message:"登录成功",
              duration:1000
              });
            localStorage.setItem("user",JSON.stringify(res.data.data)); //将登陆token信息存储到localStorage
            
            // console.log(res.data.data);
            // let userConfig = JSON.stringify(res.data.data);
            // sessionStorage.setItem("user",userConfig);
            setTimeout(() => {
              this.$router.push("/smallVideo");
            }, 2000);
        }else{
            this.$toast(res.data.msg);
            localStorage.removeItem("user"); //移除本地token
          }
      });
    },
    getVerifyCode(){ //获取手机验证码
      this.$toast("未获取验证码");
    }
  }
};
</script> 
<style lang="scss">
.login {
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
    margin: 10px auto;
  }
  .login_info {
    width: 70%;
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
        .van-field__control{
          &::-webkit-input-placeholder{
            color:#ae8ee8;
          }
        }
      }
    }
    .loginBtn {
      margin: 15px 0;
      font-size: 18px;
      width: 100%;
      border: none;
      background: linear-gradient(to right, #6495ed, #9d33ff, #756afd);
      letter-spacing: 4px;
    }

    .login_tips {
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .delimiter {
        width: 2px;
        height: 15px;
        background: white;
        margin: 0 10px;
        border-radius: 2px;
      }
      .regestBtn {
        background: transparent;
        outline: none;
        border: none;
        font-size: 18px;
      }
    }
  }
}
</style>

<template>
  <section class="login">
    <div class="company_logo">
      <img src="@/assets/tabImg/logo.png" alt="logo" />
    </div>
    <div class="login_info">
      <van-cell-group>
          <van-field type="text" v-model="user.account"  clearable label="用户名"  placeholder="请输入用户名" left-icon="contact" right-icon="question-o"  @click-right-icon="$toast('用户名必须是手机号')"/>

          <van-field type="password" v-model="user.password" label="密码" placeholder="请输入密码" clearable  left-icon="closed-eye" right-icon="question-o"  @click-right-icon="$toast('密码必须是数字、字母、下划线')"/>
      
          <van-button class="loginBtn" icon="https://img.yzcdn.cn/vant/logo.png" type="info" round  @click="toLogin">立即登录</van-button>
      </van-cell-group>

      <div class="login_tips">
        <van-button
          class="regestBtn"
          style="color:#fff"
          size="mini"
          @click="$router.push('/register')">立即注册</van-button>
        <!-- <div class="delimiter"></div>
        <van-button class="regestBtn" type="info" size="mini" @click="getVerifyCode">手机验证码登录</van-button> -->
      </div>
    </div>
  </section>
</template>
<script>
// import "@/axios/gt.js";
export default {
  name:"login",
  data() {
    return {
      user: {
        account:"",
        password: ""
      }
    };
  },
  created(){
     this.beforLogin();
  },
  methods:{
    beforLogin(){ //判断以前是否有登陆
      let user = JSON.parse(localStorage.getItem("LOGININFO"));
      if(user && user.token){
        this.$router.push("/smallVideo");
      }  
    },
    toLogin(){ //登录
     
      /* 账号/密码非空判断*/
      if (!(/^1[3456789]\d{9}$/).test(this.user.account) ) {
        this.$toast("请输入正确的手机号码!");
        return false;
      } else if (!(/^[a-zA-Z0-9]{6,}$/).test(this.user.password)) {/* 密码规则最少需要6位数*/
        this.$toast("密码输入有误!");
        return false;
      }

      let url = "user/login";  
      this.$https.post(url,this.user).then(res => {

        if (res.data.code == 200 && res.data.data) {
               this.$notify({
                        message:"登录成功",
                        duration: 2000,
                        background:"#07C160",
                        className:"notifyClass"
                    });
            localStorage.setItem("LOGININFO",JSON.stringify(res.data.data)); //将登陆token信息存储到localStorage
            // console.log(localStorage.getItem("user"));
            setTimeout(() => {
              this.$router.push("/smallVideo");
            }, 2000);
        }else{
             this.$notify({
                  message:res.data.msg,
                  duration: 2000,
                  className:"notifyClass"
               });
            localStorage.removeItem("LOGININFO"); //移除本地token
          }
      });
    },
    getVerifyCode(){ //获取手机验证码
      this.$toast("未获取验证码");
    }
  }
};
</script> 
<style lang="scss" scoped>
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
        .van-field__label{
          width:55px;
        }
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
      .van-icon__image{
        width:1em;
      }
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
        font-size: 14px;
      }
    }
  }
}
</style>

<template>
  <section class="login">
    <div class="company_logo">
      <img src="@/assets/tabImg/logo.png" alt="logo" />
    </div>
    <div class="login_info">
      <van-cell-group>
        <van-field v-model="username" clearable label="用户名" right-icon="question-o" placeholder="请输入用户名" @click-right-icon="$toast('question')"/>

        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" clearable />
      </van-cell-group>
      <van-button class="loginBtn" icon="https://img.yzcdn.cn/vant/logo.png" type="info" round>立即登录</van-button>
      <div class="login_tips">
        <van-button class="regestBtn" style="color:#007A"  size="mini">立即注册</van-button>
        <div class="delimiter"></div>
        <van-button class="regestBtn" type="info" size="mini">手机验证码登录</van-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
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
    padding:20px;
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
    .loginBtn {
      margin:15px 0;
      font-size:18px;
      width: 100%;
      border:none;
      background: linear-gradient(to right, #6495ED, #9d33ff, #756afd);
      letter-spacing: 4px;
    }

    .login_tips {
      padding: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .delimiter{
        width:2px;
        height:15px;
        background:white;
        margin: 0 10px;
        border-radius:2px;
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

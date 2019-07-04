<template>
  <section class="register">
    <div class="company_logo">
      <img src="@/assets/tabImg/logo.png" alt="logo" />
    </div>
    <div class="register_info">
      <van-cell-group>
        <van-field v-model="username" label="推荐码" placeholder="请输入推荐码" clearable />
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" clearable />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" clearable />
        <van-field v-model="sms" center clearable label="短信验证" placeholder="请输入手机验证码" >
          <van-button slot="button" size="small" type="primary">获取验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="read_prototype">
        <van-checkbox v-model="checked">阅读并同意</van-checkbox>
        <van-button slot="button" size="small" class="register_pro">[注册协议]</van-button>
      </div>
      <van-button class="registerBtn" icon="https://img.yzcdn.cn/vant/logo.png" type="info" round>立即注册</van-button>
    </div>
  </section>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      username: "",
      phone: "",
      password: "",
      sms: "",
      checked: true
    };
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
    .read_prototype {
      display: flex;
      .van-checkbox__label {
        color: blue;
        font-weight: 700;
      }
      .register_pro {
        background: transparent;
        border: none;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .registerBtn {
      margin:15px 0;
      font-size:18px;
      width: 100%;
      border:none;
      background: linear-gradient(to right, #6495ED, #9d33ff, #756afd);
      letter-spacing:4px;
    }
  }
}
</style>
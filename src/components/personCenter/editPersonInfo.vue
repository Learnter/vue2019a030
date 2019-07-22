<template>
    <section class="editInfo">
        <van-nav-bar title="编辑个人信息" left-arrow right-text="保存" @click-right="onClickRight"  @click-left="$router.go(-1)"></van-nav-bar>
        <div class="editHead">
             <van-uploader class="editImg" :after-read="afterRead">
                  <img src="@/assets/tabImg/2019_a030_19.png" alt="">
             </van-uploader>
            <p>点击更换头像</p>
        </div>
        <div class="login_info">
            <van-cell-group>
                <van-field v-model="username" clearable label="昵称"/>

                <van-field v-model="signature" clearable label="个性签名"/>
            </van-cell-group>
        </div>
    </section>
</template>
<script>
export default {
    name:"editInfo",
    data(){
        return{
            username:"",
            signature:"暂时还没想到个人签名"
        }
    },
    methods:{
        onClickRight(){

        },
        afterRead(file){
            console.log(file);
        }
    }
}
</script>
<style lang="scss" scoped>
    .editInfo{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: #000000;
         .van-nav-bar {
            height: 54px;
            line-height: 54px;
            background: #000000;
            .van-nav-bar__title {
                font-size: 18px;
                color: #ffffff;
            }
            .van-nav-bar__text{
                color:red;
                &:active{
                  background:none;
                }
            }
            .van-icon {
                font-size: 24px;
                color: white;
            }
        }
       .editHead{
           p{
               font-size:12px;
               color: #ffffff;
           }
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

<template>
  <section class="reward">
    <img src="../../assets/tabImg/2019_a030_4.png" alt />

    <van-icon class="returnBtn" name="arrow-left" @click="$router.go(-1)" />

    <div class="mask_top">
      <h2>邮票</h2>
      <p>1.78745</p>
    </div>

    <div class="mask_middle">
      <div class="mask_user_img">
        <img src="../../assets/tabImg/2019_a030_19.png" alt />
      </div>
      <van-icon name="thumb-circle-o" info="9" />
      <van-icon name="chat-o" info="999999" />
      <van-icon name="location-o" info="91111" />
    </div>

    <div class="mask_bottom">
      <p>使用积分送礼物最高暴击10倍邮票</p>
      <div>
        <ul class="mask_bottom_gifts">
          <li class="mask_gift_item" :class="index == selActive?'selActive':''" v-for="(item,index) in 6" :key="index" @click="toggleGift(item,index)">
            <div class="mask_gift_img">
              <img src="@/assets/tabImg/2019_a030_25.png" />
            </div>
            <p>100积分</p>
          </li>
        </ul>
      </div>
      <div class="mask_bottom_column">
        <p>
          可用积分&nbsp;100
          <van-button round type="primary" size="mini" class="rechargeBtn">充值</van-button>
        </p>
        <van-button round size="small" class="presentBtn">赠送</van-button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "reward",
  data(){
    return {
        selActive:0
    };
  },
  methods:{
      toggleGift(item,index){ //切换礼物
        this.selActive = index;
      }
  }
};
</script>
<style lang="scss">

.selActive{
    border:1px solid yellow;
}

.reward {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #ffffff;
  overflow:scroll;
  .returnBtn {
    position: absolute;
    left: 15px;
    top:3%;
    font-size:30px;
    color: #ffffff;
  }

  .mask_middle {
    position: absolute;
    right: 0;
    top:18%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .mask_user_img {
      width: 50px;
      height: 50px;
    }
    .van-icon {
      font-size: 35px;
      margin-top: 30px;
      color: #ffffff;
      .van-info {
        right: 90%;
      }
    }
  }

  .mask_top {
    position: absolute;
    right: 0;
    top: 8%;
    display: flex;
    color: #ffffff;
    h2 {
      position: absolute;
      left: -30px;
      top: 1px;
      background: rgba(255, 255, 255, 0.3);
      padding-right: 3px;
      border-radius: 5px;
      font-size: 18px;
    }
    p {
      background: rgba(0, 0, 0, 0.2);
      padding: 0 10px;
      border-radius: 0 10px 10px 0;
      line-height: 20px;
      font-size: 12px;
    }
  }

  .mask_bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    padding: 5px 10px 10px;
    border-radius: 10px 10px 0 0;
    text-align: left;
    color: #ffffff;
    .mask_bottom_gifts{
        display:-webkit-box;
        margin:10px 0;
        overflow-x:scroll;
        .mask_gift_item{
         width:80px;
         padding:5px 0;
         box-sizing:border-box;
         text-align:center;
         .mask_gift_img{
            width:50px;
            height:50px;
            margin:0 auto 10px;
         }

        }
    }
    .mask_bottom_column {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        flex: 1;
        .rechargeBtn {
          margin-left: 10px;
        }
      }

      .presentBtn {
        background: linear-gradient(to right, #f94620, #fba102);
        color: #ffffff;
        font-size: 14px;
        border: none;
        height:24px;
        line-height:24px;
      }
    }
  }
}
</style>

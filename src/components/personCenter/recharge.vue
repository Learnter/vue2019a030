<template>
  <section class="recharge" ref="recharge">
    <return-nav ref="returnNav" :color="nav_right_color" :path="nav_route_path">
      <template v-slot:middle>充值</template>
      <template v-slot:right>查看明细</template>
    </return-nav>

    <div class="recharge_main">
      <div class="recharge_account">
        <div v-if="user_asset['2']">
          <h3>{{user_asset['2'].wallet_name}}</h3>
          <p>{{user_asset['2'].money}}</p>
        </div>
        <div v-if="user_asset['4']">
          <h3>{{user_asset['4'].wallet_name}}</h3>
          <p>{{user_asset['4'].money}}</p>
        </div>
      </div>

      <div class="payment_way">
        <p class="payment_way_title">
          充值方式&nbsp;:&nbsp;
          <span>{{reacharge_way_title}}</span>
        </p>
        <div class="payment_way_list">
          <ul>
            <li v-for="(item,index) in reacharge_way" :key="index">
              <div class="payment_img" @click="paymentTab(item,index)">
                <img :src="item.src" alt />
                <div :class="reacharge_type == item.type ? 'payment_icon' : 'hidden_payment_icon'">
                  <img src="@/assets/tabImg/2019_a030_36.png" alt />
                </div>
              </div>
              <p>{{item.title}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="convert_box">
        <div class="convert_box_list">
          <ul>
            <li
              v-for="(item,index) in rechargeCofig"
              :key="index"
              :class="index == con_actived ? 'convert_actived':''"
              @click="convertTab(index,item)"
            >
              <span class="integral">赠送{{item.give_integral}}积分</span>
              <p class="convert_youBi">{{item.amount}}邮币</p>
              <p class="convert_monery">&yen;{{item.price}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div class="rechargeBtn">
        <button @click="rechargeBtn">立即充值</button>
      </div>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "recharge",
  data() {
    return {
      reacharge_way_title:"微信充值",//支付标题
      reacharge_type:"weixin",//支付类型
      reacharge_way:[{id:0,src:require('@/assets/tabImg/2019_a030_33.png'),title:'微信',type:'weixin'},{id:1,src:require('@/assets/tabImg/2019_a030_34.png'),title:'支付宝',type:"alipay"}],
      nav_right_color: "#CF1E81", //导航栏右侧字体颜色
      nav_route_path: "/personCenter/assetDetails", //导航栏右侧路由地址
      con_actived: 0,//兑换方案索引
      rechargeCofig:[],//充值配置方案
      // user_asset:{} //用户资产
    };
  },
  created(){
    this.fetchRecharge();
  },
  mounted(){
    this.$refs.recharge.addEventListener("scroll", this.pageScroll, false); //监听页面滚动
  },
  computed:{
    user_asset(){ //vuex 拉取用户资产
      return this.$store.state.user_asset;
    }
  },
  methods:{
    fetchRecharge() {
      let url = "recharge/getRechargeConfig";
      this.$https.get(url).then(res => {
          if(res.data.data && res.data.code === 200){
             this.rechargeCofig = res.data.data;
          }
      });
    },
    pageScroll(e) {
      //页面滚动
      let scrollTop = e.target.scrollTop; //获取滚动高度

      let returnNav = this.$refs.returnNav; //获取返回栏DOM对象

      if (scrollTop > 0) {
        returnNav.$el.style.background =
          "linear-gradient(to right,#B40CFF,#FE39A5,#793DFF)"; //设置背景渐变
      } else {
        returnNav.$el.style.background = "transparent"; //设置为透明颜色
      }
    },
    convertTab(index,item) {
      //兑换方案切换
      this.con_actived = index;
    },
    paymentTab(item,index) {
      //支付方式切换
      this.reacharge_way_title = item.title;
      this.reacharge_type = item.type;
    },
    rechargeBtn(){ //点击充值
      let url = "recharge/submitRecharge";
      let data = {
        pay_type:this.reacharge_type,
        id:this.rechargeCofig[this.con_actived].id
    }
     this.$https.post(url,data).then(res => {

         if(res.data.code === 200 && res.data.data){

           let originUrl = location.origin+"/#/me"; //获取支付成功跳转的地址

           var base64Url = this.base64EncodeUnicode(originUrl); //将地址转化为base64编码格式

           let payUrl = res.data.data.pay_url+"?return_url="+base64Url; //支付的链接地址,成功的回调页面url

           window.open(payUrl,"_self"); //打开支付窗口
        }
     })
    },
   base64EncodeUnicode(str) { //base64编码转化 字符串转base64编码
   
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {

        return String.fromCharCode('0x' + p1);

       }));

    }
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss" scoped>
.hidden_payment_icon {
  display: none;
}

// 全局背景色
.recharge {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #171520;
  overflow: scroll;
}

.recharge_main {
  box-sizing: border-box;
  padding: 54px 12px 0;
  color: white;
  text-align: left;
}

.recharge_account {
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-radius: 5px;
  font-weight: 700;
  font-size: 18px;
  margin: 15px 0;
  p {
    padding: 10px 0;
    color: #cf1e81;
    font-weight: 400;
  }
  h3 {
    color: #328543;
  }
}

.payment_way {
  text-align: left;
  .payment_way_title{
    font-size:16px;
    font-weight:700;
    span{
     color:#00AAEE;
    }
  }
  .payment_way_list {
    ul {
      display: flex;
      justify-content: flex-start;
      li {
        padding: 15px 15px 0;
        .payment_img {
          position: relative;
          width: 60px;
          height: 60px;
          margin: auto;
          overflow: hidden;
          .payment_icon {
            position: absolute;
            bottom: 0;
            right: 0;
            height: 30%;
            width: 20px;
            overflow: hidden;
          }
        }
        p {
          margin: 10px 0;
          text-align: center;
        }
      }
    }
  }
}

.convert_box_list {
  padding: 15px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      width: 30%;
      height: 70px;
      border-radius: 5px;
      background: #282432;
      box-sizing: border-box;
      margin: 0 10px 10px 0;
      padding-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;

      .convert_youBi {
        font-size: 16px;
        line-height: 1.5;
      }

      .convert_monery {
        font-size: 18px;
        line-height: 1.5;
        font-weight: 400;
      }

      .integral {
        position: absolute;
        left: 1px;
        top: 1px;
        padding: 2px;
        background: #9d198b;
        border-radius: 2px;
        font-size: 12px;
        white-space: nowrap;
      }
    }
    .convert_actived {
      background: #fe39a5;
    }
  }
}

.rechargeBtn {
  padding: 20px;
  text-align: center;
  button {
    text-align: center;
    font-size: 16px;
    width: 60%;
    padding: 10px 0;
    border-radius: 30px;
    background: #fe39a5;
    border: none;
    color: white;
  }
}
</style>

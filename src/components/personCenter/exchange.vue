<template>
    <section class="exchange">
        <return-nav class="returnBack">
            <template v-slot:middle>
                邮票兑换
            </template>
        </return-nav>
        <div class="stamp_box">
            <div class="stamp_exchange">
                <div>
                    <ul>
                        <li>
                            <h3>可用{{stamp_info.walletName}}</h3>
                            <p>{{stamp_info.balance}}</p>
                        </li>
                        <li>
                            <h3>今日收益</h3>
                            <p>{{stamp_info.todayIncome}}</p>
                        </li>
                        <li>
                            <h3>总共兑换</h3>
                            <p>{{stamp_info.totalIncome}}</p>
                        </li>
                    </ul>
                </div>
                <div class="input_box">
                    <van-cell-group class="stamp_input" >
                          <van-field v-model="stamp_num" placeholder="请输入兑换金额" />
                    </van-cell-group>
                    <van-button square type="primary" class="exchangeBtn" size="mini" @click="exchangeBtn">兑换金额</van-button>
                </div>
                <p>兑换比率:{{baseNumber}}{{stamp_info.walletName}}={{exchangeRate}}元</p>
            </div>
        </div>
        <div class="exchange_list">
                <div class="exchange_item" v-if="stamp_info.todayExchangeInfo">
                    <h2>今日兑换</h2>
                    <p>{{stamp_info.todayExchangeInfo.amount}}邮票</p>
                    <span>+{{stamp_info.todayExchangeInfo.income}}元</span>
                </div>
                <div class="exchange_item" v-if="stamp_info.yesterdayExchangeInfo">
                    <h2>昨日兑换</h2>
                    <p>{{stamp_info.yesterdayExchangeInfo.amount}}邮票</p>
                    <span>+{{stamp_info.yesterdayExchangeInfo.income}}元</span>
                </div>
            </div>
    </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
import {mapGetters} from "vuex";
export default {
    name:"exchange",
    data(){
        return{
           baseNumber:12000,//邮票兑换基数
           stamp_num:'', //兑换数量
           stamp_info:{} //邮票信息
        }
    },
    created(){
       this.fetchStamp();
    },
    computed:{
        ...mapGetters(['statistics']),
        exchangeRate(){ //兑换比例
            return this.baseNumber * this.stamp_info.exchangeRate/100;
        },
        exchangeMoney(){ //兑换的金额
            return this.stamp_num * this.stamp_info.exchangeRate/100;
        }
    },
    methods:{
        fetchStamp(){ //获取邮票信息
            let url = "money/getStampExchangeInfo";
            this.$https.get(url).then( res => {
                if(res.data.code === 200 &&  res.data.data){
                    console.log(res);
                    this.stamp_info = res.data.data;
                }
            })
        },
        exchangeBtn(){
            if(!this.stamp_num){
                this.$notify({
                       message:"请输入兑换金额",
                       className:"notifyClass",
                       duration:3000
                     });
                return false;
            }
            let url = "money/stampExchange";
            let data = {
                exchange_num:this.stamp_num
            }
            this.$https.post(url,data).then( res => {
                 if(res.data.code === 200 ){
                   this.$notify({
                       message:"邮票对换成功",
                       className:"notifyClass",
                       background:"#07C160",
                       duration:3000
                     });
                     this.$store.commit("subtractStamp",this.stamp_num); //减少邮票数量
                     this.$store.commit("increaseBalance",this.exchangeMoney);//增加账号余额
                     this.fetchStamp(); //重新获取邮票信息
                 }else{
                     this.$notify({
                       message:res.data.msg,
                       className:"notifyClass",
                       duration:3000
                     });
                 }
            })
        }
    },
    components:{
        returnNav
    }
}
</script>
<style lang="scss">
.exchange {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #ffffff;
  .returnBack{
      border-bottom:1px solid #E9E7E8;
      color:#000000;
      background:linear-gradient(to right,#D5AB8D ,#E7C7B1);
  }
  .stamp_box{
      padding:64px 10px;
      text-align:left;
      box-shadow: 0 0 15px#BEBEBE;
      .stamp_exchange{
          box-sizing:border-box;
          background:linear-gradient(120deg,#FFDAB9,#D5AB8D );
          border-radius:10px;
          padding:15px 30px;
          color:#ffffff;
          ul{
              display:flex;
              justify-content:space-between;
              font-size:18px;
              text-align:center;
              h3{
                  font-weight:700;
                  margin-bottom:10px;
              }
          }
      }
      .input_box{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:25px;
          padding:30px 0;
          overflow: hidden;
          .stamp_input{
              flex:1;
              margin-right:10px;
          }
          .exchangeBtn{
              height:100%;
              font-size:16px;
              padding:0 5px;
              border-radius: 5px;
              background:linear-gradient( to right,#BEBEBE,#757575);
              border:none;
          }
      }
      .van-field__control{
        &::-webkit-input-placeholder{
            color:#000000;
        }
        color:#ffffff;
        padding-left:10px;
        /* 标准的语法 */
        background: repeating-linear-gradient( 30deg, #C2967B ,#BEBEBE 5%, #757575 5%);
      }
   }
   .exchange_item{
       display:flex;
       justify-content:space-between;
       padding:20px;
       border-bottom:1px solid#BEBEBE;
       font-weight:700;
       h2{
           font-size:20px;
           color:#000000;
       }
       p{
           font-size:18px;
           color:#757575;
       }
       span{
           font-size:16px;
           color:#FF0000;
       }
   }
}
</style>

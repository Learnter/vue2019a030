<template>
    <section class="userAccount" ref="userAccount">

      <return-nav ref="returnNav">
         <template v-slot:middle>
            我的账户
         </template>
         <template v-slot:right>
             账单
         </template>
    </return-nav>

        <div class="account_money">
            <div class="balance">
                <h2><span>41235</span>&yen;</h2>
                <p>可用余额</p>
            </div>
        </div>

        <div class="account_main">
        
            <div class="withdrawal">
              <p>选择下方余额提现:</p>
              <div class="withdrawal_list">
                  <ul>
                      <li v-for="(item,index) in 6" :key="index" :class="index == sel_withdrawal_money ? 'withActived':''" @click="withdrawal_money_Tab(index)">
                          <span>100元</span>
                      </li>
                  </ul>
              </div>
              <div class="widthdrawal_tips">
                  <p>1.每天可提现一次</p>
                  <p>2.预计3小时内到账</p>
                  <p>3.已到账打开微信支付宝账单查看详情</p>
                  <p>4.每笔提现收取10%手续费</p>
              </div>
          </div>

          <div class="withdrawal_way">
              <p>选择到账方式:</p>
              <div class="withdrawal_way_list">
                  <ul>
                      <li v-for="(item,index) in withdrawal_way_list" :key="index" @click="withdrawal_way_Tab(index)">
                          <div class="withdrawal_Img">
                              <img :src="item.src" alt="支付方式">
                          </div>
                          <span>微信支付</span>
                          <div :class="index == sel_withdrawal_way_index ? 'withdrawal_icon' : 'hidden_withdrawal_icon'">
                              <img src="@/assets/tabImg/2019_a030_36.png" alt="">
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="withdrawalBtn">
              <button>确认提现</button>
          </div>
        </div>
    </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
    name:"account",
    data(){
        return{
            sel_withdrawal_money:0, //提现的金额索引
            sel_withdrawal_way_index:0, //提现方式索引
            withdrawal_way_list:[{id:0,src:require('@/assets/tabImg/2019_a030_33.png'),title:'微信支付'},{id:1,src:require('@/assets/tabImg/2019_a030_34.png'),title:'支付宝支付'}]
        }
    },
    mounted(){
        this.$refs.userAccount.addEventListener("scroll",this.pageScroll,false); //监听页面滚动
    },
    methods:{
        pageScroll(e){ //页面滚动

            let scrollTop = e.target.scrollTop; //获取滚动高度

            let returnNav = this.$refs.returnNav; //获取返回栏DOM对象

            // console.log(returnNav);

            if(scrollTop >= 50){
            
                returnNav.$el.style.background = "linear-gradient(to right,#B40CFF,#FE39A5,#793DFF)"; //设置背景渐变

            }else{
                returnNav.$el.style.background = "transparent"; //设置为透明颜色
            }
        },
        withdrawal_money_Tab(index){ //提现金额切换
            this.sel_withdrawal_money = index;
        },
         withdrawal_way_Tab(index){ //提现方式切换
            this.sel_withdrawal_way_index = index;
        },

    },
    components:{
        returnNav
    }
}
</script>
<style lang="scss">

   
   .hidden_withdrawal_icon{
       display:none;
   }

    .userAccount{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index:999;
        background:#F9F9F9;
        overflow: scroll;
    }

    .account_money{
        width:100%;
        min-height:191px;
        background-image:url("../../assets/tabImg/2019_a030_37.png");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: top;
        display:flex;
        justify-items:center;
        align-items:center;
        color:white;
        margin-bottom:10px;
        .balance{
            margin:10px auto;
            display:flex;
            flex-direction:column;
            align-items:center;
            letter-spacing:2px;
            h2{
                margin-bottom:5px;
                span{
                 color:#FCD601;
                 font-size:30px;
                }
            }
        }
    }

    .returnNav{
        position:fixed;
        width:100%;
        height:54px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        color:white;
        box-sizing:border-box;
        padding:0 10px;
        font-size:20px;
        .returnImg{
          width:10px;
          height:15px;
        }
        span{
            font-size:14px;
        }
    }

    .account_main{
        box-sizing:border-box;
        padding:0 12px;
        color:black;
        text-align:left;
        font-size:16px;
        .withdrawal_list{
             margin: 15px 0;
             font-size:18px;
            ul{
                display:flex;
                flex-wrap:wrap;
                justify-content:space-between;
                li{
                    width:30%;
                    height:60px;
                    border-radius:5px;
                    background:#FFFFFF;
                    box-sizing:border-box;
                    margin: 0 10px 10px 0;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                .withActived{
                    box-shadow: 2px 2px 5px #5F5F5F;
                    background:linear-gradient(120deg,#F9E3EF,white,#F9E3EF);
                }
            }
        }
        .widthdrawal_tips{
            font-size:14px;
            p{
                margin-bottom:10px;
                color:#5F5F5F;
            }
        }

     .withdrawal_way{
           margin:20px 0;
         ul{
                display:flex;
                flex-wrap:wrap;
                justify-content:space-between;
                margin:15px 0;
                li{
                    position: relative;
                    width:49%;
                    height:45px;
                    border-radius:3px;
                    background:#FFFFFF;
                    box-sizing:border-box;
                    display:flex;
                    align-items:center;
                    border:1px solid #D032CC;
                    .withdrawal_Img{
                        width:30px;
                        height:30px;
                        margin: 0 10px;
                    }
                    .withdrawal_icon{
                        position: absolute;
                        bottom:0;
                        right:0;
                        width:30px;
                        height:50%;
                    }
                }
            }
        }

    .withdrawalBtn{
        margin:10px 0;
        text-align:center; 
        button{
        text-align: center;
        font-size: 16px;
        padding:8px 0;
        width:60%;
        border-radius: 30px;
        background:linear-gradient(to right,#CD32CF,#EC35B3);
        border: none;
        color: white;
        }
    }
 }

</style>

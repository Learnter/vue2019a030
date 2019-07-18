<template>
  <section class="digitalAsset">
    <return-nav style="background:#B522FD">
      <template v-slot:middle>数字资产</template>
    </return-nav>
    <div class="digital_main">
      <ul>
        <li style="background:#B522FD">
             <h3>全国邮币生产数量</h3>
             <p>{{assetList.nationalPostalCurrency}}</p>
        </li>
        <li style="background:#B522FD">
             <h3>我的邮币总资产</h3>
             <p>{{assetList.personalNationalPostalCurrency}}</p>
        </li>
        <li>
             <h3>邮币持仓数量</h3>
             <p>{{assetList.postCurrencyPosition}}</p>
        </li>
        <li>
             <h3>邮币流通数量</h3>
             <p>{{assetList.personalPostCurrencyPosition}}</p>
        </li>
        <li>
             <h3>昨日回收邮币</h3>
             <p>{{assetList.recycledPostageCurrencyYesterday}}</p>
        </li>
        <li>
             <h3>昨日转出邮币</h3>
             <p>{{assetList.transferringThePostalCurrencyYesterday}}</p>
        </li>
        <li>
             <h3>今日生产邮币</h3>
             <p>{{assetList.producePostalCurrencyToday}}</p>
        </li>
        <li>
             <h3>今日存入邮币</h3>
             <p>{{assetList.depositMoneyToday}}</p>
        </li>
        <li>
             <h3>万份邮币每日回馈</h3>
             <p>{{assetList.millionFeedback}}</p>
        </li>
        <li>
             <h3>总共回馈收益</h3>
             <p>{{assetList.totalRewards}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "digitalAsset",
  data() {
    return {
      assetList:{} //资产列表
    };
  },
  created() {
    this.fetchAsset();
  },
  methods: {
    fetchAsset(){ //获取资产
     let url = "user/digitalAssets";
     this.$https.get(url).then(res => {
       if(res.data.code === 200 && res.data.data){
           this.assetList = res.data.data;
          //  console.log(res.data.data);
       }
     })
    }
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss">
.digitalAsset {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #ffffff;
  overflow: scroll;
  .digital_main {
    box-sizing: border-box;
    padding: 64px 10px 0;
    text-align: left;
    ul{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        li{
            width:49%;
            border-radius:8px;
            height:100px;
            margin-bottom:10px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            background:#E0A2C3;
            color:#ffffff;
            font-size:16px;
            p{
              margin-top:10px;
              color:#F8FD00;
            }
        }
    }
  }
}
</style>

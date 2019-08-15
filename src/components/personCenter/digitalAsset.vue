<template>
  <section class="digitalAsset">
    <van-nav-bar title="数字资产"  left-arrow  @click-left="$router.go(-1)"></van-nav-bar>
    <div class="digital_main">
      <ul>
        <li style="background:#B522FD">
             <h3>全国邮币生产数量</h3>
             <p>{{assetList.nationalPostalCurrency|numberFilter}}</p>
        </li>
        <li style="background:#B522FD">
             <h3>我的邮币总资产</h3>
             <p>{{assetList.personalNationalPostalCurrency|numberFilter}}</p>
        </li>
        <li>
             <h3>邮币持仓数量</h3>
             <p>{{assetList.postCurrencyPosition|numberFilter}}</p>
        </li>
        <li>
             <h3>邮币流通数量</h3>
             <p>{{assetList.personalPostCurrencyPosition|numberFilter}}</p>
        </li>
         <li>
             <h3>今日回收邮币</h3>
             <p>{{assetList.recycledPostageCurrencyToday|numberFilter}}</p>
        </li>
        <li>
             <h3>今日转出邮币</h3>
             <p>{{assetList.transferringThePostalCurrencyToday|numberFilter}}</p>
        </li>
        <li>
             <h3>昨日回收邮币</h3>
             <p>{{assetList.recycledPostageCurrencyYesterday|numberFilter}}</p>
        </li>
        <li>
             <h3>昨日转出邮币</h3>
             <p>{{assetList.transferringThePostalCurrencyYesterday|numberFilter}}</p>
        </li>
        <li>
             <h3>今日生产邮币</h3>
             <p>{{assetList.producePostalCurrencyToday|numberFilter}}</p>
        </li>
        <li>
             <h3>今日存入邮币</h3>
             <p>{{assetList.depositMoneyToday|numberFilter}}</p>
        </li>
        <li>
             <h3>万份邮币每日回馈</h3>
             <p>{{assetList.millionFeedback|numberFilter}}</p>
        </li>
        <li>
             <h3>总共回馈收益</h3>
             <p>{{assetList.totalRewards|numberFilter}}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
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
  .van-nav-bar{
      height:54px;
      line-height:54px;
      background:#B522FD;
      .van-nav-bar__title{
          font-size:18px;
          color:#ffffff;
      }
      .van-icon{
         font-size: 24px;
         color: white;
      }

  }
  .digital_main {
    text-align: left;
    position: absolute;
    top:54px;
    left:0;
    width:100%;
    bottom:0;
    overflow:auto;
    ul{ 
        padding:10px 10px 0;
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

<template>
  <section class="assetDetail">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>钱包明细</template>
    </return-nav>

    <van-dropdown-menu class="search_short">
      <van-dropdown-item v-model="categoryInit" :options="categoryList" title="分类" @change="categorySort" />
      <van-dropdown-item v-model="dateInit" :options="dateList" title="日期" @change="dateSort" />
      <van-dropdown-item v-model="sortInit" :options="sortList" title="排序" @change="sortWay" />
    </van-dropdown-menu>

    <div class="asset_main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  :offset=10> <!--:immediate-check='false'-->
        <div class="asset_list">
          <ul>
            <li class="asset_details_li" v-for="(item,index) in assetList" :key="index">
              <div class="asset_details_icon">
                <img src="@/assets/tabImg/2019_a030_22.png" alt />
              </div>
              <div class="asset_details_right">
                <div>
                  <span>{{item.note}}</span>
                  <span :style="item.money < 0  ? 'color:#9AD3E3' : 'color:#FF6868'">{{item.money > 0 ? '+'+item.money*1 : item.money*1}}{{item.wallet_name}}</span>
                </div>
                <p>{{item.edit_time}}</p>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </div>
  </section>
</template>
<script>
  import returnNav from "@/components/common/returnNav";
  export default {
    name: "assetDetail",
    data() {
      return {
        loading: false,
        finished: false,
        categoryInit: "", //分类初始值
        dateInit: "", //日期初始值
        sortInit: "", //排序初始值
        categoryList: [], //分类列表
        dateList: [
          { text: "一周之内", value: "week" },
          { text: "一个月", value: "month" },
          { text: "3个月", value: "threeMonth" },
          { text: "一年", value: "year" }
        ], //时间列表
        sortList: [
          { text: "正序", value: "asc" },
          { text: "倒序", value: "desc" }
        ], //排序列表
        requrstConfig:{
          //请求配置参数
          mid:"",
          type: "",
          note: "",
          start_time: "",
          end_time: "",
          order: "edit_time",
          sort: "desc",
          page: 1,
          rows: 10
        },
        assetList:[] //钱包列表
      };
    },
    created(){
      this.fetchCategory();
    },
    methods:{
      fetchAssetData(){
        //获取钱包列表
        let url = "money/getMoneyLogList";
        this.$https.get(url, this.requrstConfig).then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.data.length > 0){
             this.assetList = this.assetList.concat(res.data.data);
              this.requrstConfig.page++;
              this.loading = false;
            }else{
              this.loading = false;
              this.finished = true;
            }
          });
      },
      fetchCategory(){
        //获取排序分类数据
        let url = "money/getMoneyLogType";
        this.$https.get(url).then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.categoryList = res.data.data;
          }
        });
      },
      categorySort(e){//排序分类
        this.categoryInit = e;
        this.requrstConfig.type = e;
        this.requrstConfig.page = 1; //重新获取首页数据
        this.assetList = [];
        this.fetchAssetData();
      },
      sortWay(e){//排序方式
        this.sortInit = e;
        this.requrstConfig.sort = e; //获取排序方式
        this.requrstConfig.page = 1; //重新获取首页数据
        this.assetList = [];
        this.fetchAssetData();
      },
      dateSort(e){ //日期排序
        this.dateInit = e;
        this.requrstConfig.start_time = this.getNowFormatDate(e); //开始时间
        this.requrstConfig.end_time =  this.getNowFormatDate(); //结束时间
        this.requrstConfig.page = 1; //重新获取首页数据
        this.assetList = [];
        this.fetchAssetData();
      },
      onLoad(){ //滚动加载
         this.fetchAssetData();
      },
      getNowFormatDate(type) { //获取当前时间日期
            let date = new Date();
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            
            switch (type) {
              case 'week':  
                   if(strDate <= 7){
                      strDate = (30 + strDate) - 7;
                      month -= 1;
                   }else{
                     strDate -= 7;
                   }
                   break;
              case 'month':
                      if(month == 1){
                        year -= 1;
                        month = 12;
                      }else{
                        month -= 1;
                      }
                 break;
              case 'threeMonth':
                      if(month <= 3){
                        year -= 1;
                        month = (12 + month )- 3;
                      }else{
                        month -= 3;
                      }
                   break;
              case 'year':
                  year -= 1;
                  break;
            }

            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }

            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }

           return year + seperator1 + month + seperator1 + strDate;
        }
    },
    components: {
      returnNav
    }
  };

</script>
<style lang="scss">
  .assetDetail {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #f2f2f2;
  }

  .search_short {
    top: 54px;
    .van-cell {
      padding: 5px 10px;
      .van-cell__title {
        text-align: left;
      }
    }
  }

  .asset_main {
    position: absolute;
    top: 104px;
    left: 0;
    width: 100%;
    bottom: 0;
    overflow-y: scroll;
    .asset_list {
      padding: 10px 10px 0;
      ul {
        display: flex;
        flex-direction: column;
        .asset_details_li {
          background: #ffffff;
          padding: 10px;
          margin-bottom: 8px;
          border-radius: 5px;
          display: flex;
          align-content: center;
          .asset_details_icon {
            width: 50px;
            height: 50px;
          }
          .asset_details_right {
            flex: 1;
            text-align: left;
            padding: 5px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            div {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
</style>
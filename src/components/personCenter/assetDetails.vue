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
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false' :offset=30>
        <div class="asset_list">
          <ul>
            <li class="asset_details_li" v-for="(item,index) in assetList" :key="index">
              <div class="asset_details_icon">
                <img src="@/assets/tabImg/2019_a030_22.png" alt />
              </div>
              <div class="asset_details_right">
                <div>
                  <span>{{item.note}}</span>
                  <span :style="item.money < 0  ? 'color:#9AD3E3' : 'color:#FF6868'">{{item.money > 0 ? '+'+item.money : item.money}}</span>
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
          { text: "一星期", value: "week" },
          { text: "一个月", value: "month" },
          { text: "3个月", value: "threeMonth" },
          { text: "一年", value: "year" }
        ], //时间列表
        sortList: [
          { text: "正序", value: "asc" },
          { text: "倒序", value: "desc" }
        ], //排序列表
        requrstConfig: {
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
        assetList: [] //钱包列表
      };
    },
    created() {
      if(this.$route.query.mid){
        this.requrstConfig.mid = this.$route.query.mid;
      }
      console.log(this.requrstConfig);
      this.fetchAssetData();
      this.fetchCategory();
    },
    methods: {
      fetchAssetData() {
        //获取钱包列表
        let url = "money/getMoneyLogList";
        this.$https.get(url, this.requrstConfig).then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.data) {
            this.assetList = res.data.data;
            if (this.assetList.length > 0) {
              this.loading = false;
            } else {
              this.loading = false;
              this.finished = true;
            }
          }
        });
      },
      fetchCategory() {
        //获取排序分类数据
        let url = "money/getMoneyLogType";
        this.$https.get(url).then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.categoryList = res.data.data;
          }
        });
      },
      categorySort(e) {
        //排序分类
        this.categoryInit = e;
        this.requrstConfig.type = e;
        this.requrstConfig.page = 1; //重新获取首页数据
        this.fetchAssetData();
      },
      sortWay(e) {
        //排序方式
        this.sortInit = e;
        this.requrstConfig.sort = e; //获取排序方式
        this.requrstConfig.page = 1; //重新获取首页数据
        this.fetchAssetData();
      },
      dateSort(e) {
        //日期排序
        this.$toast("日期排序还没完善...");
      },
      onLoad() { //滚动加载
        this.requrstConfig.page++;
        let url = "money/getMoneyLogList";
        this.$https.get(url, this.requrstConfig).then(res => {
          if (res.data.code === 200 && res.data.data) {
            let newData = res.data.data;
            newData.forEach((item) => {
              this.assetList.push(item); //新增数据
            });
            this.loading = false; //加载完成后,设置为false
          } else {
            this.loading = false;
            this.finished = true; //没数据后,设置为true
          }
          console.log(this.assetList);
        });
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
      padding: 0 10px;
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
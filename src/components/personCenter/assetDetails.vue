<template>
  <section class="assetDetail">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>钱包明细</template>
    </return-nav>

    <van-dropdown-menu class="search_short">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>

    <div class="asset_main">
      <div class="asset_list">
        <ul>
          <li class="asset_details_li" v-for="(item,index) in 10" :key="index">
            <div class="asset_details_icon">
              <img src="../../assets/tabImg/2019_a030_1.png" alt />
            </div>
            <div class="asset_details_right">
              <div>
                <span>静态受益</span>
                <span>+900.00</span>
              </div>
              <p>昨天&nbsp;10:11</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "assetDetail",
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "a",
      option1: [
        { text: "分类", value: 0 },
        { text: "产品分类", value: 1 },
        { text: "价格分类", value: 2 },
        { text: "服装分类", value: 3 }
      ],
      option2: [{ text: "日期", value: "a" }],
      option3: [{ text: "排序", value: "a" }]
    };
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

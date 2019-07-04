<template>
  <section class="news">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>新闻中心</template>
    </return-nav>

    <van-tabs class="switch_bar">
      <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index"></van-tab>
    </van-tabs>

    <div class="news_main">
        <ul>
            <li class="news_item_info" v-for="(item,index) in 10 " :key="index">
                <div class="news_img">
                    <img src="../../assets/tabImg/2019_a030_4.png" alt="加载失败">
                </div>
                <div class="news_info_right">
                    <h1>测试标题</h1>
                    <h2>测试描述</h2>
                    <p>2018-10-30 15:01</p>
                </div>
            </li>
        </ul>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "news",
  data() {
    return {};
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss">
.news {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #f2f2f2;
  .switch_bar {
    top: 54px;
    width: 100%;
  }
  .news_main {
    position: absolute;
    top: 100px;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding:10px 10px 0;
    overflow: scroll;
    .news_item_info {
      border-radius:5px;
      padding:10px;
      text-align: left;
      background:#ffffff;
      height:80px;
      display:flex;
      align-items:center;
      margin-bottom:10px;
      .news_img{
          width:100px;
          height:100%;
      }
      .news_info_right{
          flex:1;
          height:100%;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          padding:5px 10px;
          h1{
              font-size:20px;
          }
          h2{
              font-size:16px;
          }
          p{
              font-size:14px;
              color:#B2B2B2;
          }
      }
    }
  }
}
</style>

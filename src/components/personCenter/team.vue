<template>
  <section class="team">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>我的社区</template>
    </return-nav>
    <div class="team_account">
      <div>
        <p>直推总人数</p>
        <p class="team_number">10</p>
      </div>
      <div>
        <p>团队总人数</p>
        <p class="team_number">10</p>
      </div>
    </div>

    <div class="team_main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="30"
      >
        <div>
          <ul class="team_user">
            <li class="team_user_one" v-for="(item,index) in 10" :key="index">
              <div class="team_user_one_left">
                <div class="team_user_img">
                  <img
                    src="@/assets/tabImg/2019_a030_1.png"
                    alt="头像"
                    style="width:50px;hei
                    50px"
                  />
                </div>
                <div>
                  <P class="user_info">
                    <span>姓名:</span>毛泽东
                    <span class="info_last" style="color:#5077F8">(4)</span>
                  </P>
                  <P class="user_info">
                    <span>ID:</span>8
                    <span class="info_last">账号:</span>18888555
                  </P>
                </div>
              </div>
              <div class="right_arrows">
                <img src="@/assets/tabImg/zpzpwz_47.png" alt="箭头" />
              </div>
            </li>
          </ul>
        </div>
      </van-list>

      <!-- <div>
        <ul class="team_user">
          <li class="team_user_one" v-for="(item,index) in 10" :key="index">
            <div class="team_user_one_left">
              <div class="team_user_img">
                <img
                  src="@/assets/tabImg/2019_a030_1.png"
                  alt="头像"
                  style="width:50px;hei
                    50px"
                />
              </div>
              <div>
                <P class="user_info">
                  <span>姓名:</span>毛泽东
                  <span class="info_last" style="color:#5077F8">(4)</span>
                </P>
                <P class="user_info">
                  <span>ID:</span>8
                  <span class="info_last">账号:</span>18888555
                </P>
              </div>
            </div>
            <div class="right_arrows">
              <img src="@/assets/tabImg/zpzpwz_47.png" alt="箭头" />
            </div>
          </li>
        </ul>
      </div>-->
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "team",
  data() {
    return {
      loading: false,
      finished: false
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      //滚动加载
      // this.requrstConfig.page++;
      // let url = "money/getMoneyLogList";
      // this.$https.get(url, this.requrstConfig).then(res => {
      //   if (res.data.code === 200 && res.data.data) {
      //     let newData = res.data.data;
      //     newData.forEach((item) => {
      //       this.assetList.push(item); //新增数据
      //     });
      //     this.loading = false; //加载完成后,设置为false
      //   } else {
      //     this.loading = false;
      //     this.finished = true; //没数据后,设置为true
      //   }
      //   console.log(this.assetList);
      // });
      this.loading = false;
      this.finished = true;
    }
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss">
.team {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #f2f2f2;
  .team_account {
    position: absolute;
    top: 54px;
    left: 0;
    width: 100%;
    background: #ffffff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    div {
      width: 50%;
      font-size: 20px;
      .team_number {
        margin-top: 10px;
        color: #e8cb70;
      }
    }
  }
    .team_main {
      position: absolute;
      top: 130px;
      left: 0;
      width: 100%;
      bottom: 0;
      overflow-y: scroll;
      .team_user_one {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #ffffff;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 8px;
        .team_user_one_left {
          flex: 1;
          display: flex;
          align-items: center;
          text-align: left;
          .team_user_img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }
          .user_info {
            padding: 5px 0;
            .info_last {
              margin-left: 10px;
            }
          }
        }
        .right_arrows {
          width: 10px;
          height: 15px;
        }
      }
    }
  }
</style>

<template>
  <section class="team">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>我的社区</template>
    </return-nav>
    <div class="team_main">
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
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "team",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
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
  overflow: scroll;
  .team_main {
    padding: 54px 10px 0;
    .team_account {
      background: #ffffff;
      border-radius: 5px;
      padding: 10px;
      margin: 10px 0;
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

<template>
  <section class="team">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>我的社区</template>
    </return-nav>
    <div class="team_main">
      <van-pull-refresh class="refreshBox" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <div class="team_account">
          <div>
            <p>直推总人数</p>
            <p class="team_number">{{teamNumber.zt_num}}</p>
          </div>
          <div>
            <p>团队总人数</p>
            <p class="team_number">{{teamNumber.team_num}}</p>
          </div>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂时没有更多了"
        @load="onLoad"
        :offset="100"
      >
        <div>
          <ul class="team_user">
            <li class="team_user_one" v-for="(item,index) in teamList" :key="index">
              <div class="team_user_one_left">
                <div class="team_user_img">
                  <img :src="item.avatar" />
                </div>
                <div>
                  <P class="user_info">
                    <span>姓名:</span>{{item.username}}
                    <span class="info_last" style="color:#5077F8">({{item.zt_num}})</span>
                  </P>
                  <P class="user_info">
                    <span>ID:</span>{{item.user_id}}
                    <span class="info_last">账号:</span>{{item.account}}
                  </P>
                </div>
              </div>
              <div class="right_arrows" @click="secondlevel(item)">
                <img src="@/assets/tabImg/zpzpwz_47.png" alt="箭头" />
              </div>
            </li>
          </ul>
        </div>
      </van-list>
      </van-pull-refresh>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "team",
  data(){
    return {
      isLoading:false,
      loading: false,
      finished: false,
      teamConfig:{
        page:1,
        row:10,
        user_id:""
      },//获取条件
      teamNumber:{},//团队人数
      teamList:[] //团队列表
    };
  },
 created(){
   //获取用户的id;
   this.teamConfig.user_id = JSON.parse(localStorage.getItem("LOGININFO")).userInfo.user_id;
   this.fetchTeamInfo();
 },
  methods:{
    fetchTeamInfo(){ //获取团队人数
        let url = "user/getTeamNum";
        this.$https.get(url).then(res => {
           if(res.data.code === 200 && res.data.data){
              this.teamNumber = res.data.data;
           }
        })
    },
    fetchTeamList(){ //获取团队列表
        let url = "user/getTeamList";
        this.$https.get(url,this.teamConfig).then(res => {
           if(res.data.code === 200 && res.data.data.length > 0){
              this.teamList = this.teamList.concat(res.data.data);
              // console.log(this.teamList);
              this.teamConfig.page++;
              this.loading = false;
           }else{
              this.loading = false;
              this.finished = true;
           }
           this.isLoading = false;
        })
    },
    secondlevel(obj){ //跳转二级团队
      // console.log(obj);
      this.$router.push({path:"/personCenter/levelTwoTeam",query:{user_id:obj.user_id,name:obj.username}});
    },
    onLoad(){
      this.fetchTeamList();
    },
     onRefresh() { //下拉刷新
      setTimeout(() => {
        this.teamConfig.page = 1;
        this.teamList = [];
        this.fetchTeamList();
       }, 500);
     }
  },
  components:{
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

    .team_main {
      position: absolute;
      top:54px;
      left: 0;
      width: 100%;
      bottom: 0;
      overflow-y: scroll;
      .refreshBox{
        min-height:100%;
      }
       .team_account {
          box-sizing:border-box;
          width: 100%;
          background: #ffffff;
          border-radius: 5px;
          padding: 10px;
          display: flex;
          align-items: center;
          margin-bottom:10px;
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

<template>
  <section class="team">
    <return-nav style="background:#5077F8">
      <template v-slot:middle>{{parentName}}的团队</template>
    </return-nav>
    <div class="team_main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
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
      teamList:[],//团队列表
      parentName:"" //父团队用户名
    };
  },
 created(){
   this.teamConfig.user_id = this.$route.query.user_id;  //获取用户的id;
   this.parentName = this.$route.query.name; 
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
              this.teamList =  this.teamList.concat(res.data.data);
              this.teamConfig.page++;
              this.loading = false;
           }else{
              this.loading = false;
              this.finished = true;
           }
           this.isLoading = false;
        })
    },
    onLoad(){
      this.fetchTeamList();
    },
    onRefresh() { //下拉刷新
      setTimeout(() => {
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
      top:60px;
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
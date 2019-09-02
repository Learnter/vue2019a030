<template>
    <section class="gameGuide">
        <van-nav-bar title="玩法攻略" left-arrow  @click-left="$router.go(-1)"></van-nav-bar>
        <div class="guide_main">
            <div class="guide_item">
                <div class="guide_title">
                    <van-icon name="star"/>
                    <span>邮币每天分红</span>
                </div>
                <div class="guide_content">
                    <div class="blackSpace"></div>
                    <div class="guide_rows"> 
                        <p>1.每次充值赠送1.5~1.8倍邮币</p>
                        <p>2.成为主播经纪人,可以获得主播邮票月收入0.24%邮币奖励,邮币可以每天分红</p>
                    </div>
                </div> 
            </div>
             <div class="guide_item">
                <div class="guide_title">
                    <van-icon name="star"/>
                    <span>积分使用方法</span>
                </div>
                <div class="guide_content">
                    <div class="blackSpace"></div>
                    <div class="guide_rows">
                        <p>1.每次充值奖励10倍积分</p>
                        <p>2.使用积分给小视频打赏礼送返12%邮票</p>
                        <p>3.使用积分给主播送礼物返20%邮票，主播可以获得80%邮票奖励</p>
                    </div>
                </div>
            </div>
             <div class="guide_item">
                <div class="guide_title">
                    <van-icon name="star"/>
                    <span>获得邮票方法</span>
                </div>
                <div class="guide_content">
                    <div class="blackSpace"></div>
                    <div class="guide_rows">
                        <p>1.使用积分给小视频打赏礼物返12%邮票，给主播送礼物奖励20%邮票</p>
                        <p>2.上传小视频，短视频可以获取邮票奖励，获得1个点赞奖励2个邮票</p>
                        <p>3.小视频每天可以点赞10个，点赞1个视频奖励6邮票，对方获得2个邮票，每天点赞可以获得60邮票</p>
                        <p>4.邮票可以兑换余额提现，兑换比率12000邮票兑换60元</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:"gameGuide",
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
   .gameGuide{
       position:fixed;
       top:0;
       left:0; 
       width:100%;
       bottom:0;
       z-index:999;
       background:#000000;
       overflow-y:scroll;
       .van-nav-bar {
            height: 54px;
            line-height: 54px;
            background:#161620;
            .van-nav-bar__title {
                font-size: 18px;
                color:#ffffff;
            }
            .van-icon {
                font-size:20px;
                color:#ffffff;
            }
        }

     .guide_main{
         position:absolute;
         left:0;
         bottom:0;
         top:54px;
         right:0;
         overflow-y:scroll;
     }
      .guide_title{
          color:#ffffff;
          font-size:16px;
          height:50px;
          line-height:50px;
          background:#161620;
          margin:2px 0;
          display:flex;
          justify-content:center;
          align-items:center;
          .van-icon-star{
            font-size:20px;
            color:#FCD329;
            margin-right:8px;
          }
      }
      .guide_content{
          padding:8px 0;
          background:#161620;
          .blackSpace{
            width:100%;
            height:10px;
            background:#000000;
         }
      .guide_rows{
          padding:10px 15px 20px;
          font-size:15px;
          color:#ffffff;
          text-align:left;
          letter-spacing:2px;
          p{
            line-height:20px;
            margin-bottom:8px;
          }
        }
      }
   }
</style>

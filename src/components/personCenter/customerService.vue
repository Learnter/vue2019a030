<template>
  <section class="customerService">
      <van-nav-bar title="在线客服"  left-arrow  @click-left="$router.go(-1)"></van-nav-bar>
      <div class="qr_picture">
         <img src="@/assets/tabImg/service.png" alt="">
      </div>  
  </section>
</template>
<script>
export default {
   name:"customerService",
   data(){
       return{

       }
   }
};
</script>
<style lang="scss" scoped>
 .customerService{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background: #ffffff;
    z-index:999;
    .van-nav-bar{
      height:54px;
      line-height:54px;
      .van-nav-bar__title{
          font-size:18px;
      }
      .van-icon{
         font-size: 24px;
      }
   }
 }
//  .qr_picture{
//     position:absolute;
//     left:50%;
//     top:30%;
//     transform:translate(-50%,-30%);
//     margin: 0 auto;
//  }
</style>
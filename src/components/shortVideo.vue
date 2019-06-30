<template>
	<div class="page">
		<div class="switchBox">
      <div class="navBtn">
        <p class="nav_item" :class="actived == index ? 'actived' :''" v-for="(item,index) in navList" :key="index"  @click="toggleNav(item)" v-text="item.title"></p>
      </div>
		</div>
    <div class="main">
      <div class="main_item" v-for="(item,index) in 20" :key="index">
        
          <img src="@/assets/tabImg/2019_a030_2.png"/>
		  
          <div class="min_item_info">
            <div class="min_item_info_left">
               <div class="user_img">
                  <img src="@/assets/tabImg/2019_a030_1.png"/>
               </div>
                <p>网红1号</p>
            </div>
            <div class="min_item_info_left">
                <div class="heart_img">
                   <img src="@/assets/tabImg/2019_a030_3.png"/>>
                </div>
                <p>555</p>
            </div>
          </div>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
    name:"shortVideo",
		data(){
			return {
        actived:0,
        navList:[{id:0,title:"热门"},{id:1,title:"关注"},{id:2,title:"附近"}]
			};
		},
    methods:{  
      toggleNav(item){ //切换导航栏
        this.actived = item.id;
      }
    },
    components:{
      }
	}
</script>

<style lang="scss">

  .switchBox{
    position:fixed;
    top:0;
    width:100%;
    height:44px;
    padding-bottom:10px;
    z-index:999;
    background:linear-gradient(to right,#B40CFF,#793DFF);
  }
  
  .navBtn{
    margin:0 auto;
    width:60%;
    font-size:14px;
    height:100%;
    color:white;
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
  }
  
  .actived{
    position:relative;
    font-size:16px;
    font-weight:bold;
    color:#FFF700;
    transition: all 0.5 linear;
    &::after{
      content: '';
      position: absolute;
      bottom:-30%;
      left: 0;
      width: 100%;
      border-bottom: 2px solid #FFF700;
      border-radius: 1px;
    }
  }
   
   .main{
     padding:62px 10px 60px;
     background:white;
     display:flex;
     flex-wrap:wrap;
     justify-content:space-between;
   }
   
   .main_item{
     position:relative;
     width:49%;
     height:480upx;
     color:white;
     margin-bottom:8px;
     border-radius:5px;
     overflow:hidden;
   }
   
     
   .min_item_info{
     position:absolute;
     bottom:0;
     width:100%;
     box-sizing:border-box;
     padding:5px;
     font-size:12px;
     background:rgba(0,0,0,0.1);
     display:flex;
     align-items:center;
     justify-content:space-between;
   }
      
   .min_item_info_left{
     height:100%;
     display:flex;
     align-items:center;
     justify-content:space-between;
   }

   .user_img{
     width:20px;
     height:20px;
     margin-right:5px;
   }
   
   .heart_img{
     width:14px;
     height:14px;
	 line-height:14px;
     margin-right:5px;
   }

</style>
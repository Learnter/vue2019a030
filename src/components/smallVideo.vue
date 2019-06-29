<template>
	<div class="page">
		<div class="switchBox">
            <div class="navBtn uni-flex">
                <p class="nav_item" :class="actived == index ? 'actived' :''" v-for="(item,index) in navList" :key="index"  @click="toggleNav(item)" v-text="item.title"></p>
            </div>
		</div>
    <div class="main uni-flex">
      <div class="main_item" v-for="(item,index) in 20" :key="index">
        
          <!-- <video src="@/assets/tabImg/7777.mp4" ></video>  poster="@/assets/tabImg/2019_a030_2.png"-->
          <!-- <video class="pv" controls  preload="auto">
            <source src="@/assets/tabImg/7777.mp4" type="video/mp4">
            您的浏览器不支持 video 标签。
           </video> -->

            <video id="myVideos" class="video-js pv  vjs-big-play-centered " >
              <source src="@/assets/tabImg/7777.mp4" type="video/mp4" >
           </video>

          <p class="duration">03:26</p>
          
          <div class="min_item_info uni-flex" :class="index == playBtn ? 'play' :''">
            <div class="min_item_info_left uni-flex">
               <div class="user_img">
                  <img src="@/assets/tabImg/2019_a030_1.png"/>
               </div>
                <p>网红1号</p>
            </div>
            <div class="min_item_info_left uni-flex">
                <div class="heart_img">
                   <img src="@/assets/tabImg/2019_a030_3.png"/>
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
    name:"samllVideo",
		data(){
			return {
         playBtn:null,
         actived:0,
				 navList:[{id:0,title:"热门"},{id:1,title:"关注"},{id:2,title:"附近"}]
			};
		},
     mounted() { 
          this.initVideo();
    },
    methods: {
        initVideo() {
         
        //初始化视频方法
        let myPlayer = this.$video("myVideos", {
            //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            //自动播放属性,muted:静音播放
            autoplay: "auto",
            //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: "auto"
            //设置视频播放器的显示宽度（以像素为单位）
        });
        },
        toggleNav(item){ //切换导航栏
        this.actived = item.id;
      }
    },
    components:{
    }
	}
</script>

<style lang="scss" scoped>

  
  .pv{
      width:100%;
      height:100%;
      object-fit:fill !important;
  }

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
    height:100%;
    color:white;
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
     flex-wrap:wrap;
     justify-content:space-between;
   }
   
   .main_item{
     position:relative;
     width:49%;
     height:240px;
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
     align-items:center;
     justify-content:space-between;
     z-index:10;
   }
      
   .min_item_info_left{
     height:100%;
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
   
   .duration{
     position:absolute;
     font-size:12px;
     top:5px;
     right:5px;
     padding:5px;
     border-radius:4px;
     background:#FF8585;
     z-index:10;
   }

</style>
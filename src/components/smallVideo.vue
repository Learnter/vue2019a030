<template>
	<div class="page">
		<div class="switchBox">
            <div class="navBtn uni-flex">
                <p class="nav_item" :class="actived == index ? 'actived' :''" v-for="(item,index) in navList" :key="index"  @click="toggleNav(item)" v-text="item.title"></p>
            </div>
		</div>
    <div class="main_content">

        <van-list class="main_ul" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell class="main_item" v-for="(item,index) in videoList" :key="index">
              <!-- 判断playerOptions数组中有没数据 -->
              <video-player v-if="playerOptions.length != 0" class=" videoStyle  video-player-box" ref="videoPlayer" :options="playerOptions[index]" @play="onPlayerPlay($event,index)" @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)">
                
              </video-player>

              <!-- 时间栏 -->
              <p class="duration" :class="index === playBtn ? 'videoStart':'videoEnd'">03:26</p> 
              
              <!-- 视频信息栏 -->
              <div class="min_item_info uni-flex" :class="index === playBtn ? 'videoStart':'videoEnd'">
                <div class="min_item_info_left uni-flex">
                  <div class="user_img">
                      <img src="@/assets/tabImg/2019_a030_1.png"/>
                  </div>
                    <p>网红1号</p>
                </div>
                <div class="min_item_info_left uni-flex">
                    <div class="heart_img" @click="likeBtn">
                      <img src="@/assets/tabImg/2019_a030_3.png"/>
                    </div>
                    <p>555</p>
                </div> 
              </div>
          </van-cell>   
        </van-list>
    </div>
</div>
</template>

<script>

	export default {
    name:"samllVideo",
		data(){
			return {
         loading:false,
         finished:false,
         playBtn:null,//视频是否点击播放
         actived:0,
				 navList:[{id:0,title:"热门"},{id:1,title:"关注"},{id:2,title:"附近"}],
         videoList:[{src:require('@/assets/tabImg/1111.mp4'),id:0,pic:""},{src:require('@/assets/tabImg/2222.mp4'),id:1,pic:""},{src:require('@/assets/tabImg/3333.mp4'),id:2,pic:""},{src:require('@/assets/tabImg/4444.mp4'),id:3,pic:""},{src:require('@/assets/tabImg/5555.mp4'),id:4,pic:""},{src:require('@/assets/tabImg/6666.mp4'),id:5,pic:""}
         ,{src:require('@/assets/tabImg/7777.mp4'),id:6,pic:""},{src:require('@/assets/tabImg/8888.mp4'),id:7,pic:""}],
         playerOptions:[]  //多个视频对象配置数组
			};
		},
     mounted() { 
       this.returnVideoSrc(); //视频初始化
    },
    methods: {

        returnVideoSrc(){

          let srcList = this.playerOptions; //获取视频配置对象

          this.videoList.map((item)=>{

             let attr = {  //每个视频对象的配置数据
                muted: false, //是否开始静音
                language: 'en', // 语言
                sources: [{ //视频路径,类型
                  type: "video/mp4",
                  src:item.src
                }],
                poster:item.pic //视频提前加载的静态页面图
             }; 
             srcList.push(attr); //添加到视频数组
          })
        },
         //视频点击播放
        onPlayerPlay(ev,index){ 
          this.playBtn = index; //将点击播放的视频索引赋值给playBtn
        },
        //视频暂停播放
        onPlayerPause(ev,index){
          this.playBtn = null;
        },
        //视频播放完后
        onPlayerEnded(ev,index){
           this.playBtn = null;
        },
         //切换导航栏
        toggleNav(item){
        this.actived = item.id;
      },
       //点赞
      likeBtn(){
        console.log("我点赞了哦.....");
      },
      onLoad(){
       this.loading = false;
       this.finished = true;
      }
    },
    components:{
    }
	}
</script>

<style lang="scss">


  /*点击播放隐藏视频信息栏,时间栏*/
  .videoStart{
    visibility:hidden;
  }

  /*视频播放完、暂停显示信息栏跟时间栏*/
  .videoEnd{
    visibility:visible;
  }

  .video-js{
    width:100% !important;
    height:100% !important;
  }

  .vjs-big-play-button{  
        height: 40px !important;  
        width: 40px !important;  
        line-height: 40px !important;  
        text-align: center;  
        background:rgba(0, 0, 0, 0.8) !important;  
        border-radius: 50% !important;  
        top: 50% !important;  
        left: 50% !important; 
        transform:translate(-50%,-60%); 
   }     
  
  .videoStyle{
      width:100% !important;
      height:100% !important;
      object-fit:fill;
  }

.switchBox{
    position:fixed;
    top:0;
    width:100%;
    height:44px;
    padding-bottom:10px;
    z-index:10;
    background:linear-gradient(to right,#B40CFF,#793DFF);
  }
  
  .navBtn{
    margin:0 auto;
    width:60%;
    height:100%;
    font-size:14px;
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
      content:'';
      position: absolute;
      bottom:-30%;
      left: 0;
      width: 100%;
      border-bottom: 2px solid #FFF700;
      border-radius: 1px;
    }
  }
   
   .main_content{
     padding:62px 10px 70px;
     background:white;
     overflow-y:scroll;
     -webkit-overflow-scrolling:touch;
     .main_ul{
       display:flex;
       flex-wrap:wrap;
       justify-content:space-between;
        .main_item{
          position:relative;
          width:49%;
          height:240px;
          margin-bottom:8px;
          border-radius:5px;
        }  
        .min_item_info{
          position:absolute;
          bottom:0;
          width:100%;
          box-sizing:border-box;
          padding:5px;
          font-size:12px;
          color:white;
          background:rgba(0,0,0,0.1);
          align-items:center;
          justify-content:space-between;
          z-index:2;
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
          line-height:1.1;
          color:white;
          border-radius:4px;
          background:#FF8585;
          z-index:2;
       }
     } 
   }
   
  

</style>
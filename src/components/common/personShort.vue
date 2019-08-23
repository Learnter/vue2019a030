<template>
    <section class="personShort">
        <van-swipe :show-indicators="false" @change="onChange" vertical :loop="false" :initial-swipe="current" :duration="500" :height="380">
            <van-swipe-item v-for="(vItem, vIndex) in newVideoList" :key="vIndex" class="product_swiper"> 
                <video class="video_box"  width="100%" height="100%" webkit-playsinline="true" x5-playsinline x5-video-player-type="h5" playsinline preload="auto"
                    :poster="vItem.poster"
                    x-webkit-airplay="allow"
                    x5-video-orientation="landscape"
                    style="display:inline;object-fit:fill"
                    controls
                    controlslist="nodownload noremoteplayback">
                    <source :data-src="vItem.video_url" type="video/mp4"/>
                </video>
                <van-tag round class="duration">{{vItem.video_duration|timeFormat()}}</van-tag>
           </van-swipe-item>  
       </van-swipe>
    </section>
</template>
<script>
export default {
    name:"personShort",
    props:['uid'],
    data(){
       return{
           isLoading:false,
            loading: false,
            finished: false,
            requestConfig:{ //请求配置
                page:1,
                row:10
            },
           playOrPause:true,
           current:0,
           newVideoList:[]
       }
    },
    created(){
        this.fetchVideo();
    },
    methods:{
        onChange(index){ //视频滑动

            this.isPlayEnd(index);//
                
            let frontVideo = document.querySelectorAll("video")[this.current]; //关闭前一个视频播放
            frontVideo.pause();

            this.playOrPause = false;

            this.current = index; //播放当前视频
            this.playVideo();
        },
         playVideo(){ //播放视频

            let currentVideo = document.querySelectorAll("video")[this.current];

            if(currentVideo.src){ //判断是否已经播放过,无需重新再次获取视频url
               currentVideo.play();
            }else{
              let currentVideoSrc = document.querySelectorAll("source")[this.current];
              currentVideo.src = currentVideoSrc.getAttribute('data-src');
              currentVideo.play();
            }
        },
        isPlayEnd(index){ //列表播放到最后增加数据
    
            let len = this.newVideoList.length; //视频列表长度

            if((len-1) === index){  //滑动到最后追加数据
               let url = "video/shortVideoList";
                this.$https.get(url,this.requestConfig).then(res => {
                    if(res.data.code === 200 && res.data.data.length > 0){
                        this.newVideoList = this.newVideoList.concat(res.data.data);
                        this.requestConfig.page++;
                    }
                });
            }
         },
         fetchVideo(){ //获取视频列表

            let url = "video/shortVideoList";
            this.requestConfig.uid = this.uid;
            this.$https.get(url, this.requestConfig).then(res => {
                if(res.data.code === 200 && res.data.data.length > 0){
                    let list = res.data.data;
                    this.newVideoList = this.newVideoList.concat(list); //合并数组
                    this.requestConfig.page++;
                    this.$nextTick(()=>{
                        let firstVideo = document.querySelectorAll("video")[this.current]; //获取当前的video对象
                        let firstVideoSrc = document.querySelectorAll("source")[this.current]; //获取当前的video的source对象
                        firstVideo.src = firstVideoSrc.getAttribute('data-src'); //将source的data-src赋值给video的src
                    })
                }
                this.isLoading = false;
            })
        },
     onLoad(){ //上拉首次加载
         this.fetchVideo();
     },
     onRefresh() { //下拉刷新
      setTimeout(() => {
        this.requestConfig.page = 1; //获取短视频最新数据
        this.newVideoList = []; //清空视频列表
        this.current = 0;
        this.fetchVideo();
       }, 500);
     },
   }
}
</script>
<style lang="scss" scoped>

        .personShort{
            width:100%;
            height:100%;
            overflow: hidden;
            position:relative;
        }


        .product_swiper{
            box-sizing:border-box;
            padding:10px 10px 0;
            border-radius:10px;
            box-shadow:rgba(0,0,0,.2) 0 5px 3px 0px;
        }
        .duration{
            position:absolute;
            right:15px;
            top:15px;
            background:rgba(0,0,0,0.5) !important;
            padding:2px 10px;
        }

        .multiple_video{
            padding:10px 10px 0;
            width:400px;
            height:400px;
            display:flex;
            flex-direction:column;
        }
        .single_video{
            position:relative;
            width:100%;
            height:400px;
            margin-bottom:10px;
            border-radius:10px;
            overflow:hidden;
            background:#191B28;
            
        }

    .playOrPause {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        .icon_play {
            font-size: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            border-radius: 50%;
            color: rgba(255,255,255,0.4);
        }

        .play {
            font-size: 45px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%);
            border-radius: 50%;
            color: rgba(255,255,255,0.4);
        }
     }
</style>



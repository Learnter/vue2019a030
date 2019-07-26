<template>
    <section class="personShort">
        <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">  
            <div class="multiple_video">
                <div class="single_video" v-for="(vItem,vIndex) in newVideoList" :key="vIndex">
                    <!-- <img v-lazy="item.poster" alt=""> -->
                    <video class="video_box"  width="100%" height="100%" webkit-playsinline="true" x5-playsinline x5-video-player-type="h5" playsinline preload="auto"
                        :poster="vItem.poster"
                        :src="vItem.video_url"
                        x-webkit-airplay="allow"
                        x5-video-orientation="landscape"
                        style="display:inline;object-fit:fill"
                        controls
                        controlslist="nodownload noremoteplayback"
                        @play="playVideo(vIndex)"
                        @ended="onPlayerEnded($event)"                  
                    ></video>


                    <van-tag round class="duration">{{vItem.video_duration|timeFormat()}}</van-tag>


                    <!-- <div class="playOrPause" v-if="vItem.isPlay||vItem.isPause">
                        <van-icon name="play-circle" v-show="vItem.isPlay" class="play" @click="playVideo(vIndex)"/>

                         <van-icon name="pause-circle" v-show="vItem.isPause" class="icon_play" @click="pauseVideo(vIndex)"/>
                    </div> -->
                </div>
            </div>
       </van-list> 
    </section>
</template>
<script>
export default {
    name:"personShort",
    props:['uid'],
    data(){
       return{
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
    methods:{
        fetchVideo(){ //获取视频列表

            let url = "video/shortVideoList";
        
            this.requestConfig.uid = this.uid;
        
            this.$https.get(url, this.requestConfig).then(res => {
                // console.log(res.data.data.length);
                if(res.data.code === 200 && res.data.data.length > 0){
                    let list = res.data.data;
                    for (let i = 0; i < list.length; i++){
                        list[i].isPlay = true;
                        list[i].isPause = false;
                    }
                    this.newVideoList = this.newVideoList.concat(list); //合并数组
                    this.requestConfig.page++;
                    this.loading = false;
                }else{
                    this.loading = false;
                    this.finished = true;
                }
            })
        },
      playVideo(index) { //点击播放按钮

        this.current = index;

        let video = document.querySelectorAll("video")[this.current];
    
        this.otherVideoPause(index);
        
        // this.newVideoList[this.current].isPlay = false; //隐藏播放按钮

        video.play();
        },
        // pauseVideo(index) { //暂停\播放
        //     this.current = index;
        //     let video = document.querySelectorAll("video")[this.current];
        //     if (this.playOrPause) {
        //         video.pause();
        //         this.newVideoList[this.current].isPause = true; //显示暂停按钮
        //     } else {
        //         this.otherVideoPause(index);
        //         video.play();
        //         this.newVideoList[this.current].isPause = false; //隐藏暂停按钮
        //     }
        //     this.playOrPause = !this.playOrPause;
        // },
        otherVideoPause(index){ //暂停其他视频播放
            let allVideo = document.querySelectorAll("video");
            for(let i = 0; i < allVideo.length ;i++){
                if(index === i){
                continue;
                }else{
                allVideo[i].pause();
                }
            }
        },
     onPlayerEnded(player) { //视频结束
        // this.newVideoList[this.current].isPlay = true; //显示播放按钮
        },
     onLoad(){ //上拉首次加载
         this.fetchVideo();
     }
   }
}
</script>
<style lang="scss" scoped>

        .multiple_video{
            padding:10px 10px 0;
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
            .duration{
              position: absolute;
              right:5px;
              top:5px;
              background:rgba(0,0,0,0.5) !important;
              padding:2px 10px;
            }
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



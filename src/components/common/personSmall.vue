<template>
    <section class="personSmall">
         <van-list  v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">  
            <div class="multiple_video">
                <div class="single_video" v-for="(item,index) in videoList" :key="index" @click="smallVideo(index)">
                    <img v-lazy="item.poster" alt="">
                    <van-tag round class="duration">{{item.video_duration|timeFormat()}}</van-tag>
                </div>
            </div>
       </van-list> 
    </section>
</template><script>
export default {
    name:"smallVideo",
    data(){
        return{
           loading:false,
           finished:false,
            requestConfig:{ //请求配置
                page:1,
                row:10
            },
           videoList:[]
        }
    },
    props:['uid'],
    methods:{
        fetchVideo(){ //获取视频列表

            let url = "video/smallVideoList";
            this.requestConfig.uid = this.uid;

            console.log(this.uid);
            this.$https.get(url,this.requestConfig).then(res => {
                // console.log(res.data.data.length);
                if(res.data.code === 200 && res.data.data.length > 0){

                    this.videoList =  this.videoList.concat(res.data.data);

                    this.requestConfig.page++;
                    this.loading = false;
                }else{
                    this.loading = false;
                    this.finished = true;
                }
            })
       },
        smallVideo(index){ //点击作品页面小视频
            let videoArray = JSON.stringify(this.videoList);
            let videoPage =  this.requestConfig.page;
            this.$router.push({path:"/video/fullScreen",query:{vIndex:index,list:videoArray,page:videoPage,uid:this.uid}});
        },
        onLoad(){ //上拉首次加载
         this.fetchVideo();
       }
    }
}
</script>
<style lang="scss" scoped>

        .multiple_video{
            display:flex;
            justify-content:space-between;
            flex-wrap:wrap;
            padding-top:10px;
            padding-left:10px;
        }
        .single_video{
            position: relative;
            box-sizing:border-box;
            width:47%;
            height:270px;
            margin-right:3%;
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
</style>


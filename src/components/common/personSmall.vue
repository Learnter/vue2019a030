<template>
    <section class="personSmall">
        <van-pull-refresh class="refreshBox" v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <van-list  v-model="loading" :finished="finished" finished-text="暂时没有更多了" @load="onLoad">  
                <div class="multiple_video">
                    <div class="single_video" v-for="(item,index) in videoList" :key="index" @click="smallVideo(index)">
                        <img v-lazy="item.poster" alt="">
                        <van-tag round class="duration">{{item.video_duration|timeFormat()}}</van-tag>
                    </div>
                </div>
            </van-list> 
       </van-pull-refresh>
    </section>
</template><script>
export default {
    name:"smallVideo",
    data(){
        return{
           isLoading:false,
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
                this.isLoading = false;
            })
       },
        smallVideo(index){ //点击作品页面小视频
            let videoArray = JSON.stringify(this.videoList);
            let videoPage =  this.requestConfig.page;
            this.$router.push({path:"/video/fullScreen",query:{vIndex:index,list:videoArray,page:videoPage,uid:this.uid}});
        },
        onLoad(){ //上拉首次加载
         this.fetchVideo();
       },
       onRefresh(){ //下拉刷新
         setTimeout(() => {
           this.requestConfig.page = 1; //获取最新视频数据
           this.videoList = [];//清空视频列表;
           this.fetchVideo();
         }, 500);
       }
    }
}
</script>
<style lang="scss" scoped>

        .personSmall{
            width:100%;
            height:100%;
            .refreshBox{
                min-height:100%;
            }
        }

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


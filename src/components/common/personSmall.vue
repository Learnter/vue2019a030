<template>
    <section class="personSmall">
        <div class="multiple_video">
            <div class="single_video" v-for="(item,index) in videoList" :key="index" @click="smallVideo(index)">
                <img v-lazy="item.poster" alt="">
                <van-tag round class="duration">{{item.video_duration|timeFormat()}}</van-tag>
            </div>
        </div>
    </section>
</template><script>
export default {
    name:"smallVideo",
    data(){
        return{

        }
    },
    props:['videoList','uid'],
    methods:{
        smallVideo(index){ //点击作品页面小视频
            this.$router.push({path:"/video/fullScreen",query:{vIndex:index,uid:this.uid}});
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
            height:220px;
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


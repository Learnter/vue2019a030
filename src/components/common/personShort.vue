<template>
    <section class="personShort">
         <div class="multiple_video">
            <div class="single_video" v-for="(item,index) in videoList" :key="index" @click="shortVideoBtn(index)">
                <img v-lazy="item.poster" alt="">
                <van-tag round class="duration">{{item.video_duration|timeFormat()}}</van-tag>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name:"personShort",
    props:['videoList','uid'],
    methods:{
        shortVideoBtn(index){
                //点击作品页面短视频
            this.$router.push({path:"/shortVideoTwo",query:{vIndex:index,uid:this.uid}});
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
            position: relative;
            width:100%;
            height:200px;
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



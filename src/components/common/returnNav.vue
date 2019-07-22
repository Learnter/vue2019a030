<template>
    <div class="returnNav">
        <div class="returnImg" @click="goBack">
            <img src="@/assets/tabImg/2019_a030_41.png" alt="返回按钮">
        </div>
        <h2>
            <slot name="middle"></slot>
        </h2>
        <span :style="'color:'+color" @click="pathTab"> <!-- 动态改变右边导航字体颜色 -->
            <slot name="right"></slot>
        </span>
    </div>
</template>
<script>
export default {
    name:"returnBlack",
    data(){
        return{
        }
    },
    props:{
        color:{
            type:String,
            default:'#FFFFFF' //默认颜色为白色
        },
        path:{
            type:String
        }
    },
    methods:{
        
        goBack(){ //返回上一层
            this.$router.go(-1);
        },

        pathTab(){ //导航栏右侧路径切换
        
            let routePath = this.path; //获取右侧路由地址
            
            if(routePath){
                this.$router.push(routePath);
            }

            return false;
        }
    }
}
</script>
<style lang="scss">

.returnNav{
        position: fixed;
        width:100%;
        height:54px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        color:white;
        box-sizing:border-box;
        padding:0 10px;
        font-size:20px;
        .returnImg{
          width:10px;
          height:15px;
        }
        span{
            font-size:14px;
        }
    }

</style>

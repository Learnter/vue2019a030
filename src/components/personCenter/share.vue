<template>
    <section class="share">
        <div class="share_main">
            <div class="company_logo">
                <img src="@/assets/tabImg/logo.png" alt="logo">
            </div>
            <div class="share_content">
                <div class="share_bgImg">  
                    <div class="share_border">
                         <div class="share_QR">
                            <img :src="$store.state.userInfo.reg_code" alt="二维码">
                         </div>
                    </div>

                    <p class="share_tips">长按识别图中的二维码</p>

                    <div class="fingerprint">
                        <img src="@/assets/tabImg/2019_a030_46.png" alt="指纹">
                    </div>
                </div>
                <div class="recommend">
                    <div class="recommend_img">
                         <img :src="$store.state.userInfo.head" alt="头像"/>
                    </div>
                    <div class="recommend_message">
                        <p class="recommend_name">{{this.$store.state.userInfo.nickname}}</p>
                        <p>邀请您加入[狐邮视频]</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .share{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        z-index:999;
        overflow-y:scroll;
        background:url("../../assets/tabImg/2019_a030_42.png") no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .share_main{
        padding:0 30px;
        .company_logo{
            width:80%;
            min-height:100px;
            margin:20px auto;
        }
        .share_content{
            .share_bgImg{
                position: relative;
                width:100%;
                height:400px;
                border-radius:10px 10px 0 0;
                background-image:url("../../assets/tabImg/2019_a030_45.png");
                background-position: center center;
                background-size:100% 100%;
                .share_tips{
                    position: absolute;
                    width:100%;
                    top:250px;
                    left:50%;
                    transform: translateX(-50%);
                }
                .fingerprint{
                  position: absolute;
                  width:50px;
                  height:50px;
                  bottom:8px;
                  left:50%;
                  transform:translateX(-50%);
                }
                .share_border{
                    position: relative;
                    top:20px;
                    margin:0 auto;
                    width:200px;
                    height:200px;
                    padding:5px;
                    background-image:url("../../assets/tabImg/2019_a030_44.png");
                    background-size: contain;
                    .share_QR{
                        width:100%;
                        height:100%;
                    }
                }   
            }
            .recommend{
                    display:flex;
                    align-items:center;
                    box-sizing:border-box;
                    height:80px;
                    padding:10px;
                    background:#FD5C86;
                    border-radius: 0 0 10px 10px;
                    .recommend_img{
                        width:60px;
                        height:60px;
                        padding:0 5px;
                        border-radius:50%;
                        overflow: hidden;
                        img{
                            border-radius:50%;
                        }
                    }
                    .recommend_message{
                        color:white;
                        flex:1;
                        height:100%;
                        box-sizing:border-box;
                        padding:5px;
                        display:flex;
                        flex-direction:column;
                        align-items:flex-start;
                        justify-content:space-between;
                        .recommend_name{
                            font-size:20px;
                            color:#0000FF;
                        }
                   }
              }   
         }
    }

</style>

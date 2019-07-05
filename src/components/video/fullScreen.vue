<template>
    <section class="fullScreen">
            <!-- <video-player v-if="playerOptions.length != 0" :options="playerOptions" :playsinline="false" ref="videoPlayer">
                
            </video-player> -->
            <img src="../../assets/tabImg/2019_a030_4.png" alt="">


            <div class="mask_top">
              <h2>邮票</h2>
              <p>1.78745</p>
            </div>

            <div class="mask_middle">
              <div class="mask_user_img">
                <img src="../../assets/tabImg/2019_a030_19.png" alt="">
              </div>
              <van-icon name="thumb-circle-o" info="9" />
              <van-icon name="chat-o" info="999999" />
              <van-icon name="location-o" info="91111" />
            </div>

            <div class="mask_bottom">
                <div>
                  <div class="mask_user_name">
                    <p>@大掌柜</p>
                    <div class="mask_user_level">
                      <img src="../../assets/tabImg/2019_a030_50.png" alt="">
                    </div>
                  </div>
                  <div class="mask_user_icon">
                      <img src="../../assets/tabImg/2019_a030_49.png" alt="">
                  </div>
                </div>
                <div class="mask_user_gift">
                  <img src="../../assets/tabImg/2019_a030_48.png" alt="">
                </div>
            </div>

    </section>
</template>
<script>
export default {
    name:"fullScreen",
    data(){
        return{
           playerOptions: {
            muted: true,
            language: 'en',
            sources: [{
                type:"video/mp4",
                src:"https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
              }]
            }
        }
    },
    mounted(){
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
}
</script>
<style lang="scss">
    .fullScreen{
        position: fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:999;
        background: #ffffff;


        .mask_middle{
          position: absolute;
          right:0;
          top:18%;
          padding:10px;
          display:flex;
          flex-direction:column;
          .mask_user_img{
            width:50px;
            height:50px;
          }
          .van-icon{
            font-size:35px;
            margin-top:30px;
            color:#ffffff;
            .van-info{
              right:90%;
            }
          }
        }


        .mask_top{
          position: absolute;
          right:0;
          top:8%;
          display:flex;
          color:#ffffff;
          h2{
            position: absolute;
            left:-30px;
            top:1px;
            background:rgba(255,255,255,0.3);
            padding-right:3px;
            border-radius:5px;
            font-size:18px;
          }
          p{
            background:rgba(0,0,0,.2);
            padding:0 10px;
            border-radius: 0 10px 10px 0;
            line-height: 20px;
            font-size:12px;
          }
        }

        .mask_bottom{
          position: absolute;
          bottom:0;
          left:0;
          width:100%;
          box-sizing:border-box;
          background:rgba(0,0,0,0.1);
          padding:10px;
          display:flex;
          justify-content:space-between;
          .mask_user_name{
            display:flex;
            align-items:center;
            font-size:16px;
            color:#ffffff;
            .mask_user_level{
                width:14px;
                height:14px;
            }
          }
          .mask_user_icon{
            margin-top:5px;
            width:14px;
            height:14px;
          }
          .mask_user_gift{
            width:40px;
            height:40px;
          }
        }
    }

</style>



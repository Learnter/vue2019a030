<template>
  <section class="release">

    <van-nav-bar  title="输入链接"  left-arrow  @click-left="$router.go(-1)"/>
    <div class="release_main">

      <div class="upload">
          <div class="upload_way">
             <van-uploader :after-read="afterRead" accept="video/*" capture="camera">
              <div class="uploadIcon">
                 <img src="@/assets/uploadImg/2019_a030_59.png">
              </div>
              <p>拍摄</p>
             </van-uploader>
          </div>
          <div class="upload_way">
            <van-uploader :after-read="afterRead" accept="video/*">
             <div class="uploadIcon">
               <img src="@/assets/uploadImg/2019_a030_58.png">
             </div>
             <p>上传</p>
            </van-uploader>
          </div>
          <div class="upload_way">
            <div class="uploadIcon">
               <img src="@/assets/uploadImg/2019_a030_57.png">
            </div>
            <p>站外链接</p>
          </div>
      </div>

      <div class="release_search">
        <input
          v-model="address"
          type="text"
          placeholder="长按粘贴外站链接,再点击下一步"
          autofocus
        />
      </div>
      <div class="release_tips">
        <div class="release_tip_title">
            <P>1.打开外站视频播放页,点击分享按钮</P>
            <P>2.点击分享按钮上的复制链接按钮</P>
            <P>3.把剪贴板上的链接复制到上方输入框</P>
        </div>
      </div>
      <div class="outStation">
        <h3>支持外站</h3>
        <div v-if="uploadType == 1">
          <ul class="outStation_items">
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_56.png" alt="加载失败" />
              </div>
              <p>抖音</p>
            </li>
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_55.png" alt="加载失败" />
              </div>
              <p>火山小视频</p>
            </li>
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_54.png" alt="加载失败" />
              </div>
              <p>快手</p>
            </li>
          </ul>
        </div>
        <div v-if="uploadType == 2">
          <ul class="outStation_items">
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_65.png" alt="加载失败" />
              </div>
              <p>百度视频</p>
            </li>
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_66.png" alt="加载失败" />
              </div>
              <p>爱奇艺</p>
            </li>
            <li>
              <div class="outStation_icon">
                <img src="@/assets/uploadImg/2019_a030_67.png" alt="加载失败" />
              </div>
              <p>腾讯视频</p>
            </li>
          </ul>
        </div>
      </div>
        <van-button class="nextStep" size="small" @click="onClickRight">下一步</van-button>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "release",
  data() {
    return {
      // uploadType:"",//上传视频类型
      address:"",//外链接地址
    };
  },
  computed:{
    ...mapState(['uploadType'])
  },
  methods: {
    afterRead(file){ //上传视频
      //  console.log(file.file);
      
       this.isEmptyUploadType();

       let fileFormData = new FormData();
           fileFormData.append('video',file.file);
           fileFormData.append('name','video');
           fileFormData.append('video_type',this.uploadType);

       let url = "uploadVideo/file";
       this.$https.post(url,fileFormData,'multipart/form-data').then(res => {
          console.log(res);
          if(res.data.code === 200 && res.data.data.length != 0){

            let video = {
              realy_url:res.data.data.src,
              video_url:res.data.data.show_src,
            }

            this.$router.push({path:'/video/parseVideo',query:{video:JSON.stringify(video)}})
          }
       })
    },
    onClickRight() { //点击站外链接
      this.isEmptyUploadType();
      if(this.address.trim().length !== 0 && /(http|https):\/\/([\w.]+\/?)\S*/.test(this.address)) {
        let url = "uploadVideo/url";
        let data = {
          "url":this.address,
          "video_type":this.uploadType
        };

        // console.log(data);
        this.$https.post(url,data).then(res => {
          // console.log(res);
            if(res.data.code === 200 && res.data.data){
              if(res.data.data.length === 0 || res.data.data.video_url.length === 0){
                this.$toast({
                  className:'parseFail',
                  message:"视频解析失败!",
                  duration:3000
                });
                return false;
              }else{
                let videoInfo = res.data.data; //获取解析成功后的视频信息
                this.$toast.success({
                  className:'parseSuccess',
                  message:"视频解析成功"
                });
                setTimeout(()=>{
                    this.$router.push({path:'/video/parseVideo',query:{video:JSON.stringify(videoInfo)}})
                },3000)
                
              }
            }else{
               this.$toast({
                  className:'parseFail',
                  message:res.data.msg,
                  duration:3000
                });
            }
        });
      }else{
        this.$toast({
          className:'parseFail',
          message:"请正确输入解析地址!",
          duration:3000
        });
      }
    },
    isEmptyUploadType(){ //视频类型非空判断
       let videoType = this.uploadType;
       if(!videoType || videoType == "undefine" || videoType == null){
           this.$notify({
                message:"不清楚视频类型,请重新发布",
                duration:5000,
                className:"notifyClass"
              });
        setTimeout(() => {
            this.$router.push("/me");
          }, 1000);
        return;
       }
    }
  }
};
</script>
<style lang="scss">

//解析失败样式
.parseFail{ 
  background:red;
  color:#ffffff;
}

//解析成功样式
.parseSuccess{
  background:green;
  color:#ffffff;
}

.van-nav-bar{
  background-color:transparent !important;
.van-nav-bar__title{
  color:#ffffff;
  }
}

.release {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #312f3a;
  .van-nav-bar {
    height: 54px;
    line-height: 54px;
    background: #000000;
    .van-nav-bar__title {
      font-size: 18px;
      color: #ffffff;
    }
    .van-icon {
      font-size: 24px;
      color: white;
    }
  }
  .release_main {
    position: absolute;
    top: 54px;
    width:100%;
    bottom:0;
    box-sizing:border-box;
    padding:0 10px;
    overflow-y:scroll;
    .nextStep{
      background:#FE6440;
      border:none;
      font-size:20px;
      color:#ffffff;
      letter-spacing:2px;
      border-radius:5px;
    }
    .upload{
      display:flex;
      justify-content:space-around;
      align-items:center;
      margin-bottom:30px;
      letter-spacing:2px;
      .upload_way{
        color:#ffffff;
        font-size:15px;
        display:flex;
        flex-direction:column;
        align-items:center;
        .uploadIcon{
          width:50px;
          height:50px;
          margin-bottom:10px;
        }
      }
    }
    .release_search {
      padding:3px 20px;
      background: #5b5964;
      border-radius: 15px;
      input {
        width:100%;
        background: #5b5964;
        border: none;
        color: #ffffff;
        &::-webkit-input-placeholder {
          color: #e8eaed;
          text-align: center;
          letter-spacing:4px;
          font-size: 12px;
        }
      }
    }
    .release_tips {
      padding:30px;
      color: #e8eaed;
      .release_tip_title{
        margin:auto;
        width:80%;
        p{
          font-size:14px;
          text-align:left;
          line-height: 24px;
          margin-bottom: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .outStation {
      text-align: center;
      color: #e8eaed;
      letter-spacing:2px;
      padding-bottom:30px;
      h3 {
        margin-bottom:15px;
        font-size:18px;
      }
      .outStation_items {
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        li {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
          .outStation_icon {
            width: 45px;
            height: 45px;
            margin-bottom: 15px;
            border-radius: 50%;
          }
          p {
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>

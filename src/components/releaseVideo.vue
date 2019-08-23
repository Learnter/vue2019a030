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
    <div class="maskStyle" v-show="isShowTrack">
        <van-circle  v-model="currentRate" :rate="20" :speed="100" :text="text" size="60px" color="green" fill="#1989FA" />
        <p class="maskText">正在努力加载中...</p>
    </div>
    
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "release",
  data() {
    return {
      isShowTrack:false,//是否展示进度框
      currentRate:0,//当前解析进度
      address:"",//外链接地址
    };
  },
  computed:{
    ...mapState(['uploadType']),
    text(){
      return this.currentRate.toFixed(0) + '%';
    }
  },
  methods: {
    afterRead(file){ //上传视频
      //  console.log(file.file);
      
       this.isEmptyUploadType();

       let fileFormData = new FormData();
           fileFormData.append('video',file.file);
           fileFormData.append('name','video');
           fileFormData.append('video_type',this.uploadType);

       this.currentRate = 50;
       let url = "uploadVideo/file";
       this.$https.post(url,fileFormData,'multipart/form-data').then(res => {

          // console.log(res);
          this.currentRate = 80;

          if(res.data.code === 200 && res.data.data != {} && res.data.data != ""){

            let video = {
              realy_url:res.data.data.src,
              video_url:res.data.data.show_src,
            }
             this.currentRate = 100;

             this.$notify({
                  message:"视频获取成功",
                  duration:2000,
                  background:"#07C160",
                  className:"notifyClass"
                 });

             setTimeout(()=> {
                this.isShowTrack = false;
                this.$router.push({path:'/video/parseVideo',query:{video:JSON.stringify(video)}})
             },2000)
          }else{
             this.$notify({
                 message:res.data.msg,
                 duration:3000,
                 className:"notifyClass"
              }); 
             this.isShowTrack = false;     
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

        this.currentRate = 50;
        this.$https.post(url,data).then(res => {
          // console.log(res);
            if(res.data.code === 200 && res.data.data){
              this.currentRate = 80;
              if(res.data.data.length === 0 || res.data.data.video_url.length === 0){
                this.$notify({
                  message:"视频解析失败",
                  duration:3000,
                  className:"notifyClass"
                 }); 
                this.isShowTrack = false;
                return;
              }else{
                let videoInfo = res.data.data; //获取解析成功后的视频信息
                this.currentRate = 100;
                this.$notify({
                  message:"视频解析成功",
                  duration:2000,
                  background:"#07C160",
                  className:"notifyClass"
                 });
                setTimeout(()=>{
                    this.isShowTrack = false;
                    this.$router.push({path:'/video/parseVideo',query:{video:JSON.stringify(videoInfo)}})
                },3000)  
              }              
            }else{
                this.$notify({
                   message:res.data.msg,
                   duration:3000,
                   className:"notifyClass"
               });
                this.isShowTrack = false;
                setTimeout(() => {
                this.$router.push("/me");
              }, 2000);
            } 
        });
      }else{
         this.$notify({
            message:"请正确输入解析地址!",
            duration:3000,
            className:"notifyClass"
         }); 
       }
    },
    isEmptyUploadType(){ //视频类型非空判断

       this.isShowTrack = true; //显示进度框
       let videoType = this.uploadType;

       if(!videoType || videoType == "undefine" || videoType == null){
           this.$notify({
                message:"不清楚视频类型,请重新发布",
                duration:3000,
                className:"notifyClass"
              });
        setTimeout(() => {
            this.$router.push("/me");
          },2000);
        return;
       }
    }
  }
};
</script>
<style lang="scss" scoped>

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

.maskStyle{
    position:fixed;
    left:50%;
    top:40%;
    transform:translate(-50%,-40%);
    width:150px;
    height:150px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:rgba(0,0,0,0.5);
    border-radius:10px;
    .maskText{
      color:#ffffff;
      margin-top:10px;
    }
}
</style>

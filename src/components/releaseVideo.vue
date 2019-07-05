<template>
  <section class="release">
    <return-nav style="background:#10101A" path="/smallVideo">
      <template v-slot:middle>输入连接</template>
      <template v-slot:right>下一步</template>
    </return-nav>
    <div class="release_main">
      <div class="release_search">
        <input type="text" placeholder="长按粘贴外站播放页链接" />
      </div>
      <div class="release_tips">
        <P>1.打开外站视频播放页,点击分享按钮</P>
        <P>2.点击分享按钮上的复制链接按钮</P>
        <P>3.把剪贴板上的链接复制到上方输入框</P>
      </div>
      <div class="outStation">
        <h3>支持外站</h3>
        <div>
          <ul class="outStation_items">
            <li v-for="(item,index) in 6" :key="index">
              <div class="outStation_icon">
                <img src="../assets/tabImg/2019_a030_10.png" alt="加载失败" />
              </div>
              <p>抖音</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "release",
  data() {
    return {};
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss">
.release {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #312f3a;
  .release_main {
    position: absolute;
    top: 54px;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding: 15px 10px 0;
    .release_search {
      padding: 6px 20px;
      background: #5b5964;
      border-radius: 15px;
      input {
        width: 100%;
        background: #5b5964;
        border: none;
        color: #ffffff;
        &::-webkit-input-placeholder {
          color: #e8eaed;
          text-align: center;
          letter-spacing: 2px;
          font-size: 14px;
        }
      }
    }
    .release_tips {
      padding: 40px 30px;
      text-align: left;
      color: #e8eaed;
      font-size: 15px;
      p {
        margin-bottom: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .outStation {
      text-align: center;
      color: #e8eaed;
      h3{
          margin:15px auto;
          font-size:16px;
      }
      .outStation_items {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 15px;
          .outStation_icon {
            width: 50px;
            height: 50px;
            margin-bottom:5px;
            border-radius:50%;
          }
          p{
              font-size:14px;
              color:#5077F8;
          }
        }
      }
    }
  }
}
</style>

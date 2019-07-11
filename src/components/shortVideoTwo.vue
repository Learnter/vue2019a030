<template>
  <section class="shortVideoTwo">
    <van-search v-model="search_text" placeholder="请输入搜索关键词" show-action clearable shape="round">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs>
      <van-tab v-for="(item,index) in 8" :title="'推荐' + index" :key="index"></van-tab>
    </van-tabs>
    <div class="video_main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        :offset="100"
      >
        <ul>
          <li class="video_item" v-for="(item,index) in videosList" :key="index">
            <div class="video_content">
              <img src="@/assets/tabImg/2019_a030_4.png" alt />
              <div class="video_title">
                <van-tag round type="danger" style="font-weight:400">热播</van-tag>
                <span>市委书记和市长正在食堂吃饭,员工竟然跳在桌子上大喊两个人的名字</span>
              </div>
            </div>
            <div class="video_info">
              <div class="video_info_left">
                <div class="video_info_img">
                  <img src="@/assets/tabImg/2019_a030_4.png" alt />
                </div>
                <div class="video_info_title">
                  <h3>
                    {{item.title}}
                    <span style="color:red">+关注</span>
                  </h3>
                  <p>天津初一文化传媒有限公司</p>
                </div>
              </div>
              <div class="video_info_icons">
                <van-icon name="thumb-circle-o" :info="item.praise_num" />
                <van-icon name="chat-o" :info="item.collect_num" />
                <van-icon name="ellipsis" />
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </section>
</template>
<script>
export default {
  name: "shortVideoTwo",
  data() {
    return {
      search_text: "",
      loading: false,
      finished: false,
      videosList: []
    };
  },
  created() {
    this.fetchVideoList();
  },
  methods: {
    fetchVideoList() {
      //获取短视频列表
      let url = "video/shortVideoList";
      this.$https.get(url).then(res => {
         console.log(res);
        if (res.data.code === 200 && res.data.data) {
          console.log(res.data);
          this.videosList = res.data.data;
        }
      });
    },
    onSearch() {
      console.log("点击搜索按钮" + this.search_text);
    },
    onLoad() {
      this.loading = false;
      this.finished = true;
    }
  }
};
</script>
<style lang="scss">
.shortVideoTwo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  background: #ffffff;
  .van-field__control {
    color: #000000;
  }
  .van-tab--active {
    font-size: 16px;
    font-weight: bold;
  }
  .van-tabs__line {
    background: linear-gradient(to right, #b40cff, #793dff);
  }

  .video_main {
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    bottom: 64px;
    overflow: scroll;
    .video_item {
      margin-bottom: 10px;
    }

    .video_content {
      width: 100%;
      height: 200px;
      position: relative;
      .video_title {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        text-align: left;
        color: #ffffff;
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
      }
    }

    .video_info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ffffff;
      padding: 10px;
      .video_info_left {
        flex: 1;
        display: flex;
        text-align: left;
        .video_info_img {
          width: 40px;
          height: 40px;
          margin-right:5px;
          overflow: hidden;
          img{
              border-radius:50%;
          }
        }
        .video_info_title {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3px 0;
          h3 {
            font-size: 14px;
            font-weight: bold;
          }
          p {
            font-size: 12px;
            color: #b2b2b2;
          }
        }
      }
      .video_info_icons {
        width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
      }
    }
  }
}
</style>


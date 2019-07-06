<template>
  <section class="protocol">
    <return-nav>
      <template v-slot:middle>注册协议</template>
    </return-nav>
    <div class="pro_main" v-html="content"></div>
  </section>
</template>
<script>
import returnNav from "@/components/common/returnNav";
export default {
  name: "protocol",
  data() {
    return {
      content: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let url = "config/registrationAgreement";
      this.$https.get(url).then(res => {
        if (res && res.data.data && res.data.data.content) {
          this.content = res.data.data.content;
        }
      });
    }
  },
  components: {
    returnNav
  }
};
</script>
<style lang="scss">
.protocol {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: #171520;
  .pro_main {
    position: absolute;
    top: 54px;
    left: 10px;
    right: 10px;
    bottom: 0;
    color: white;
    overflow: scroll;
    h2 {
      font-size: 22px;
      padding: 10px 0;
    }
    p {
      text-align: left;
      line-height: 24px;
      margin-bottom: 5px;
    }
  }
}
</style>

<template>
  <div id="reasonForm" v-if="options!=null">
    <div class="title">
      <a @click="()=>{ options=null }">×</a>
    </div>

    <div class="content">
      <ul>
        <li>
          <h4>责任人</h4>
          <span>{{ zrr }}</span>
        </li>
        <li>
          <h4>具体原因</h4>
          <span>{{ jtyy }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "reasonForm",
  data() {
    return {
      jtyy: null,
      zrr: null,
      options: null
    };
  },
  created() {},
  methods: {
    showReason(options) {
      this.options = options;

      if (this.options != null) {
        this.jtyy = this.options.jtyy != "/" ? this.options.jtyy : "暂无数据";
        this.zrr = this.options.zrr != "/" ? this.options.zrr : "暂无数据";
      }
    }
  }
};
</script>

<style lang="less" scoped>
#reasonForm {
  width: 80%;
  height: 80%;
  position: absolute;
  left: 10%;
  bottom: 8%;
  z-index: 40;
  background: linear-gradient(
    180deg,
    rgba(0, 63, 189, 0.8) 0%,
    rgba(5, 53, 129, 0.8) 100%
  );

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  .title {
    text-align: right;
    padding-right: 10px;
    a {
      font-size: 30px;
      cursor: pointer;
    }
  }

  .content {
    height: 70%;
    padding: 8px 15px;

    ul {
      text-align: left;
      height: 100%;
      overflow: auto;
      li {
        margin-bottom: 10px;
        span {
          font-size: 14px;
          word-break: break-all;
        }
      }
    }
  }

  .content ul::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: #1a3561;
    border-radius: 10px;
  }
  .content ul::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #45cdff;
    border-radius: 10px;
  }
}
</style>
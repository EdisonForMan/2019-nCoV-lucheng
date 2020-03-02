<template>
  <div id="qkysForm">
    <div class="head">
      <span>[ {{ title }} ] 区块优势</span>
      <a @click="()=>{ this.$parent.qkysShow = false }">×</a>
    </div>

    <div class="content">
      <div class="wrapper">
        <div id="fish-bone" class="fish-bone"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "qkysForm",
  data() {
    return {
      title: null
    };
  },
  created() {},
  mounted() {
  },

  methods: {
    getItem(name) {
      this.title = name;

      if (name == "大南街道E-24a") {
        const option = {
          data: [
            {
              label: `<span class="ks_label">责任科室：大南街道城建科</span>
          <br />
          <span class="nr_label">工作内容：围墙圈建及界桩放样</span>`,
              date: "2020年<br />2月24号"
            },
            {
              label: `<span class="ks_label">责任科室：大南街道城建科</span>
          <br />
          <span class="nr_label">工作内容：土地征收</span>`,
              date: "2020年<br />2月24号"
            },
            {
              label: `<span class="ks_label">责任科室：大南街道城建科</span>
          <br />
          <span class="nr_label">工作内容：拆迁清零</span>`,
              date: "2020年<br />3月15号"
            },
            {
              label: `<span class="ks_label">责任科室：大南街道城建科</span>
          <br />
          <span class="nr_label">工作内容：农行不动产变更登记办理</span>`,
              date: "2020年<br />3月15号"
            },
            {
              label: `<span class="ks_label">责任科室：大南街道城建科</span>
          <br />
          <span class="nr_label">工作内容：土地收储</span>`,
              date: "2020年<br />3月15号"
            }
          ]
        };

        window.fishBone.init(".fish-bone", option);
      } else {
        document.getElementById("fish-bone").innerHTML = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../external/fishbone/fishBone2.css");
#qkysForm {
  position: absolute;
  top: 21%;
  left: 11%;
  width: 74%;
  height: 58%;
  padding: 1% 2%;
  z-index: 31;
  background: #24386a;
  border: 1px solid #04ecff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  .head {
    height: 10%;

    span {
      font-size: 30px;
    }

    a {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 40px;
      cursor: pointer;
    }
  }

  .content {
    height: 88%;
    display: flex;
    justify-content: space-between;

    .wrapper {
      width: 100%;
      border: 1px solid #eee;
      position: relative;
      margin: 0 auto;
      overflow: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>
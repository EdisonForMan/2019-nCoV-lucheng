<template>
  <div id="commonEdit">
    <el-input slot="reference" placeholder="请在此输入文字" v-model="input">
      <i slot="suffix" class="el-input__icon input-suffix" :class="{ active: visible }"></i>
    </el-input>
  </div>
</template>

<script>
/* eslint-disable */
import { csMap } from "../config/hash";
export default {
  data() {
    return {
      options: [],
      countryList: [
        "全区",
        "南郊街道",
        "南汇街道",
        "五马街道",
        "山福镇",
        "藤桥镇",
        "仰义街道",
        "丰门街道",
        "双屿街道",
        "广化街道",
        "松台街道",
        "大南街道",
        "蒲鞋市街道",
        "滨江街道",
        "七都街道",
      ],
      readonly: true,
      visible: false,
      input: "",
      selectVal: "南郊街道",
      defineHash: {},
    };
  },
  created() {
    // 组装 id 数组
    this.ids = [
      "sydj_line",
      "cgd_line",
      "jzgd_polygon",
      "jdbsc",
      "jdwhz",
      "sq",
      "sqzhfw",
      "xqd",
      "cxjhb",
      "yey",
      "xzc",
      "sydj",
      "bjxx",
      "gy",
      "gc",
      "ggwhss",
      "jq",
      "stsd",
      "fd",
      "nmsc",
      "cg",
      "ckdw",
      "cs",
      "jtlk",
      "dyy",
      "jzgd",
      "hd",
      "xxzb",
      "xxxn",
      "pxjg",
      "fdz",
      "wb",
    ];
    /* const list = Object.values(csMap);
    list.map(item => {
      this.ids.push(item.id, `${item.id}_2`);
    }); */
  },
  mounted() {
    // const that = this;
    // that.options = [];
    // const countryName = window.countryName;
    // that.countryList.map((item) => {
    //   that.options.push({
    //     value: item,
    //     label: item,
    //     disabled:
    //       countryName == ""
    //         ? false
    //         : that.countryList.indexOf(countryName) > -1,
    //   });
    // });
    // that.input = countryName == "" ? "全区" : countryName;
    // /* $(".top-select-option")
    //   .parent("el-select-dropdown")
    //   .css({
    //     color: "gray"
    //   }); */
    // // console.log($("el-select-dropdown").css());
  },
  methods: {},
};
</script>

<style lang="less" scoped>
#commonEdit {
  display: inline-block;

  .el-input {
    /deep/ input {
      background-color: #637dc7;
      border: 1px solid #637dc7;
      border-radius: 3px;
      color: #fff;
      height: 26px;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 500;
      padding-left: 6px;
      padding-right: 5px;
    }

    /deep/ i {
      font-size: 16px;
      color: #fff;
    }

    /deep/ .el-input__suffix {
      right: 26px;
    }

    .input-suffix {
      position: absolute;
      width: 26px;
      height: 26px;
      top: 50%;
      transform: translate(0, -50%);
      background-image: url("~@/components/common/image/edit.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
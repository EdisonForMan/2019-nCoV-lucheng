<template>
  <div id="topSelect">
    <el-popover
      placement="bottom-end"
      width="170"
      trigger="manual"
      v-model="visible"
      popper-class="select-pop"
    >
      <ul>
        <li
          v-for="item in options"
          :key="item.value"
          :class="{ selected: item.value == input }"
          @click="selected(item.value)"
        >
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <el-input slot="reference" placeholder="请选择" readonly="readonly" v-model="input">
        <i slot="prefix" class="el-input__icon input-prefix"></i>
        <i
          slot="suffix"
          class="el-input__icon input-suffix"
          :class="{ active: visible }"
          @click="() => { visible = !visible }"
        ></i>
      </el-input>
    </el-popover>
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
        "七都街道"
      ],
      readonly: true,
      visible: false,
      input: "南郊街道",
      selectVal: "南郊街道",
      defineHash: {}
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
      "wb"
    ];
    /* const list = Object.values(csMap);
    list.map(item => {
      this.ids.push(item.id, `${item.id}_2`);
    }); */
  },
  mounted() {
    const that = this;
    that.options = [];

    const countryName = window.countryName;

    that.countryList.map(item => {
      that.options.push({
        value: item,
        label: item,
        disabled:
          countryName == "" ? false : that.countryList.indexOf(countryName) > -1
      });
    });

    that.input = countryName == "" ? "全区" : countryName;

    /* $(".top-select-option")
      .parent("el-select-dropdown")
      .css({
        color: "gray"
      }); */

    // console.log($("el-select-dropdown").css());
  },
  methods: {
    filterItem() {
      if (!this.$parent.$parent.$parent.$refs.cityArcgis.map) return;
      const layers = this.$parent.$parent.$parent.$refs.cityArcgis.map.layers
        .items;

      // console.log(layers);

      this.$parent.$parent.$parent.$refs.topDate.filterItems(this.input);

      if (this.input == "全区") {
        this.$parent.$parent.$parent.updateleftOptions("");
        this.$parent.$parent.$parent.$refs.charts.updateTbale("");
        this.$parent.$parent.$parent.$refs.listxq.filterItem("");
      } else {
        this.$parent.$parent.$parent.updateleftOptions(this.input);
        this.$parent.$parent.$parent.$refs.charts.updateTbale(this.input);
        this.$parent.$parent.$parent.$refs.listxq.filterItem(this.input);
      }

      layers.map(item => {
        if (~this.ids.indexOf(item.id)) {
          if (!this.defineHash[item.id]) {
            if (item.sublayers) {
              this.defineHash[item.id] =
                item.sublayers.items[0].definitionExpression;
            } else {
              this.defineHash[item.id] = item.definitionExpression;
            }
          }

          if (this.input == "全区") {
            // item.definitionExpression = this.defineHash[item.id];
            if (item.sublayers) {
              item.sublayers.items[0].definitionExpression = this.defineHash[
                item.id
              ];
            } else {
              item.definitionExpression = this.defineHash[item.id];
            }
            // this.$parent.fixOpt("");
          } else {
            if (item.sublayers) {
              item.sublayers.items[0].definitionExpression =
                this.defineHash[item.id] + ` and District = '${this.input}'`;
            } else {
              item.definitionExpression =
                this.defineHash[item.id] + ` and District = '${this.input}'`;
            }

            // this.$parent.fixOpt(this.selectVal);
          }
        }
      });

      // console.log(layers);
    },
    selectHandle(val) {
      this.filterItem();
    },

    selected(value) {
      this.input = value;
      this.visible = false;
      this.filterItem();
    }
  }
};
</script>

<style lang="less" scoped>
#topSelect {
  width: 100%;
  margin: auto;

  .el-input {
    /deep/ input {
      background-color: #1b45a7;
      border: 1px solid #1b45a7;
      color: #fff;
      cursor: pointer;
      height: 40px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      padding-left: 50px;
      padding-right: 50px;
    }

    /deep/ i {
      font-size: 16px;
      color: #fff;
    }

    .input-prefix::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 20px;
      top: 50%;
      transform: translate(0, -50%);
      background-image: url("~@/components/common/image/input_prefix.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }

    /deep/ .el-input__prefix {
      left: 15px;
    }

    /deep/ .el-input__suffix {
      right: 35px;
    }

    .input-suffix {
      position: absolute;
      width: 32px;
      height: 32px;
      top: 50%;
      transform: translate(0, -50%);
      background-image: url("~@/components/common/image/input_suffix.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }

    .active {
      background-image: url("~@/components/common/image/input_suffix_checked.png");
    }
  }

  .el-select {
    width: 100%;

    /deep/ input {
      background-color: #1b45a7;
      border: 1px solid #1b45a7;
      color: #fff;
    }

    /deep/ i {
      font-size: 16px;
      color: #fff;
    }
  }

  /* position: fixed;
  top: 16px;
  right: 255px;
  z-index: 20; */
}
</style>
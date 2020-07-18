<template>
  <div id="topSelect">
    <el-select v-model="selectVal" @change="selectHandle" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
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
      selectVal: "南郊街道",
      defineHash: {}
    };
  },
  created() {
    // 组装 id 数组
    this.ids = ["zgd_line", "cgd_line", "jzgd_polygon"];
    const list = Object.values(csMap);
    list.map(item => {
      this.ids.push(item.id, `${item.id}_2`);
    });
  },
  watch: {
    /* selectVal(n, o) {
      console.log(n, o);
      this.filterItem();
    } */
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

    that.selectVal = countryName == "" ? "全区" : countryName;
  },
  methods: {
    filterItem() {
      // console.log(this.$parent);
      if (!this.$parent.$parent.$parent.$refs.cityArcgis.map) return;
      const layers = this.$parent.$parent.$parent.$refs.cityArcgis.map.layers
        .items;

      layers.map(item => {
        if (~this.ids.indexOf(item.id)) {
          if (!this.defineHash[item.id]) {
            this.defineHash[item.id] = item.definitionExpression;
          }

          if (this.selectVal == "全区") {
            item.definitionExpression = this.defineHash[item.id];
            // this.$parent.fixOpt("");
          } else {
            item.definitionExpression =
              this.defineHash[item.id] + ` and District = '${this.selectVal}'`;
            // this.$parent.fixOpt(this.selectVal);
          }
        }
      });

      if (this.selectVal == "全区") {
        this.$parent.$parent.$parent.updateleftOptions("");
      } else {
        this.$parent.$parent.$parent.updateleftOptions(this.selectVal);
      }

      console.log(layers);
    },
    selectHandle(val) {
      this.filterItem();
    }
  }
};
</script>

<style lang="less" scoped>
#topSelect {
  width: 90%;
  margin: auto;

  .el-select {
    width: 100%;
  }
  /* position: fixed;
  top: 16px;
  right: 255px;
  z-index: 20; */
}
</style>
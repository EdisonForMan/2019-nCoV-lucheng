<template>
  <div class="Com_content Macroscopic">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container" style="z-index: 10;">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}  `">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="()=>{icon_show_left=!icon_show_left}" class="hidden_button"></span>
      </div>
      <div id="fy-rightDiv">
        <bqtj />
        <ylzy />
        <sbDate ref="table" />
      </div>
    </div>
    <xzDate />
    <bottomBtn />
    <topDate />
    <popOpen />
    <!-- //弹出框 -->
    <sbxq ref="sbxq" v-show="xqShow" />
  </div>
</template>

<script>
/**
 * 为避免传值紊乱,建议用ref直接传值或调用触发更新
 * [例] this.$parent.ref.macroArcgis.goLocation(item) 可以直接在<RightDiv>跨模块调用(从列表模块到父模块,再到地图模块)
 * 使用场景:
 * 1.点击勾选左侧,右侧列表Object[]的替换
 * 2.点击列表<RightDiv>,地图<commonArcgis>定位并显示内容
 */
import commonArcgis from "./Arcgis";
import leftMultiSelect from "@/components/common/selectRadioFrame/leftMultiSelect";
import bottomBtn from "./bottomBtn";

//  chartTable
import bqtj from "./rightDiv/bqtj";
import ylzy from "./rightDiv/ylzy";
import sbDate from "./rightDiv/sbDate";
import sbxq from "./sbxq";
import topDate from "./topDate";
import xzDate from "./xzDate";
import popOpen from "./popOpen";
import { leftOptions } from "./config/enums";

export default {
  name: "macroscopic",
  data() {
    return {
      icon_show_left: false,
      leftOptions,
      xqShow: false
    };
  },
  components: {
    commonArcgis,
    leftMultiSelect,
    bqtj, //病例统计
    sbDate, //上报动态数据
    sbxq, //上报详情
    ylzy, //医疗资源状况
    bottomBtn, //底部按钮
    topDate, //顶部数据
    xzDate, //详情须知
    popOpen //弹出详情框
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
 <style scoped lang="less">
@import url("./Macroscopic.less");
</style>
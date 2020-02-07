<template>
  <div class="Com_content Monitor">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container" style="z-index: 10;">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}  `">
        <leftRadioSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="()=>{icon_show_left=!icon_show_left}" class="hidden_button"></span>
      </div>
      <div id="fy-rightDiv">
        <bqtj ref="bqtj" />
        <wjw></wjw>
        <qstu></qstu>
        <ylzy v-if="false"/>
        <sbDate ref="table" v-if="false"/>
      </div>
    </div>
    <bottomBtn />
    <topDate />
    <popOpen />
    <!-- //弹出框 -->
    <sbxq ref="sbxq" v-show="xqShow" />
    <listxq ref="listxq" v-show="listShow" />
    <queryForm ref="queryForm" />
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
import leftRadioSelect from "@/components/common/selectRadioFrame/leftRadioSelect";
import bottomBtn from "./bottomBtn";

//  chartTable
import bqtj from "./rightDiv/bqtj";
import wjw from "./rightDiv/wjw";
import ylzy from "./rightDiv/ylzy";
import qstu from "./rightDiv/qstu";
import sbDate from "./rightDiv/sbDate";
import sbxq from "./sbxq";
import topDate from "./topDate";
import listxq from "./listxq";
import popOpen from "./popOpen";
import queryForm from "./queryForm";
import { leftOptions } from "./config/enums";

export default {
  name: "macroscopic",
  data() {
    return {
      icon_show_left: false,
      leftOptions,
      xqShow: false,
      listShow: false
    };
  },
  components: {
    commonArcgis,
    leftRadioSelect,
    bqtj, // 病例统计
    wjw, // 卫健委
    sbDate, //上报动态数据
    sbxq, //上报详情
    qstu, // 趋势图统计
    ylzy, //医疗资源状况
    bottomBtn, //底部按钮
    topDate, //顶部数据
    popOpen, //弹出详情框
    listxq, //点击列表的详情框
    queryForm //空间查询结果
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
 <style scoped lang="less">
@import url("./Monitor.less");
</style>
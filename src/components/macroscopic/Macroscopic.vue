<template>
  <div class="Com_content Macroscopic">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container" style="z-index: 10;">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}`">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="toggle" class="hidden_button"></span>
      </div>
      <div :class="`rightside animated ${icon_show_right?`slideOutRight`:`slideInRight`}`">
        <div id="rightFrame">
          <bqtj ref="bqtj" />
          <ylzy />
          <sbDate ref="table" />
        </div>
        <span @click="()=>{icon_show_right=!icon_show_right}" class="hidden_right_button"></span>
      </div>
    </div>
    <xzDate :style="{left:moveLeft + 'px'}" />
    <bottomBtn />
    <topDate />
    <popOpen />
    <!-- //弹出框 -->
    <sbxq ref="sbxq" v-show="xqShow" />
    <listxq ref="listxq" v-show="listShow" />
    <xqjck ref="xqjck" v-show="xqjckShow" />
    <mjChart ref="mjChart" :style="{left:moveLeft + 'px'}" />
    <!-- 圈主信息 -->
    <qzTable ref="qzTable" :style="{left:(Number(moveLeft) + Number(520)) + 'px'}" />
    <streetFrame ref="cpFrame" :style="{left:moveLeft + 'px'}" />
    <queryForm ref="queryForm" :style="{left:moveLeft + 'px'}" />
    <gldxq ref="gldxq" :style="{left:moveLeft + 'px'}" />
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
import listxq from "./listxq";
import popOpen from "./popOpen";
import mjChart from "./frame/mjChart";
import streetFrame from "./frame/streetFrame";
import queryForm from "./queryForm";
import gldxq from "./gldxq";
import xqjck from "./xqjck";

import qzTable from "./frame/qzTable"; //圈主信息

import { leftOptions } from "./config/enums";

export default {
  name: "macroscopic",
  data() {
    return {
      icon_show_left: false,
      icon_show_right: false,
      leftOptions,
      xqShow: false,
      listShow: false,
      xqjckShow: false,
      moveLeft: "360"
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
    popOpen, //弹出详情框
    mjChart, //密接列表、图表
    streetFrame, //街道疫情
    listxq, //点击列表的详情框
    queryForm, //空间查询结果
    qzTable, //圈主信息
    gldxq, //隔离点详情
    xqjck //小区进出口人员
  },
  created() {},
  mounted() {},
  methods: {
    toggle() {
      this.icon_show_left = !this.icon_show_left;
      this.moveLeft = !this.icon_show_left ? "360" : "20";
    },
    leftHidden() {
      this.icon_show_left = true;
      this.moveLeft = "20";
    }
  }
};
</script>
 <style scoped lang="less">
@import url("./Macroscopic.less");
</style>
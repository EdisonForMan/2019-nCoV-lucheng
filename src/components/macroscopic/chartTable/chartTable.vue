<template>
  <div id="fy-rightDiv">
    <bqtj />
    <ylzy />
    <sbDate />
  </div>
</template>

<script>
/* eslint-disable */
import bqtj from "./bqtj";
import ylzy from "./ylzy";
import sbDate from "./sbDate";
export default {
  components: {
    bqtj, //病例统计
    sbDate, //上报动态数据
    ylzy //医疗资源状况
  }
};
</script>

<style>
#fy-rightDiv {
  position: fixed;
  right: 10px;
  top: 10%;
  width: 25%;
  height: 88%;
}
</style>
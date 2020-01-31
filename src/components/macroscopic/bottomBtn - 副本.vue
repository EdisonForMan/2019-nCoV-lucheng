<template>
  <div id="btnDiv">
    <ul>
      <li @click="xzqh">行政区划</li>
      <li @click="yxt">影像图</li>
      <li @click="slt">矢量图</li>
      <li>夜光图</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottomBtn",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    xzqh() {
      this.$parent.$refs.macroArcgis.romoveLayer();
    },
    yxt() {
      this.$parent.$refs.macroArcgis.yxt();
    },
    slt() {
      this.$parent.$refs.macroArcgis.slt();
    }
  }
};
</script>

<style>
#btnDiv {
  position: absolute;
  bottom: 2%;
  right: 30%;
}
#btnDiv ul li {
  list-style: none;
  float: left;
  background-color: #243968;
  border: 1px solid #05fff8;
  padding: 10px 10px;
  margin-left: 5px;
  cursor: pointer;
}
</style>
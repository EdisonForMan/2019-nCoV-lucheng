<template>
  <div id="btnDiv">
    <ul>
      <li :class="{active:zddkTag}" @click="zddk">做地地块</li>
      <li :class="{active:xzqhTag}" @click="xzqh">五色风险评估</li>
      <li :class="{active:kgtTag}" @click="kgt">控规图</li>
      <li @click="yxt">影像图</li>
      <li @click="slt">矢量图</li>
      <li @click="clean">清除</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "bottomBtn",
  data() {
    return {
      zddkTag: true,
      xzqhTag: true,
      kgtTag: false
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    zddk() {
      this.$parent.$refs.montorArcgis.zddk();
    },
    xzqh() {
      this.$parent.$refs.montorArcgis.changeChanyePlate();
    },
    yxt() {
      this.$parent.$refs.montorArcgis.yxt();
    },
    slt() {
      this.$parent.$refs.montorArcgis.slt();
    },
    kgt() {
      this.$parent.$refs.montorArcgis.kgt();
    },
    clean() {
      this.$parent.$refs.montorArcgis.map.findLayerById("chanyePlate") &&
        (this.$parent.$refs.montorArcgis.map.findLayerById(
          "chanyePlate"
        ).visible = false);
      this.$parent.$refs.montorArcgis.map.findLayerById("zddk") &&
        (this.$parent.$refs.montorArcgis.map.findLayerById(
          "zddk"
        ).visible = false);
      this.$parent.$refs.montorArcgis.map.findLayerById("dkImage") &&
        (this.$parent.$refs.montorArcgis.map.findLayerById(
          "dkImage"
        ).visible = false);
      this.$parent.$refs.montorArcgis.map.findLayerById("kg") &&
        (this.$parent.$refs.montorArcgis.map.findLayerById(
          "kg"
        ).visible = false);
      this.$parent.$refs.montorArcgis.view.graphics.removeAll();
      this.$parent.$refs.montorArcgis.view.popup.visible = false;

      this.zddkTag = false;
      this.xzqhTag = false;
      this.kgtTag = false;
    }
  }
};
</script>

<style lang="less" scoped>
#btnDiv {
  position: absolute;
  bottom: 2%;
  right: 35%;
  z-index: 20;

  > ul {
    > li {
      height: 21px;
      list-style: none;
      float: left;
      background-color: #243968;
      border: 1px solid #05fff8;
      padding: 10px 10px;
      margin-left: 5px;
      cursor: pointer;
    }

    .active {
      color: #0ff;
      font-weight: bolder;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
        0px 0px 44px 0px rgba(16, 146, 236, 0.3);
    }

    .hover {
      padding: 10px 0px;
    }

    .hover:hover {
      overflow: visible;
    }
  }
}
</style>
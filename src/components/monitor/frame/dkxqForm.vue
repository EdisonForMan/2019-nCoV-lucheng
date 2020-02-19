<template>
  <div id="dkxqForm">
    <a>×</a>

    <div class="block block1">
      <span class="title">基本详情</span>
      <div class="carousel">
        <el-carousel height="200px" autoplay>
          <el-carousel-item v-for="item in 4" :key="item"></el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="block block2">
      <span class="title">区位优势</span>
    </div>
    <div class="block block3">
      <span class="title">问题清单</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";

export default {
  name: "dkxqForm",
  data() {
    return {
      server,
      title: "",
      list: [],
      calShow1: false,
      calShow2: false,
      time_start: "",
      time_end: "",
      ago: "",
      future: "",
      now: "",
      time: "",
      charts: [],
      sArr: []
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style lang="less" scoped>
#dkxqForm {
  position: absolute;
  width: 450px;
  height: 720px;
  background: #24386a;
  border: 1px solid #04ecff;
  border-radius: 6px;
  z-index: 20;
  top: 18%;
  margin: auto;
  box-sizing: border-box;
  transition: all 1s;

  a {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }

  .block {
    text-align: left;
    .title {
      font-size: 20px;
    }
  }

  .block1 {
    height: 30%;
    padding: 2% 0%;

    .carousel {
      padding: 4px;

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }

  .block2 {
    height: 30%;
    padding: 2% 0%;
  }

  .block3 {
    height: 30%;
    padding: 2% 0%;
  }

  .choose_div {
    margin: 2%;
    padding: 2% 0%;

    .wh_container {
      position: absolute;
      right: 0px;
      z-index: 30;
    }

    span {
      font-size: 16px;
    }

    img {
      width: 16px;
      height: 16px;
      margin-left: 10px;
      margin-right: 30px;
      cursor: pointer;
    }
  }

  .ctn2 {
    height: 85%;
    overflow: auto;

    .chart {
      width: 100%;
      height: 230px;
      margin: 10px 0px;
    }
  }

  .content::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: rgb(107, 134, 223);
    border-radius: 3px;
  }
  .content::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgb(14, 10, 247);
    border-radius: 3px;
  }
}
</style>
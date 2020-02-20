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
      <div>
        <ul>
          <li v-for="(item,index) in qktable" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="block block3">
      <span class="title">问题清单</span>
      <div>
        <ul>
          <li v-for="(item,index) in qtable" :key="index">
            <div :style="{background:item.color}">
              <span>{{item.text}}</span>
              <br />
              <span>{{item.tf}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <span>负责人：李先生</span>
      <span style="margin-left: 20px;">联系方式：0577-88030503</span>
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
      sArr: [],
      qktable: [
        {
          title: "项目区位优势",
          text:
            "本次规划项目位于温州书鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善"
        },
        {
          title: "项目区位优势",
          text:
            "本次规划项目位于温州书鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善"
        },
        {
          title: "项目区位优势",
          text:
            "本次规划项目位于温州书鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善"
        }
      ],
      qtable: [
        { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
        { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
        { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
        { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
        { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
        { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" }
      ]
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
  height: 800px;
  background: rgba(4, 30, 117, 0.5);
  border-left: 1px solid #04ecff;
  border-right: 1px solid #04ecff;
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
  span {
    font-size: 14px;
    color: #fff;
  }
  .block {
    text-align: left;
    width: 100%;
    height: 248px;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    margin-bottom: 8px;
    border-top: 1px solid #4594ff;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 5px;
      left: 20px;
      font-weight: 600;
      border-left: 5px solid;
      padding-left: 5px;
    }
    div {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
    }
  }

  .block1 {
    // height: 30%;
    // padding: 2% 0%;
    .carousel {
      // padding: 4px;
      height: 100%;
      padding: 6px 20px;

      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
      }
    }
  }

  .block2 {
    // height: 30%;
    // padding: 2% 0%;
    div {
      padding: 10px;
      ul {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: rgba(31, 54, 92, 0.5);
        li {
          display: inline-block;
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          padding: 19px;
          p {
            font-size: 16px;
            color: rgba(211, 154, 69, 1);
            line-height: 22px;
          }
        }
      }
    }
  }

  .block3 {
    // height: 30%;
    // padding: 2% 0%;
    div {
      padding: 10px;
      ul {
        width: 100%;
        height: 100%;
        width: 100%;
        height: 100%;
        list-style: none;
        li {
          width: 30%;
          height: 50%;
          display: inline-block;
          text-align: center;
          padding: 5px;
          div {
            width: 100%;
            height: 56px;
            display: inline-block;
            padding-top: 10px;
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 24px;
    line-height: 24px;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
  }

  .block2 ul::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: rgb(107, 134, 223);
    border-radius: 3px;
  }
  .block2 ul::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgb(14, 10, 247);
    border-radius: 3px;
  }
}
</style>
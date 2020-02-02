<template>
  <div class="com-content control">
    <div class="com-container">
      <div class="control-header">
        <ControlHeader :headerData="headerData"></ControlHeader>
      </div>
      <div class="com-bg">
        <div class="com-container_inner">
          <div class="control-card">
            <div class="control-card-title">鹿城区疫情总览</div>
            <div class="control-card-body">
              <ControlView :viewData="viewData"></ControlView>
            </div>
          </div>
          <div class="control-card">
            <div class="control-card-title">各街道疫情情况</div>
            <div class="control-card-body">
              <ControlJieDao :tableData="jieDaoTable"></ControlJieDao>
            </div>
          </div>
          <div class="control-card">
            <div class="control-card-body">
              <gldwz></gldwz>
            </div>
          </div>
          <div class="control-card">
            <div class="control-card-body">
              <yqzst></yqzst>
            </div>
          </div>
          <div class="control-card">
            <div class="control-card-body">
              <ytyq></ytyq>
            </div>
          </div>
          <div class="control-card">
            <div class="control-card-title">重点防控区域</div>
            <div class="control-card-body">
              <zdfkq></zdfkq>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonArcgis from "./Arcgis";
import ControlHeader from "./ControlHeader";
import ControlJieDao from "./ControlJieDao";
import ControlView from "./ControlView";
import yqzst from "./yqzst";
import ytyq from "./ytyq";
import gldwz from "./gldwz";
import zdfkq from "./zdfkq";

export default {
  name: "control",
  data() {
    return {
      headerData: {
        whNumber: 7081,
        ygkNumber: 2364,
        wgkNumber: 4717,
        frNumer: 7 // 头部数据
      },
      jieDaoTable: [
        {
          key: "五马",
          value: ["3", "3", "0", "1", "358", "-"]
        },
        {
          key: "广化",
          value: ["0", "0", "1", "0", "101", "-"]
        },
        {
          key: "大南",
          value: ["7", "1", "1", "0", "38", "-"]
        },
        {
          key: "松台",
          value: ["3", "6", "6", "1", "87", "-"]
        },
        {
          key: "滨江",
          value: ["0", "4", "1", "0", "379", "-"]
        },
        {
          key: "蒲鞋市",
          value: ["1", "1", "1", "0", "174", "-"]
        },
        {
          key: "南汇",
          value: ["11", "3", "2", "0", "540", "-"]
        },
        {
          key: "双屿",
          value: ["1", "2", "0", "0", "203", "-"]
        },
        {
          key: "七都",
          value: ["0", "0", "0", "0", "71", "-"]
        },
        {
          key: "仰义",
          value: ["0", "1", "0", "0", "110", "-"]
        },
        {
          key: "丰门",
          value: ["0", "0", "0", "0", "77", "-"]
        },
        {
          key: "南郊",
          value: ["2", "0", "1", "0", "41", "-"]
        },
        {
          key: "藤桥镇",
          value: ["6", "0", "1", "5", "158", "-"]
        },
        {
          key: "山福镇",
          value: ["0", "0", "0", "0", "68", "-"]
        } // 街道数据
      ],
      viewData: {
        tableData: [
          {
            key: "医院发热待查",
            value: ["15", "0", "-"]
          },
          {
            key: "社区发热待查",
            value: ["7", "0", "-"]
          },
          {
            key: "居家隔离人员",
            value: ["2416", "0", "-"]
          },
          {
            key: "密切接触者",
            value: ["282", "0", "-"]
          }
        ],
        quezhen: {
          value: 41,
          add: 4,
          percent: "-"
        },
        yisi: {
          value: 18,
          add: 13,
          percent: "-"
        },
        zhiyu: {
          value: 1,
          add: 0,
          percent: "-"
        },
        siwang: {
          value: 0,
          add: 0,
          percent: "-"
        } // 疫情总览
      }
    };
  },
  components: {
    ControlHeader,
    ControlJieDao,
    ControlView,
    yqzst,
    ytyq,
    gldwz,
    zdfkq
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.com-content {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  //background: url('./img/bgimg.jpg') center center no-repeat;
  //background-size: 100% 100%;
}

.com-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.control-header {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.com-bg {
  width: 100%;
  position: absolute;
  bottom: 0px;
  top: 50px;
  background: url("./img/bgimg.jpg") center center no-repeat;
  background-size: 100% 100%;
}

.com-container_inner {
  position: absolute;
  left: 10px;
  bottom: 10px;
  top: 50px;
  right: 10px;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.control-card {
  width: 33%;
  height: 48%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  box-sizing: border-box;
}

.control-card-title {
  text-align: left;
  font-size: 20px;
  font-weight: bolder;
  color: #07e2e8;
  margin-bottom: 10px;
}

.control-card-title::before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 5px;
  height: 15px;
  background: #07e2e8;
  margin-right: 10px;
}

.control-card-body {
  flex-grow: 1;
  min-height: 0;
}
</style>
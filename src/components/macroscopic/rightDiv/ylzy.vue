<template>
  <div id="ylzyDiv">
    <h3>
      - 各街镇集中隔离点空闲房间数 -
      <a
        v-on:click="popShowFun"
        style="font-size: 14px;color: #fff;cursor: pointer;position: absolute;right: 10px;"
      >查看更多</a>
    </h3>
    <div class="ylzySelect" style="display:none">
      <select name id>
        <option value>鹿城区</option>
        <option value>龙湾区</option>
        <option value>瓯海区</option>
        <option value>乐清市</option>
        <option value>洞头区</option>
        <option value>苍南县</option>
        <option value>龙港市</option>
        <option value>永嘉县</option>
        <option value>文成县</option>
        <option value>平阳县</option>
      </select>
      <select name id>
        <option value>集中隔离点</option>
        <option value>发热门诊机构</option>
      </select>
      <select name id>
        <option value>空闲房间数</option>
        <option value>总房间数</option>
        <!-- <option value>疫苗及其他药物</option> -->
      </select>
    </div>
    <div id="ylzyChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import util from "../util";

export default {
  data() {
    return {
      charts: "",
      phname: [
        "南汇街道-锦江之星",
        "五马街道-锐思特（飞霞路店）",
        "蒲鞋市街道-金丝桥瑞都商旅酒店",
        "双屿街道-瑞都连锁酒店",
        "广化街道-众豪酒店",
        "仰义街道-双屿欣悦宾馆",
        "滨江街道-唯乐创意酒店",
        "南郊街道-聚商连锁酒店",
        "七都街道-老涂酒店"
      ],
      phData: [80, 80, 70, 63, 50, 51, 46, 27, 8],
      phsy: [0, 65, 16, 29, 0, 6, 43, 3, 0]
    };
  },
  methods: {
    mapPh() {
      const chart = this.$echarts.init(document.getElementById("ylzyChart"));
      chart.setOption({
        grid: {
          show: "true",
          borderWidth: "0",
          height: "78%",
          width: "62%",
          x: "40%",
          y: "10%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        legend: {
          show: true,
          icon: "roundRect",
          bottom: "0%",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        xAxis: {
          show: false, //是否显示x轴
          type: "value"
        },
        yAxis: {
          type: "category",
          inverse: true, //让y轴数据逆向
          axisLabel: {
            show: true,
            textStyle: {
              color: "#64c4e4" //y轴字体颜色
            }
          },
          splitLine: { show: false }, //横向的线
          axisTick: { show: false }, //y轴的端点
          axisLine: { show: false }, //y轴的线
          data: this.phname
        },
        series: [
          {
            type: "bar",
            name: "房间总数",
            stack: "2",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff",
                fontSize: 12
              }
            },
            legendHoverLink: false,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#7E47FF"
              },
              emphasis: {
                color: "#7E47FF"
              }
            },
            data: this.phData
          },
          {
            type: "bar",
            name: "使用房间数",
            stack: "2",
            legendHoverLink: false,
            barWidth: 40,
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff",
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: "#FD5916"
              },
              emphasis: {
                color: "#FD5916"
              }
            },
            data: this.phsy
          }
        ]
      });
      chart.on("click", function(params) {
        alert(params.name);//点击事件在这里，这里写方法
      });
    },
    popShowFun() {
      //执行
      util.$emit("popshow");
    }
  },
  mounted() {
    this.mapPh(); //调用地图边上的柱状图
  }
};
</script>

<style>
#fy-rightDiv #ylzyDiv {
  width: 100%;
  height: 30%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #ylzyDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #ylzyDiv #ylzyChart {
  width: 100%;
  height: 83%;
}
#fy-rightDiv .ylzySelect {
  width: 100%;
  height: 35px;
  margin-top: 15px;
}
#fy-rightDiv .ylzySelect select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
</style>
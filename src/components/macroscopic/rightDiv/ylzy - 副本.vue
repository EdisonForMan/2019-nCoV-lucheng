<template>
  <div id="ylzyDiv">
    <h3>- 各街镇集中隔离点空闲房间数 -</h3>
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
export default {
  data() {
    return {
      charts: "",
      phname: [
        "南汇街道-锦江之星",
        "蒲鞋市街道-金丝桥瑞都商旅酒店",
        "广化街道-众豪酒店",
        "仰义街道-双屿欣悦宾馆",
        "双屿街道-瑞都连锁酒店",
        "南郊街道-聚商连锁酒店",
        "七都街道-老涂酒店",
        "滨江街道-唯乐创意酒店",
        "五马街道-锐思特（飞霞路店）"
      ],
      phData: [80, 54, 50, 45, 34, 24, 8, 46, 80],
      phKd: [100, 100, 100, 100, 100, 100, 100, 100, 100]
    };
  },
  methods: {
    mapPh() {
      const chart = this.$echarts.init(document.getElementById("ylzyChart"));
      chart.setOption({
        grid: {
          show: "true",
          borderWidth: "0",
          height: "90%",
          width: "55%",
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
            name: "数据内框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#c62528"
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                color: "#fff",
                fontSize: 12
              }
            },
            barWidth: 15,
            data: this.phData
          },
          {
            name: "外框",
            type: "bar",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: "#05184b" //rgba设置透明度0.14
              }
            },
            barGap: "-100%",
            z: 0,
            barWidth: 15,
            data: this.phKd
          }
        ]
      });
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
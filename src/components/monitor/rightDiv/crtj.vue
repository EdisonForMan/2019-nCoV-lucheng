<template>
  <div id="crtjDiv">
    <div>
      <span class="title">鹿城做地出让统计</span>
      <select id="select" @change="bqSelect($event)">
        <option value="crdk">出让地块</option>
        <option value="crje">出让金额</option>
        <option value="crmj">出让面积</option>
      </select>
    </div>
    <div id="crtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  },
  methods: {
    doChart() {
      const chart = this.$echarts.init(document.getElementById("crtjChart"));
      chart.setOption({
        grid: {
          left: "8%",
          right: "5%",
          top: "14%"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          show: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 15,
            color: "#FFF",
            formatter: function(val) {
              return val.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          data: this.dataAge
            .sort((a, b) => b.value - a.value)
            .map(item => item.name)
        },
        yAxis: {
          type: "value",
          name: "",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "合计确诊",
            type: "bar",
            barWidth: "20px",

            stack: "sum",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff",
                fontSize: 14
              }
            },
            itemStyle: {
              color: "#f41e1e"
            },
            data: this.dataAge
          },
          {
            name: "新增确诊",
            type: "bar",
            stack: "sum",
            barWidth: "20px",
            color: "#f9c401",
            data: this.dataAge.map(item => item.xzdate)
          }
        ],
        label: {
          normal: {
            show: true,
            position: "inside",
            textStyle: {
              color: "#FFF"
            },
            formatter: function(params) {
              return params.value + this.dataAge[params.dataIndex];
            }
          }
        }
      });
    },
    bqSelect: function(event) {
      this.dataAge = this.dataHash[event.target.value];
      this.$echarts.init(document.getElementById("crtjChart")).clear();
      this.doChart();
    }
  },
  created() {
    const {
      dataAge,
      YTdataAge,
      ysblDate,
      jzglDate,
      glryDate,
      mqzDate,
      jjglDate,
      hbhlDate
    } = this.$window.nCov_luchengChart;
    this.dataAge = dataAge;
    this.YTdataAge = YTdataAge;

    this.dataHash = {
      crdk: dataAge,
      crje: ysblDate,
      crmj: jzglDate,
      gld_list: glryDate,
      mj: mqzDate,
      jjgl: jjglDate,
      hbhw: hbhlDate
    };
  },
  mounted() {
    this.doChart();
  }
};
</script>

<style lang="less" scoped>
#crtjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  > div {
    text-align: left;
    height: 15%;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 12px;
      left: 20px;
      font-weight: 500;
      border-left: 5px solid;
      padding-left: 5px;
    }

    select {
      position: relative;
      float: right;
      top: 12px;
      right: 24px;
      padding: 4px 9px;
      background-color: #1b45a7;
      border: 1px solid #61ebff;
      color: #fff;
    }
  }

  #crtjChart {
    width: 100%;
    height: 85%;
  }
}
</style>
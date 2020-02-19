<template>
  <div id="crtjDiv">
    <h3 id="selectDiv">
      - 鹿城坐地出让统计 -
      <select id="select" @change="bqSelect($event)">
        <option value="crdk">出让地块</option>
        <option value="crje">出让金额</option>
        <option value="crmj">出让面积</option>
      </select>
    </h3>
    <div id="crtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import util from "../util";
export default {
  data() {
    return {
      dataTime: " "
    };
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
      qzbl: dataAge,
      zzbl: ysblDate,
      gld: jzglDate,
      gld_list: glryDate,
      mj: mqzDate,
      jjgl: jjglDate,
      hbhw: hbhlDate
    };
  },
  mounted() {
    this.doChart();
    //修改数值
    const that = this;
    util.$on("chartDataMod", function(newV) {
      newV == 1
        ? (that.dataAge = that.YTdataAge)
        : (that.dataAge = that.dataAge);

      document.getElementById("select").value = "qzbl";
      that.$echarts.init(document.getElementById("crtjChart")).clear();
      that.doChart();
    });
  }
};
</script>

<style lang="less" scoped>
#crtjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  h3 {
    color: #23c9f3;
    margin-top: 10px;

    select {
      background-color: #0c7cd2;
      border: none;
      color: #fff;
      padding: 7px 7px;
      margin-left: 5px;
    }
  }

  #crtjChart {
    width: 100%;
    height: 85%;
  }
}
</style>
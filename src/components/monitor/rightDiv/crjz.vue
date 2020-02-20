<template>
  <div id="crjzDiv">
    <div>
      <span class="title">月度出让价值</span>
    </div>
    <div id="crjzChart"></div>
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
      const chart = this.$echarts.init(document.getElementById("crjzChart"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "6%",
          top: "16%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.timeList,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          axisTick: false,
          axisLine: {
            lineStyle: {
              color: "#9fdbfd",
              width: 2
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            onZero: false,
            lineStyle: {
              width: 2,
              color: "#9fdbfd"
            }
          },
          axisTick: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#17035a"
            }
          }
        },
        series: [
          {
            name: "出让价值",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(254,77,105)",
                lineStyle: {
                  width: 2,
                  type: "solid",
                  color: "rgb(254,77,105)"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            data: this.dataList
          }
        ]
      });
    }
  },
  created() {
    this.timeList = [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ];

    this.dataList = [3, 2, 3, 8, 1, 2, 3, 4, 5, 6, 4, 2];
  },
  mounted() {
    this.doChart();
  }
};
</script>

<style lang="less" scoped>
#crjzDiv {
  width: 100%;
  height: 30%;
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
  }

  #crjzChart {
    width: 100%;
    height: 85%;
  }
}
</style>
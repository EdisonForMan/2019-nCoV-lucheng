<template>
  <div id="tdytDiv">
    <h3>- 计划出让土地用途 -</h3>
    <div id="tdytChart"></div>
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
      const chart = this.$echarts.init(document.getElementById("tdytChart"));
      chart.setOption({
        grid: {
          top: "14%"
        },
        legend: {
          orient: "vertical",
          right: "5%",
          align: "left",
          top: "middle",
          itemHeight: 15,
          textStyle: {
            fontSize: 15,
            padding: [0, 0, 0, 5]
          },
          data: this.dataList
        },
        series: [
          {
            type: "pie",
            minAngle: 2,
            radius: ["40%", "70%"],
            center: ["40%", "50%"],
            clockwise: false,
            label: {
              normal: {
                show: true,
                position: "outter",
                formatter: function(params) {
                  console.log(params);
                  return `${params.data.name} ${params.percent}%`;
                },
                textStyle: {
                  fontSize: 15
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 20
              }
            },
            data: this.dataList
          }
        ]
      });
    }
  },
  created() {
    this.dataList = [
      {
        value: 15,
        name: "住宅",
        itemStyle: { color: "#f7dc2b" },
        textStyle: { color: "#f7dc2b" }
      },
      {
        value: 10,
        name: "商服",
        itemStyle: { color: "#f67b28" },
        textStyle: { color: "#f67b28" }
      },
      {
        value: 45,
        name: "商办",
        itemStyle: { color: "#2ed8cb" },
        textStyle: { color: "#2ed8cb" }
      },
      {
        value: 30,
        name: "医疗",
        itemStyle: { color: "#31b2f6" },
        textStyle: { color: "#31b2f6" }
      }
    ];
  },
  mounted() {
    this.doChart();
  }
};
</script>

<style lang="less" scoped>
#tdytDiv {
  width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  h3 {
    color: #23c9f3;
    margin-top: 10px;
  }

  #tdytChart {
    width: 100%;
    height: 85%;
  }
}
</style>
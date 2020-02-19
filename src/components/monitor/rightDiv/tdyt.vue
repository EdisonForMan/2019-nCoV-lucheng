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
    return {
      dataTime: " "
    };
  },
  methods: {
    doChart() {
      const chart = this.$echarts.init(document.getElementById("tdytChart"));
      chart.setOption({
        grid: {
          top: "14%"
        },
        series: [
          {
            type: "pie",
            minAngle: 2,
            radius: ["40%", "70%"],
            center: ["50%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                borderColor: "#fff"
                // borderWidth: 6
              }
            },
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{text|{b}}\n{c} ({d}%)",
                rich: {
                  text: {
                    color: "#666",
                    fontSize: 14,
                    align: "center",
                    verticalAlign: "middle",
                    padding: 8
                  },
                  value: {
                    color: "#8693F3",
                    fontSize: 24,
                    align: "center",
                    verticalAlign: "middle"
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 24
                }
              }
            },
            data: this.dataAge
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
      this.$echarts.init(document.getElementById("tdytChart")).clear();
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
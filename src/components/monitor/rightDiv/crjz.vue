<template>
  <div id="crjzDiv">
    <div>
      <span class="title">做地完成时限统计</span>
    </div>
    <div id="crjzChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    ...mapActions(["fetchdkxxList"]),
    fixdkxxList() {
      !this.dkxxList.length && this.fetchdkxxList();

      const timeHash = {
        "2019-10-01": { name: "2019年10月", value: 0 },
        "2019-11-01": { name: "2019年11月", value: 0 },
        "2019-12-01": { name: "2019年12月", value: 0 },
        "2020-01-01": { name: "2020年1月", value: 0 },
        "2020-02-01": { name: "2020年2月", value: 0 },
        "2020-03-01": { name: "2020年3月", value: 0 },
        "2020-04-01": { name: "2020年4月", value: 0 },
        "2020-05-01": { name: "2020年5月", value: 0 },
        "2020-06-01": { name: "2020年6月", value: 0 },
        "2020-07-01": { name: "2020年7月", value: 0 },
        "2020-08-01": { name: "2020年8月", value: 0 },
        "2020-09-01": { name: "2020年9月", value: 0 }
      };

      const zdsxObj = JSON.parse(JSON.stringify(timeHash));

      const zdsxData = [];

      this.dkxxList.map(({ ZDWCSX }) => {
        ZDWCSX != "0" && zdsxObj[ZDWCSX].value++;
      });

      for (let k in zdsxObj) {
        zdsxData.push(zdsxObj[k]);
      }

      this.dataList = zdsxData;

      this.doChart();
    },
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
          data: this.dataList.map(item => item.name),
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
            name: "完成数",
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
    /* this.dataList = [
      { name: "3月", value: 0 },
      { name: "4月", value: 0 },
      { name: "5月", value: 0 },
      { name: "6月", value: 0 },
      { name: "7月", value: 0 },
      { name: "8月", value: 0 },
      { name: "9月", value: 0 },
      { name: "10月", value: 0 },
      { name: "11月", value: 0 },
      { name: "12月", value: 4 },
      { name: "1月", value: 0 },
      { name: "2月", value: 0 }
    ]; */
  },
  mounted() {
    !this.dkxxList.length && this.fetchdkxxList();
    this.fixdkxxList();
  },
  watch: {
    dkxxList(n) {
      this.fixdkxxList();
    }
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
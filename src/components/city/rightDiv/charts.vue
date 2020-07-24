<template>
  <div class="charts">
    <div class="rDiv1">
      <span class="title">街道选择</span>
      <div>
        <Border>
          <TopSelect ref="TopSelect" />
        </Border>
      </div>
    </div>

    <div class="rDiv2">
      <span class="title">考察场所明细表</span>
      <div>
        <Border>
          <div class="table-out">
            <table border="1" cellspacing="0" cellpadding="0">
              <tr v-for="k in Math.ceil(tbData2.length / 5)" :key="k">
                <td
                  v-for="(item, index) in tbData2.slice((k - 1) * 5, (k - 1) * 5 + 5)"
                  :key="index"
                >
                  <div class="cell" :class="{ active: ~activeList.indexOf(item.name) }">
                    <span>{{ item.name }}</span>
                    <span>{{ item.value }}</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </Border>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">各个街道红白旗占比</span>
      <div>
        <Border>
          <div class="chart-out">
            <div id="chart1"></div>
          </div>
        </Border>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import TopSelect from "../widget/topSelect";

import { TypeHash } from "../config/hash";

import Border from "@/components/common/widget/border";

import { mapState, mapActions } from "vuex";

import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
export default {
  data() {
    return {
      chart1: null,
      chart2: null,
      chartData1: [],
      chartData2: [],
      tbData1: [],
      activeList: [],
      tbData2: [],
      tmpMap: {},
    };
  },
  components: { TopSelect, Border },
  computed: {
    ...mapState({
      lcwmxxList: (state) => state.lcwmxxList,
    }),
  },
  async mounted() {
    await this.fetchlcwmxxList();
    await this.fixChartData();
    await this.initChart();
    await this.initTable();
  },
  methods: {
    ...mapActions(["fetchlcwmxxList"]),

    // 初始化图表
    initChart() {
      const that = this;
      return new Promise((resolve, reject) => {
        this.chart1 = this.$echarts.init(document.getElementById("chart1"));
        this.chart1.setOption({
          backgroundColor: "#2248ab",
          grid: {
            left: "3%",
            right: "10%",
            top: "-4%",
            bottom: "0%",
            containLabel: true,
          },
          legend: {
            show: false,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            formatter: "{b} : {c}",
          },
          xAxis: {
            type: "value",
            show: false,
            position: "top",
          },
          yAxis: [
            {
              type: "category",
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              inverse: "true",
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#fff",
                },
              },
              axisLabel: {
                fontSize: 16,
              },
              data: that.chartData1.map((item) => {
                return item.name;
              }),
            },
          ],
          series: [
            {
              type: "bar",
              barWidth: 17,
              itemStyle: {
                barBorderRadius: 70,
                color: "#fc1a1b",
              },
              data: that.chartData1.map((item) => {
                return item.redNum;
              }),
            },
            {
              name: "底色",
              type: "bar",
              barGap: "-100%",
              barWidth: 17,
              label: {
                show: true,
                position: "right",
              },
              itemStyle: {
                normal: {
                  color: "#fff",
                  barBorderRadius: 70,
                },
              },
              z: 0,
              data: that.chartData1.map((item) => {
                return item.taskNum;
              }),
            },
          ],
        });

        resolve(true);
      });
    },

    // 初始化表格
    initTable() {
      return new Promise((resolve, reject) => {
        const ds = this.lcwmxxList;

        const sObj = {};
        const sArr = [];

        ds.map(({ TAG }) => {
          if (!sObj[TAG]) sObj[TAG] = 0;
          sObj[TAG]++;
        });

        this.tbData2 = [];

        for (let k in TypeHash) {
          this.tbData2.push({
            name: k,
            value: ~~sObj[TypeHash[k]],
          });
        }

        this.tmp = [...this.tbData2];

        resolve(true);
      });
    },

    // 组装图表数据
    fixChartData() {
      return new Promise((resolve, reject) => {
        const list = this.lcwmxxList;

        const sObj = {};
        const sArr = [];

        list.map(({ District, FLAG }) => {
          if (!sObj[District]) sObj[District] = { redNum: 0, taskNum: 0 };
          if (FLAG == 1) sObj[District].redNum++;
          sObj[District].taskNum++;
        });

        for (let k in sObj) {
          this.chartData1.push({
            name: k,
            redNum: sObj[k].redNum,
            taskNum: sObj[k].taskNum,
          });
        }

        this.chartData1
          .sort((a, b) => {
            return b.taskNum - a.taskNum;
          })
          .sort((a, b) => {
            return b.redNum / b.taskNum - a.redNum / a.taskNum;
          });

        this.chartData2 = [...this.chartData1];

        resolve(true);
      });
    },

    // 更新表格
    updateTbale(country) {
      if (country == "") {
        this.tbData2 = this.tmp;
        return;
      } else if (this.tmpMap[country]) {
        this.tbData2 = this.tmpMap[country];
        return;
      } else {
        return new Promise((resolve, reject) => {
          const ds = this.lcwmxxList;

          const sObj = {};
          const sArr = [];

          ds.map(({ TAG }) => {
            if (!sObj[TAG]) sObj[TAG] = 0;
            sObj[TAG]++;
          });

          this.tbData2 = [];

          for (let k in TypeHash) {
            this.tbData2.push({
              name: k,
              value: ~~sObj[TypeHash[k]],
            });
          }

          this.tmpMap[country] = this.tbData2;

          resolve(true);
        });
      }
    },

    // 更新图表
    updateChart(tags) {
      if (tags.length == 0) {
        this.chartData1 = this.chartData2;
        return;
      }
      const that = this;
      return new Promise((resolve, reject) => {
        const list = this.lcwmxxList;

        const sObj = {};
        const sArr = [];

        list.map(({ District, FLAG, TAG }) => {
          if (!sObj[District]) sObj[District] = { redNum: 0, taskNum: 0 };
          if (~tags.indexOf(TAG)) {
            if (FLAG == 1) sObj[District].redNum++;
            sObj[District].taskNum++;
          }
        });

        this.chartData1 = [];

        for (let k in sObj) {
          this.chartData1.push({
            name: k,
            redNum: sObj[k].redNum,
            taskNum: sObj[k].taskNum,
          });
        }

        this.chartData1
          .sort((a, b) => {
            return b.taskNum - a.taskNum;
          })
          .sort((a, b) => {
            return b.redNum / b.taskNum - a.redNum / a.taskNum;
          });

        this.chart1.setOption({
          series: [
            {
              data: that.chartData1.map((item) => {
                return item.redNum;
              }),
            },
            {
              data: that.chartData1.map((item) => {
                return item.taskNum;
              }),
            },
          ],
        });

        resolve(true);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: inherit;
  text-align: left;

  .title {
    display: inline-block;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #ffe048;
    // border-left: 4px solid #ffe048;
    margin: 13px 15px 10px;
    padding-left: 7px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -2px;
      transform: translate(0, -50%);
      margin-right: 15px;
      height: 13px;
      width: 3px;
      background-color: #ffe048;
    }
  }

  .rDiv1 {
    > div {
      padding: 0 15px;
    }
  }

  .rDiv2 {
    > div {
      padding: 0 15px;
    }

    .table-out {
      background-color: #0d3b99;
      padding: 1px;
      height: 300px;
      overflow-x: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: block;
        width: 10px;
        background-color: transparent;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        width: 7px;
        background-color: #fff;
        border-radius: 7px;
      }
    }

    table {
      width: 100%;
      margin: auto;
      border: 1px solid #95bbf1;
      td {
        width: 20%;
      }

      .cell {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        // border: 1px solid #fff;
        height: 68px;
        cursor: pointer;

        span:first-child {
          display: block;
          font-size: 12px;
          color: #84e2e8;
          padding: 2px 3px 0;
        }
        span:last-child {
          display: block;
          font-size: 18px;
          font-weight: bolder;
          text-align: center;
        }
      }

      .active {
        background: linear-gradient(
          0deg,
          rgba(249, 120, 34, 1),
          rgba(241, 199, 99, 1)
        );
        border: 1px solid rgba(255, 241, 0, 1);
        box-shadow: 0px 2px 2px 0px rgba(54, 98, 193, 0.4),
          0px 1px 1px 0px rgba(155, 234, 246, 0.8),
          0px -1px 0px 0px rgba(29, 74, 166, 0.5);
        box-sizing: border-box;

        span:first-child {
          // display: block;
          // font-size: 12px;
          color: #fff;
          font-weight: bold;
          // padding: 2px 3px 0;
        }
        // span:last-child {
        //   display: block;
        //   font-size: 18px;
        //   text-align: center;
        // }
      }

      .cell:first-child {
        // background-color: orange;
      }
    }
  }

  .rDiv3 {
    > div {
      padding: 0 15px;
    }

    .chart-out {
      height: 260px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 7px;

      #chart1 {
        height: 450px;
      }
    }

    .chart-out::-webkit-scrollbar {
      display: block;
      width: 10px;
      background-color: transparent;
      border-radius: 10px;
    }

    .chart-out::-webkit-scrollbar-thumb {
      width: 7px;
      background-color: #19409e;
      border-radius: 7px;
    }
  }
}
</style>
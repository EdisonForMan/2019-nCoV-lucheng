<template>
  <div class="charts">
    <div class="rDiv1">
      <span class="title">街道选择</span>
      <topSelect ref="topSelect" />
    </div>

    <div class="rDiv2">
      <span class="title">红白旗占比</span>
      <div id="chart1"></div>
    </div>

    <div class="rDiv3">
      <span class="title">考察场所明细表</span>
      <div>
        <table>
          <tr v-for="k in tbData1.length / 4" :key="k">
            <td v-for="(item,index) in tbData1.slice((k - 1) * 4, (k - 1) * 4 + 4)" :key="index">
              <div class="cell">
                <span>{{ item.name }}</span>
                <span>{{ item.value }}</span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="rDiv4">
      <span class="title">各个街道红白旗占比</span>
      <div class="chartout">
        <div id="chart2"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import topSelect from "../widget/topSelect";

import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
export default {
  data() {
    return {
      chart1: null,
      chart2: null,
      chartData1: [
        {
          name: "红旗",
          value: 31,
          itemStyle: {
            color: "#fc1a1b"
          }
        },
        {
          name: "白旗",
          value: 0,
          itemStyle: {
            color: "#fff"
          }
        }
      ],
      chartData2: [
        {
          name: "南郊街道",
          value: 100
        },
        {
          name: "南汇街道",
          value: 50
        },
        {
          name: "五马街道",
          value: 43
        },
        {
          name: "松台街道",
          value: 50
        },
        {
          name: "山福镇",
          value: 50
        },
        {
          name: "藤桥镇",
          value: 66
        },
        {
          name: "仰义街道",
          value: 50
        },
        {
          name: "丰门街道",
          value: 77
        },
        {
          name: "双屿街道",
          value: 50
        },
        {
          name: "广化街道",
          value: 88
        },
        {
          name: "松台街道",
          value: 87
        },
        {
          name: "大南街道",
          value: 50
        },
        {
          name: "蒲鞋市街道",
          value: 50
        },
        {
          name: "滨江街道",
          value: 50
        },
        {
          name: "七都街道",
          value: 50
        }
      ],
      tbData1: [
        {
          name: "街道办事处",
          value: 10
        },
        {
          name: "街道综合文化站",
          value: 11
        },
        {
          name: "社区",
          value: 7
        },
        {
          name: "社区综合文化服务中心",
          value: 41
        },
        {
          name: "主干道",
          value: 15
        },
        {
          name: "次干道",
          value: 22
        },
        {
          name: "幼儿园",
          value: 151
        },
        {
          name: "中学",
          value: 43
        },
        {
          name: "长途汽车客运站（码头）",
          value: 31
        },
        {
          name: "政务大厅（行政服务中心）",
          value: 6
        },
        {
          name: "农贸（集贸）市场",
          value: 44
        },
        {
          name: "银行网点",
          value: 399
        },
        {
          name: "医院",
          value: 50
        },
        {
          name: "主要交通路口",
          value: 45
        },
        {
          name: "电影院",
          value: 1
        },
        {
          name: "建筑工地",
          value: 171
        }
      ]
    };
  },
  components: { topSelect },
  created() {},
  mounted() {
    this.chartInit();
  },
  methods: {
    chartInit() {
      const that = this;

      that.chart1 = this.$echarts.init(document.getElementById("chart1"));

      that.chart1.setOption({
        grid: {
          left: "3%",
          right: "3%",
          top: "16%",
          bottom: "3%",
          containLabel: true
        },
        /* legend: {
          icon: "rect",
          orient: "vertical",
          left: "10%",
          top: "10%",
          align: "left",
          textStyle: {
            color: "#fff"
          }
        }, */
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "80%"],
            startAngle: 60,
            itemStyle: {
              normal: {
                borderColor: "#3c60a5",
                borderWidth: 2
              }
            },
            label: {
              fontSize: 14,
              position: "inside",
              formatter: "{d}%"
            },
            data: that.chartData1
          },
          {
            type: "pie",
            radius: ["50%", "80%"],
            startAngle: 60,
            /* itemStyle: {
              normal: {
                borderColor: "#3c60a5",
                borderWidth: 2
              }
            }, */
            label: {
              fontSize: 14,
              formatter: "{b} {c}个",
              // backgroundColor: "#0e3b9a"
            },
            data: that.chartData1
          }
        ]
      });

      that.chart2 = this.$echarts.init(document.getElementById("chart2"));

      that.chart2.setOption({
        grid: {
          left: "5%",
          right: "15%",
          top: "-4%",
          bottom: "0%",
          containLabel: true
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b} : {c}%"
        },
        xAxis: {
          type: "value",
          show: false,
          position: "top"
          // axisTick: {
          //   show: false
          // },
          // axisLine: {
          //   show: false,
          //   lineStyle: {
          //     color: "#fff"
          //   }
          // },
          // splitLine: {
          //   show: false
          // }
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            inverse: "true", //排序
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              fontSize: 16
            },
            data: that.chartData2.map(item => {
              return item.name;
            })
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 17,
            label: {
              show: true,
              //   fontSize: 14,
              position: "insideRight"
            },
            itemStyle: {
              barBorderRadius: 70,
              color: "#fc1a1b"
            },
            data: that.chartData2
          },
          {
            name: "底色",
            type: "bar",
            barGap: "-100%",
            data: [
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100
            ],
            barWidth: 17,
            label: {
              show: true,
              position: "right"
            },
            itemStyle: {
              normal: {
                color: "#fff",
                barBorderRadius: 70
              }
            },
            z: 0
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.charts {
  width: 100%;
  height: inherit;
  text-align: left;

  .title {
    display: inline-block;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #fff;
    border-left: 5px solid #f4cf67;
    margin: 17px 15px 10px;
    padding-left: 5px;
  }

  .rDiv2 {
    // height: 253px;
    #chart1 {
      height: 160px;
    }
  }

  .rDiv3 {
    table {
      width: 85%;
      margin: auto;
      td {
        width: 25%;
      }

      .cell {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        border: 1px solid #fff;
        height: 55px;

        span:first-child {
          display: block;
          font-size: 12px;
          color: #84e2e8;
          padding: 2px 3px 0;
        }
        span:last-child {
          display: block;
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }

  .rDiv4 {
    .chartout {
      height: 200px;
      overflow-x: hidden;
      overflow-y: auto;

      #chart2 {
        height: 450px;
      }
    }

    .chartout::-webkit-scrollbar {
      display: block;
      width: 10px;
      background-color: #1a3561;
      border-radius: 10px;
    }

    .chartout::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: #45cdff;
      border-radius: 10px;
    }
  }
}
</style>
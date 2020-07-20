<template>
  <div class="charts">
    <div class="rDiv1">
      <span class="title">街道选择</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>
        <topSelect ref="topSelect" />
      </div>
    </div>

    <div class="rDiv2">
      <span class="title">红白旗占比</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>
        <div id="chart1"></div>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">考察场所明细表</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>
        <div class="table-out">
          <table border="1" cellspacing="0" cellpadding="0">
            <tr v-for="k in tbData1.length / 4" :key="k">
              <td v-for="(item,index) in tbData1.slice((k - 1) * 4, (k - 1) * 4 + 4)" :key="index">
                <div
                  class="cell"
                  :class="{ active: ~activeList.indexOf(item.name) }"
                  @click="checkType(item)"
                >
                  <span>{{ item.name }}</span>
                  <span>{{ item.value }}</span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="rDiv4">
      <span class="title">各个街道红白旗占比</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>
        <div class="chart-out">
          <div id="chart2"></div>
        </div>
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
      ],
      activeList: []
    };
  },
  components: { topSelect },
  created() {},
  mounted() {
    this.chartInit();
  },
  methods: {
    // 初始化图表
    chartInit() {
      const that = this;

      that.chart1 = this.$echarts.init(document.getElementById("chart1"));

      that.chart1.setOption({
        backgroundColor: "#2249ab",
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
            // center: ["30%", "50%"],
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
            // center: ["30%", "50%"],
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
              color: "#fff"
              // backgroundColor: "#0e3b9a"
            },
            data: that.chartData1
          }
        ]
      });

      that.chart2 = this.$echarts.init(document.getElementById("chart2"));

      that.chart2.setOption({
        backgroundColor: "#2248ab",
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
    },

    // 选择类型
    checkType(item) {
      if (~this.activeList.indexOf(item.name)) {
        const index = this.activeList.indexOf(item.name);
        this.activeList.splice(index, 1);
      } else {
        this.activeList.push(item.name);
      }
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
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #fff;
    border-left: 4px solid #fff;
    margin: 13px 15px 10px;
    padding-left: 7px;
  }

  /* .chart-bg {
    margin: 0 15px;
    padding: 10px;

    background: linear-gradient(to left, #fff, #fff) left top no-repeat,
      linear-gradient(to bottom, #fff, #fff) left top no-repeat,
      linear-gradient(to left, #fff, #fff) right top no-repeat,
      linear-gradient(to bottom, #fff, #fff) right top no-repeat,
      linear-gradient(to left, #fff, #fff) left bottom no-repeat,
      linear-gradient(to bottom, #fff, #fff) left bottom no-repeat,
      linear-gradient(to left, #fff, #fff) right bottom no-repeat,
      linear-gradient(to left, #fff, #fff) right bottom no-repeat;
    background-size: 0.2rem 0.65rem, 0.65rem 0.2rem, 0.2rem 0.65rem,
      0.65rem 0.2rem;
  } */

  .chart-bg {
    position: relative;
    margin: 0 15px;
    padding: 10px;
    border: 1px solid #2249ab;

    > span {
      position: absolute;
      padding: 5px;
      border-style: solid;
      border-color: #fff;
    }

    .row1 {
      border-width: 0.2rem 0 0 0.2rem;
      top: -0.2rem;
      left: -0.2rem;
    }

    .row2 {
      border-width: 0.2rem 0.2rem 0 0;
      top: -0.2rem;
      right: -0.2rem;
    }

    .col1 {
      border-width: 0 0 0.2rem 0.2rem;
      bottom: -0.2rem;
      left: -0.2rem;
    }

    .col2 {
      border-width: 0 0.2rem 0.2rem 0;
      bottom: -0.2rem;
      right: -0.2rem;
    }
  }

  .rDiv1 {
    .chart-bg1 {
      position: relative;
      margin: 0 15px;
      padding: 10px;
      border: 1px solid #2249ab;

      span {
        position: absolute;
        padding: 5px;
        border-style: solid;
        border-color: #fff;
      }

      .row1 {
        border-width: 0.2rem 0 0 0.2rem;
        top: -0.2rem;
        left: -0.2rem;
      }

      .row2 {
        border-width: 0.2rem 0.2rem 0 0;
        top: -0.2rem;
        right: -0.2rem;
      }

      .col1 {
        border-width: 0 0 0.2rem 0.2rem;
        bottom: -0.2rem;
        left: -0.2rem;
      }

      .col2 {
        border-width: 0 0.2rem 0.2rem 0;
        bottom: -0.2rem;
        right: -0.2rem;
      }
    }

    /* .chart-bg {
      margin: 0 15px;
      padding: 10px;

      background-image: url("~@/components/common/image/box_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    } */
  }

  .rDiv2 {
    // height: 253px;

    #chart1 {
      height: 160px;
      border-radius: 50%;
    }
  }

  .rDiv3 {
    .table-out {
      background-color: #0d3b99;
      padding: 1px;
    }

    table {
      width: 100%;
      margin: auto;
      border: 1px solid #95bbf1;
      td {
        width: 25%;
      }

      .cell {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        // border: 1px solid #fff;
        height: 58px;
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

  .rDiv4 {
    .chart-out {
      height: 120px;
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 7px;

      #chart2 {
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
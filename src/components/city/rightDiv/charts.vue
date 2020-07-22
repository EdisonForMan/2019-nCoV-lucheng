<template>
  <div class="charts">
    <div class="rDiv1">
      <span class="title">街道选择</span>
      <Border>
        <TopSelect ref="TopSelect" />
      </Border>
    </div>

    <!-- <div class="rDiv2">
      <span class="title">红白旗占比</span>
      <Border>
        <div id="chart1"></div>
      </Border>
    </div> -->

    <div class="rDiv3">
      <span class="title">考察场所明细表</span>
      <Border>
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
      </Border>
    </div>

    <div class="rDiv4">
      <span class="title">各个街道红白旗占比</span>
      <Border>
        <div class="chart-out">
          <div id="chart2"></div>
        </div>
      </Border>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import TopSelect from "../widget/topSelect";

import Border from "@/components/common/widget/border";

import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
export default {
  data() {
    return {
      chart1: null,
      chart2: null,
      chartData1: [],
      chartData2: [
        {
          name: "南郊街道",
          value: 100
        },
        {
          name: "南汇街道",
          value: 0
        },
        {
          name: "五马街道",
          value: 0
        },
        {
          name: "松台街道",
          value: 0
        },
        {
          name: "山福镇",
          value: 0
        },
        {
          name: "藤桥镇",
          value: 0
        },
        {
          name: "仰义街道",
          value: 0
        },
        {
          name: "丰门街道",
          value: 0
        },
        {
          name: "双屿街道",
          value: 0
        },
        {
          name: "广化街道",
          value: 0
        },
        {
          name: "松台街道",
          value: 0
        },
        {
          name: "大南街道",
          value: 0
        },
        {
          name: "蒲鞋市街道",
          value: 0
        },
        {
          name: "滨江街道",
          value: 0
        },
        {
          name: "七都街道",
          value: 0
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
          name: "长途汽车客运站(码头)",
          value: 31
        },
        {
          name: "政务大厅(行政服务中心)",
          value: 6
        },
        {
          name: "农贸(集贸)市场",
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
  components: { TopSelect, Border },
  // async created() {
  //   await this.countItems();
  // },
  mounted() {
    /* this.chartData1 = [
      {
        name: "红旗",
        value: 31,
        itemStyle: {
          color: "#fc1a1b"
        }
      },
      {
        name: "白旗",
        value: 1925,
        itemStyle: {
          color: "#fff"
        }
      }
    ]; */
    this.chartInit();
  },
  methods: {
    countItems() {
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
        OPTION
      ).then(([QueryTask, Query, Graphic]) => {
        const queryTask = new QueryTask({
          url:
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/0"
        });
        const query = new Query();
        query.outFields = ["*"];
        query.where = `1 = 1`;
        queryTask.execute(query).then(res => {
          if (res.features.length) {
            this.taskSum = res.features.length;

            const ds = res.features;

            let redNum = 0;
            let whiteNum = 0;

            ds.map(({ attributes }) => {
              if (attributes.FLAG == 1) redNum++;
              else whiteNum++;
            });

            this.redNum = redNum;
            this.whiteNum = whiteNum;
          }
        });
      });
    },

    // 初始化图表
    chartInit() {
      const that = this;

      // console.log(this.chartData1);

      // that.chart1 = this.$echarts.init(document.getElementById("chart1"));

      // that.chart1.setOption({
      //   backgroundColor: "#2249ab",
      //   grid: {
      //     left: "3%",
      //     right: "3%",
      //     top: "16%",
      //     bottom: "3%",
      //     containLabel: true
      //   },
      //   /* legend: {
      //     icon: "rect",
      //     orient: "vertical",
      //     left: "10%",
      //     top: "10%",
      //     align: "left",
      //     textStyle: {
      //       color: "#fff"
      //     }
      //   }, */
      //   tooltip: {
      //     show: false,
      //     trigger: "item",
      //     formatter: "{b} : {c} ({d}%)"
      //   },
      //   series: [
      //     /* {
      //       type: "pie",
      //       zlevel: 1,
      //       silent: true,
      //       radius: ["86%", "87%"],
      //       center: ["50%", "50%"],
      //       hoverAnimation: false,
      //       color: "#7eb3fb",
      //       label: {
      //         normal: {
      //           show: false
      //         }
      //       },
      //       labelLine: {
      //         normal: {
      //           show: false
      //         }
      //       },
      //       data: [
      //         {
      //           value: 1,
      //           itemStyle: {
      //             normal: {
      //               color: "#99c3fc"
      //             }
      //           }
      //         }
      //       ]
      //     }, */
      //     {
      //       type: "pie",
      //       radius: ["50%", "80%"],
      //       // center: ["30%", "50%"],
      //       startAngle: 30,
      //       itemStyle: {
      //         normal: {
      //           borderColor: "#3c60a5",
      //           borderWidth: 2
      //         }
      //       },
      //       label: {
      //         show: false,
      //         fontSize: 14,
      //         position: "inside",
      //         formatter: "{d}%"
      //       },
      //       data: that.chartData1
      //     },
      //     {
      //       type: "pie",
      //       radius: ["50%", "80%"],
      //       // center: ["30%", "50%"],
      //       startAngle: 30,
      //       /* itemStyle: {
      //         normal: {
      //           borderColor: "#3c60a5",
      //           borderWidth: 2
      //         }
      //       }, */
      //       label: {
      //         fontSize: 14,
      //         formatter: "{b} {c}个\n{d}%",
      //         color: "#fff"
      //         // backgroundColor: "#0e3b9a"
      //       },
      //       data: that.chartData1
      //     }
      //   ]
      // });

      that.chart2 = this.$echarts.init(document.getElementById("chart2"));

      that.chart2.setOption({
        backgroundColor: "#2248ab",
        grid: {
          left: "3%",
          right: "10%",
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
              show: false,
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
              show: false,
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
    },

    // 更新表格
    updateTbale(country){
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
        OPTION
      ).then(([QueryTask, Query, Graphic]) => {
        const queryTask = new QueryTask({
          url:
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/0"
        });
        const query = new Query();
        query.outFields = ["*"];
        query.where = `District = '${country}'`;
        queryTask.execute(query).then(res => {
          if (res.features.length) {
            const ds = res.features;

            let redNum = 0;
            let whiteNum = 0;

            ds.map(({ attributes }) => {
              if (attributes.FLAG == 1) redNum++;
              else whiteNum++;
            });

            this.redNum = redNum;
            this.whiteNum = whiteNum;
          }
        });
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
        height: 60px;
        cursor: pointer;

        span:first-child {
          display: block;
          font-size: 12px;
          color: #84e2e8;
          padding: 2px 3px 0;
        }
        span:last-child {
          display: block;
          font-size: 20px;
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

  .rDiv4 {
    .chart-out {
      height: 220px;
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
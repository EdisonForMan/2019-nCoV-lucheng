<template>
  <div class="lxtjDiv">
    <span class="title">红白旗排行</span>
    <div class="outside">
      <div id="lxtjChart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
export default {
  data() {
    return {
      chart: null,
      tbData: [
        "全区",
        "南郊街道",
        "南汇街道",
        "五马街道",
        "山福镇",
        "藤桥镇",
        "仰义街道",
        "丰门街道",
        "双屿街道",
        "广化街道",
        "松台街道",
        "大南街道",
        "蒲鞋市街道",
        "滨江街道",
        "七都街道"
      ],
      countryIndex: "南郊街道"
    };
  },
  mounted() {
    this.data = [
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
    ];

    this.data.sort((a, b) => {
      return b.value - a.value;
    });

    this.doChart();
  },
  methods: {
    doChart() {
      const that = this;
      that.chart = this.$echarts.init(document.getElementById("lxtjChart"));
      that.chart.setOption({
        grid: {
          left: "5%",
          right: "5%",
          top: "0%",
          bottom: "5%",
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
            data: this.data.map(item => {
              return item.name;
            })
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 17,
            label: {
              fontSize: 14,
              formatter: "{b} {d}%"
            },
            itemStyle: {
              barBorderRadius: 70,
              color: "#fc1a1b"
            },
            data: that.data
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
.lxtjDiv {
  width: 100%;
  height: 65%;
  // border: 1px solid #035acd;
  text-align: left;

  .tb {
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #fff;
    margin: 17px 10px 10px;
    table {
      width: 100%;

      td {
        text-align: center;
        border-right: 1px solid #fff;
        cursor: pointer;
      }

      td:first-child {
        border-left: 1px solid #fff;
      }

      .active {
        color: #3bc8d2;
        text-decoration: underline;
      }
    }
  }

  .title {
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #fff;
    border-left: 5px solid #f4cf67;
    margin: 17px 10px 10px;
    padding-left: 5px;
  }

  .outside {
    height: calc(100% - 53px);
    overflow-y: auto;

    #lxtjChart {
      width: 100%;
      height: 480px;
    }
  }

  .outside::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: #1a3561;
    border-radius: 10px;
  }

  .outside::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #45cdff;
    border-radius: 10px;
  }
}
</style>
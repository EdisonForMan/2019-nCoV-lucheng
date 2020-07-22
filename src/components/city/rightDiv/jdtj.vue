<template>
  <div class="jdtjDiv">
    <!-- <div class="tb">
      <table>
        <tr v-for="k in parseInt(tbData.length / 4) + 1" :key="k">
          <td
            :class="{ active: countryIndex == item }"
            v-for="(item, index) in tbData.slice((k - 1) * 4, (k - 1) * 4 + 4)"
            :key="index"
            @click="()=>{ countryIndex = item }"
          >{{ item }}</td>
        </tr>
      </table>
    </div>-->
    <span class="title">红白旗占比</span>
    <div id="tjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/markLine";
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
    ];

    this.doChart();
  },
  methods: {
    doChart() {
      const that = this;
      that.chart = this.$echarts.init(document.getElementById("tjChart"));
      that.chart.setOption({
        grid: {
          left: "3%",
          right: "3%",
          top: "16%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          icon: "rect",
          orient: "vertical",
          left: "10%",
          top: "10%",
          align: "left",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            startAngle: 60,
            itemStyle: {
              normal: {
                borderColor: "#3c60a5",
                borderWidth: 2
              }
            },
            label: {
              fontSize: 14,
              formatter: "{b} {c}个\n{d}%"
            },
            data: this.data
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.jdtjDiv {
  width: 100%;
  height: 35%;
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

  #tjChart {
    width: 100%;
    height: 240px;
  }
}
</style>
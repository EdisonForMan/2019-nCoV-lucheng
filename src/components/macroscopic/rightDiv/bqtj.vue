<template>
  <div id="bltjDiv">
    <h3>
      - 鹿城区病例统计 -
      <select @change="bqSelect($event)">
        <option value="0">确诊病例</option>
        <option value="1">确诊人员增长趋势</option>
        <option value>疑似病例</option>
      </select>
    </h3>
    <div id="bqtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      charts: " ",
      titleData: "灾情统计",
      dataAge: [
        {
          value: 0,
          name: "滨江",
          itemStyle: { color: "#f41e1e" }
        },
        {
          value: 0,
          name: "山福镇",
          itemStyle: { color: "#4dc075" }
        },
        {
          value: 6,
          name: "藤桥镇",
          itemStyle: { color: "#b8d94c" }
        },
        {
          value: 0,
          name: "仰义",
          itemStyle: { color: "#ffb738" }
        },
        {
          value: 2,
          name: "南郊",
          itemStyle: { color: "#ab64cc" }
        },
        {
          value: 0,
          name: "丰门",
          itemStyle: { color: "#ffdd55" }
        },
        {
          value: 10,
          name: "南汇",
          itemStyle: { color: "#fe4d69" }
        },
        {
          value: 1,
          name: "双屿",
          itemStyle: { color: "#ffefa1" }
        },
        {
          value: 3,
          name: "五马",
          itemStyle: { color: "#ff8e66" }
        },
        {
          value: 2,
          name: "松台",
          itemStyle: { color: "#ff936a" }
        },
        {
          value: 0,
          name: "七都",
          itemStyle: { color: "#aa63cb" }
        },
        {
          value: 1,
          name: "蒲鞋市",
          itemStyle: { color: "#bace53" }
        },
        {
          value: 0,
          name: "广化",
          itemStyle: { color: "#f41e1e" }
        },
        {
          value: 7,
          name: "大南",
          itemStyle: { color: "#fef5cc" }
        }
      ],
      dataName: [
        "21日",
        "22日",
        "23日",
        "24日",
        "25日",
        "26日",
        "27日",
        "28日",
        "29日",
        "30"
      ],
      dataQS: [2, 4, 6, 10, 18, 32, 60, 114, 172, 227],
      dataLC: [0, 0, 0, 0, 5, 10, 17, 27, 29, 32]
    };
  },
  methods: {
    //灾情占比
    zqzb() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        grid: {
          left: "8%",
          right: "5%",
          top: "14%"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          show: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 15,
            color: "#FFF",
            formatter: function(val) {
              return val.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          data: this.dataAge
            .sort((a, b) => b.value - a.value)
            .map(item => item.name)
        },
        yAxis: {
          type: "value",
          name: "",
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#FFF"
                }
              }
            },
            barWidth: "45%",
            yAxisIndex: 0,
            data: this.dataAge
          }
        ]
      });
    },
    //确诊趋势
    qzqs() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            //type: "line",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          show: true,
          icon: "roundRect",
          bottom: "2%",
          textStyle: {
            color: "#fff",
            fontSize: 12
          }
        },
        color: ["#0080ff", "#4cd5ce"],
        toolbox: {
          // feature: {
          //     saveAsImage: {}
          // }
        },
        grid: {
          left: "3%",
          right: "6%",
          top: "10%",
          bottom: "15%",
          containLabel: true
        },
        // legend: {
        //   orient: "vertical",
        //   top: "12%",
        //   left: "50%",
        // },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.dataName,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 12
              }
            },
            axisTick: false, //刻度不显示
            axisLine: {
              lineStyle: {
                color: "#9fdbfd",
                width: 2 //这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              onZero: false,
              lineStyle: {
                width: 2, //这里是为了突出显示加上的
                color: "#9fdbfd"
              }
            },
            axisTick: false, //刻度不显示
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff" //字体颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: "#17035a"
              }
            }
          }
        ],
        series: [
          {
            name: "温州市确诊人员增长趋势(例)",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
              normal: {
                color: "rgba(14,255,216)", //背景色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "solid",
                  color: "#1ff4fa"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5, //折线点的大小
            areaStyle: {
              normal: {}
            },
            data: this.dataQS
          },
          {
            name: "鹿城确诊人员增长趋势(例)",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
              normal: {
                color: "rgba(254,77,105)", //背景色
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: "solid",
                  color: "rgb(254,77,105)"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5, //折线点的大小
            areaStyle: {
              normal: {}
            },
            data: this.dataLC
          }
        ]
      });
    },
    bqSelect: function(event) {
      // `this` 在方法里指向当前 Vue 实例
      console.log(event.target.value);
      if (event.target.value == "1") {
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.qzqs();
      }
      if (event.target.value == "0") {
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.zqzb();
      }
    }
  },
  mounted() {
    this.zqzb();
  }
};
</script>

<style>
#fy-rightDiv #bltjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
}
#fy-rightDiv #bltjDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #bltjDiv #ylzyChart {
  width: 100%;
  height: 60%;
}
#fy-rightDiv #bltjDiv h3 select {
  background-color: #0c7cd2;
  border: none;
  color: #fff;
  padding: 7px 7px;
  margin-left: 5px;
}
#fy-rightDiv #bltjDiv #bqtjChart {
  width: 100%;
  height: 85%;
}
</style>
<template>
  <div id="bltjDiv">
    <!-- <header>
      <span :class="{active:tabIndex == 0}" @click="filterItem(0)">确诊病例统计</span>
      <i>/</i>
      <span :class="{active:tabIndex == 1}" @click="filterItem(1)">增长趋势分析</span>
      <i>/</i>
    <span :class="{active:tabIndex == 2}" @click="filterItem(2)">累计趋势分析</span>-->
    <!-- <span class="stateTipHeaderBar"></span> -->
    <!-- </header> -->
    <h3 id="selectDiv">
      - 鹿城区病例统计 -
      <select id="select" @change="bqSelect($event)">
        <option value="qzbl">确诊病例</option>
        <option value="zzbl">疑似病例</option>
        <option value="gld">集中医学观察点</option>
        <option value="gld_list">集中医学观察点人员名单</option>
        <option value="mj">密切接触者</option>
        <option value="jjgl">居家隔离人员</option>
        <option value="hbhw">湖北回鹿人员信令</option>
        <!-- <option value="zzqs">确诊人员增长趋势</option> -->
      </select>
    </h3>
    <div id="bqtjChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import util from "../util";
export default {
  data() {
    return {
      tabIndex: 0,
      ChartDataWZ: " ",
      ChartDataLC: " ",
      dataTime: " ",
      children: " "
    };
  },
  methods: {
    filterItem(index) {
      this.tabIndex = index;
      // 确诊病例
      if (index == "0") {
        document.getElementById("selectDiv").style.visibility = "visible"; //显示
        this.dataAge = this.dataHash.qzbl;
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.zqzb();
      }
      // 增长趋势
      if (index == "1") {
        document.getElementById("selectDiv").style.visibility = "hidden"; //隐藏
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.ChartDataWZ = " "; //增长趋势
        //console.log(this.dataLC);
        var qsArr = [];
        for (var i = 0; i < this.dataLC.length - 1; i++) {
          var num = this.dataLC[i + 1] - this.dataLC[i];
          if (num <= 0) num = 0;
          qsArr.push(num);
        }
        this.ChartDataLC = qsArr; //增长趋势
        var dataX = this.dataName;
        dataX.shift(); //删除数组第一个值
        this.dataTime = dataX; //x轴
        this.dataTime = this.dataName; //x轴
        this.qzqs();
      }
      // 累计趋势
      if (index == "2") {
        document.getElementById("selectDiv").style.visibility = "hidden"; //隐藏
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.ChartDataWZ = this.dataQS; //累积趋势
        this.ChartDataLC = this.dataLC; //累积趋势
        if (this.dataQS.length != this.dataName.length) {
          this.dataName.unshift(
            this.dataName[0] - (this.dataName[1] - this.dataName[0])
          ); //在x轴数组添加第一个x值
        }
        this.dataTime = this.dataName; //x轴
        this.qzqs();
      }
    },
    getItem(children, label) {
      //console.log("children", children);
      if (label == "疫情分布" && children.id !== "ytyg") {
        this.dataAge = this.dataHash[children.id];
        document.getElementById("select").value = children.id;
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.children = children;
        this.zqzb();
      }
    },
    // 确诊病例
    zqzb() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      // if (this.children.id == "qzbl") {
      //   for (let i = 0; i < this.dataAge.length; i++) {
      //     if (this.dataAge[i].value - this.dataAge[i].xzdate < 0) {
      //       this.dataAge[i].value =
      //         this.dataAge[i].value + this.dataAge[i].xzdate;
      //     } else {
      //       this.dataAge[i].value =
      //         this.dataAge[i].value - this.dataAge[i].xzdate;
      //     }
      //   }
      // }
      chart.setOption({
        grid: {
          left: "8%",
          right: "5%",
          top: "14%"
        },
        tooltip: {
          trigger: "axis"
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
            name: "合计确诊",
            type: "bar",
            barWidth: "20px",

            stack: "sum",
            label: {
              normal: {
                show: true,
                position: "inside",
                color: "#fff",
                fontSize: 14
              }
            },
            itemStyle: {
              color: "#f41e1e"
            },
            data: this.dataAge
          },
          {
            name: "新增确诊",
            type: "bar",
            stack: "sum",
            barWidth: "20px",
            color: "#f9c401",
            data: this.dataAge.map(item => item.xzdate)
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
    // 确诊趋势
    qzqs() {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        // legend: {
        //   show: true,
        //   icon: "roundRect",
        //   bottom: "2%",
        //   textStyle: {
        //     color: "#fff",
        //     fontSize: 12
        //   }
        // },
        color: ["#0080ff", "#4cd5ce"],
        grid: {
          left: "3%",
          right: "6%",
          top: "10%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dataTime,
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
            name: "温州市确诊人员增长趋势(例)",
            type: "line",
            smooth: true,
            //  symbol: "none", //去掉折线点
            itemStyle: {
              normal: {
                color: "rgba(14, 255, 216)",
                lineStyle: {
                  width: 2,
                  type: "solid",
                  color: "#1ff4fa"
                },
                label: { show: true, color: "#fff" }
              }
            },
            symbolSize: 5,
            areaStyle: {
              normal: {}
            },
            data: this.ChartDataWZ
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
            data: this.ChartDataLC
          }
        ]
      });
    },
    bqSelect: function(event) {
      // if (event.target.value != "zzqs") {
      //   this.dataAge = this.dataHash[event.target.value];
      //   this.$echarts.init(document.getElementById("bqtjChart")).clear();
      //   this.zqzb();
      // } else {
      //   this.$echarts.init(document.getElementById("bqtjChart")).clear();
      //   this.qzqs();
      // }

      this.dataAge = this.dataHash[event.target.value];
      this.$echarts.init(document.getElementById("bqtjChart")).clear();
      this.zqzb();
    }
  },
  created() {
    const {
      dataAge,
      XZAge,
      YTdataAge,
      dataName,
      dataQS,
      dataLC,
      ysblDate,
      jzglDate,
      glryDate,
      mqzDate,
      jjglDate,
      hbhlDate
    } = this.$window.nCov_luchengChart;
    this.dataAge = dataAge;
    this.XZAge = XZAge;
    this.YTdataAge = YTdataAge;
    this.dataName = dataName;
    this.dataQS = dataQS;
    this.dataLC = dataLC;

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
    this.zqzb();
    //修改数值
    const that = this;
    util.$on("chartDataMod", function(newV) {
      newV == 1
        ? (that.dataAge = that.YTdataAge)
        : (that.dataAge = that.dataAge);

      document.getElementById("select").value = "qzbl";
      that.$echarts.init(document.getElementById("bqtjChart")).clear();
      that.zqzb();
    });
  }
};
</script>

<style lang="less" scoped>
#bltjDiv {
  width: 100%;
  height: 34%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  header {
    height: 40px;
    line-height: 50px;
    text-align: left;
    font-size: 20px;
    color: #4cd7ec;
    text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
    padding-left: 20px;
    text-align: center;
    cursor: pointer;

    span {
      padding: 0px 10px;
    }

    .active {
      font-weight: 700;
      color: #fff;
    }
  }

  h3 {
    color: #23c9f3;
    margin-top: 10px;

    select {
      background-color: #0c7cd2;
      border: none;
      color: #fff;
      padding: 7px 7px;
      margin-left: 5px;
    }
  }

  #bqtjChart {
    width: 100%;
    height: 85%;
  }
}
</style>
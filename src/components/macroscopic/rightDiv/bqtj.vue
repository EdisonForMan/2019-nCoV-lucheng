<template>
  <div id="bltjDiv">
    <h3>
      - 温州市疫情防控管控力指数 -
      <select id="select" @change="bqSelect($event)">
<!--         <option value="qzbl">确诊病例</option>
        <option value="zzbl">疑似病例</option>
        <option value="gld">集中隔离点</option>
        <option value="gld_list">集中隔离点人员名单</option>
        <option value="mj">密切接触者</option>
        <option value="jjgl">居家隔离人员</option>
        <option value="hbhw">湖北回鹿人员信令</option>
        <option value="zzqs">确诊人员增长趋势</option> -->
        <option value="fbl">二代及以上病例</option>
        <option value="mzbls">主动发现病例</option>
        <option value="fxl">聚集性疫情</option>
        <option value="qzbls">密切接触者</option>
      </select>
    </h3>
    <div id="bqtjChart"></div>
    <div class="bqtjDesc">指标说明：{{ desc }}</div>
  </div>
</template>

<script>
/* eslint-disable */
import util from "../util";
import { SHI_QU_DATA } from '../../common/shiquData.js';
export default {
  data() {
    return {
      desc: ''
    };
  },
  methods: {
    getItem(children, label) {
      // console.log("children", children);
      if (label == "疫情分布" && children.id !== "ytyg") {
        this.dataAge = this.dataHash[children.id];
        document.getElementById("select").value = children.id;
        this.$echarts.init(document.getElementById("bqtjChart")).clear();
        this.zqzb();
      }
    },
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
          data: this.dataName,
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
            data: this.dataLC
          }
        ]
      });
    },
    // 卫健委指数
    wjwzs (titlename, data, titleText) {
      const chart = this.$echarts.init(document.getElementById("bqtjChart"));
      console.log(titleText);
      chart.setOption({
          title: {
            text: titleText.length > 6 ? titleText.substr(0, 6) + '\n' + titleText.substr(6) : titleText,
            right: '1%',
            top: '5%',
            textStyle: {
              fontSize: 15,
              width: 20,
              color: 'rgb(246, 227, 27)'
            }
          },
          xAxis: {
              show: false
          },
          grid: {
            left: '22%',
            right: '5%',
            bottom: '2%',
            top: '2%'
          },
          yAxis: [{
              show: true,
              data: titlename,
              inverse: true,
              axisLabel: {
                  textStyle: {
                      fontSize: 12,
                      color: '#fff',
                  },
              },
              axisLine: {
                  show: false
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              }
          }],
          series: [{
              name: '条',
              type: 'bar',
              yAxisIndex: 0,
              data: data,
              itemStyle: {
                  normal: {
                      color: '#1089E7'
                  }
              },
              label: {
                  normal: {
                      show: true,
                      color: '#fff',
                      position: 'right'
                  }
              },
          } ]
      });
    },
    changewjwzs (marks, titleNanme) {
      // let data = marks.sort((a,b) => a.value - b.value);
      let title = [];
      let result = [];
      marks.map((item) => {
        title.push(item.key);
        result.push(item.value);
      });
      this.wjwzs(title, result, titleNanme);
    },
    changebqSelect (value) {
      switch (value) {
        case 'fbl': 
          this.changewjwzs(SHI_QU_DATA.zhishuData.fbl, SHI_QU_DATA.zhishuData.fblTitle);
          this.desc = SHI_QU_DATA.zhishuData.fblDesc;
          break;
        case 'mzbls':
          this.changewjwzs(SHI_QU_DATA.zhishuData.mzbls, SHI_QU_DATA.zhishuData.mzblsTitle);
          this.desc = SHI_QU_DATA.zhishuData.mzblsDesc;
          break;
        case 'fxl':
          this.changewjwzs(SHI_QU_DATA.zhishuData.fxl, SHI_QU_DATA.zhishuData.fxlTitle);
          this.desc = SHI_QU_DATA.zhishuData.fxlDesc;
          break;
        case 'qzbls':
          this.changewjwzs(SHI_QU_DATA.zhishuData.qzbls, SHI_QU_DATA.zhishuData.qzblsTitle);
          this.desc = SHI_QU_DATA.zhishuData.qzblsDesc;
          break;
      }
    },
    bqSelect: function(event) {
      this.$echarts.init(document.getElementById("bqtjChart")).clear();
      this.changebqSelect(event.target.value);
    }
  },
  created() {
    // const {
    //   dataAge,
    //   YTdataAge,
    //   dataName,
    //   dataQS,
    //   dataLC,
    //   ysblDate,
    //   jzglDate,
    //   glryDate,
    //   mqzDate,
    //   jjglDate,
    //   hbhlDate
    // } = this.$window.nCov_luchengChart;
    // this.dataAge = dataAge;
    // this.YTdataAge = YTdataAge;
    // this.dataName = dataName;
    // this.dataQS = dataQS;
    // this.dataLC = dataLC;

    // this.dataHash = {
    //   qzbl: dataAge,
    //   zzbl: ysblDate,
    //   gld: jzglDate,
    //   gld_list: glryDate,
    //   mj: mqzDate,
    //   jjgl: jjglDate,
    //   hbhw: hbhlDate
    // };
  },
  mounted() {
    this.changebqSelect('fbl');
    //修改数值
    // const that = this;
    // util.$on("chartDataMod", function(newV) {
    //   newV == 1
    //     ? (that.dataAge = that.YTdataAge)
    //     : (that.dataAge = that.dataAge);

    //   document.getElementById("select").value = "qzbl";
    //   that.$echarts.init(document.getElementById("bqtjChart")).clear();
    //   that.zqzb();
    // });
  }
};
</script>

<style>
#fy-rightDiv #bltjDiv {
  width: 100%;
  /*height: 34%;*/
  height: 49%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  margin-bottom: 2%;
  position: relative;
}
#fy-rightDiv #bltjDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
  padding-left: 2%;
  text-align: left;
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
#bltjDiv .bqtjDesc {
  position: absolute;
  z-index: 10;
  bottom: 1%;
  left: 2%;
  font-size: 12px;
  color: #ccc;
}
</style>
<template>
<div class="mjChart" v-if="list.length">
  <head>
    <span>[ {{ title }} ] - 密切接触者</span>
    <span id="close" @click="()=>{list = []}">x</span>
    <p
      style="background-color: #0c7cd2;padding: 7px 7px;cursor: pointer;position: relative;z-index: 10;width: 100px;margin: auto;margin-top: 10px;"
      @click="goqzTable()"
    >圈主信息</p>
  </head>
  <div>
    <div class="list">
      <!-- <ul>
        <li v-for="(item,index) in list" :key="index" @click="goLocation(item)">
          <span>{{++index}}.{{item.attributes.NAME.slice(0,1)}}**,{{item.attributes.Sex}},{{item.attributes.Address_Department}},{{item.attributes.Age}}</span>
        </li>
      </ul>-->

      <div id="mjframe"></div>
    </div>
    <div class="chart">
      <div id="cframe"></div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */

import { qzTableUpdate } from "./mjArcgis";
export default {
  name: "mjChart",
  data() {
    return {
      title: "",
      list: [],
      chart: undefined,
      chart2: undefined
    };
  },
  mounted() {},
  methods: {
    goLocation(item) {
      // console.log(item.geometry);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    goqzTable() {
      var name = this.title;
      console.log(name);
      this.$parent.$refs.qzTable.qzTableFun();
      qzTableUpdate(name);
    },
    doChart(list) {
      this.chart = this.$echarts.init(document.getElementById("cframe"));
      const sObj = {};
      const sArr = [];

      // console.log("list", list);

      list.map(({ attributes }) => {
        const { Country } = attributes;
        if (!Country) return false;
        if (!sObj[Country]) {
          sObj[Country] = { Country, count: 0 };
        }
        sObj[Country].count++;
      });
      for (let k in sObj) {
        sArr.push(sObj[k]);
      }
      const fixArr = sArr.sort(this.$util.compare("count")).reverse();
      this.chart.setOption({
        title: {
          text: "密切接触者街道分布",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff",
            formatter: function(val) {
              return val.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: fixArr.map(item => {
            return item.Country;
          })
        },
        yAxis: {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: fixArr.map(item => {
              return item.count;
            }),
            type: "bar",
            barWidth: "45%",
            label: {
              show: true,
              position: "top",
              color: "#fff"
            }
          }
        ]
      });

      // console.log("op1", [
      //   {
      //     name: this.title
      //   },
      //   ...this.list.map(item => {
      //     return item.attributes.NAME;
      //   })
      // ]);

      this.chart2 = this.$echarts.init(document.getElementById("mjframe"));
      this.chart2.setOption({
        series: [
          {
            type: "graph",
            layout: "force",
            // symbolSize: 60,
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            force: {
              repulsion: list.length > 20 ? 260 : 800,
              initLayout: "circular",
              layoutAnimation: false
            },
            edgeSymbol: ["", "arrow"],
            edgeLabel: {
              normal: {
                show: true,
                formatter: "{c}",
                color: "#fff"
              }
            },
            data: [
              {
                name: this.title,
                label: {
                  color: "#0fd",
                  fontSize: 15
                }
              },
              ...this.list
                .filter((item, index) => {
                  return index < 90;
                })
                .map(item => {
                  return { name: item.attributes.NAME };
                })
            ],
            links: this.list
              .filter((item, index) => {
                return index < 90;
              })
              .map(item => {
                return {
                  source: this.title,
                  target: item.attributes.NAME,
                  value: item.attributes.Relation
                    ? item.attributes.Relation
                    : ""
                };
              })
          }
        ]
      });
    }
  },
  watch: {
    list(newV, oldV) {
      this.$nextTick(() => {
        newV.length && this.doChart(newV);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.mjChart {
  position: absolute;
  width: 500px;
  height: 720px;
  background: #24386a;
  border: 1px solid #04ecff;
  border-radius: 6px;
  z-index: 20;
  top: 18%;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: all 1s;

  head {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 45px;
    font-size: 20px;

    .title {
      margin-left: 17px;
    }
  }
  #close {
    float: right;
    padding: 0px 5px;
    font-size: 17px;
    cursor: pointer;
  }

  > div {
    flex: 1;
    .list {
      height: 360px;
      // overflow: auto;
      // text-align: left;
      #mjframe {
        height: 100%;
        margin: 0px 5px;
      }
      > ul {
        li {
          padding: 10px 0;
          background: #122960;
          text-align: left;
          padding-left: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        li:nth-child(even) {
          background: #081942;
        }
      }
    }
    .list::-webkit-scrollbar {
      display: block;
      width: 6px;
      background-color: rgb(50, 95, 245);
      border-radius: 3px;
    }
    .list::-webkit-scrollbar-thumb {
      width: 6px;
      background-color: rgb(32, 28, 243);
      border-radius: 3px;
    }
    .chart {
      height: 300px;
      box-sizing: border-box;
      padding-top: 20px;
      #cframe {
        height: 100%;
      }
    }
  }
}
</style>
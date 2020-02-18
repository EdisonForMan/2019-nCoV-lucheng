<template>
  <div id="fgtjform" v-if="sArr.length">
    <div class="head">
      <div class="title">{{ title }}</div>
      <a @click="()=>{sArr = []}">×</a>
    </div>
    <div class="content ctn2">
      <div class="chart" v-for="(item, index) in sArr" :key="index" :id="`chart${index}`"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";

export default {
  name: "fgtjForm",
  data() {
    return {
      server,
      title: "",
      charts: [],
      sArr: []
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getItem({ url, sublayers }) {
      const that = this;

      this.title = `工地返工统计`;

      this.sArr = [1, 2, 3, 4];

      this.sArr = [
        {
          name: "复工后工地人员总数量",
          dateName: [
            "山福镇",
            "藤桥镇",
            "仰义街道",
            "丰门街道",
            "双屿街道",
            "广化街道",
            "松台街道",
            "五马街道",
            "大南街道",
            "南郊街道",
            "蒲鞋市街道",
            "南汇街道",
            "滨江街道",
            "七都街道"
          ],
          dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
          name: "复工后湖北籍总数量",
          dateName: [
            "山福镇",
            "藤桥镇",
            "仰义街道",
            "丰门街道",
            "双屿街道",
            "广化街道",
            "松台街道",
            "五马街道",
            "大南街道",
            "南郊街道",
            "蒲鞋市街道",
            "南汇街道",
            "滨江街道",
            "七都街道"
          ],
          dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
          name: "复工后建设单位人员总数量",
          dateName: [
            "山福镇",
            "藤桥镇",
            "仰义街道",
            "丰门街道",
            "双屿街道",
            "广化街道",
            "松台街道",
            "五马街道",
            "大南街道",
            "南郊街道",
            "蒲鞋市街道",
            "南汇街道",
            "滨江街道",
            "七都街道"
          ],
          dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
          name: "复工后建设单位湖北籍员工总数量",
          dateName: [
            "山福镇",
            "藤桥镇",
            "仰义街道",
            "丰门街道",
            "双屿街道",
            "广化街道",
            "松台街道",
            "五马街道",
            "大南街道",
            "南郊街道",
            "蒲鞋市街道",
            "南汇街道",
            "滨江街道",
            "七都街道"
          ],
          dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        },
        {
          name: "复工后施工单位人员总数量",
          dateName: [
            "山福镇",
            "藤桥镇",
            "仰义街道",
            "丰门街道",
            "双屿街道",
            "广化街道",
            "松台街道",
            "五马街道",
            "大南街道",
            "南郊街道",
            "蒲鞋市街道",
            "南汇街道",
            "滨江街道",
            "七都街道"
          ],
          dataList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        }
      ];
    },
    doChart() {
      const list = this.sArr;

      list.map((item, index) => {
        const chart = this.$echarts.init(
          document.getElementById(`chart${index}`)
        );

        chart.setOption({
          title: {
            text: `${item.name}`,
            left: "20px",
            textStyle: {
              color: "#fff"
            }
          },
          grid: {
            bottom: "10%",
            left: "5%",
            right: "4%",
            containLabel: true
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
            data: item.dateName.map(item =>
              item.replace("街道", "").replace("镇", "")
            )
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
              name: "人数",
              type: "bar",
              barWidth: "20px",

              stack: "sum",
              label: {
                normal: {
                  show: true,
                  position: "top",
                  color: "#fff",
                  fontSize: 13
                }
              },
              itemStyle: {
                color: "#f41e1e"
              },
              data: item.dataList
            }
          ]
        });

        this.charts.push(chart);
      });
    },
    getList() {
      const list = [];
      const that = this;
      this.sArr.map((item, index) => {
        const obj = {};

        item.time.map((_item, _index) => {
          if (
            new Date(_item).valueOf() >= new Date(that.time_start).valueOf() &&
            new Date(_item).valueOf() <=
              new Date(that.time_end).valueOf() + 24 * 60 * 60 * 1000
          ) {
            !obj["time"] && (obj["time"] = []);
            !obj["num"] && (obj["num"] = []);

            obj["time"].push(_item);
            obj["num"].push(_index);
          }
        });

        item.in_value.map((_item, _index) => {
          if (obj.num && ~obj.num.indexOf(_index)) {
            !obj["in_value"] && (obj["in_value"] = []);

            obj["in_value"].push(_item);
          }
        });

        item.out_value.map((_item, _index) => {
          if (obj.num && ~obj.num.indexOf(_index)) {
            !obj["out_value"] && (obj["out_value"] = []);

            obj["out_value"].push(_item);
          }
        });

        obj["name"] = item.name;

        list.push(obj);
      });

      return list;
    }
  },
  watch: {
    sArr(newV, oldV) {
      this.$nextTick(() => {
        newV.length && this.doChart();
      });
    }
  }
};
</script>

<style lang="less" scoped>
#fgtjform {
  position: absolute;
  width: 450px;
  height: 720px;
  background: #24386a;
  border: 1px solid #04ecff;
  border-radius: 6px;
  z-index: 20;
  top: 18%;
  margin: auto;
  box-sizing: border-box;
  transition: all 1s;

  .head {
    margin-top: 1%;

    .title {
      font-size: 22px;
    }

    a {
      position: absolute;
      top: 0px;
      right: 10px;
      font-size: 30px;
      cursor: pointer;
    }
  }

  .ctn2 {
    height: 90%;
    margin-top: 5%;
    overflow: auto;

    .chart {
      width: 100%;
      height: 230px;
      margin: 10px 0px;
    }
  }

  .content::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: rgb(107, 134, 223);
    border-radius: 3px;
  }
  .content::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgb(14, 10, 247);
    border-radius: 3px;
  }
}
</style>
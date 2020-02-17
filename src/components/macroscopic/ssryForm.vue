<template>
  <div id="ssyrform" v-if="list.length">
    <div class="head">
      <div class="title">{{ title }}</div>
      <div class="time" v-if="type == 1">{{ time }}</div>
      <a @click="()=>{list = []}">×</a>
    </div>
    <div class="content ctn1" v-if="type == 1">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th style="width: 10%">序号</th>
            <th style="width: 50%">小区名</th>
            <th style="width: 20%">出小区人次</th>
            <th style="width: 20%">入小区人次</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in list"
            :key="index"
            @click="showMsg(item)"
            style="cursor: pointer;"
          >
            <td>{{ ++index }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.num_out }}</td>
            <td>{{ item.num_in }}</td>
            <!-- <td>1</td> -->
            <!-- <td
              v-for="(k,i) in keyData"
              :key="i"
              @click="goLocation(item)"
              style="cursor: pointer;"
            >{{ item.attributes[k]?(~["Name"].indexOf(k)?`${item.attributes[k].trim().substr(0,1)}*${item.attributes[k].trim().substr(-1,1)}`:item.attributes[k]):"无" }}</td>
            <td @click="showrelation(item)" style="cursor: pointer;">详情</td>-->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content ctn2" v-if="type == 2">
      <div class="chart" v-for="(item, index) in sArr" :key="index" :id="`chart${index}`"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { xqjckFormUpdate } from "./frame/xqjckArcgis";
import Calendar from "vue-calendar-component";

import { mapState } from "vuex";

export default {
  name: "ssryForm",
  data() {
    return {
      server,
      title: "",
      list: [],
      type: 1,
      calShow1: false,
      calShow2: false,
      time_start: "",
      time_end: "",
      ago: "",
      future: "",
      now: "",
      time: "",
      charts: [],
      sArr: []
    };
  },
  components: { Calendar },
  computed: {
    ...mapState({
      crjlList: state => state.crjlList,
      ryxxList: state => state.ryxxList
    })
  },
  created() {
    this.future = this.now = new Date()
      .valueOf()
      .toString()
      .substr(0, 10);
    this.time_start = this.dateFormat(
      "YYYY/mm/dd",
      new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
    );
    this.time_end = this.dateFormat("YYYY/mm/dd", new Date());
  },
  mounted() {},
  methods: {
    goLocation(item) {
      // console.log(item);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },

    getItem({ url, sublayers }, type) {
      const that = this;
      this.type = type;
      const datetime = this.dateFormat("YYYY-mm-dd", new Date());
      this.time = `截至 ${datetime}`;
      this.title = type == 1 ? `小区出入实时情况` : `小区出入情况历史统计`;
      // this.doChart();
      // console.log("getitem", this.crjlList);

      const obj = {};

      this.crjlList.map(item => {
        if (!obj[item.ssxq]) {
          obj[item.ssxq] = {
            name: item.ssxq,
            num_in: 0,
            num_out: 0
          };
        }

        const time_out = this.dateFormat("YYYY-mm-dd", new Date(item.cmsj));
        const time_in = this.dateFormat("YYYY-mm-dd", new Date(item.fhsj));

        if (item.cmsj != "1899-12-30 00:00:00" && time_out == datetime) {
          obj[item.ssxq].num_out++;
        }

        if (item.fhsj != "1899-12-30 00:00:00" && time_in == datetime) {
          obj[item.ssxq].num_in++;
        }
      });

      // console.log("obj", obj);

      Object.values(obj).map(item => {
        that.list.push(item);
      });

      // console.log(
      //   "bol",
      //   that.$parent.$refs.macroArcgis.map.findLayerById("xqd")
      // );

      if (!that.$parent.$refs.macroArcgis.map.findLayerById("xqd")) {
        const querylist = this.list.map(item => `'${item.name}'`);

        loadModules(
          [
            "esri/tasks/QueryTask",
            "esri/tasks/support/Query",
            "esri/layers/FeatureLayer"
          ],
          OPTION
        ).then(async ([QueryTask, Query, FeatureLayer]) => {
          const layer = new FeatureLayer({
            url:
              "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/19",
            definitionExpression: `MansionName in (${querylist})`,
            id: "xqd",
            renderer: {
              type: "simple",
              symbol: {
                type: "picture-marker",
                url: `${server}/icon/other/小区.png`,
                width: "30px",
                height: "32px"
              },
              label: "小区"
            },
            labelingInfo: [
              {
                symbol: {
                  type: "text",
                  color: "white",
                  haloColor: "black",
                  haloSize: "1px",
                  font: {
                    family: "Arial Unicode MS Regular",
                    size: 12
                  }
                },
                labelPlacement: "below-center",
                labelExpressionInfo: {
                  expression: "$feature.MansionName"
                }
              }
            ]
          });

          that.$parent.$refs.macroArcgis.map.add(layer);

          that.$parent.$refs.macroArcgis.legend.layerInfos.push({
            title: "",
            layer: layer
          });
        });
      }
    },
    showMsg(item) {
      // console.log(item);
      const that = this;
      // xqjckFormUpdate(that, item.name);

      this.$parent.xqjckShow = true;

      this.$parent.$refs.xqjck.filterItem(item.name);
    },
    doChart() {
      this.sArr.map((item, index) => {
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
          legend: {
            show: true,
            right: "8%",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            show: true,
            trigger: "axis"
          },
          grid: {
            bottom: "10%",
            left: "5%",
            right: "4%",
            containLabel: true
          },
          xAxis: {
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            axisTick: {
              show: false
            },
            data: item.time
          },
          yAxis: {
            axisLine: {
              lineStyle: {
                color: "#fff"
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
              name: "进入人数",
              type: "line",
              itemStyle: {
                color: "#fd344b"
              },
              data: item.in_value
            },
            {
              name: "出去人数",
              type: "line",
              itemStyle: {
                color: "#00ffff"
              },
              data: item.out_value
            }
          ]
        });

        this.charts.push(chart);
      });
    },
    // 更新图表
    updateChart() {
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
          if (~obj.num.indexOf(_index)) {
            !obj["in_value"] && (obj["in_value"] = []);

            obj["in_value"].push(_item);
          }
        });

        item.out_value.map((_item, _index) => {
          if (~obj.num.indexOf(_index)) {
            !obj["out_value"] && (obj["out_value"] = []);

            obj["out_value"].push(_item);
          }
        });

        list.push(obj);
      });

      this.charts.map((item, index) => {
        item.setOption({
          xAxis: {
            data: list[index].time
          },
          series: [
            {
              name: "进入人数",
              type: "line",
              itemStyle: {
                color: "#fd344b"
              },
              data: list[index].in_value
            },
            {
              name: "出去人数",
              type: "line",
              itemStyle: {
                color: "#00ffff"
              },
              data: list[index].out_value
            }
          ]
        });
      });
    },
    // [calendar1]点击事件
    clickDay1(data) {
      this.calShow1 = false;
      this.time_start = data;
      this.ago = new Date(data)
        .valueOf()
        .toString()
        .substr(0, 10);

      this.updateChart();
    },
    // [calendar2]点击事件
    clickDay2(data) {
      this.calShow2 = false;
      this.time_end = data;
      this.future = new Date(data)
        .valueOf()
        .toString()
        .substr(0, 10);

      this.updateChart();
    },
    // 日期格式化
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  },
  watch: {
    // list(newV, oldV) {
    //   this.$nextTick(() => {
    //     newV.length && this.doChart();
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
#ssyrform {
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

    .time {
      font-size: 16px;
    }

    a {
      position: absolute;
      top: 0px;
      right: 10px;
      font-size: 30px;
      cursor: pointer;
    }
  }

  .choose_div {
    margin: 2%;
    padding: 2% 0%;

    .wh_container {
      position: absolute;
      right: 0px;
      z-index: 30;
    }

    span {
      font-size: 16px;
    }

    img {
      // position: absolute;
      width: 16px;
      height: 16px;
      margin-left: 10px;
      margin-right: 30px;
      cursor: pointer;
    }

    .choose_time {
      padding: 5px 0px;

      span {
        font-size: 18px;
      }

      img {
        position: absolute;
        width: 20px;
        height: 20px;
        margin-left: 12px;
        cursor: pointer;
      }

      .wh_container {
        position: absolute;
        right: 0px;
        z-index: 30;
      }
    }
  }

  .ctn1 {
    height: 88%;
    margin-top: 5%;
    overflow: auto;

    table {
      border: 1px solid #ccc;
      width: 96%;
      margin: 0% 2%;

      th,
      td {
        border-bottom: 1px solid #ccc;
        padding: 10px 5px;
      }
    }
  }

  .ctn2 {
    height: 85%;
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
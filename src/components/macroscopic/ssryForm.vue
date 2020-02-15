<template>
  <div id="ssyrform" v-if="list.length">
    <div class="head">
      <div class="title">
        {{ title }}
        <img
          src="../common/image/日历.png"
          v-if="type == 2"
          @click="()=>{ calShow = !calShow }"
        />
      </div>
      <div class="time" v-if="type == 1">{{ time }}</div>
      <a @click="()=>{list = []}">×</a>
      <Calendar
        ref="calendar"
        @choseDay="clickDay"
        @changeMonth="changeDate"
        :futureDayHide="now"
        v-if="type == 2"
        v-show="calShow"
      ></Calendar>
    </div>
    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0" v-if="type == 1">
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
      <!-- <div v-if="type == 2" class="chart" id="chart"></div> -->
      <div
        v-if="type == 2"
        class="chart"
        v-for="(item, index) in sArr"
        :key="index"
        :id="`chart${index}`"
      ></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { xqjckFormUpdate } from "./frame/xqjckArcgis";
import Calendar from "vue-calendar-component";
export default {
  name: "ssryForm",
  data() {
    return {
      server,
      title: "",
      list: [],
      type: 1,
      calShow: false,
      now: "",
      time: "",
      chart: undefined,
      sArr: [
        {
          name: "金海嘉苑",
          time: ["2020-02-13", "2020-02-14"],
          in_value: [200, 100],
          out_value: [100, 200]
        },
        {
          name: "美曦大厦",
          time: ["2020-02-13", "2020-02-14"],
          in_value: [200, 100],
          out_value: [100, 200]
        },
        {
          name: "大自然家园二期",
          time: ["2020-02-13", "2020-02-14"],
          in_value: [200, 100],
          out_value: [100, 200]
        }
      ]
    };
  },
  components: { Calendar },
  created() {
    this.now = new Date()
      .valueOf()
      .toString()
      .substr(0, 10);
    // this.chart = this.$echarts.init(document.getElementById("chart"));
    // console.log(1)
  },
  mounted() {},
  methods: {
    goLocation(item) {
      // console.log(item);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    getItem(
      { url, sublayers, id, name, definitionExpression, ytname, ytd },
      label,
      type
    ) {
      this.type = type;
      const datetime = new Date();
      const now_year = datetime.getFullYear();
      const now_month = datetime.getMonth() + 1;
      const now_day = datetime.getDate();
      this.time = `截至 ${now_year}-${now_month}-${now_day}`;
      this.title = type == 1 ? `小区出入情况` : `小区出入情况历史统计`;
      this.list =
        type == 1
          ? [
              {
                name: "金海嘉苑",
                num_in: 20,
                num_out: 20
              },
              {
                name: "美曦大厦",
                num_in: 20,
                num_out: 20
              },
              {
                name: "大自然家园二期",
                num_in: 20,
                num_out: 20
              }
            ]
          : [
              {
                name: "金海嘉苑",
                num_in: 200,
                num_out: 200
              },
              {
                name: "美曦大厦",
                num_in: 200,
                num_out: 200
              },
              {
                name: "大自然家园二期",
                num_in: 200,
                num_out: 200
              }
            ];
    },
    showMsg(item) {
      // console.log(item);
      const that = this;
      // xqjckFormUpdate(that, item.name);

      this.$parent.xqjckShow = true;

      this.$parent.$refs.xqjck.filterItem(item.name);
    },
    doChart(list) {
      this.sArr.map((item, index) => {
        const chart = this.$echarts.init(
          document.getElementById(`chart${index}`)
        );
        // this.chart = this.$echarts.init(document.getElementById("chart"));

        chart.setOption({
          title: {
            text: `${item.name}`,
            left: "20px",
            textStyle: {
              color: "#fff"
            }
          },
          tooltip: {
            show: true,
            trigger: "axis"
          },
          grid: {
            // top: "10%",
            bottom: "2%",
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
      });
    },
    clickDay(data) {
      console.log(data); //选中某天
      this.calShow = false;
      this.sArr.map((item, index) => {
        const chart = this.$echarts.init(
          document.getElementById(`chart${index}`)
        );
        // this.chart = this.$echarts.init(document.getElementById("chart"));

        chart.setOption({
          title: {
            text: "ECharts 入门示例xxxxxx"
          },
          tooltip: {},
          legend: {
            data: ["销量"]
          },
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: [5, 20, 36, 10]
            }
          ]
        });
      });
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
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
    height: 9%;
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

    .wh_container {
      position: absolute;
      right: 0px;
      z-index: 30;
    }

    img {
      width: 25px;
      height: 25px;
      position: absolute;
      margin-top: 1px;
      margin-left: 8px;
      cursor: pointer;
    }
  }
  .search {
    height: 60px;
    select {
      background-color: #0c7cd2;
      border: none;
      color: #fff;
      padding: 7px 7px;
      margin-right: 5px;
    }

    input {
      width: 15%;
      margin-top: 10px;
      margin-right: 5px;
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 8px 9px;
      color: #fff;
    }

    button {
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 7px 9px;
      color: #fff;
      margin-right: 4px;
    }
  }
  // .content::-webkit-scrollbar {
  //   display: none;
  // }
  .content {
    height: 85%;
    overflow: auto;

    .chart {
      width: 100%;
      height: 230px;
      margin: 10px 0px;
    }

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
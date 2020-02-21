<template>
  <div id="crjzDiv">
    <div>
      <span class="title">鹿城做地出让累计</span>
      <select id="select" @change="bqSelect($event)">
        <option value="crdk">出让地块</option>
        <option value="crje">出让金额</option>
        <option value="crmj">出让面积</option>
      </select>
    </div>
    <div id="crjzChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      index: 0
    };
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    ...mapActions(["fetchdkxxList"]),
    fixdkxxList() {
      !this.dkxxList.length && this.fetchdkxxList();

      // console.log("dkxx", this.dkxxList);

      const timeHash = {
        "2020-01-01": { name: "2020年01月", value: 0 },
        "2020-02-01": { name: "2020年02月", value: 0 }
      };

      const crdkObj = JSON.parse(JSON.stringify(timeHash));
      const crjeObj = JSON.parse(JSON.stringify(timeHash));
      const crmjObj = JSON.parse(JSON.stringify(timeHash));

      const crdkData = [];
      const crjeData = [];
      const crmjData = [];

      this.dkxxList.map(({ CRQK, CJJ, QSJ, TDMJ, CRCJSJ }) => {
        if (CRQK == "已出让" && CRCJSJ != "/") {
          crdkObj[CRCJSJ.split(" ")[0]].value++;
          CJJ != "/" &&
            (crjeObj[CRCJSJ.split(" ")[0]].value =
              Number(crjeObj[CRCJSJ.split(" ")[0]].value) + Number(CJJ));
          TDMJ != "/" &&
            (crmjObj[CRCJSJ.split(" ")[0]].value =
              Number(crmjObj[CRCJSJ.split(" ")[0]].value) + Number(TDMJ));
        }
      });

      for (let k in crdkObj) {
        crdkData.push(crdkObj[k]);
      }

      Object.values(crjeObj).map(item => {
        item.value = (Number(item.value) / 10000).toFixed(2);
      });

      for (let k in crjeObj) {
        crjeData.push(crjeObj[k]);
      }

      Object.values(crmjObj).map(item => {
        item.value = Number(item.value).toFixed(2);
      });

      for (let k in crmjObj) {
        crmjData.push(crmjObj[k]);
      }

      this.dataList = crdkData;

      this.dataHash = {
        crdk: crdkData,
        crje: crjeData,
        crmj: crmjData
      };

      this.doChart();
    },
    doChart() {
      const chart = this.$echarts.init(document.getElementById("crjzChart"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "6%",
          top: "16%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          // boundaryGap: false,
          data: this.dataList.map(({ name }) => {
            return (
              name.substr(0, name.indexOf("年") + 1) +
              "\n" +
              name.substr(name.indexOf("年") + 1)
            );
          }),
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
          name:
            this.index == "crdk" ? "宗" : this.index == "crje" ? "亿元" : "亩",
          minInterval: 1,
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
            name:
              this.index == "crdk"
                ? "做地地块"
                : this.index == "crje"
                ? "地块货值"
                : "地块面积",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(254,77,105)",
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
            data: this.dataList
          }
        ]
      });
    },
    bqSelect: function(event) {
      this.dataList = this.dataHash[event.target.value];
      this.index = event.target.value;
      this.$echarts.init(document.getElementById("crjzChart")).clear();
      this.doChart();
    }
  },
  created() {
    /* this.dataList = [
      { name: "3月", value: 0 },
      { name: "4月", value: 0 },
      { name: "5月", value: 0 },
      { name: "6月", value: 0 },
      { name: "7月", value: 0 },
      { name: "8月", value: 0 },
      { name: "9月", value: 0 },
      { name: "10月", value: 0 },
      { name: "11月", value: 0 },
      { name: "12月", value: 4 },
      { name: "1月", value: 0 },
      { name: "2月", value: 0 }
    ]; */
  },
  mounted() {
    !this.dkxxList.length && this.fetchdkxxList();
    this.fixdkxxList();
  },
  watch: {
    dkxxList(n) {
      this.fixdkxxList();
    }
  }
};
</script>

<style lang="less" scoped>
#crjzDiv {
  width: 100%;
  height: 30%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  > div {
    text-align: left;
    height: 15%;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 12px;
      left: 20px;
      font-weight: 500;
      border-left: 5px solid;
      padding-left: 5px;
    }

    select {
      position: relative;
      float: right;
      top: 12px;
      right: 24px;
      padding: 4px 9px;
      background-color: #1b45a7;
      border: 1px solid #61ebff;
      color: #fff;
    }
  }

  #crjzChart {
    width: 100%;
    height: 85%;
  }
}
</style>
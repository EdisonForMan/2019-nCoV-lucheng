<template>
  <div id="tdytDiv">
    <div>
      <span class="title">2020年计划出让土地用途统计图</span>
    </div>
    <div id="tdytChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
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

      const ytHash = {
        住宅用地: {
          value: 0,
          name: "住宅",
          itemStyle: { color: "rgb(255, 255, 0)" },
          textStyle: { color: "rgb(255, 255, 0)" }
        },
        商服用地: {
          value: 0,
          name: "商服",
          itemStyle: { color: "rgb(255, 0, 0)" },
          textStyle: { color: "rgb(255, 0, 0)" }
        },
        商住用地: {
          value: 0,
          name: "商住",
          itemStyle: { color: "rgb(255, 127, 0)" },
          textStyle: { color: "rgb(255, 127, 0)" }
        },
        医疗卫生用地: {
          value: 0,
          name: "医疗",
          itemStyle: { color: "rgb(255, 191, 0)" },
          textStyle: { color: "rgb(255, 191, 0)" }
        },
        教育用地: {
          value: 0,
          name: "教育",
          itemStyle: { color: "rgb(255, 159, 127)" },
          textStyle: { color: "rgb(255, 159, 127)" }
        }
      };

      const tdytObj = JSON.parse(JSON.stringify(ytHash));

      const tdytData = [];

      this.dkxxList.map(({ TDYT }) => {
        TDYT != null && tdytObj[TDYT] && tdytObj[TDYT].value++;
      });

      for (let k in tdytObj) {
        tdytData.push(tdytObj[k]);
      }

      this.dataList = tdytData;

      this.doChart();
    },
    doChart() {
      const chart = this.$echarts.init(document.getElementById("tdytChart"));
      chart.setOption({
        grid: {
          top: "14%"
        },
        legend: {
          orient: "vertical",
          right: "5%",
          align: "left",
          top: "middle",
          itemHeight: 15,
          textStyle: {
            fontSize: 15,
            padding: [0, 0, 0, 5]
          },
          data: this.dataList
        },
        series: [
          {
            type: "pie",
            minAngle: 2,
            radius: ["40%", "70%"],
            center: ["40%", "50%"],
            clockwise: false,
            label: {
              normal: {
                show: true,
                position: "outter",
                formatter: function(params) {
                  return `${params.data.name} ${params.percent}%`;
                },
                textStyle: {
                  fontSize: 13
                }
              }
            },
            labelLine: {
              normal: {
                length: 10,
                length2: 7
              }
            },
            data: this.dataList
          }
        ]
      });
    }
  },
  created() {
    /* this.dataList = [
      {
        value: 1,
        name: "住宅",
        itemStyle: { color: "#f7dc2b" },
        textStyle: { color: "#f7dc2b" }
      },
      {
        value: 3,
        name: "商住",
        itemStyle: { color: "#f67b28" },
        textStyle: { color: "#f67b28" }
      },
      {
        value: 0,
        name: "商办",
        itemStyle: { color: "#2ed8cb" },
        textStyle: { color: "#2ed8cb" }
      },
      {
        value: 0,
        name: "医疗",
        itemStyle: { color: "#31b2f6" },
        textStyle: { color: "#31b2f6" }
      }
    ]; */
  },
  mounted() {
    // this.doChart();
    // !this.dkxxList.length && this.fetchdkxxList();
    // console.log("dkxx", this.dkxxList);

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
#tdytDiv {
  width: 100%;
  height: 32%;
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
  }

  #tdytChart {
    width: 100%;
    height: 85%;
  }
}
</style>
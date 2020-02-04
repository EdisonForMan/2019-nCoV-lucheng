<template>
<div class="relation" >
  <head>
    <span>{{title}}-密切接触者</span>
    <span id="close" @click="close()">x</span>
  </head>
  <div>
    <div class="list">
    <!-- <ul class="bt">
        <li>序号</li>
        <li>姓名</li>
        <li>关系</li>
        <li>性别</li>
        <li>地址</li>
        <li>健康</li>
    </ul> -->
      <ul>
          <li>
              <span>序号</span>
              <span>姓名</span>
              <span>关系</span>
              <span>性别</span>
              <span>地址</span>
          </li>
        <li v-for="(item,index) in list" :key="index" @click="goLocation(item)">
          <span>{{++index}}.</span>
          <span>{{item.attributes.NAME.slice(0,1)}}**</span>
          <span>{{item.attributes.Relation}}</span>
          <span>{{item.attributes.Sex}}</span>
          <span>{{item.attributes.Address_Department}}</span>
        </li>
        <!-- <li v-if="!list.length">暂无</li> -->
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "relation",
  data() {
    return {
      title: "",
      list: [],
      chart: undefined
    };
  },
  mounted() {},
  methods: {
    goLocation(item) {
      console.log(item.geometry);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    close(){
        this.$parent.relationShow = false;
    },
    doChart(list) {
      this.chart = this.$echarts.init(document.getElementById("cframe"));
      const sObj = {};
      const sArr = [];
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
        xAxis: {
          type: "category",
          axisLabel: {
            textStyle: {
              color: "#fff"
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
            label: {
              show: true,
              position: "top",
              color: "#fff"
            }
          }
        ]
      });
    }
  },
  watch: {
    // list(newV, oldV) {
    //   this.$nextTick(() => {
    //     newV.length ;
    //   });
    // }
  }
};
</script>

<style lang="less" scoped>
.relation {
  position: absolute;
  width: 400px;
  height: 300px;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 360px;
  bottom: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  head {
    display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 40px;
  }
  #close {
    float: right;
    padding: 5px;
    font-size: 17px;
    cursor: pointer;
  }
  > div {
    flex: 1;
    .list {
      height: 258px;
      overflow: auto;
      text-align: left;
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
          display: flex;
          span{
              width: 47px;
             //flex: 1;
          }
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
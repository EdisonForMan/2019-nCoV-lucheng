<template>
  <div id="detailList">
    <div class="detail_header">
      <span>【 {{ title }} 】 - 详情</span>
      <a @click="()=>{ this.$parent.listShow = false }">×</a>
    </div>
    <div class="detail_body">
      <Border>
        <div class="tb_out">
          <div class="tb_header">
            <span>序号</span>
            <span>名称</span>
            <span>类型</span>
            <span>所属街道</span>
          </div>
          <div class="tb_body">
            <div v-for="(item, index) in elList" :key="index">
              <span>{{ ++index }}</span>
              <span>{{ item.name }}</span>
              <span>{{ item.type }}</span>
              <span>{{ item.district }}</span>
            </div>
          </div>
        </div>
      </Border>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { csSortHash, csMap, countryList } from "../config/hash";
import Border from "@/components/common/widget/border";
// import { leftOptions } from "../config/enums";

// import relation from "./relation";

export default {
  name: "listxq",
  data() {
    return {
      text: undefined,
      data: [],
      forceData: [],
      fieldList: [],
      title: "",
      qzflag: false,
      relationShow: false,
      selectValue: 0,
      sObj: {},
      sArr: [],
      keyList: [],
      items: {},
      elList: [],
      countryHash: {
        山福: 1,
        藤桥: 2,
        仰义: 3,
        丰门: 4,
        双屿: 5,
        广化: 6,
        五马: 7,
        松台: 8,
        大南: 9,
        南郊: 10,
        南汇: 11,
        蒲鞋市: 12,
        滨江: 13,
        七都: 14,
        区直设: 15
      }
    };
  },
  components: { Border },
  created() {},
  mounted() {
    // this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  // components: { relation },
  watch: {},
  methods: {
    filterItem(country) {
      // console.log(country);
      if (this.items.hasOwnProperty(country)) {
        this.elList = this.items[country];
      } else {
        const list = this.elList;
        // console.log(country);
      }
    },

    getItem({ url, sublayers, id, name, definitionExpression }) {
      this.title = name.split(" ")[0];
      // const countryName = window.countryName;
      // console.log()
      if (this.items.hasOwnProperty(id)) {
        this.elList = this.items[id];
      } else {
        const that = this;
        const d = [];
        this.sObj = {};
        this.sArr = [];
        definitionExpression && d.push(definitionExpression);

        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({ url: `${url}/${sublayers}` });
          const query = new Query();
          query.outFields = "*";
          query.where = d.length ? d.join(" and ") : "1=1";
          query.returnGeometry = true;
          query.start = 0;
          query.num = 20;
          const { features } = await queryTask.execute(query);
          const list = features;

          const sObj = {};
          const sArr = [];

          that.items[id] = [];

          let countryName = "";

          // if (window.user.group.length) {
          //   const group = window.user.group;
          //   const groups = [];
          //   group.map(({ au_groupname }) => {
          //     if (~countryList.indexOf(au_groupname)) {
          //       countryName = au_groupname;
          //       return;
          //     }
          //   });
          // }

          if (countryName != "") {
            list.map(({ attributes, geometry }) => {
              if (attributes.District == countryName) {
                that.items[id].push({
                  name: attributes.NAME,
                  address: attributes.ADDRESS,
                  district: attributes.District,
                  type: attributes.TYPE
                });
              }
            });
          } else {
            list.map(({ attributes, geometry }) => {
              that.items[id].push({
                name: attributes.NAME,
                address: attributes.ADDRESS,
                district: attributes.District,
                type: attributes.TYPE
              });
            });
          }

          that.elList = that.items[id];
        });
      }
    },

    goLocation(item) {
      this.$parent.$refs.macroArcgis.goloaction(item);
      this.$parent.listShow = false;
    },

    // 详情点击事件
    clickCell(index) {
      // const item = this.forceData[index];
      // this.showrelation(item);
    },
    // 表格行点击事件
    clickTr(row, column, event) {
      // if (event.target.innerText != "详情") {
      //   const item = this.forceData[row.index - 1];
      //   item.id =
      //     this.title == "确诊病例"
      //       ? "qzbl"
      //       : this.title == "集中医学观察点"
      //       ? "gld"
      //       : item.id;
      // this.$parent.$refs.macroArcgis.goloaction(item);
      // this.$parent.listShow = false;
      // }
    }
  }
};
</script>

<style lang="less" scoped>
#detailList {
  position: fixed;
  top: 15%;
  left: 20%;
  width: 750px;
  height: 520px;
  background: rgba(38, 74, 160, 0.8);
  border: 1px solid #526aa2;
  z-index: 31;

  .detail_header {
    margin-top: 1%;
    text-align: left;
    padding: 5px 10px;
    padding-left: 20px;

    span {
      font-family: PingFang SC;
      font-size: 20px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -2px;
        transform: translate(0, -50%);
        margin-right: 15px;
        height: 16px;
        width: 3px;
        background-color: #fff;
      }
    }

    a {
      position: absolute;
      top: 0px;
      right: 10px;
      font-size: 40px;
      cursor: pointer;
    }
  }

  .detail_body {
    margin-top: 10px;
    padding: 5px 15px;
  }

  .tb_out {
    max-height: 400px;
    background-color: #123790;
    border-radius: 4px;
    padding: 8px 13px;

    overflow-y: auto;

    &::-webkit-scrollbar {
      display: block;
      width: 7px;
      background-color: #11368f;
      position: absolute;
      right: 30px;
    }

    &::-webkit-scrollbar-thumb {
      width: 7px;
      background-color: #fff;
      border-radius: 4px;
    }

    .tb_header {
      > span {
        display: inline-block;
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 600;
        color: #60d6fb;

        &:nth-child(1) {
          width: 10%;
          text-align: left;
        }
        &:nth-child(2) {
          width: 50%;
        }
        &:nth-child(3) {
          width: 20%;
        }
        &:nth-child(4) {
          width: 20%;
        }
      }
    }

    .tb_body {
      > div {
        background-color: #274a9a;
        margin: 8px 0px;
        padding: 10px 0px;

        span {
          display: inline-block;
          font-family: PingFang SC;
          font-size: 15px;
          position: relative;

          &:nth-child(1) {
            width: 10%;
            font-size: 16px;
            font-weight: 600;
          }
          &:nth-child(2) {
            width: calc(50% - 0px);
          }
          &:nth-child(3) {
            width: 20%;
          }
          &:nth-child(4) {
            width: 20%;
          }

          &:first-child::before {
            width: 0px;
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -2px;
            transform: translate(0, -50%);
            margin-right: 15px;
            height: 16px;
            width: 1px;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
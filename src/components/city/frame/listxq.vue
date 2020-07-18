<template>
  <div id="listxq">
    <div class="head">
      <span>[ {{title}} ] - 详情列表</span>
      <a @click="()=>{ this.$parent.listShow = false }">×</a>
    </div>
    <!-- <div class="search" v-if="sArr.length && sArr[0].Country">
      <select id="select" @change="selectCountry($event)" v-if="sArr.length && sArr[0].Country">
        <option value="0">全部</option>
        <option
          v-for="(citem,cindex) in sArr"
          :key="cindex"
          :value="citem.Country"
        >{{ citem.Country }}</option>
      </select>
      <input type="text" v-model="text" placeholder="请输入查询" />
      <button @click="filteItem">查询</button>
    </div>-->

    <el-table :data="elList" max-height="510" border @row-click="clickTr">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型" width="300"></el-table-column>
      <el-table-column prop="district" label="所属街道"></el-table-column>
      <!-- <el-table-column prop="zrr_type" label="责任人类型" width="190"></el-table-column>
      <el-table-column prop="zrr_name" label="责任人姓名" width="150"></el-table-column>
      <el-table-column prop="zrr_phone" label="责任人联系方式" width="150"></el-table-column>-->
    </el-table>
    <!-- <div class="content">
      <table border="0" cellpadding="0" cellspacing="0" v-if="sArr.length && sArr[0].Country">
        <thead>
          <tr>
            <th>街道</th>
            <th v-for="(citem,cindex) in sArr" :key="cindex">{{citem.Country}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>合计</td>
            <td v-for="(citem,cindex) in sArr" :key="cindex">{{citem.count}}例</td>
          </tr>
        </tbody>
      </table>
    </div>-->
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { csSortHash, csMap, countryList } from "../config/hash";
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
  created() {},
  mounted() {
    // this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  // components: { relation },
  watch: {
    /* forceData(newV, oldV) {
      const that = this;

      this.keyList = [];
      this.elList = [];

      if (this.forceData.length) {
        this.keyList.push({
          prop: "index",
          label: "序号"
        });

        this.fieldList.length &&
          this.fieldList.map(k => {
            this.keyList.push({
              prop: k,
              label: that.forceData[0].fieldAliases[k]
            });
          });

        this.forceData.map((item, index) => {
          const obj = {};
          that.keyList.map((_item, i) => {
            if (_item.prop == "index") {
              obj[_item.prop] = index + 1;
            } else if (
              ~["Name", "NAME"].indexOf(_item.prop) &&
              ~[
                "确诊病例",
                "疑似病例",
                "集中医学观察点人员名单",
                "密切接触者",
                "居家隔离人员",
                "湖北回鹿人员/信令",
                "银泰员工",
                "隔离名单"
              ].indexOf(that.title)
            ) {
              obj[_item.prop] = `${item.attributes[_item.prop] &&
                item.attributes[_item.prop].trim().substr(0, 1)}*${item
                .attributes[_item.prop] &&
                item.attributes[_item.prop].trim().substr(-1, 1)}`;
            } else {
              obj[_item.prop] = item.attributes[_item.prop];
            }
          });

          that.elList.push(obj);
        });
      }
    } */
  },
  methods: {
    filteItem() {
      const data = this.data;
      const forceData = [];
      data.map(item => {
        const { attributes } = item;

        const cTag = attributes.Country || attributes.Community;

        const cv = this.selectValue != 0 ? this.selectValue : "";

        const ntag =
          attributes.name ||
          attributes.Name ||
          attributes.NAME ||
          attributes.Address ||
          attributes.short_name ||
          attributes.姓名;

        ntag &&
          ~ntag.indexOf(this.text) &&
          cTag &&
          ~cTag.indexOf(cv) &&
          forceData.push(item);
      });
      this.forceData = forceData;
    },
    selectCountry(event) {
      this.selectValue = event.target.value;
      const data = this.data;
      const forceData = [];
      data.map(item => {
        const { attributes } = item;

        const cTag = attributes.Country;
        const cv = this.selectValue != 0 ? this.selectValue : "";
        cTag && ~cTag.indexOf(cv) && forceData.push(item);
      });
      this.forceData = forceData;
    },
    getItem({ url, sublayers, id, name, definitionExpression }) {
      this.title = name.split(" ")[0];
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

          if (window.user.group.length) {
            const group = window.user.group;
            const groups = [];
            group.map(({ au_groupname }) => {
              if (~countryList.indexOf(au_groupname)) {
                countryName = au_groupname;
                return;
              }
            });
          }

          if (countryName != "") {
            list.map(({ attributes, geometry }) => {
              if (attributes.District == countryName) {
                that.items[id].push({
                  name: attributes.NAME,
                  address: attributes.ADDRESS,
                  district: attributes.District,
                  type: attributes.TYPE,
                  zrr_type: attributes.ZRR_TYPE,
                  zrr_name: attributes.ZRR_NAME,
                  zrr_phone: attributes.ZRR_PHONE
                });
              }
            });
          } else {
            list.map(({ attributes, geometry }) => {
              that.items[id].push({
                name: attributes.NAME,
                address: attributes.ADDRESS,
                district: attributes.District,
                type: attributes.TYPE,
                zrr_type: attributes.ZRR_TYPE,
                zrr_name: attributes.ZRR_NAME,
                zrr_phone: attributes.ZRR_PHONE
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
#listxq {
  position: absolute;
  top: 10%;
  left: 6%;
  width: 88%;
  height: 78%;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 31;

  .head {
    height: 7%;
    margin-top: 1%;

    span {
      font-size: 30px;
    }

    a {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 40px;
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

  // element-table
  .el-table {
    width: 96%;
    margin: auto;
    background-color: #24386a;
  }

  .el-button--text {
    font-size: 16px;
  }

  .content {
    height: 90px;

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
}
</style>
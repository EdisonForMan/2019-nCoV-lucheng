<template>
  <div id="sbxqDateDiv">
    <div class="head">
      <span>[ {{ title }} ] - 详情列表</span>
      <a v-on:click="sbclose">×</a>
    </div>

    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0" v-if="forceData && forceData.length">
        <thead>
          <tr>
            <th>序号</th>
            <th v-for="(k,i) in keyData" :key="i">{{ forceData[0].fieldAliases[k] }}</th>
          </tr>
        </thead>
        <tbody
          v-if="~['确诊病例','疑似病例','集中医学观察点人员名单','密切接触者','居家隔离人员','湖北回鹿人员信令','银泰员工','隔离名单'].indexOf(title)"
        >
          <tr
            v-for="(item,index) in forceData"
            :key="index"
            @click="goLocation(item)"
            style="cursor: pointer;"
          >
            <td>{{ ++index }}</td>
            <td
              v-for="(k,i) in keyData"
              :key="i"
            >{{ item.attributes[k]?(~["Name","NAME"].indexOf(k)?`${item.attributes[k].trim().substr(0,1)}*${item.attributes[k].trim().substr(-1,1)}`:item.attributes[k]):"无" }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(item,index) in forceData"
            :key="index"
            @click="goLocation(item)"
            style="cursor: pointer;"
          >
            <td>{{ ++index }}</td>
            <td v-for="(k,i) in keyData" :key="i">{{ item.attributes[k] || "无" }}</td>
          </tr>
        </tbody>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" v-if="!forceData.length">
        <tbody>
          <tr>
            <td>暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "./config/enums";

export default {
  name: "sbDate",
  data() {
    return {
      text: undefined,
      data: [],
      forceData: [],
      keyData: [],
      title: "",
      countryHash: {
        山福镇: 0,
        藤桥镇: 1,
        仰义街道: 2,
        丰门街道: 3,
        双屿街道: 4,
        广化街道: 5,
        五马街道: 6,
        松台街道: 7,
        大南街道: 8,
        南郊街道: 9,
        南汇街道: 10,
        蒲鞋市街道: 11,
        滨江街道: 12,
        七都街道: 13
      }
    };
  },
  created() {},
  mounted() {
    this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  components: {},
  methods: {
    // filteItem() {
    //   const data = this.data;
    //   const forceData = [];
    //   data.map(item => {
    //     const { attributes } = item;
    //     const tag =
    //       attributes.name ||
    //       attributes.Name ||
    //       attributes.NAME ||
    //       attributes.Address ||
    //       attributes.short_name ||
    //       attributes.姓名;
    //     tag && ~tag.indexOf(this.text) && forceData.push(item);
    //   });
    //   this.forceData = forceData;
    // },
    getItem(
      { url, sublayers, id, name, ytname, definitionExpression, ytd },
      label
    ) {
      const d = [];
      definitionExpression && d.push(definitionExpression);
      this.$parent.$refs.leftOptions.tabIndex == 1 && ytd && d.push(ytd);
      this.title =
        name != "-1" ? `${name}`.split(" ")[0] : `${ytname}`.split(" ")[0];
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
        const { fields, features } = await queryTask.execute(query);
        const fieldAliases = {};
        fields.map(item => {
          fieldAliases[item.name] = item.alias;
        });
        const list = features.map(item => {
          item.fieldAliases = fieldAliases;
          return item;
        });
        //  高速额外请求个服务
        if (id == "highway_type_1") {
          const highWayList = await this.getHighWay(url);
          const highWayObject = {};
          highWayList.map(item => {
            if (!highWayObject[item.attributes.Expressway]) {
              highWayObject[item.attributes.Expressway] = [];
            }
            highWayObject[item.attributes.Expressway].push(item);
          });
          list.map(item => {
            highWayObject[item.attributes.Name] &&
              (item.highWayList = highWayObject[item.attributes.Name]);
            return item;
          });
        }
        // 密接关联
        if (id == "qzbl") {
          const mjList = await this.getMj(url);
          const mjObject = {};
          mjList.map(item => {
            if (
              item.attributes.RelatingCodes != "" &&
              (item.attributes.RelatingCodes != null) &
                !mjObject[item.attributes.RelatingCodes]
            ) {
              mjObject[item.attributes.RelatingCodes] = [];
            }
            if (
              item.attributes.RelatingCodes != "" &&
              item.attributes.RelatingCodes != null
            ) {
              mjObject[item.attributes.RelatingCodes].push(item);
            }
          });
          list.map(item => {
            mjObject[item.attributes.Bid] &&
              (item.mjList = mjObject[item.attributes.Bid]);
            return item;
          });
        }
        this.data = list;
        this.forceData = list.sort((a, b) => {
          return (
            this.countryHash[b.attributes.Country] -
            this.countryHash[a.attributes.Country]
          );
        });
        this.keyData =
          this.forceData[0] &&
          Object.keys(this.forceData[0].fieldAliases).filter(k => {
            return (
              [
                "序号",
                "隔离点编码",
                "OBJECTID",
                "OBJECTID_1",
                "Bid",
                "bid",
                "Question",
                "question",
                "yy",
                "Note",
                "RelatingCodes",
                "Shape.STArea()",
                "Shape.STLength()",
                "pd",
                "小区面名称",
                "小区面唯一码",
                "Id",
                "X",
                "Y"
              ].indexOf(k) < 0
            );
          });
        this.text = undefined;
      });
    },
    getHighWay(url) {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({ url: `${url}/1` });
          const query = new Query();
          query.outFields = ["*"];
          query.where = `1=1`;
          const { fields, features } = await queryTask.execute(query);
          const fieldAliases = {};
          fields.map(item => {
            fieldAliases[item.name] = item.alias;
          });
          const list = features.map(item => {
            item.fieldAliases = fieldAliases;
            return item;
          });
          resolve(list);
        });
      });
    },
    getMj(url) {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/4`
          });
          const query = new Query();
          query.outFields = ["*"];
          query.where = `1=1`;
          const { fields, features } = await queryTask.execute(query);
          const fieldAliases = {};
          fields.map(item => {
            fieldAliases[item.name] = item.alias;
          });
          const list = features.map(item => {
            item.fieldAliases = fieldAliases;
            return item;
          });
          resolve(list);
        });
      });
    },
    goLocation(item) {
      this.$parent.$refs.macroArcgis.goloaction(item);
      this.$parent.xqShow = false;
    },
    sbclose() {
      this.$parent.xqShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
#sbxqDateDiv {
  position: absolute;
  width: 88%;
  height: 78%;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 20;
  top: 0;
  margin: auto;
  left: 6%;
  top: 10%;

  .head {
    height: 7%;
    margin-top: 1%;

    span {
      font-size: 30px;
    }

    a {
      float: right;
      font-size: 40px;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .content {
    height: 88%;
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
}
</style>
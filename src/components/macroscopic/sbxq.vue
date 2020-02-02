<template>
  <div id="sbxqDateDiv">
    <head>
      <span>{{this.title}}详情列表</span>
      <span id="close" @click="sbclose()">x</span>
    </head>
    <!-- <h3>- 确诊病例动态更新 -</h3> -->
    <div>
    <ul>
      <li v-for="(item,index) in forceData" :key="index" @click="goLocation(item)">
        <span
          v-if="item.label == '疫情分布' && item.id != 'gld' && item.id != 'mj' && item.id != 'mj2'"
        >{{++index}}.患者：{{item.attributes.Name.slice(0,1)}}**，{{item.attributes.Sex}}，{{item.attributes.Address}}，{{item.attributes.Age}}</span>
        <span
          v-if="item.id == 'mj' || item.id == 'mj2'"
        >{{++index}}.患者：{{item.attributes.Name.slice(0,1)}}**，{{item.attributes.Sex}}，{{item.attributes.Address_Department}}</span>
        <span
          v-if="item.label == '疫情分布' && item.id == 'gld'"
        >{{++index}}.{{item.attributes.Name}}，{{item.attributes.Address}}</span>
        <!-- <span v-if="item.label == '疫情分布' && item.id == 'mj'">{{++index}}.{{item.attributes.Name}}</span> -->
        <span v-if="item.label == '医疗资源'">{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'highway_type_1'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_2'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_3'">{{++index}}.{{item.attributes.name}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id == 'people_type_3'"
        >{{++index}}.{{item.attributes.name}}</span>
        <span
          v-if="item.label == '人员密集场所' && (item.id == 'people_type_7')"
        >{{++index}}.{{item.attributes.Address}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id != 'people_type_3' && item.id != 'people_type_7'"
        >{{++index}}.{{item.attributes.Name}}</span>
        <span
          v-if="item.id == 'people_type_8' || item.id == 'people_type_9'"
        >{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'xq'">{{++index}}.{{item.attributes.name}}</span>
        <span v-if="item.id == 'xqjck'">{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'wg'">{{++index}}.{{item.attributes.Name}}</span>
      </li>
    </ul>
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
      title:""
    };
  },
  created() {},
  mounted() {
    this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  components: {  },
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
    getItem({ url, sublayers, id, name, definitionExpression, ytd }, label) {
      const d = [];
      definitionExpression && d.push(definitionExpression);
      this.$parent.$refs.leftOptions.shallYT && ytd && d.push(ytd);
      this.title = `${name}`.split(" ")[0];
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
          item.label = label;
          item.id = id;
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
        this.forceData = list;
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
    },
    sbclose(){
      this.$parent.xqShow = false;
    }
  }
};
</script>

<style>
#sbxqDateDiv {
  /* width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  overflow-y: scroll;
  position: relative; */
  position: absolute;
    width: 80%;
    height: 78%;
    background: #24386a;
    border: 1px solid #04ecff;
    z-index: 20;
    top: 0;
    margin: auto;
    left: 10%;
    top: 10%;
    box-sizing: border-box;
    
 
}
#sbxqDateDiv head{
  display: block;
    box-sizing: border-box;
    padding: 5px;
    height: 40px;
}
#sbxqDateDiv #close{
  float: right;
  padding: 5px;
  font-size: 17px;
  cursor: pointer;
}
#sbxqDateDiv head span{
  font-size: 20px;
}
#sbxqDateDiv div{
    overflow: auto;
    height: 90%;
    width: 100%;
}
#sbxqDateDiv div::-webkit-scrollbar {
  display: none;
}
#sbxqDateDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#sbxqDateDiv ul {
  list-style: none;
  width: 96%;
  margin-left: 2%;
}
 #sbxqDateDiv ul li {
  padding: 10px 0;
  background: #122960;
  text-align: left;
  padding-left: 15px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
 #sbxqDateDiv ul li:nth-child(even) {
  background: #081942;
}
#sbxqDateDiv ul li:hover {
  cursor: pointer;
  background-color: #0b5cc7;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #fff;
}
</style>
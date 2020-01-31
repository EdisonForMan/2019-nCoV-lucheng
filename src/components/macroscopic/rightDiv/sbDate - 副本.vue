<template>
  <div id="sbDateDiv">
    <input
      type="text"
      placeholder="请输入查询"
      style="width: 80%;margin-top: 10px;background-color: #162449;border: 1px solid #75c8f4;border-radius: 8px;padding: 8px 9px; color:#fff"
    />
    <button
      style="background-color: #162449;border: 1px solid #75c8f4;border-radius: 8px;padding: 7px 9px; color:#fff"
    >查询</button>
    <!-- <h3>- 确诊病例动态更新 -</h3> -->
    <ul>
      <li v-for="(item,index) in data" :key="index" @click="goLocation(item)">
        <span
          v-if="item.label == '疫情分布' && item.id != 'gld'"
        >{{++index}}.患者：{{item.attributes.Name.slice(0,1)}}**，{{item.attributes.Sex}}，{{item.attributes.Address}}，{{item.attributes.Age}}</span>
        <span v-if="item.label == '医疗资源'">{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'highway_type_1'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_2'">{{++index}}.{{item.attributes.Name}}</span>
        <span v-if="item.id == 'highway_type_3'">{{++index}}.{{item.attributes.short_name}}</span>
        <span
          v-if="item.label == '疫情分布' && item.id == 'gld'"
        >{{++index}}.{{item.attributes.Name}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id == 'people_type_2'"
        >{{++index}}.{{item.attributes.name}}</span>
        <span
          v-if="item.label == '人员密集场所' && item.id != 'people_type_2'"
        >{{++index}}.{{item.attributes.NAME}}</span>
        <span v-if="item.id == 'xq'">{{++index}}.{{item.attributes.name}}</span>
        <span v-if="item.id == 'xqjck'">{{++index}}.{{item.attributes.NAME}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "../enums";

export default {
  name: "sbDate",
  data() {
    return {
      data: []
    };
  },
  created() {},
  mounted() {
    this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  computed: {},
  methods: {
    getItem({ url, sublayers, id, name }, label) {
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({ url: `${url}/${sublayers}` });
        const query = new Query();
        query.outFields = "*";
        query.where = `1=1`;
        query.returnGeometry = true;
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
        this.data = list;
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
    goLocation(item) {
      this.$parent.$refs.macroArcgis.goloaction(item);
    },
    sbDate() {
      this.$parent.$refs.macroArcgis.ybclick();
      this.$parent.$refs.macroArcgis.goloaction();
    }
  }
};
</script>

<style>
#fy-rightDiv #sbDateDiv {
  width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;
  overflow-y: scroll;
}
#fy-rightDiv #sbDateDiv::-webkit-scrollbar {
  display: none;
}
#fy-rightDiv #sbDateDiv h3 {
  color: #23c9f3;
  margin-top: 10px;
}
#fy-rightDiv #sbDateDiv ul {
  list-style: none;
  width: 96%;
  margin-left: 2%;
  margin-top: 3%;
}
#fy-rightDiv #sbDateDiv ul li {
  padding: 10px 0;
  background: #122960;
  text-align: left;
  padding-left: 15px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
#fy-rightDiv #sbDateDiv ul li:nth-child(even) {
  background: #081942;
}
#fy-rightDiv #sbDateDiv ul li:hover {
  cursor: pointer;
  background-color: #0b5cc7;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #fff;
}
</style>
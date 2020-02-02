<template>
  <div id="popDiv" v-show="popShow">
    <a
      v-on:click="popClose"
      style="float: right;font-size: 40px;margin-right: 10px;cursor: pointer;"
    >×</a>
    <!-- <head>
    <span>详情列表</span>
    <span id="close" @click="popClose">x</span>
  </head>
    <div>-->
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr v-if="type==1">
          <th>序号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>联系电话</th>
          <th>家庭住址</th>
          <th>是否湖北回鹿</th>
        </tr>
        <tr v-if="type==2">
          <th>序号</th>
          <th>街镇</th>
          <th>集中隔离点名称</th>
          <th>地点</th>
          <th>联络人</th>
          <th>联系电话</th>
          <th>房间数</th>
          <th>使用人数</th>
          <th>其中湖北回鹿人数</th>
          <th>剩余可用房间数</th>
          <th>是否启用</th>
        </tr>
      </thead>
      <tbody v-if="type==1">
        <tr v-for="(item,index) in manData" :key="index">
          <td>{{ ++index }}</td>
          <td>{{ item.attributes.Name }}</td>
          <td>{{ item.attributes.Sex }}</td>
          <td>{{ item.attributes.Phone }}</td>
          <td>{{ item.attributes.Address }}</td>
          <td>{{ item.attributes.IsHBtoLC }}</td>
        </tr>
      </tbody>
      <tbody v-if="type==2">
        <tr v-for="(item,index) in roomData" :key="index">
          <td>{{ ++index }}</td>
          <td>{{ item.attributes.Country }}</td>
          <td>{{ item.attributes.Name }}</td>
          <td>{{ item.attributes.Address }}</td>
          <td>{{ item.attributes.Linkman }}</td>
          <td>{{ item.attributes.Phone }}</td>
          <td>{{ item.attributes.Rooms }}</td>
          <td>{{ item.attributes.UseNumber }}</td>
          <td>{{ item.attributes.HBtoLCNumber ? item.attributes.HBtoLCNumber : 0 }}</td>
          <td>{{ item.attributes.RemainRooms }}</td>
          <td>是</td>
        </tr>
      </tbody>
    </table>
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import util from "./util";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "./config/enums";
export default {
  data() {
    return {
      popShow: false, //弹出框默认隐藏
      roomData: [],
      manData: [],
      type: 1
    };
  },
  methods: {
    popShowDiv(type) {
      const that = this;
      if (type == 1) {
        that.type = 1;
        that.getItem(
          `http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/7`
        );
      } else if (type == 2) {
        that.type = 2;
        that.getItem(
          `http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer/2`
        );
      }
      this.popShow = true; //显示
    },
    popClose() {
      this.popShow = false; //隐藏
    },
    getItem(url) {
      const that = this;
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
          url: url
        });
        const query = new Query();
        query.outFields = "*";
        query.where = `1=1`;
        query.returnGeometry = true;
        const { features } = await queryTask.execute(query);
        if (that.type == 1) {
          that.manData = features;
        } else if (that.type == 2) {
          that.roomData = features;
        }
      });
    }
  },
  mounted() {
    var that = this;
    util.$on("popshow", function(param) {
      that.popShowDiv(param);
    });
  }
};
</script>

<style>
#popDiv {
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
  overflow: auto;
}
#popDiv head {
  display: block;
  box-sizing: border-box;
  padding: 5px;
  height: 40px;
}
#popDiv #close {
  float: right;
  padding: 5px;
  font-size: 17px;
  cursor: pointer;
}
#popDiv head span {
  font-size: 20px;
}
#popDiv table {
  border: 1px solid #ccc;
  width: 96%;
  margin: 3% 2% 3%;
  /* margin-left: 2%;
  margin-top: 3%; */
}
#popDiv table td,
#popDiv table th {
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
}
</style>
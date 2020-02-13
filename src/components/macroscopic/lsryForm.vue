<template>
  <div id="lsyrform" v-if="list.length">
    <div class="head">
      <span>小区出入情况历史统计</span>
      <a @click="()=>{list = []}">×</a>
    </div>
    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th style="width: 10%">序号</th>
            <th style="width: 50%">小区名</th>
            <th style="width: 20%">出小区人次</th>
            <th style="width: 20%">入小区人次</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
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
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { imgHash } from "./config/hash.js";
export default {
  name: "lsryForm",
  data() {
    return {
      server,
      imgHash,
      title: "",
      list: []
    };
  },
  mounted() {
    // this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  methods: {
    goLocation(item) {
      // console.log(item);
      item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    getItem(
      { url, sublayers, id, name, definitionExpression, ytname, ytd },
      label
    ) {
      this.list = [
        {
          name: "金海嘉苑",
          num_in: 20,
          num_out: 20
        },
        {
          name: "仁和嘉园",
          num_in: 20,
          num_out: 20
        },
        {
          name: "大自然家园二期",
          num_in: 20,
          num_out: 20
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
#lsyrform {
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
    height: 7%;
    margin-top: 1%;

    span {
      font-size: 22px;
    }

    a {
      float: right;
      font-size: 30px;
      margin-right: 10px;
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
    height: 80%;
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
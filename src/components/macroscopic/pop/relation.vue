<template>
<div class="relation">
  <head>
    <span>[ {{ title }} ] - 密切接触者</span>
    <span id="close" @click="close()">x</span>
  </head>
  <div>
    <div class="list">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>关系</th>
            <th>性别</th>
            <th>地址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in list" :key="index">
            <td>{{++index}}.</td>
            <td>{{ item.attributes.NAME?`${item.attributes.NAME.trim().substr(0,1)}*${item.attributes.NAME.trim().substr(-1,1)}`:"无" }}</td>
            <td>{{item.attributes.Relation}}</td>
            <td>{{item.attributes.Sex}}</td>
            <td>{{item.attributes.Address_Department}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
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
      // console.log(item.geometry);
      // item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },
    close() {
      this.$parent.relationShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.relation {
  position: absolute;
  width: 600px;
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
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  > div {
    flex: 1;

    .list {
      height: 258px;
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
  }
}
</style>
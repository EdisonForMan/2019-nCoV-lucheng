<template>
  <transition name="fade">
    <div id="warning" @click="close">
      <div id="table">
        <el-table :data="tableData" height="100%" border>
          <el-table-column prop="index" label="序号" sortable width="180"></el-table-column>
          <el-table-column prop="DKMC" label="地块名称" sortable width="180"></el-table-column>
          <el-table-column prop="GZNR" label="工作内容" sortable></el-table-column>
        </el-table>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  name: "warning",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    const that = this;

    for (let i = 0; i < 10; i++) {
      that.tableData.push({
        // date: "2016-05-02",
        // name: "王小虎",
        // address: "上海市普陀区金沙江路 1518 弄"
        index: i + 1,
        DKMC: "大南街道E-24a",
        GZNR: ""
      });
    }

    /* this.tableData = [
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }
    ]; */
  },
  methods: {
    close() {
      this.$parent.warnShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
#warning {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  z-index: 50;

  > div {
    width: 80%;
    height: 20%;
    position: absolute;
    top: 20%;
    left: 10%;

    // element-table
    .el-table {
      // width: 100%;
      // margin: auto;
      background-color: #24386a;
    }
  }
}
</style>
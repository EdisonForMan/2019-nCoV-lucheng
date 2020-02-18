<template>
  <div id="fgxqform" v-if="list.length">
    <div class="head">
      <div class="title">{{ title }}</div>
      <a @click="()=>{ list = [] }">×</a>
    </div>
    <div class="content ctn1">
      <el-table
        height="100%"
        :data="tableData"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        border
      >
        <el-table-column prop="index" label="序号" sortable></el-table-column>
        <el-table-column prop="country" label="街道" sortable></el-table-column>
        <el-table-column prop="num" label="三返人员" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";

import { mapState } from "vuex";

export default {
  name: "fgxqForm",
  data() {
    return {
      server,
      title: "",
      list: [],
      time: ""
    };
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    goLocation(item) {
      // console.log(item);
      // item.geometry && this.$parent.$refs.macroArcgis.goloaction(item);
    },

    getItem({ url, sublayers }) {
      const that = this;

      this.title = `工地返工详情`;
      const datetime = this.dateFormat("YYYY-mm-dd", new Date());
      this.time = `截至 ${datetime}`;

      this.list = [1, 2, 3, 4];

      this.tableData = [
        {
          id: 1,
          index: "1",
          country: "滨江街道",
          num: 2000,
          children: [
            {
              id: 101,
              index: "1-1",
              country: "滨江商务区CBD片区13-03地块建设项目",
              num: 1000
            },
            {
              id: 102,
              index: "1-2",
              country:
                "温州市滨江商务区桃花岛片区T04-16至T04-18地块及道路工程建设项目",
              num: 1000
            }
          ]
        },
        {
          id: 2,
          index: "2",
          country: "大南街道",
          num: 2000,
          children: [
            {
              id: 201,
              index: "2-1",
              country: "温州市荷花路南侧（E-25e）地块",
              num: 1000
            },
            {
              id: 202,
              index: "2-2",
              country: "鹿城区总工会大南办公点（鹿城区职工活动中心）装修工程",
              num: 1000
            }
          ]
        },
        {
          id: 3,
          index: "3",
          country: "丰门街道",
          num: 2000,
          children: [
            {
              id: 301,
              index: "3-1",
              country: "仰义街道岩门旧村改造B-18地块安置房建设工程",
              num: 1000
            },
            {
              id: 302,
              index: "302",
              country: "双屿街道岩门村二产安置建设项目（标准厂房1#-6#）",
              num: 1000
            }
          ]
        },
        {
          id: 4,
          index: "4",
          country: "广化街道",
          num: 2000,
          children: [
            {
              id: 401,
              index: "4-1",
              country: "温州市鹿城区下桥城中村改造工程E-29 地块",
              num: 1000
            },
            {
              id: 402,
              index: "4-2",
              country:
                "广化单元双桥村街坊E-10、E-20、E-24、E-09、E-21、E-23地块及双星路（上桥路至双南线）项目",
              num: 1000
            }
          ]
        }
      ];
    },
    showMsg(item) {
      // console.log(item);
      const that = this;
      // xqjckFormUpdate(that, item.name);

      this.$parent.xqjckShow = true;

      this.$parent.$refs.xqjck.filterItem(item.name);
    },
    // 日期格式化
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(),
        "m+": (date.getMonth() + 1).toString(),
        "d+": date.getDate().toString(),
        "H+": date.getHours().toString(),
        "M+": date.getMinutes().toString(),
        "S+": date.getSeconds().toString()
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="less" scoped>
#fgxqform {
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
    margin-top: 1%;

    .title {
      font-size: 22px;
    }

    .time {
      font-size: 16px;
    }

    a {
      position: absolute;
      top: 0px;
      right: 10px;
      font-size: 30px;
      cursor: pointer;
    }
  }

  .ctn1 {
    height: 88%;
    margin-top: 5%;

    // element-table
    .el-table {
      width: 96%;
      margin: auto;
      background-color: #24386a;
    }

    .el-button--text {
      font-size: 16px;
    }
  }

  .content::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: rgb(107, 134, 223);
    border-radius: 3px;
  }
  .content::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: rgb(14, 10, 247);
    border-radius: 3px;
  }
}
</style>
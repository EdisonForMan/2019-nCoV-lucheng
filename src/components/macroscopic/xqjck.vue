<template>
  <div id="xqjck">
    <div class="head">
      <span>[ {{title}} ] - 进出人员统计</span>
      <a v-on:click="sbclose">×</a>
    </div>
    <div class="statistics">
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>小区内人数</th>
            <th>小区外人数</th>
            <th>该时段进入人数</th>
            <th>该时段外出人数</th>
            <th>进出超标人数</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>200</td>
            <td>200</td>
            <td>100</td>
            <td>100</td>
            <td>30</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content">
      <div class="inner-title">
        <span>进出超标人员详情</span>
      </div>
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>电话号码</th>
            <th>身份证号</th>
            <th>所属小区</th>
            <th>门牌号</th>
            <th>出门时间</th>
            <th>返回时间</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>**</td>
            <td>12345678</td>
            <td>12345678</td>
            <td>金海嘉苑</td>
            <td>9-0303</td>
            <td>2020/2/11 16:43</td>
            <td>2020/2/11 18:43</td>
            <td>普通人员出门登记</td>
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
// import relation from "./relation";

export default {
  name: "sbDate",
  data() {
    return {
      text: undefined,
      data: [],
      forceData: [],
      keyData: [],
      title: "",
      qzflag: false,
      relationShow: false,
      selectValue: 0,
      sObj: {},
      sArr: [],
      sum: 0,
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
  components: {},
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
    xqsearch(event) {
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
    getItem(
      { url, sublayers, id, name, definitionExpression, ytname, ytd },
      label
    ) {
      this.relationShow = false;
      const d = [];
      this.sObj = {};
      this.sArr = [];
      this.sum = 0;
      definitionExpression && d.push(definitionExpression);
      this.$parent.$refs.leftOptions.tabIndex == 1 && ytd && d.push(ytd);
      this.title =
        name != "-1" ? `${name}`.split(" ")[0] : `${ytname}`.split(" ")[0];
      this.title == "确诊病例" ? (this.qzflag = true) : (this.qzflag = false);
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
        let fieldAliases = {};
        if (id == "ytyg") {
          fieldAliases = {
            Name: "姓名",
            Phone: "电话",
            Country: "街道",
            Address: "地址"
          };
        } else {
          fields.map(item => {
            fieldAliases[item.name] = item.alias;
          });
        }

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
        list.map(({ attributes }) => {
          const { Country } = attributes;

          let newCountry = (Country ? Country.trim() : "无")
            .replace("街道", "")
            .replace("镇", "");

          newCountry == "蒲鞋" ? (newCountry = "蒲鞋市") : newCountry;

          if (this.countryHash[newCountry]) {
            if (!newCountry) return false;
            if (!this.sObj[newCountry]) {
              this.sObj[newCountry] = { Country: newCountry, count: 0 };
            }
            this.sObj[newCountry].count++;
          }
        });
        for (let k in this.sObj) {
          this.sArr.push(this.sObj[k]);
        }
        // this.sArr.map(item => {
        //   this.sum += parseInt(item.count);
        // });

        this.sArr.sort((a, b) => {
          const count1 = a.count;
          const count2 = b.count;

          if (count1 == count2) {
            return (
              this.countryHash[b.Country.trim()] -
              this.countryHash[a.Country.trim()]
            );
          }

          return count2 - count1;
        });

        this.forceData = list.sort((a, b) => {
          let country1 = (a.attributes.Country
            ? a.attributes.Country.trim()
            : "无"
          )
            .replace("街道", "")
            .replace("镇", "");
          let country2 = (b.attributes.Country
            ? b.attributes.Country.trim()
            : "无"
          )
            .replace("街道", "")
            .replace("镇", "");

          country1 == "蒲鞋" ? (country1 = "蒲鞋市") : country1;
          country2 == "蒲鞋" ? (country2 = "蒲鞋市") : country2;

          const count1 = this.sObj[country1] ? this.sObj[country1].count : 0;
          const count2 = this.sObj[country2] ? this.sObj[country2].count : 0;

          if (count1 == count2) {
            return (
              this.countryHash[country2 ? country2.trim() : "无"] -
              this.countryHash[country1 ? country1.trim() : "无"]
            );
          }

          return count2 - count1;
        });

        /* this.keyData = Object.keys(this.forceData[0].fieldAliases).filter(k => {
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
              "小区面名称",
              "小区面唯一码",
              "MansionName",
              "TF",
              "Shape_Length_1",
              "Shape_Area_1",
              "Id"
            ].indexOf(k) < 0
          );
        }); */

        if (id == "qzbl" || id == "zzbl") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Sex",
                "Age",
                "Profession",
                "Country",
                "DiseaseTime",
                "Hospital"
              ].indexOf(k);
            });
        } else if (id == "ytyg") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~["Name", "Phone", "Country", "Address"].indexOf(k);
            });
        } else if (id == "gld") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Address",
                "Country",
                "Linkman",
                "Phone",
                "IsUsing"
              ].indexOf(k);
            });
        } else if (id == "gld_list") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Sex",
                "Phone",
                "IsolatePlace",
                "Room",
                "StartIsolationTime",
                "IsTerminateIsolate"
              ].indexOf(k);
            });
        } else if (id == "mj") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "NAME",
                "Sex",
                "Phone",
                "Country",
                "Supervision",
                "DividePlace",
                "Patient",
                "IdentityType"
              ].indexOf(k);
            });
        } else if (id == "jjgl") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Sex",
                "Phone",
                "Address",
                "Country",
                "StartDivideTime",
                "IsDivide"
              ].indexOf(k);
            });
        } else if (id == "hbhw") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Sex",
                "Age",
                "Country",
                "ChargeManPhone"
              ].indexOf(k);
            });
        } else if (id == "glmd") {
          this.keyData =
            this.forceData[0] &&
            Object.keys(this.forceData[0].fieldAliases).filter(k => {
              return ~[
                "Name",
                "Sex",
                "Phone",
                "Address",
                "Community",
                "KSGCSJ"
              ].indexOf(k);
            });
        }

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
      this.$parent.listShow = false;
    },
    showrelation(item) {
      this.relationShow = true;
      this.$refs.relation.list = item.mjList;
      this.$refs.relation.title = item.attributes.Name;
      // console.log(item);
    },
    sbclose() {
      this.$parent.xqjckShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
#xqjck {
  position: absolute;
  width: 88%;
  height: 78%;
  background: #24386a;
  border: 1px solid #04ecff;
  z-index: 25;
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

  .statistics {
    height: 20%;

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
  .content {
    height: 60%;
    overflow: auto;

    .inner-title {
      line-height: 40px;
      span {
        font-size: 20px;
      }
    }

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
<template>
  <div class="Com_content City">
    <div class="Com_map">
      <commonArcgis id="cityArcgis" ref="cityArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}`">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="toggle(), legend()" class="hidden_button"></span>
      </div>
      <div :class="`rightside animated ${icon_show_right?`slideOutRight`:`slideInRight`}`">
        <div id="rightFrame">
          <div class="right_btns">
            <span
              class="detail_btn analyze"
              :class="{ analyze_checked: rightCheckIndex == 0 }"
              @click="() => { rightCheckIndex = 0 }"
            ></span>
            <span
              class="detail_btn detail"
              :class="{ detail_checked: rightCheckIndex == 1 }"
              @click="() => { rightCheckIndex = 1 }"
            ></span>
            <span
              class="detail_btn report"
              :class="{ report_checked: rightCheckIndex == 2 }"
              @click="() => { rightCheckIndex = 2 }"
            ></span>
          </div>

          <div class="right_body">
            <charts ref="charts" v-show="rightCheckIndex == 0" key="charts" />
            <detail ref="detail" v-show="rightCheckIndex == 1" key="detail" />
            <report ref="report" v-show="rightCheckIndex == 2" key="report" />
          </div>

          <!-- <transition-group name="fade" mode="out-in">
            <charts ref="charts" v-show="rightCheckIndex == 0" key="charts" />
            <detail ref="detail" v-show="rightCheckIndex == 1" key="detail" />
            <report ref="report" v-show="rightCheckIndex == 2" key="report" />
          </transition-group>-->
        </div>
        <span @click="toggle2" class="hidden_right_button"></span>
      </div>
    </div>
    <listxq ref="listxq" v-show="listShow" />
    <topDate ref="topDate" />
    <bottomBtn ref="bottomBtn" />
    <Legend ref="Legend" :class="`animated`" :style="{ left: moveLeft + 'px' }" />
    <!-- <DoubleRandom ref="DoubleRandom" v-show="randomShow" /> -->
  </div>
</template>

<script>
/* eslint-disable */
import commonArcgis from "./Arcgis";
import leftMultiSelect from "./widget/leftMultiSelect";

import topDate from "./widget/topDate";
import bottomBtn from "./widget/bottomBtn";

import Legend from "./widget/legend";
import DoubleRandom from "./widget/doubleRandom";

import jdtj from "./rightDiv/jdtj";
import lxtj from "./rightDiv/lxtj";

import charts from "./rightDiv/charts";
import detail from "./rightDiv/detail";
import report from "./rightDiv/report";

import listxq from "./frame/listxq";

import detailForm from "./frame/detailForm";

import { leftOptions } from "./config/enums";

import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
import { csSortHash, csMap, countryList } from "./config/hash";

import { mapState, mapActions } from "vuex";

export default {
  name: "city",
  data() {
    return {
      icon_show_left: false,
      icon_show_right: false,
      leftOptions,
      moveLeft: "360",
      moveRight: "500",
      listShow: false,
      randomShow: true,
      rightCheckIndex: 0,
    };
  },
  components: {
    commonArcgis,
    leftMultiSelect,
    topDate,
    bottomBtn,
    listxq,
    charts,
    detail,
    report,
    Legend,
    DoubleRandom,
    // detailForm
  },
  created() {
    // this.fixOpt();
  },
  mounted() {
    // this.fetchlcwmxxList();
  },
  computed: {
    ...mapState({
      lcwmxxList: (state) => state.lcwmxxList,
    }),
  },
  methods: {
    // ...mapActions(["fetchlcwmxxList"]),
    fixOpt() {
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
          url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/1`,
        });
        const query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.where = `1 = 1`;
        const { features } = await queryTask.execute(query);

        const countryName = window.countryName;

        const list = features;

        const sObj = {};
        const sArr = [];

        list.map(({ attributes }) => {
          const { NAME, TYPE, District } = attributes;

          if (!NAME && !TYPE && !District) return false;

          if (!csMap.hasOwnProperty(TYPE)) return false;

          const fixType = csMap[TYPE].name;

          if (!sObj[fixType]) {
            sObj[fixType] = {
              name: fixType,
              id: csMap[TYPE].id,
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
              sublayers: "1",
              definitionExpression: `TYPE = '${TYPE}'`,
              icon: true,
              check: false,
              count: 0,
              children: [],
            };
          }

          if (countryName != "") {
            if (District == countryName) {
              sObj[fixType].count++;
            }
          } else {
            sObj[fixType].count++;
          }
        });

        for (let k in sObj) {
          sArr.push(sObj[k]);
        }

        sArr
          .sort((a, b) => csSortHash[a.name] - csSortHash[b.name])
          .map((item) => {
            // console.log("item", item.name, item.count);
            item.name = `${item.name} (${item.count}个)`;
          });

        this.leftOptions = [
          {
            label: "考察场所",
            check: false,
            show: true,
            children: sArr,
          },
          {
            label: "网格管理",
            check: false,
            show: true,
            children: [
              {
                name: "行政区划",
                id: "chanyePlate",
                sublayers: "0",
                isImg: true,
                url:
                  "http://172.20.89.59/server/rest/services/lcjjdt/qhmb/MapServer",
                check: true,
              },
              {
                name: "社区网格",
                id: "wg",
                sublayers: "12",
                url:
                  "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
                check: false,
              },
              {
                name: "小区、大厦",
                id: "xq",
                sublayers: "14",
                url:
                  "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
                check: false,
              },
            ],
          },
        ];
      });
    },
    updateleftOptions(countryName) {
      // console.log("1-country", countryName);

      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
          url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/0`,
        });
        const query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.where = `1 = 1`;
        // console.log("query", query);
        const { features } = await queryTask.execute(query);
        // console.log("fe", features);

        // const countryName = window.countryName;

        // console.log("country", countryName);

        const list = features;

        const sObj = {};
        const sArr = [];

        list.map(({ attributes }) => {
          const { NAME, TYPE, District } = attributes;

          if ((!NAME && !TYPE && !District) || !csMap.hasOwnProperty(TYPE))
            return false;

          const fixType = csMap[TYPE].name;

          if (!sObj[fixType]) {
            sObj[fixType] = {
              count: 0,
            };
          }

          if (countryName != "") {
            if (District == countryName) {
              sObj[fixType].count++;
            }
          } else {
            sObj[fixType].count++;
          }
        });

        // console.log(sObj);

        this.leftOptions[0].children.map((item) => {
          const name = item.name.split(" ")[0];
          // item.name = `${name} (${sObj[name].count}个)`;
        });
      });
    },
    toggle() {
      this.icon_show_left = !this.icon_show_left;
      this.moveLeft = !this.icon_show_left ? "360" : "20";
    },
    toggle2() {
      this.icon_show_right = !this.icon_show_right;
      this.moveRight = !this.icon_show_right ? "500" : "20";
    },
    leftHidden() {
      this.icon_show_left = true;
      this.moveLeft = "20";
    },
    rightHidden() {
      this.icon_show_right = true;
      this.moveRight = "20";
    },
    legend() {
      if (!this.icon_show_left) {
        $("body .esri-ui-bottom-left").css({ left: "360px" });
      } else {
        $("body .esri-ui-bottom-left").css({ left: "20px" });
      }
    },
  },
};
</script>
<style scoped lang="less">
@import url("./City.less");

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
  // transform: rotateY(45deg);
  // perspective: 100px;
  // transform: translateX(-100px);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  // transform: rotateY(45deg);
  // perspective: 100px;
}
</style>
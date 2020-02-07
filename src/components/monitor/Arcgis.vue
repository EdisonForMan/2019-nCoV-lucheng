<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { addQZLinkFeature, mjChartUpdate } from "./frame/mjArcgis";
import { linkCPFeatures } from "./frame/streetArcgis";
import {
  // linkXQFeatures,
  // linkXQ_ENTERFeatures,
  xqDetail
} from "./frame/xqArcgis";
import { loadModules } from "esri-loader";
import {
  OPTION,
  spatialReference,
  QHMB,
  CYBJ,
  IMAGELAYER,
  LCYQ,
  XZJD,
  TDTIMAGE2017,
  TDTDSJ
} from "@/components/common/Tmap";
import { tipHash, Hash } from "./config/hash.js";
const server = "http://172.20.89.68:5001/s";

export default {
  name: "MacroscopicArcgis",
  data() {
    return {};
  },
  components: {},
  props: {
    id: String,
    leftOptions: Array
  },
  created() {},
  async mounted() {
    const that = this;
    /**init map**/
    await this.createMap();
    this.$props.leftOptions &&
      this.$props.leftOptions.map(_item => {
        _item.children.map(item => {
          item.id && that.doFun(item);
        });
      });
    this.jQueryBind();
  },
  watch: {
    leftOptions: {
      handler(newVal, val) {
        const that = this;
        if (!that.map) return;
        newVal.map(_item => {
          _item.children.map(item => {
            item.id && that.doFun(item);
          });
        });
      },
      deep: true
    }
  },
  methods: {
    /**
     * 数、组勾选触发图层寻找
     * @param {Object} item 单个元素
     */
    doFun(item) {
      // const shallYT = this.$parent.$refs.leftOptions.shallYT;
      if (item.check) {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = true)
          : this.addFeatures(item);
      } else {
        // console.log(item.id, "yt_" + item.id);
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;
        this.map && this.map.findLayerById("monitor_" + item.id)
          ? (this.map.findLayerById("monitor_" + item.id).visible = false)
          : null;
      }
    },
    /**
     * 初始化地图对象,带上底图
     * @param {Function} fn 回调函数
     */
    createMap(fn) {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/Legend",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer"
          ],
          OPTION
        ).then(([Map, MapView, Legend, VectorTileLayer]) => {
          // map加载底图
          that.map = new Map({
            spatialReference
          });
          //设置地图容器
          that.view = new MapView({
            container: that.$props.id,
            spatialReference,
            map: that.map,
            zoom: 10,
            center: [120.67819448808013, 28.039695289562555]
          });
          const layer = new VectorTileLayer({
            url: IMAGELAYER
          });
          that.map.add(layer);
          that.map.on("click", function(evt) {});
          resolve(true);
        });
      });
    },
    jQueryBind() {
      const context = this;
      //  密切接触者详情
      $("body").on("click", ".mj_btn", function() {
        const val = $(this).attr("data-val");
        addQZLinkFeature(context, val);
        mjChartUpdate(context, val);
      });
      //  街道疫情分布
      // $("body").on("click", ".cp_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkCPFeatures(context, val);
      // });
      //  小区疫情分布
      // $("body").on("click", ".xq_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkXQFeatures(context, val);
      // });
      //  小区卡口分布
      // $("body").on("click", ".xq_enter_btn", function() {
      //   const val = $(this).attr("data-val");
      //   linkXQ_ENTERFeatures(context, val);
      // });
    },
    goloaction({
      id,
      attributes,
      geometry,
      fieldAliases,
      highWayList,
      qzblList,
      mjList
    }) {
      const that = this;
      let x = geometry.x,
        y = geometry.y;
      if (geometry.rings) {
        let x_ = 0,
          y_ = 0;
        geometry.rings[0].map(item => {
          x_ += item[0];
          y_ += item[1];
        });
        x = x_ / geometry.rings[0].length;
        y = y_ / geometry.rings[0].length;
      }
      that.view.goTo({
        center: [x, y]
      });
      that.view.popup = {
        title: "",
        content: `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${Object.keys(attributes)
              .filter(k => {
                return (
                  [
                    "OBJECTID",
                    "FEATUREGUID",
                    "Bid",
                    "Question",
                    "question",
                    "yy"
                  ].indexOf(k) < 0
                );
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${fieldAliases[k] ||
                    k}</th>
                  <td class="esri-feature__field-data">${attributes[k] ||
                    ""}</td>
                </tr>`;
              })
              .join("")}
          </tbody></table>`,
        location: [x, y]
      };
      that.view.popup.visible = true;
    },
    //产业板块
    addChanyePlate() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            console.log(XZJD);
            const chanyePlate = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/wz_yiqing/xzjd/MapServer",
              id: "chanyePlate",
              opacity: 1
            });
            //  优先级置顶
            that.map.add(chanyePlate, 2);
            resolve(true);
          }
        );
      });
    },
    removeLayer() {
      this.map.findLayerById("chanyePlate").visible = !this.map.findLayerById(
        "chanyePlate"
      ).visible;
    },
    addFeatures(item) {
      // console.log(item);
      const that = this;
      const { url, id } = item;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id, outFields: "*" };
          if (tipHash[id] && Hash[tipHash[id]]) {
            const _hash_ = Hash[tipHash[id]];
            option.popupTemplate = {
              content: `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${_hash_
              .map(k => {
                return `<tr>
                    <th class="esri-feature__field-header">${k.label}</th>
                    <td class="esri-feature__field-data">{${k.fieldName}}</td>
                  </tr>`;
              })
              .join("")}
          </tbody></table>`
            };
          }
          const _layers_ = item.isImg ? MapImageLayer : FeatureLayer;
          if (item.sublayers) {
            if (item.isImg) {
              option.sublayers = [{ id: item.sublayers }];
            } else {
              option.url = option.url + "/" + item.sublayers;
            }
          }
          if (item.definitionExpression) {
            const d = [];
            item.definitionExpression && d.push(item.definitionExpression);
            item.ytd && d.push(item.ytd);
            if (item.isImg) {
              d.length &&
                (option.sublayers[0].definitionExpression = d.join(" and "));
            } else {
              d.length && (option.definitionExpression = d.join(" and "));
            }
          }
          item.icon &&
            (option.renderer = {
              type: "simple", // autocasts as new SimpleRenderer()
              symbol: {
                type: "picture-marker",
                url: `${server}/icon/other/${item.icon}.png`,
                width: "30px",
                height: "32px"
              }
            });
          const feature = new _layers_(option);
          that.map.add(feature);
          resolve(true);
        });
      });
    }
  }
};
</script>
 <style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
  .arcgisMap {
    width: 100%;
    height: 100%;
  }
}
</style>
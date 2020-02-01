<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
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
    await this.addQh();
    await this.addmbk();
    await this.addChanyePlate();
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
      const shallYT = this.$parent.$refs.leftOptions.shallYT;
      const _id_ = (shallYT ? "yt_" : "") + item.id;
      if (item.check) {
        this.map && this.map.findLayerById(_id_)
          ? (this.map.findLayerById(_id_).visible = true)
          : this.addFeatures(item, _id_);
        this.map && this.map.findLayerById("fangkong")
          ? (this.map.findLayerById("fangkong").visible = false)
          : null;
      } else {
        // console.log(item.id, "yt_" + item.id);
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;
        this.map && this.map.findLayerById("yt_" + item.id)
          ? (this.map.findLayerById("yt_" + item.id).visible = false)
          : null;
        if (item.id == "qzbl") {
          this.map &&
            this.map.findLayerById("mj_link") &&
            this.map.remove(this.map.findLayerById("mj_link"));
        }
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
            "esri/layers/TileLayer",
            "esri/layers/GraphicsLayer",
            "esri/layers/FeatureLayer"
          ],
          OPTION
        ).then(
          ([
            Map,
            MapView,
            Legend,
            VectorTileLayer,
            TileLayer,
            GraphicsLayer
          ]) => {
            // map加载底图
            that.map = new Map({
              spatialReference
            });
            //设置地图容器
            that.view = new MapView({
              container: that.$props.id,
              spatialReference,
              map: that.map,
              zoom: 13,
              center: [120.67819448808013, 28.039695289562555]
            });
            const layer = new VectorTileLayer({
              url: IMAGELAYER
            });
            that.map.add(layer);
            that.legend = new Legend({
              view: that.view
            });
            that.view.on("click", function(evt) {});
            resolve(true);
          }
        );
      });
    },
    jQueryBind() {
      const context = this;
      $("body").on("click", ".bottomBtn", function() {
        const val = $(this).attr("data-val");
        context.addQZLinkFeature(val);
      });
    },
    addQZLinkFeature(name) {
      this.map &&
        this.map.findLayerById("mj_link") &&
        this.map.remove(this.map.findLayerById("mj_link"));
      const nameFix = name.slice(0, 1) + "*" + name.slice(2);
      const that = this;
      loadModules(["esri/layers/FeatureLayer"], OPTION).then(
        ([FeatureLayer]) => {
          const id = "mj_link";
          const option = {
            url:
              "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/5",
            id: "mj_link",
            outFields: "*"
          };
          if (tipHash["mj"] && Hash[tipHash["mj"]]) {
            const _hash_ = Hash[tipHash["mj"]];
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
          console.log(option.popupTemplate);
          option.definitionExpression = `Patient like '%${name}%' or Patient like '%${nameFix}'`;
          option.renderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
              type: "picture-marker",
              url: `${server}/icon/other/密接.png`,
              width: "30px",
              height: "32px"
            }
          };
          const feature = new FeatureLayer(option);
          that.map.add(feature);
        }
      );
    },
    //  添加区划图
    addQh() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const qh = new MapImageLayer({
              url: QHMB,
              id: "lcjjdt",
              sublayers: [{ id: 3 }, { id: 0 }]
            });
            that.map.add(qh, 4);
            resolve(true);
          }
        );
      });
    },
    ybclick() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const fangkong = new MapImageLayer({
              url: LCYQ,
              id: "fangkong",
              sublayers: [{ id: 4 }, { id: 3 }, { id: 2 }]
            });
            that.map.add(fangkong, 5);
            resolve(true);
          }
        );
      });
    },
    goloaction({
      id,
      attributes,
      geometry,
      fieldAliases,
      highWayList,
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
                return ["OBJECTID", "FEATUREGUID", "Bid"].indexOf(k) < 0;
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
          </tbody></table>
          ${
            id == "qzbl"
              ? `<div class="bottomBtn" data-val="${attributes.Name}">密切接触者分布</div>`
              : ``
          }
          ${
            // 密接额外添加
            mjList
              ? `<div><p>密切接触者</p><table class="esri-widget__table" summary="密接">
              <thead>
              <tr>
              <th style="width: 20%">姓名</th>
              <th style="width: 20%">关系</th>
              <th style="width: 30%">电话</th>
              <th style="width: 20%">街道</th>
              </tr>
              </thead>
              <tbody>
              ${mjList
                .map(item => {
                  return `<tr>
                   <td style="width: 20%;text-align: left;">${item.attributes
                     .Name || "无"}</th>
                  <td style="width: 20%;text-align: left;">${item.attributes
                    .Relation || "无"}</td>
                    <td style="width: 30%;text-align: left;">${item.attributes
                      .Phone || "无"}</th>
                  <td style="width: 20%;text-align: left;">${item.attributes
                    .Country || "无"}</td>
                </tr>`;
                })
                .join("")}
              </tbody></table></div>`
              : ``
          }
          ${
            // 高速值班表额外添加
            highWayList
              ? highWayList
                  .map(item => {
                    return `<div><p>${
                      item.attributes.Time
                    }</p><table class="esri-widget__table" summary="值班表"><tbody>
            ${Object.keys(item.attributes)
              .filter(k => {
                return ["Bid", "OBJECTID", "Time", "Expressway"].indexOf(k) < 0;
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${item.fieldAliases[
                    k
                  ] || k}</th>
                  <td class="esri-feature__field-data">${item.attributes[k] ||
                    "无"}</td>
                </tr>`;
              })
              .join("")}
            </tbody></table></div>`;
                  })
                  .join("")
              : ``
          }
          `,
        location: [x, y]
      };
      that.view.popup.visible = true;
    },
    addmbk() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const mbk = new MapImageLayer({
              url: QHMB,
              id: "mbk",
              sublayers: [{ id: 1 }]
            });
            that.map.add(mbk, 4);
            resolve(true);
          }
        );
      });
    },
    //产业板块
    addChanyePlate() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const chanyePlate = new MapImageLayer({
              url: XZJD,
              id: "chanyePlate",
              opacity: 1
            });
            //  优先级置顶
            that.map.add(chanyePlate, 2);
            that.legend.layerInfos.push({
              layer: chanyePlate
            });
            resolve(true);
          }
        );
      });
    },
    romoveLayer() {
      this.map.findLayerById("chanyePlate").visible = !this.map.findLayerById(
        "chanyePlate"
      ).visible;
    },
    yxt() {
      const that = this;
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = false;
      }
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = !this.map.findLayerById("img")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/TileLayer"], OPTION).then(([TileLayer]) => {
            const imgLayer = new TileLayer({
              url: TDTIMAGE2017,
              id: "img"
            });
            //  优先级置顶
            that.map.add(imgLayer, 2);
            that.legend.layerInfos.push({
              layer: imgLayer
            });
            resolve(true);
          });
        });
      }
    },
    slt() {
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = false;
      }
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
    },
    ygt() {
      const that = this;
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = !this.map.findLayerById("dsj")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/VectorTileLayer"], OPTION).then(
            ([VectorTileLayer]) => {
              const vecLayer = new VectorTileLayer({
                url: TDTDSJ,
                id: "dsj"
              });
              //  优先级置顶
              that.map.add(vecLayer, 2);
              that.legend.layerInfos.push({
                layer: vecLayer
              });
              resolve(true);
            }
          );
        });
      }
    },
    addFeatures(item, _id_) {
      // console.log(item);
      const id = _id_.replace(/yt_/g, "");
      const that = this;
      const { url } = item;
      const shallYT = this.$parent.$refs.leftOptions.shallYT;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id: _id_, outFields: "*" };
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
          </tbody></table>
          ${
            id == "qzbl"
              ? `<div class="bottomBtn" data-val="{Name}">密切接触者分布</div>`
              : ``
          }`
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
          if (item.definitionExpression || shallYT) {
            const d = [];
            item.definitionExpression && d.push(item.definitionExpression);
            shallYT && item.ytd && d.push(item.ytd);
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
    },
    //  查询
    IdentifyTaskFun({ mapPoint }, fn) {
      const that = this;
      loadModules(
        [
          "esri/tasks/IdentifyTask",
          "esri/tasks/support/IdentifyParameters",
          "esri/tasks/QueryTask",
          "esri/tasks/support/Query",
          "esri/layers/MapImageLayer"
        ],
        OPTION
      ).then(
        ([
          IdentifyTask,
          IdentifyParameters,
          QueryTask,
          Query,
          MapImageLayer
        ]) => {
          const url =
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer";
          const identifyTask = new IdentifyTask(url);
          const params = new IdentifyParameters();
          params.tolerance = 10;
          // params.layerIds = [0, 4];
          // params.layerOption = "top";
          params.returnGeometry = true;
          params.geometry = mapPoint;
          params.mapExtent = that.view.extent;
          identifyTask.execute(params).then(res => {
            console.log(res);

            if (res.results.length > 0) {
              const queryTask = new QueryTask({
                url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer/4`
              });
              const query = new Query();
              query.outFields = ["*"];
              console.log(res.results[0].feature.attributes["唯一码"]);
              query.where = `RelatingCodes like '%${res.results[0].feature.attributes["唯一码"]}%'`;
              query.returnGeometry = true;
              queryTask.execute(query).then(_res => {
                console.log(_res);
                const mbk = new MapImageLayer({
                  url: QHMB,
                  id: "mbk",
                  sublayers: [{ id: 1 }]
                });
                that.map.add(mbk, 4);
              });
            }
          });
          //   if (!response.results[0].feature.attributes["统一社会信"]) {
          //     that.indexPoint(response.results[0].feature.attributes);
          //     that.view.goTo({ center: [mapPoint.x, mapPoint.y] });
          //     that.setLocationSymbol(response.results[0].feature.geometry);
          //     that.change(false);
          //     // that.Eightchange(false);
          //   } else if (that.treePoint.length) {
          //     that.fetchCompany(
          //       response.results[0].feature.attributes,
          //       response.results[0].feature.geometry
          //     );
          //     that.indexchange(false);
          //     that.eightShow = false;
          //   }
          //   fn && fn();
          // });
        }
      );
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
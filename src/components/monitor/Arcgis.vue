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
  IMAGELAYER,
  TDTIMAGE2017,
  TDTDSJ
} from "@/components/common/Tmap";
import { tipHash, Hash } from "./config/hash.js";

export default {
  name: "MonitorArcgis",
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
    // init map
    await this.createMap();
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
      const _id_ = item.id;
      if (item.check) {
        this.map && this.map.findLayerById(_id_)
          ? (this.map.findLayerById(_id_).visible = true)
          : this.addFeatures(item, _id_);
      } else {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
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
            zoom: 13,
            center: [120.67819448808013, 28.039695289562555]
          });
          const layer = new VectorTileLayer({
            url: IMAGELAYER
          });
          that.map.add(layer);
          that.legend = new Legend({
            label: "图例",
            view: that.view
          });
          that.view.ui.add(that.legend, "bottom-left");
          that.view.on("click", function(evt) {});
          resolve(true);
        });
      });
    },
    // 绑定事件
    jQueryBind() {
      const context = this;
      //  地块详情
      $("body").on("click", ".dk_btn", function() {
        const val = $(this).attr("data-val");
        // addQZLinkFeature(context, val);
        // mjChartUpdate(context, val);
        context.$parent.rightHidden();
      });
    },
    // 产业板块
    addChanyePlate() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const chanyePlate = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/xzjd_ws/MapServer",
              id: "chanyePlate",
              opacity: 1
            });
            //  优先级置顶
            that.map.add(chanyePlate, 2);
            that.legend.layerInfos.push({
              title: "五色风险评估",
              layer: chanyePlate
            });
            resolve(true);
          }
        );
      });
    },
    // 移除产业板块
    romoveChanyePlate() {
      this.map.findLayerById("chanyePlate").visible = !this.map.findLayerById(
        "chanyePlate"
      ).visible;
    },
    // 定位
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
        content: `${
          id == "xq"
            ? xqDetail(false, attributes)
            : `<table class="esri-widget__table" summary="属性和值列表"><tbody>
            ${Object.keys(attributes)
              .filter(k => {
                if (id == "clinic_type_3" || id == "clinic_type_5") {
                  return ~["SHORTNAME", "ADDRESS", "TYPE", "PHONE"].indexOf(k);
                } else {
                  return noShowFields.indexOf(k) < 0;
                }
              })
              .map(k => {
                return `<tr>
                  <th class="esri-feature__field-header">${
                    fieldAliases[k] == "Phone"
                      ? "联系方式"
                      : fieldAliases[k] == "Name"
                      ? "名称"
                      : fieldAliases[k] == "Country"
                      ? "街道"
                      : fieldAliases[k] == "Address"
                      ? "地址"
                      : fieldAliases[k]
                  }</th>
                  <td class="esri-feature__field-data">${attributes[k] ||
                    ""}</td>
                </tr>`;
              })
              .join("")}
          </tbody></table>`
        }
          ${
            id == "qzbl"
              ? `<div class="bottomBtn mj_btn" data-val="${attributes.Name}">密切接触者分布</div>`
              : ``
          }
          ${
            id == "chanyePlate"
              ? `<div class="bottomBtn cp_btn" data-val="${attributes.名称}">疫情信息分布</div>`
              : ``
          }
          ${
            id == "gld"
              ? `<div class="bottomBtn gld_btn" data-val="${attributes.Name}" data-val2="${attributes.Bid}">观察点人员详情</div>`
              : ``
          }
          ${
            id == "glmd"
              ? `<div class="bottomBtn gjmj_btn" data-val="${attributes.Name}">密切接触者分布</div>`
              : ``
          }
          ${
            // id == "xq"
            //   ? `<div class="bottomBtn xq_btn" data-val="${attributes.name}">进出人员统计</div>`
            //   : ``··
            ``
          }
          ${
            // 街镇病例额外添加
            qzblList
              ? qzblList
                  .map(item => {
                    return `<div><p>${
                      item.attributes.Name
                    }</p><table class="esri-widget__table" summary="值班表"><tbody>
            ${Object.keys(item.attributes)
              .filter(k => {
                return ["Bid", "OBJECTID", "Name"].indexOf(k) < 0;
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
          }`,
        location: [x, y]
      };
      that.view.popup.visible = true;
    },

    // 影像图
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
            that.map.add(imgLayer, 1);
            that.legend.layerInfos.push({
              layer: imgLayer
            });
            resolve(true);
          });
        });
      }
    },
    // 矢量图
    slt() {
      if (this.map.findLayerById("dsj")) {
        this.map.findLayerById("dsj").visible = false;
      }
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
    },
    // 夜光图
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
              that.map.add(vecLayer, 1);
              that.legend.layerInfos.push({
                layer: vecLayer
              });
              resolve(true);
            }
          );
        });
      }
    },
    // 添加图层
    addFeatures(item, _id_) {
      const id = _id_.replace(/yt_/g, "");
      const that = this;
      const { url } = item;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id: _id_, outFields: "*" };
          if (tipHash[id] && Hash[tipHash[id]]) {
            const _hash_ = Hash[tipHash[id]];
            option.popupTemplate = {
              content: `
              <div class="dkTitle">地块基本信息</div>
              <table class="esri-widget__table" summary="属性和值列表"><tbody>
                ${_hash_
                  .map(k => {
                    return `<tr>
                        <th class="esri-feature__field-header">${k.label}</th>
                        <td class="esri-feature__field-data">{${k.fieldName}}</td>
                      </tr>`;
                  })
                  .join("")}
              </tbody></table>
              <div class="bottomBtn dk_btn" data-val="{名称}">查看详情</div>`
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
            if (item.isImg) {
              d.length &&
                (option.sublayers[0].definitionExpression = d.join(" and "));
            } else {
              d.length && (option.definitionExpression = d.join(" and "));
            }
          }

          const feature = new _layers_(option);
          that.map.add(feature);

          // if (id != "wg" && id != "xq") {
          //   that.legend.layerInfos.push({
          //     title: "",
          //     layer: feature
          //   });
          // }

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
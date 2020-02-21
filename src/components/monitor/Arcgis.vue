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
  TDTIMAGE2017
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

    this.addZDDKFeatures();

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
        const name = $(this).attr("data-val");
        const imgName = $(this).attr("data-val2");
        context.$parent.rightHidden();
        context.$parent.$refs.dkxqForm.getItem(name, imgName);
        context.$parent.dkxqShow = true;
      });
    },
    // 五色图
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

            // 地块标注图层
            const dkImage = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer",
              sublayers: [{ id: 0 }],
              id: "dkImage",
              opacity: 1
            });

            that.map.add(dkImage, 4);
            that.legend.layerInfos.push({
              title: "",
              layer: dkImage
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
    // 控规图
    kgt() {
      const that = this;
      if (this.map.findLayerById("kg")) {
        this.map.findLayerById("kg").visible = !this.map.findLayerById("kg")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/MapImageLayer"], OPTION).then(
            ([MapImageLayer]) => {
              const mapImg = new MapImageLayer({
                url:
                  "http://61.153.29.236:8111/arcgis/rest/services/wzztt/MapServer",
                sublayers: [{ id: 2 }],
                id: "kg"
              });
              //  优先级置顶
              that.map.add(mapImg, 2);
              resolve(true);
            }
          );
        });
      }
    },
    addZDDKFeatures() {
      const that = this;
      const item = {
        id: "zddk",
        url:
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer",
        sublayers: "0"
      };

      const { url, id } = item;

      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/FeatureLayer"], OPTION).then(
          ([FeatureLayer]) => {
            const option = {
              url: url + "/" + item.sublayers,
              id,
              outFields: "*",
              opacity: 0
            };
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
                  <div class="bottomBtn dk_btn" data-val="{GLZD}" data-val2="{做地详情}">查看详情</div>`
              };
            }

            const feature = new FeatureLayer(option);
            that.map.add(feature, 2);

            // that.legend.layerInfos.push({
            //   title: "",
            //   layer: feature
            // });

            resolve(true);
          }
        );
      });
    },
    // 定位
    goloaction({ id, attributes, geometry, fieldAliases }) {
      const that = this;

      let x = geometry.centroid.x,
        y = geometry.centroid.y;

      that.view.goTo({
        center: [x, y + 0.03],
        zoom: 13
      });
      if (tipHash[id] && Hash[tipHash[id]]) {
        const _hash_ = Hash[tipHash[id]];
        that.view.popup = {
          title: "",
          content: `
            <div class="dkTitle">地块基本信息</div>
            <table class="esri-widget__table" summary="属性和值列表"><tbody>
              ${_hash_
                .map(k => {
                  return `<tr>
                    <th class="esri-feature__field-header">${k.label}</th>
                    <td class="esri-feature__field-data">${attributes[
                      k.fieldName
                    ] || ""}</td>
                  </tr>`;
                })
                .join("")}
            </tbody></table>
            <div class="bottomBtn dk_btn" data-val="${
              attributes.GLZD
            }" data-val2="${attributes.做地详情}">查看详情</div>`,
          location: [x, y]
        };
      }

      that.view.popup.visible = true;
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
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
  TDTDSJ
} from "@/components/common/Tmap";
import { tipHash, Hash, countryList, csMap } from "./config/hash.js";
const server = "http://172.20.89.88:5001/s";

export default {
  name: "CityArcgis",
  data() {
    return {};
  },
  components: {},
  props: {
    id: String,
    leftOptions: Array
  },

  created() {
    // 组装 id 数组
    this.ids = ["zgd_line", "cgd_line", "jzgd_polygon"];
    const list = Object.values(csMap);
    list.map(item => {
      this.ids.push(item.id, `${item.id}_2`);
    });
  },
  async mounted() {
    const that = this;

    // init map
    await this.createMap();

    await this.addChanyePlate();

    // 添加图例标题
    $(".esri-mytitle").remove();
    $(".esri-legend").prepend(
      '<div class="esri-legend__message esri-mytitle">图例</div>'
    );

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

        this.map.findLayerById(`${_id_}_2`) &&
          (this.map.findLayerById(`${_id_}_2`).visible = true);

        if (~["zgd", "cgd"].indexOf(_id_)) {
          this.map &&
            this.map.findLayerById(`${_id_}_line`) &&
            (this.map.findLayerById(`${_id_}_line`).visible = true);
        }

        if (~["jzgd"].indexOf(_id_)) {
          this.map &&
            this.map.findLayerById(`${_id_}_polygon`) &&
            (this.map.findLayerById(`${_id_}_polygon`).visible = true);
        }
      } else {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;

        this.map.findLayerById(`${_id_}_2`) &&
          (this.map.findLayerById(`${_id_}_2`).visible = false);

        if (~["zgd", "cgd"].indexOf(_id_)) {
          this.map &&
            this.map.findLayerById(`${_id_}_line`) &&
            (this.map.findLayerById(`${_id_}_line`).visible = false);
        }

        if (~["jzgd"].indexOf(_id_)) {
          this.map &&
            this.map.findLayerById(`${_id_}_polygon`) &&
            (this.map.findLayerById(`${_id_}_polygon`).visible = false);
        }
      }
    },

    /**
     * 初始化地图对象,带上底图
     * @param {Function} fn 回调函数
     */
    createMap(fn) {
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
          this.map = new Map({
            spatialReference
          });
          //设置地图容器
          this.view = new MapView({
            container: this.$props.id,
            spatialReference,
            map: this.map,
            zoom: 13,
            center: [120.67819448808013, 28.039695289562555]
          });
          const layer = new VectorTileLayer({
            url: IMAGELAYER
          });
          this.map.add(layer);
          this.legend = new Legend({
            label: "图例",
            view: this.view
          });

          this.view.ui.add(this.legend, "bottom-left");
          this.view.on("click", function(evt) {});
          resolve(true);
        });
      });
    },

    // 绑定事件
    jQueryBind() {
      const context = this;
      // 详情
      $("body").on("click", ".point_btn", function() {
        const glzd = $(this).attr("data-val");
        // console.log("glzd", glzd);
        // 延时等待组件初始化
        setTimeout(() => {
          context.$parent.rightCheckIndex = 1;
          context.$parent.$refs.detail.getItem(glzd);
        }, 20);
      });
    },

    // 行政区划
    addChanyePlate() {
      if (!this.map) return;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const chanyePlate = new MapImageLayer({
            url:
              "http://172.20.89.59/server/rest/services/lcjjdt/qhmb/MapServer",
            id: "chanyePlate",
            sublayers: [{ id: 3 }, { id: 1 }, { id: 0 }]
          });

          //  优先级置顶
          this.map.add(chanyePlate, 2);
          this.legend.layerInfos.push({
            title: "",
            layer: ""
          });

          resolve(true);
        });
      });
    },

    // 行政区划切换
    changeChanyePlate() {
      if (!this.map) return;
      this.map.findLayerById("chanyePlate") &&
        (this.map.findLayerById(
          "chanyePlate"
        ).visible = !this.map.findLayerById("chanyePlate").visible);
    },

    // 添加图层
    addFeatures(item, id) {
      if (!this.map || id == "chanyePlate") return;

      const that = this;
      const { url } = item;

      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id, outFields: "*" };
          if (tipHash[id] && Hash[tipHash[id]]) {
            const _hash_ = Hash[tipHash[id]];

            option.popupTemplate = {
              content: `
                  <div class="dkTitle">基本信息</div>
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
                  <div class="bottomBtn point_btn" data-val="{GLZD}">查看详情</div>`
            };
          }

          const _layers_ = item.isImg ? MapImageLayer : FeatureLayer;

          // 子图层
          if (item.sublayers) {
            if (item.isImg) {
              option.sublayers = [{ id: item.sublayers }];
            } else {
              option.url = option.url + "/" + item.sublayers;
            }
          }

          if (!~["wg", "xq"].indexOf(id)) {
            // 分别添加红白旗

            const d = [];

            const countryName = window.countryName;

            // 街镇判断
            if (countryName != "") {
              d.push(`District = '${countryName}'`);
            }

            item.definitionExpression && d.push(item.definitionExpression);

            // const _d = [...d];

            // d.push(`FLAG = 1`);
            d.length && (option.definitionExpression = d.join(" and "));

            // item.icon &&
            //   (option.renderer = {
            //     type: "simple",
            //     symbol: {
            //       type: "picture-marker",
            //       url: `${server}/icon/旗子/红旗-${
            //         item.name.split(" ")[0]
            //       }.png`,
            //       width: "30px",
            //       height: "32px"
            //     },
            //     label: `${item.name.split(" ")[0]}`
            //   });

            // console.log("op", option);

            const feature = new _layers_(option);
            that.map.add(feature, 8);

            // _d.push(`FLAG = 0`);
            // _d.length && (option.definitionExpression = _d.join(" and "));

            // option.id = `${option.id}_2`;

            // item.icon &&
            //   (option.renderer = {
            //     type: "simple",
            //     symbol: {
            //       type: "picture-marker",
            //       url: `${server}/icon/旗子/黑旗-${
            //         item.name.split(" ")[0]
            //       }.png`,
            //       width: "18px",
            //       height: "30px"
            //     },
            //     label: `${item.name.split(" ")[0]}`
            //   });

            // const feature2 = new _layers_(option);
            // that.map.add(feature2, 8);

            // console.log(that.legend.layerInfos);

            // if (
            //   !that.legend.layerInfos[1] ||
            //   !~that.ids.indexOf[that.legend.layerInfos[1].layer.id]
            // ) {
            //   that.legend.layerInfos.push(
            //     {
            //       title: "",
            //       layer: feature
            //     }
            //     // {
            //     //   title: "",
            //     //   layer: feature2
            //     // }
            //   );
            // }

            // console.log(that.legend.layerInfos);
          } else {
            if (item.definitionExpression) {
              const d = [];

              const countryName = window.countryName;

              if (countryName != "") {
                d.push(`District = '${countryName}'`);
              }

              item.definitionExpression && d.push(item.definitionExpression);
              if (item.isImg) {
                d.length &&
                  (option.sublayers[0].definitionExpression = d.join(" and "));
              } else {
                d.length && (option.definitionExpression = d.join(" and "));
              }
            }

            const feature = new _layers_(option);
            that.map.add(feature, 8);
          }

          if (id == "zgd") {
            const line = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
              id: "zgd_line",
              sublayers: [
                {
                  id: 4,
                  definitionExpression: `TYPE = '主干道'${
                    countryName != "" ? ` and District = '${countryName}'` : ""
                  }`
                }
              ]
            });
            that.map.add(line, 4);
          } else if (id == "cgd") {
            const line = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
              id: "cgd_line",
              sublayers: [
                {
                  id: 4,
                  definitionExpression: `TYPE = '次干道'${
                    countryName != "" ? ` and District = '${countryName}'` : ""
                  }`
                }
              ]
            });
            that.map.add(line, 4);
          } else if (id == "jzgd") {
            const polygon = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer",
              id: "jzgd_polygon",
              sublayers: [
                {
                  id: 2,
                  definitionExpression: `TYPE = '建筑工地'${
                    countryName != "" ? ` and District = '${countryName}'` : ""
                  }`
                }
              ]
            });
            that.map.add(polygon, 4);
          }

          // console.log(that.map);

          // console.log(this.$parent);

          this.$parent.$refs.charts.$refs.TopSelect.filterItem();

          resolve(true);
        });
      });
    },

    // 影像图
    yxt() {
      if (!this.map) return;
      this.$parent.$refs.bottomBtn.sltTag = this.$parent.$refs.bottomBtn.dsjTag = false;
      this.map.findLayerById("dsj") &&
        (this.map.findLayerById("dsj").visible = false);
      if (this.map.findLayerById("img")) {
        this.$parent.$refs.bottomBtn.yxtTag = this.map.findLayerById(
          "img"
        ).visible = true;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/TileLayer"], OPTION).then(([TileLayer]) => {
            const imgLayer = new TileLayer({
              url:
                "https://services.wzmap.gov.cn/server/rest/services/TDT/YX_2019/MapServer",
              id: "img"
            });
            //  优先级置顶
            this.map.add(imgLayer, 1);

            this.$parent.$refs.bottomBtn.yxtTag = true;
            this.$parent.$refs.bottomBtn.sltTag = false;
            this.$parent.$refs.bottomBtn.dsjTag = false;
            resolve(true);
          });
        });
      }
    },

    // 矢量图
    slt() {
      if (!this.map) return;
      this.map.findLayerById("img") &&
        (this.map.findLayerById("img").visible = false);
      this.map.findLayerById("dsj") &&
        (this.map.findLayerById("dsj").visible = false);
      this.$parent.$refs.bottomBtn.sltTag = true;
      this.$parent.$refs.bottomBtn.yxtTag = false;
      this.$parent.$refs.bottomBtn.dsjTag = false;
    },

    // 大数据
    dsj() {
      if (!this.map) return;
      this.$parent.$refs.bottomBtn.sltTag = this.$parent.$refs.bottomBtn.yxtTag = false;
      this.map.findLayerById("img") &&
        (this.map.findLayerById("img").visible = false);
      if (this.map.findLayerById("dsj")) {
        this.$parent.$refs.bottomBtn.dsjTag = this.map.findLayerById(
          "dsj"
        ).visible = true;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/VectorTileLayer"], OPTION).then(
            ([VectorTileLayer]) => {
              const vecLayer = new VectorTileLayer({
                url: TDTDSJ,
                id: "dsj"
              });
              //  优先级置顶
              this.map.add(vecLayer, 1);

              this.$parent.$refs.bottomBtn.dsjTag = true;
              this.$parent.$refs.bottomBtn.sltTag = false;
              this.$parent.$refs.bottomBtn.yxtTag = false;

              resolve(true);
            }
          );
        });
      }
    },

    // 控规图
    kgt(option) {
      if (!this.map) return;
      if (this.map.findLayerById("kg")) {
        this.$parent.$refs.bottomBtn.kgtTag = this.map.findLayerById(
          "kg"
        ).visible =
          option == null ? !this.map.findLayerById("kg").visible : true;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/MapImageLayer"], OPTION).then(
            ([MapImageLayer]) => {
              const mapImg = new MapImageLayer({
                url:
                  "http://172.20.89.7:6082/arcgis/rest/services/lucheng/LC_KONGGUI/MapServer",
                sublayers: [{ id: 0 }],
                id: "kg"
              });
              //  优先级置顶
              this.map.add(mapImg, 3);
              this.$parent.$refs.bottomBtn.kgtTag = true;
              resolve(true);
            }
          );
        });
      }
    },

    // 图层切换
    layerToggle(option) {
      if (this.map && this.map.findLayerById(option.id)) {
        this.map.findLayerById(option.id).visible = !this.map.findLayerById(
          option.id
        ).visible;

        option.tag &&
          (this.$parent.$refs.bottomBtn[option.tag] = this.map.findLayerById(
            option.id
          ).visible);
      } else {
        this.map && this.addMapImageLayer(option);
      }
    },

    // 新增mapImageLayer图层
    addMapImageLayer(option) {
      const that = this;

      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const prop = { url: option.url };

            // id
            option.id && (prop.id = option.id);

            // 子图层
            option.sublayers &&
              option.sublayers
                .sort((a, b) => b - a)
                .map(id => {
                  Array.isArray(prop.sublayers)
                    ? prop.sublayers.push({ id })
                    : (prop.sublayers = [{ id }]);
                });

            const layer = new MapImageLayer(prop);
            //  图层顺序
            option.order
              ? that.map.add(layer, option.order)
              : that.map.add(layer, 6);

            // 图例
            option.legend &&
              that.legend.layerInfos.push({
                title: option.legend,
                layer
              });

            // 按钮控制
            option.tag && (that.$parent.$refs.bottomBtn[option.tag] = true);
            resolve(true);
          }
        );
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
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
const server = "http://lysb.lucheng.gov.cn/s/lc";

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
          //  id,fun 都存在表明有该选项的对应画图函数
          if (!item.id || !item.fun) return;
          that.doFun(item);
        });
      });
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
      if (item.check) {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = true)
          : this.addFeatures(item);
        this.map && this.map.findLayerById("fangkong")
          ? (this.map.findLayerById("fangkong").visible = false)
          : null;
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
            that.view.on("click", function(evt) {
              console.log(evt);
            });
            resolve(true);
          }
        );
      });
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
    goloaction() {
      const that = this;
      that.view.goTo({
        center: [120.65824109827734, 28.01163261173257]
      });
      that.view.popup = {
        title: "疫情人员信息", //content:"<div>liu</div>"
        //content: '<tr><th class="esri-feature__field-header">行政单位名称</th><td class="esri-feature__field-data"></td></tr><tr><th class="esri-feature__field-header">行政单位代码</th><td class="esri-feature__field-data"></td></tr><tr><th class="esri-feature__field-header">上级行政单位代码</th><td class="esri-feature__field-data"></td></tr><tr><th class="esri-feature__field-header">行政单位等级</th><td class="esri-feature__field-data"></td></tr></tbody></table>'
        content:
          '<table class="esri-widget__table" summary="属性和值列表"><tbody>' +
          '<tr><th class="esri-feature__field-header">姓名：李**</th><td class="esri-feature__field-data">性别：男</td></tr>' +
          '<tr><th class="esri-feature__field-header">地址：</th><td class="esri-feature__field-data">鹿城区府前街康乐花园B207室</td></tr>' +
          '<tr><th class="esri-feature__field-header">年龄：32岁</th><td class="esri-feature__field-data">籍贯：汉</td></tr>' +
          '<tr><th class="esri-feature__field-header">确诊时间：</th><td class="esri-feature__field-data">2020-01-27</td></tr>' +
          '<tr><th class="esri-feature__field-header">就诊医疗机构：</th><td class="esri-feature__field-data">温州市第六人民医院</td></tr>' +
          '<tr><th class="esri-feature__field-header" colspan="2" style="font-size:16px">接触相关病例</th>' +
          '<tr><td class="esri-feature__field-data" colspan="2">1.李** 病例父亲 确诊时间：2020-01-29 <a style="color: #0a83c8;"> 详情</ a></td></tr>' +
          '<tr><td class="esri-feature__field-data" colspan="2">2.张** 病例母亲 确诊时间：2020-01-29 <a style="color: #0a83c8;"> 详情</ a></td></tr>' +
          "</tbody></table>",
        location: [120.65824109827734, 28.01163261173257]
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
      if (this.map.findLayerById("chanyePlate").visible == true) {
        this.map.findLayerById("chanyePlate").visible = false;
      } else {
        this.map.findLayerById("chanyePlate").visible = true;
      }
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
    addFeatures(item) {
      const that = this;
      const { url, id } = item;
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/MapImageLayer"],
          OPTION
        ).then(([FeatureLayer, MapImageLayer]) => {
          const option = { url, id };
          // 名称判断
          if (item.icon == "发热门诊" || item.icon == "定点救治医院") {
            option.popupTemplate = {
              //title: "乡镇数据",
              content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "NAME",
                      label: "名称"
                    },
                    {
                      fieldName: "ADDRESS",
                      label: "地址"
                    },
                    {
                      fieldName: "TYPE",
                      label: "类型"
                    },
                    {
                      fieldName: "GRADE",
                      label: "等级"
                    }
                  ]
                }
              ]
            };
          } else if (item.icon == "确诊病例" || item.icon == "重症病例") {
            option.popupTemplate = {
              title: "疫情人员信息",
              content: [
                // '<table class="esri-widget__table" summary="属性和值列表"><tbody>' +
                // '<tr><th class="esri-feature__field-header">姓名：李**</th><td class="esri-feature__field-data">性别：男</td></tr>' +
                // '<tr><th class="esri-feature__field-header">地址：</th><td class="esri-feature__field-data">鹿城区府前街康乐花园B207室</td></tr>' +
                // '<tr><th class="esri-feature__field-header">年龄：32岁</th><td class="esri-feature__field-data">籍贯：汉</td></tr>' +
                // '<tr><th class="esri-feature__field-header">确诊时间：</th><td class="esri-feature__field-data">2020-01-27</td></tr>' +
                // '<tr><th class="esri-feature__field-header">就诊医疗机构：</th><td class="esri-feature__field-data">温州市第六人民医院</td></tr>' +
                // '<tr><th class="esri-feature__field-header" colspan="2" style="font-size:16px">接触相关病例</th>' +
                // '<tr><td class="esri-feature__field-data" colspan="2">1.李** 病例父亲 确诊时间：2020-01-29 <a style="color: #0a83c8;"> 详情</ a></td></tr>' +
                // '<tr><td class="esri-feature__field-data" colspan="2">2.张** 病例母亲 确诊时间：2020-01-29 <a style="color: #0a83c8;"> 详情</ a></td></tr>' +
                // "</tbody></table>"
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "NAME",
                      label: "姓名"
                    },
                    {
                      fieldName: "ADDRESS",
                      label: "地址"
                    },
                    {
                      fieldName: "AGE",
                      label: "年龄"
                    },
                    {
                      fieldName: "DiseaseTime",
                      label: "确诊时间"
                    },
                    {
                      fieldName: "Hospital",
                      label: "就诊医疗机构"
                    },
                    {
                      fieldName: "ContactHistory",
                      label: "接触相关病例"
                    }
                  ]
                }
              ]
            };
          } else {
            option.popupTemplate = {
              //title: "乡镇数据",
              content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "NAME",
                      label: "名称"
                    }
                  ]
                }
              ]
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
          // else if(item.fk){
          //   option.sublayers = [{ id: 4 },{ id :3},{id:2}];
          // }
          if (item.definitionExpression) {
            if (item.isImg) {
              option.sublayers[0].definitionExpression =
                item.definitionExpression;
            } else {
              option.definitionExpression = item.definitionExpression;
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
<template>
  <div class="leftMultiSelect">
    <div class="topic">
      <header>
        <span>地块清单</span>
        <input type="text" v-model="text" placeholder="请输入..." />
        <button @click="filterItem">搜索</button>
      </header>
      <div class="switch">
        <span :class="{active:tabIndex == 0}" @click="()=>{}">街道专题</span>
        <i>/</i>
        <span :class="{active:tabIndex == 1}" @click="()=>{}">权属专题</span>
      </div>
      <div class="selectFrame no_select">
        <div v-for="(item,index) in this.tree" :key="index">
          <div @click="toggleTree(item.label,index)">
            {{ item.label }}
            <span @click="switchChar(item.label)">分布图</span>
          </div>
          <ul v-show="item.show">
            <li
              v-for="(oitem,oindex) in item.children"
              :key="oindex"
              @click="ShowResult(oitem,item)"
            >
              <p>{{ ++oindex }}. {{ oitem.name }}</p>
              <span
                :style="{ color: oitem.type == '做地中' ? '#D3382B' : oitem.type == '已出让' ? '#4AB73D' : '#FFC221' }"
              >{{ oitem.type=="做地中"?"未完成":oitem.type }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
import util from "./util";
export default {
  name: "leftMultiSelect",
  data() {
    return {
      icon_show: true,
      tree: [],
      tabIndex: 0,
      URL: null,
      text: "",
      tmpOptions: []
    };
  },
  components: {},
  props: { leftOptions: Array, imgUrl: String },
  created() {
    loadModules(
      ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
      OPTION
    ).then(async ([QueryTask, Query]) => {
      const queryTask = new QueryTask({
        url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer/0`
      });
      const query = new Query();
      query.outFields = ["*"];
      query.returnGeometry = true;
      query.where = `1 = 1`;
      const { fields, features } = await queryTask.execute(query);
      const fieldAliases = {};
      fields.map(item => {
        fieldAliases[item.name] = item.alias;
      });
      const list = features.map(item => {
        item.fieldAliases = fieldAliases;
        return item;
      });

      const sObj = {};
      const sArr = [];

      list.map(({ attributes, geometry, fieldAliases }) => {
        const { GLZD, 所属街道, DKZT } = attributes;
        if (!所属街道) return false;
        if (!sObj[所属街道]) {
          sObj[所属街道] = {
            label: 所属街道,
            children: [],
            tabIndex: 0,
            check: false,
            show: false
          };
        }
        sObj[所属街道].children.push({
          id: "zddk",
          name: GLZD,
          type: DKZT,
          attributes,
          geometry,
          fieldAliases
        });
      });
      for (let k in sObj) {
        sArr.push(sObj[k]);
      }

      sArr.map(item => {
        if (item.children.length) {
          item.label = `${item.label} (${item.children.length}宗)`;
        }
      });

      this.tree = sArr;

      this.tmpOptions = sArr;

      // this.tree = this.leftOptions;
    });
  },
  methods: {
    // 搜索
    filterItem() {
      const tag = this.text;

      if (tag == "") {
        this.tree = this.tmpOptions;
      } else {
        const sObj = {};
        const sArr = [];

        const fieldsList = [
          "GLZD",
          "区块名称",
          "所属街道",
          "DKZT",
          "土地用途",
          "土地面积_亩",
          "建筑面积_平方米",
          "建筑用途",
          "容积率",
          "责任单位",
          "是否做地完成",
          "做地完成时间"
        ];

        this.tmpOptions.map(item => {
          const childList = [];

          item.children &&
            item.children.map(_item => {
              for (let i in fieldsList) {
                const k = fieldsList[i];
                if (_item.attributes[k] && ~_item.attributes[k].indexOf(tag)) {
                  childList.push(_item);
                  break;
                }
              }
            });

          if (childList.length) {
            sObj[item.label] = {
              label: item.label.split(" ")[0],
              children: childList,
              tabIndex: 0,
              check: false,
              show: false
            };
          }
        });

        for (let k in sObj) {
          sArr.push(sObj[k]);
        }

        sArr.map(item => {
          if (item.children.length) {
            item.label = `${item.label} (${item.children.length}宗)`;
          }
        });

        this.tree = sArr;
      }
    },
    hidden() {
      this.icon_show = !this.icon_show;
    },
    //下拉菜单
    toggleTree(label, index) {
      for (let v in this.tree) {
        if (this.tree[v].label == label) {
          this.tree[v].show = !this.tree[v].show;
        }
      }
    },
    //触发父元素
    changeTree(item, event) {
      this.intercept();
      this.$parent &&
        this.$parent.Listcontact &&
        this.$parent.Listcontact(item);
    },
    stop(e) {
      e.stopPropagation();
    },
    changeBox(item, index) {
      const c = this.tree[index].check;
      for (let i in this.tree[index].children) {
        this.tree[index].children[i].check = c;
      }
    },
    // 定位详情
    ShowResult(oitem, item) {
      this.$parent.$refs.montorArcgis.goloaction(oitem);

      const name = oitem.name;
      const imgName = oitem.attributes.做地详情;

      this.$parent.rightHidden();
      this.$parent.$refs.dkxqForm.getItem(name, imgName);
      this.$parent.dkxqShow = true;
    },
    // 街道做地图
    switchChar(label) {
      const name = label.split(" ")[0];
      this.$parent.$refs.montorArcgis.addBlank(name);
    },
    intercept() {
      const _tree = this.$util.clone(this.tree);
      for (let i = 0; i < _tree.length; i++) {
        let shall = true;
        _tree[i].children.length
          ? _tree[i].children.map(item => {
              if (!item.check) {
                shall = false;
              }
            })
          : (shall = false);
        _tree[i].check = shall;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
    },
    clean() {
      const _tree = this.$util.clone(this.tree);
      for (let i = 0; i < _tree.length; i++) {
        _tree[i].children.length
          ? _tree[i].children.map(item => {
              item.check = false;
            })
          : null;
        _tree[i].check = false;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
    }
  },
  watch: {
    tree: {
      handler: function() {},
      deep: true
    },
    imgUrl: {
      handler(newVal, val) {
        this.URL = newVal;
      },
      immediate: true
    },
    leftOptions(newV, oldV) {
      this.tree = newV;
    },
    tabIndex(newV, oldV) {
      this.clean();
    }
  }
};
</script>
<style scoped lang="less">
.leftMultiSelect {
  height: 100%;
  border-right: 1px solid;
  background: linear-gradient(
    180deg,
    rgba(0, 63, 189, 0.6) 0%,
    rgba(5, 53, 129, 0.6) 100%
  );
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  border-image: linear-gradient(
      360deg,
      rgba(7, 73, 190, 0) 0%,
      rgba(0, 172, 255, 0.4) 32%,
      rgba(0, 255, 255, 0.8) 51%,
      rgba(0, 172, 255, 0.4) 73%,
      rgba(7, 73, 190, 0) 100%
    )
    1 10;

  .topic {
    height: 100%;
    overflow: hidden;
    border-top: 1px solid;
    border-image: linear-gradient(
        270deg,
        rgba(7, 73, 190, 0.6) 0%,
        rgba(89, 199, 252, 1) 51%,
        rgba(7, 73, 190, 0.6) 100%
      )
      1 10;

    header {
      height: 50px;
      line-height: 50px;
      text-align: left;
      padding-left: 15px;
      margin-top: 10px;
      font-size: 20px;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
      display: flex;
      align-items: center;

      input {
        width: 140px;
        margin: 0px 10px;
        background-color: #495a94;
        border: 1px solid #2da4da;
        padding: 7px 9px;
        color: #fff;
      }

      input::-webkit-input-placeholder {
        color: #fff;
      }

      input:-moz-placeholder {
        color: #fff;
      }

      input::-moz-placeholder {
        color: #fff;
      }

      input:-ms-input-placeholder {
        color: #fff;
      }

      button {
        background-color: #2da4da;
        border: none;
        padding: 7px 11px;
        color: #fff;
      }
    }

    .switch {
      height: 45px;
      line-height: 45px;
      text-align: left;
      padding-left: 15px;
      font-size: 20px;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);

      cursor: pointer;
      .active {
        color: #fff;
      }
      i {
        font-style: normal;
        margin: 0 10px;
      }
    }

    .selectFrame::-webkit-scrollbar {
      display: none;
    }
    .selectFrame {
      height: 740px;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10px;
      padding-top: 0px;
      text-align: left;

      > div {
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 52px;
          background: #4691ed;
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 12px;
          padding-right: 12px;
          font-size: 18px;
          margin-bottom: 10px;
          cursor: pointer;

          span {
            background: #162449;
            padding: 7px 10px;
            border-radius: 6px;
            font-size: 15px;
            opacity: 0.9;
          }
        }
        > ul:first-child {
          color: rgba(42, 255, 250, 1);
        }
      }

      ul {
        width: 100%;
        box-sizing: border-box;
        li {
          height: 33px;
          line-height: 28px;
          list-style: none;
          background: rgba(120, 171, 246, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 4px 10px 4px 12px;
          margin-bottom: 10px;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          cursor: pointer;

          p {
            font-size: 18px;
            line-height: 18px;
          }

          span {
            font-size: 13px;
            font-weight: bolder;
            background: #f5f5f5;
            padding: 0px 4px;
            border-radius: 6px;
            opacity: 0.9;
          }
        }
      }
    }
  }

  /*  input   */
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*编辑我们自己的样式*/
    position: relative;
    width: 18px;
    height: 18px;
    // transform : translate(-9px, -8px);
    background: rgba(21, 249, 253, 0.66);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border: 0px;
    outline: none;
    cursor: pointer;
    top: 2px;
    margin-right: 2px;
  }

  input[type="checkbox"]:after {
    content: "√";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 24px;
    /*增加动画*/
    -webkit-transition: all ease-in-out 300ms;
    -moz-transition: all ease-in-out 300ms;
    transition: all ease-in-out 300ms;
    /*利用border-radius和opacity达到填充的假象，首先隐藏此元素*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    opacity: 0;
  }

  input[type="checkbox"]:checked:after {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    opacity: 1;
  }
}
</style>
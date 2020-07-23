<template>
  <div class="leftMultiSelect">
    <div class="topic">
      <div class="selectFrame no_select">
        <div v-for="(item,index) in tree" :key="index">
          <span @click="toggleTree(item.label,index)">
            {{ item.label }}
            <input
              v-if="!item.disabled"
              type="checkbox"
              v-model="item.check"
              @change="changeBox(item.check,index)"
              @click="stop($event)"
            />
            <i :class="`iconfont ${item.show?`iconRectangleCopy7`:`iconRectangleCopy4`}`"></i>
          </span>
          <ul v-show="item.show">
            <li v-for="(oitem,oindex) in item.children" :key="oindex">
              <input
                type="checkbox"
                v-if="!item.disabled"
                v-model="oitem.check"
                @change="changeTree(oitem)"
              />
              <p @click="changeTree(oitem)">{{ oitem.name }}</p>
              <span
                id="xq"
                v-if="!~['chanyePlate', 'wg', 'xq'].indexOf(oitem.id)"
                @click="ShowListXQ(oitem)"
              >详情</span>
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
import { csSortHash, csMap } from "../config/hash";
const { server } = WRT_config;
export default {
  name: "leftMultiSelect",
  data() {
    return {
      icon_show: true,
      tree: [],
      server
    };
  },
  props: { leftOptions: Array },
  created() {
    this.tree = this.leftOptions;
  },
  methods: {
    ShowListXQ(obj) {
      // console.log("obj", obj);
      this.$parent.listShow = true;
      this.$parent.$refs.listxq.getItem(obj);
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
    },
    stop(e) {
      e.stopPropagation();
    },
    changeBox(item, index) {
      const c = this.tree[index].check;
      const list = [];
      for (let i in this.tree[index].children) {
        this.tree[index].children[i].check = c;
        if (c == true) list.push(this.tree[index].children[i].name);
      }

      this.$parent.$refs.charts.activeList = list;
    },
    intercept() {
      const _tree = this.$util.clone(this.tree);
      const list = [];
      for (let i = 0; i < _tree.length; i++) {
        let shall = true;
        _tree[i].children.length
          ? _tree[i].children.map(item => {
              if (!item.check) {
                shall = false;
              } else {
                list.push(item.name);
              }
            })
          : (shall = false);
        _tree[i].check = shall;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;

      this.$parent.$refs.charts.activeList = list;
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
    leftOptions(newV, oldV) {
      this.tree = newV;
    }
  }
};
</script>
<style scoped lang="less">
// @import url("../css/style.less");
@import url("../../common/_iconfont/iconfont.css");
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
      height: 40px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
      // padding-left: 20px;
      cursor: pointer;
      .active {
        font-weight: 700;
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
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10px;
      text-align: left;

      > div {
        > span {
          display: block;
          height: 52px;
          line-height: 54px;
          height: 52px;
          background: rgba(102, 164, 255, 0.45);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 12px;
          font-size: 18px;
          margin-bottom: 10px;
          i {
            cursor: pointer;
            color: #fff;
            float: right;
            padding-right: 15px;
            font-size: 40px;
          }
        }
        > ul:first-child {
          // p {
          color: rgba(42, 255, 250, 1);
          // }
        }
      }

      ul {
        width: 100%;
        box-sizing: border-box;
        .sub {
          height: 30px;
          line-height: 10px;
          margin-left: 40px;
          width: 70%;
          float: right;
          padding-left: 10px;
          position: relative;
          p {
            font-size: 16px;
            line-height: 22px;
          }
        }
        .sub:before {
          content: "|_";
          position: absolute;
          left: -20px;
          top: 4px;
        }
        li {
          height: 44px;
          line-height: 28px;
          list-style: none;
          background: rgba(120, 171, 246, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 4px;
          padding-left: 22px;
          margin-bottom: 10px;
          // display: inline-block;
          width: 90%;
          // justify-content: space-between;

          display: flex;
          align-items: center;

          p {
            font-size: 18px;
            cursor: pointer;
            line-height: 18px;
            display: inline-block;
            width: 70%;
            position: relative;
            // top: 5px;
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              position: relative;
              top: 6px;
            }
            span {
              background: unset;
              margin-bottom: unset;
              display: unset;
              box-shadow: none;
            }
          }
          #xq {
            background: unset;
            margin-bottom: unset;
            display: unset;
            box-shadow: none;
            background-color: #162449 !important;
            border: 1px solid #75c8f4 !important;
            border-radius: 8px;
            padding: 7px 9px !important;
            color: #fff;
            cursor: pointer;
            width: 36px !important;
            height: 20px !important;
            font-size: 14px !important;
            line-height: 23px !important;
            margin-left: auto;
            // margin-top: 4px;
            text-align: center;
            // float: right;
          }
          #ssry,
          #fgxq {
            background: unset;
            margin-bottom: unset;
            display: unset;
            box-shadow: none;
            background-color: #162449 !important;
            border: 1px solid #75c8f4 !important;
            border-radius: 8px;
            padding: 7px 9px !important;
            color: #fff;
            cursor: pointer;
            width: 56px !important;
            height: 20px !important;
            font-size: 14px !important;
            line-height: 23px !important;
            margin-left: auto;
            // margin-top: 4px;
            text-align: center;
            // float: right;
          }
          .switch {
            top: -10px;
          }
          input[type="checkbox"] {
            top: 0px;
            left: -8px;
          }
        }
      }
    }
    .map_content {
      height: 3%;
      display: flex;
    }
    .map_content div {
      width: 33%;
      padding: 2%;
    }
    .map_content span {
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
  }
  .blueBorder {
    height: unset !important;
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
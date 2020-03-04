<template>
  <div class="Com_content Monitor">
    <div class="subTitle">
      <span>——</span>
      做地出让指挥地图
    </div>
    <div class="btnGroup">
      <ul>
        <!-- <li>企业复工</li>
        <li>做地地图</li>
        <li>营销分析</li>-->
        <li
          v-for="(item, key, index) in lists "
          :key="index"
          @click="selectT(item.value,item.title)"
          :class="{active:activeName==item.value,li_tab_active:activeName==item.value}"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="page_container">
      <transition enter-class="fade-in-enter" enter-active-class="fade-in-active">
        <keep-alive include="MonitorMap">
          <components :is="activeName" :items="item" :search="search" ref="StyleTool"></components>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import MonitorMap from "./monitorMap/MonitorMap";
import Marketing from "./marketing/Marketing";
import Block from "./block/Block";
import Placement from "./placement/Placement";

import { mapState, mapActions } from "vuex";

export default {
  name: "monitor",
  data() {
    return {
      activeName: "MonitorMap",
      lists: [
        { value: "MonitorMap", title: "做地地图" },
        { value: "Block", title: "区块优势" },
        { value: "Marketing", title: "营销分析" },
        { value: "Placement", title: "安置房分析" }
      ],
      item: {},
      search: {}
    };
  },
  components: {
    MonitorMap,
    Marketing,
    Block,
    Placement
  },
  watch: {
    item(newV, oldV) {
      console.log("itemChange", newV, oldV);
    }
  },
  created() {},
  mounted() {
    !this.zdjzList.length && this.fetchzdjzList();
    !this.dkxxList.length && this.fetchdkxxList();
  },
  computed: {
    ...mapState({
      zdjzList: state => state.zdjzList,
      dkxxList: state => state.dkxxList
    })
  },
  activated() {
    if (this.$route.params.Jump) {
      this.activeName = this.$route.params.activeName;
      this.search = this.$route.params.list;
      console.log(this.$route.params.list);
    } else {
      this.activeName = "MonitorMap";
    }
  },
  methods: {
    ...mapActions(["fetchzdjzList", "fetchdkxxList"]),
    //高亮标签
    selectT(value, title) {
      this.activeName = value;
    }
  }
};
</script>
<style scoped lang="less">
@import url("./Monitor.less");
</style>
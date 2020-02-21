/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import {
  lc_xqcrjl,
  lc_xqryxx,
  lc_zdjzxx,
  lc_dkjbxx
} from "@/api/beans/fetch";
export default new Vuex.Store({
  state: {
    // 出入记录
    crjlList: [],
    // 人员信息
    ryxxList: [],
    // 做地进展
    zdjzList: [],
    // 地块基本信息
    dkxxList: []
  },
  mutations: {
    updatecrjlList(state, val) {
      state.crjlList = val;
    },
    updateryxxList(state, val) {
      state.ryxxList = val;
    },
    updatezdjzList(state, val) {
      state.zdjzList = val;
    },
    updatedkxxList(state, val) {
      state.dkxxList = val;
    },
  },
  actions: {
    async fetchcrjlList({
      state,
      commit
    }, option) {
      const {
        data
      } = await lc_xqcrjl();
      commit('updatecrjlList', data)
    },
    async fetchryxxList({
      state,
      commit
    }, option) {
      const {
        data
      } = await lc_xqryxx();
      commit('updateryxxList', data)
    },
    async fetchzdjzList({
      state,
      commit
    }, option) {
      const {
        data
      } = await lc_zdjzxx();
      commit('updatezdjzList', data)
    },
    async fetchdkxxList({
      state,
      commit
    }, option) {
      const {
        data
      } = await lc_dkjbxx();
      commit('updatedkxxList', data)
    }
  }
});
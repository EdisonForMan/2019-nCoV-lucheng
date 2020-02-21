<template>
  <div id="topDateDiv">
    <ul>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">{{ crdk_jh }}</span> 宗
        </h4>
        <p style="color: #d793ff;">出让地块</p>
        <h4>
          累计
          <span style="color: #6dff3d;">{{ crdk_lj }}</span> 宗
        </h4>
      </li>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">{{ crje_jh }}</span> 亿
        </h4>
        <p style="color: #ff8d4a;">出让金额</p>
        <h4>
          累计
          <span style="color: #6dff3d;">{{ crje_lj }}</span> 亿
        </h4>
      </li>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">{{ crmj_jh }}</span> 亩
        </h4>
        <p style="color: #eee72d;">出让面积</p>
        <h4>
          累计
          <span style="color: #6dff3d;">{{ crmj_lj }}</span> 亩
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      crdk_lj: 0,
      crje_lj: 0,
      crmj_lj: 0,
      crdk_jh: 0,
      crje_jh: 0,
      crmj_jh: 0
    };
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    ...mapActions(["fetchdkxxList"]),
    fixdkxxList() {
      !this.dkxxList.length && this.fetchdkxxList();

      let crdk_lj = 0;
      let crje_lj = 0;
      let crmj_lj = 0;
      let crdk_jh = 0;
      let crje_jh = 0;
      let crmj_jh = 0;

      this.dkxxList.map(({ CRQK, CJJ, QSJ, TDMJ, SSJD }) => {
        if (CRQK == "已出让") {
          // crdkObj[SSJD].value++;
          // crjeObj[SSJD].value =
          //   Number(crjeObj[SSJD].value) + Number(CJJ) / 10000;
          // crmjObj[SSJD].value = Number(crjeObj[SSJD].value) + Number(TDMJ);

          crdk_lj++;
          CJJ != "/" && (crje_lj = Number(crje_lj) + Number(CJJ));
          TDMJ != "/" && (crmj_lj = Number(crmj_lj) + Number(TDMJ));
        }

        crdk_jh++;
        QSJ != "/" && (crje_jh = Number(crje_lj) + Number(QSJ));
        TDMJ != "/" && (crmj_jh = Number(crmj_lj) + Number(TDMJ));
      });

      this.crdk_lj = crdk_lj;
      this.crje_lj = (crje_lj / 10000).toFixed(2);
      this.crmj_lj = crmj_lj.toFixed(2);
      this.crdk_jh = crdk_jh;
      this.crje_jh = (crje_jh / 10000).toFixed(2);
      this.crmj_jh = crmj_jh.toFixed(2);
    }
  },
  mounted() {
    !this.dkxxList.length && this.fetchdkxxList();
    this.fixdkxxList();
  },
  watch: {
    dkxxList(n) {
      this.fixdkxxList();
    }
  }
};
</script>

<style lang="less" scoped>
#topDateDiv {
  position: absolute;
  top: 90px;
  width: 100%;
  z-index: 20;

  ul li {
    width: 130px;
    margin: 0px 15px;
    display: inline-block;
    background-color: #1b45a7;
    border: 1px solid #07e2e8;
    padding: 5px 9px;
    color: #07e2e8;

    span {
      font-size: 21px;
    }

    p {
      font-weight: bolder;
      margin: 5px;
    }
  }
}
</style>
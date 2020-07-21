<template>
  <div class="report">
    <div class="rDiv1">
      <div class="back-block">
        <span class="detail-btn analyze" @click="back"></span>
        <span class="detail-btn detail" @click="detail"></span>
        <span class="detail-btn report_checked"></span>
      </div>
    </div>

    <div class="rDiv2">
      <span class="title">{{ option.name }}</span>
      <div>
        <div class="chart-bg">
          <span class="row1"></span>
          <span class="row2"></span>
          <span class="col2"></span>
          <span class="col1"></span>
          <div class="tb">
            <div class="tb_out">
              <div class="tb_in">
                <img src="../../common/image/detail_type.png" />
                类型：{{ option.type }}
              </div>
              <div class="tb_in">
                <img src="../../common/image/detail_type.png" />
                所在地址：{{ option.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">文明创建生命周期</span>
      <div class="timeline"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        name: "滨江街道办事处",
        type: "街道办事处",
        address: ""
      }
    };
  },
  methods: {
    back() {
      this.$parent.$parent.rightCheckIndex = 0;
    },
    detail() {
      this.$parent.$parent.rightCheckIndex = 1;
    }
  }
};
</script>

<style lang="less" scoped>
.report {
  width: 100%;
  height: 100%;
  // border: 1px solid #035acd;
  text-align: left;

  .chart-bg {
    position: relative;
    margin: 0 15px;
    padding: 10px;
    border: 1px solid #3659a5;

    > span {
      position: absolute;
      padding: 5px;
      border-style: solid;
      border-color: #fff;
    }

    .row1 {
      border-width: 0.2rem 0 0 0.2rem;
      top: -0.2rem;
      left: -0.2rem;
    }

    .row2 {
      border-width: 0.2rem 0.2rem 0 0;
      top: -0.2rem;
      right: -0.2rem;
    }

    .col1 {
      border-width: 0 0 0.2rem 0.2rem;
      bottom: -0.2rem;
      left: -0.2rem;
    }

    .col2 {
      border-width: 0 0.2rem 0.2rem 0;
      bottom: -0.2rem;
      right: -0.2rem;
    }
  }

  .back-block {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 6px 0;

    .analyze {
      background-image: url("~@/components/common/image/analyze.png");
    }
    .detail {
      background-image: url("~@/components/common/image/detail.png");
    }
    .report {
      background-image: url("~@/components/common/image/report.png");
    }

    .analyze_checked {
      background-image: url("~@/components/common/image/analyze_checked.png");
    }
    .detail_checked {
      background-image: url("~@/components/common/image/detail_checked.png");
    }
    .report_checked {
      background-image: url("~@/components/common/image/report_checked.png");
    }

    .detail-btn {
      display: inline-block;
      width: 90px;
      height: 33px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

  .title {
    display: inline-block;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: #ffe048;
    // border-left: 4px solid #ffe048;
    margin: 13px 15px 10px;
    padding-left: 7px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: -2px;
      transform: translate(0, -50%);
      margin-right: 15px;
      height: 13px;
      width: 3px;
      background-color: #ffe048;
    }
  }

  .rDiv3 {
    .timeline {
      height: 300px;
    }
  }
}
</style>
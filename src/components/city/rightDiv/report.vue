<template>
  <div class="report">
    <!-- <div class="rDiv1">
      <div class="back-block">
        <span class="detail-btn analyze" @click="back"></span>
        <span class="detail-btn detail" @click="detail"></span>
        <span class="detail-btn report_checked"></span>
      </div>
    </div>-->

    <div class="rDiv2">
      <span class="title">{{ option.name }}</span>
      <div>
        <Border>
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
        </Border>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">文明创建生命周期</span>
      <div class="timeline"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Border from "@/components/common/widget/border";
export default {
  data() {
    return {
      option: {
        name: "南郊街道办事处",
        type: "街道办事处",
        address: "洛河路10号"
      }
    };
  },
  components: {
    Border
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

  .tb {
    .tb_out {
      //   height: 200px;
      //   width: 90%;
      //   border: 1px solid black;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      // margin: 0 10px;
      padding: 0 5px;
      background-color: #234aaa;
      border-radius: 5px;

      .tb_in {
        display: flex;
        align-items: center;
        // height: 25%;
        padding: 2px;
        // width: 50%;
        box-sizing: border-box;
        // border: 1px solid red;

        font-family: PingFang SC;
        font-size: 14px;

        img {
          //   display: inline-block;
          width: 10px;
          height: 10px;
          //   background-repeat: no-repeat;
          //   background-size: 100% 100%;
          //   margin-top: 2px;
          margin-right: 6px;
        }
      }

      .tb_in {
        // height: 25%;
        width: 100%;
      }
    }
  }

  .rDiv3 {
    .timeline {
      height: 300px;
    }
  }
}
</style>
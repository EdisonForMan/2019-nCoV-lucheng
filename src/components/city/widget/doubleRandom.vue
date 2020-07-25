<template>
  <div class="doubleRandom">
    <div class="wrapper">
      <div class="header">
        <a @click="()=>{ this.$parent.randomShow = false }">×</a>
      </div>
      <div class="body">
        <div class="left">
          <Border>
            <div>双随机任务</div>
          </Border>
          <Border>
            <div>历史随机任务</div>
          </Border>
        </div>
        <div class="right">
          <Border>
            <div class="tb_out"></div>
          </Border>
        </div>
      </div>
      <div class="footer">
        <div>
          <span>保存任务</span>
        </div>
      </div>
    </div>
    <div class="modal"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Border from "@/components/common/widget/border";
export default {
  data() {
    return {};
  },
  components: { Border },
};
</script>

<style lang="less" scoped>
.doubleRandom {
  .wrapper {
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    width: 1000px;
    height: 550px;
    background-color: rgba(20, 105, 233, 0.5);
    z-index: 101;

    .header {
      text-align: right;
      padding-right: 10px;
      a {
        font-size: 35px;
        cursor: pointer;
      }
    }
    .body {
      //   display: inline-block;
      //   width: 80%;

      display: flex;

      .left {
        // display: inline;
        // width: 20%;
        padding: 0 15px;

        > div:nth-child(2) {
          margin-top: 15px;
        }
      }

      .right {
        // display: inline;
        // width: 80%;

        .tb_out {
          width: 700px;
          height: 400px;
          background-color: #204ba9;
          border-radius: 4px;
          padding: 8px 13px;

          overflow-y: auto;

          &::-webkit-scrollbar {
            display: block;
            width: 7px;
            background-color: #11368f;
            position: absolute;
            right: 30px;
          }

          &::-webkit-scrollbar-thumb {
            width: 7px;
            background-color: #fff;
            border-radius: 4px;
          }
        }
      }
    }
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: #000;
    z-index: 100;
  }
}
</style>
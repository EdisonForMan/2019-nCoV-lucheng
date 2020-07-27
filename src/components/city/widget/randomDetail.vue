<template>
  <div class="randomDetail">
    <div class="detail_wrapper">
      <div class="detail_title">
        <span>详情</span>
        <a @click="()=>{ this.$parent.detailShow = false }">×</a>
      </div>
      <div class="detail_header">
        <div class="header_label">
          <span>
            <label>任务名称：</label>
            <span>{{ taskObj.name }}</span>
          </span>
          <span>
            <label>任务时间：</label>
            <span>{{ taskObj.taskTime }}</span>
          </span>
          <span>
            <label>完成时间：</label>
            <span>{{ taskObj.finishTime }}</span>
          </span>
        </div>
        <div class="header_content"></div>
      </div>
      <div class="detail_body">
        <Border>
          <div class="tb_out">
            <div class="tb_header">
              <span>序号</span>
              <span>类别</span>
              <span>名称</span>
              <span>所属街道</span>
              <span>点位负责人</span>
              <span>联系方式</span>
            </div>
            <div class="tb_body">
              <div v-for="(item, index) in historyTaskList" :key="index">
                <span>{{ ++index }}</span>
                <span>{{ item.type }}</span>
                <span>{{ item.name }}</span>
                <span>{{ item.country }}</span>
                <span>
                  <p v-for="( oitem, oindex) in item.manager" :key="oindex">{{ oitem }}</p>
                </span>
                <span>
                  <p v-for="( oitem, oindex) in item.tel" :key="oindex">{{ oitem }}</p>
                </span>
              </div>
            </div>
          </div>
        </Border>
      </div>
    </div>

    <div class="detail_modal"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Border from "@/components/common/widget/border";
export default {
  data() {
    return {
      taskObj: {
        name: "文明城市日常随机督察",
        taskTime: "2020-07-10",
        finishTime: "2020-07-21",
      },
      historyTaskList: [
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
        {
          type: "街道办事处",
          name: "南郊街道办事处",
          country: "南郊街道",
          manager: ["厉震"],
          tel: ["123456789"],
        },
      ],
    };
  },
  components: { Border },
};
</script>

<style lang="less" scoped>
.randomDetail {
  .detail_wrapper {
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-35%, 0);
    width: 800px;
    height: 530px;
    background-color: #2148a5;
    z-index: 104;

    .detail_title {
      text-align: left;
      padding: 10px;
      > span {
        font-family: PingFang SC;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.06em;
        color: #fff;
        margin: 13px 15px 10px;
        padding-left: 7px;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -2px;
          transform: translate(0, -50%);
          height: 13px;
          width: 3px;
          background-color: #fff;
        }
      }

      > a {
        position: absolute;
        z-index: 32;
        top: 0px;
        right: 10px;
        font-size: 30px;
        cursor: pointer;
      }
    }

    .detail_header {
      padding: 15px 35px;
      .header_label {
        display: flex;
        justify-content: space-between;

        > span {
          display: inline-block;
          font-family: PingFang SC;
          font-size: 14px;

          label {
            color: #57dbfb;
          }
        }
      }

      .header_content {
        background-color: #133b93;
        height: 100px;
      }
    }

    .detail_body {
      padding: 15px 25px;

      .tb_out {
        height: 290px;
        overflow-x: hidden;
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

        .tb_header {
          > span {
            display: inline-block;
            font-family: PingFang SC;
            font-size: 14px;
            color: #5adaf3;

            &:nth-child(1) {
              width: 5%;
              // text-align: left;
            }
            &:nth-child(2) {
              width: 20%;
            }
            &:nth-child(3) {
              width: 25%;
            }
            &:nth-child(4) {
              width: 15%;
            }
            &:nth-child(5) {
              width: 15%;
            }
            &:nth-child(6) {
              width: 20%;
            }
          }
        }

        .tb_body {
          > div {
            display: flex;
            align-items: center;
            background-color: #375bb3;
            margin: 8px 0px;
            padding: 7px 0px;

            &:last-child {
              margin-bottom: 0;
            }

            > span {
              display: inline-block;
              font-family: PingFang SC;
              font-size: 14px;
              position: relative;
              padding: 0 7px;

              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;

              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              &:nth-child(1) {
                width: 5%;
              }
              &:nth-child(2) {
                width: 20%;
                //   text-align: left;
              }
              &:nth-child(3) {
                width: 25%;
              }
              &:nth-child(4) {
                width: 15%;
              }
              &:nth-child(5) {
                width: 15%;
              }
              &:nth-child(6) {
                width: 20%;
              }

              &:first-child::before {
                width: 0px;
              }

              &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 0px;
                transform: translate(0, -50%);
                margin-right: 15px;
                height: 16px;
                width: 1px;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }

  .detail_modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: #000;
    z-index: 103;
  }
}
</style>
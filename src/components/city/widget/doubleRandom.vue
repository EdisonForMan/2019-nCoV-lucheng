<template>
  <div class="doubleRandom">
    <div class="wrapper">
      <div class="header">
        <a @click="()=>{ this.$parent.randomShow = false }">×</a>
      </div>
      <div class="body">
        <div class="left">
          <Border v-for="(item, index) in taskTypeList" :key="index">
            <div
              class="task_btn"
              :class="{ active: taskIndex == index }"
              @click="changeTask(index)"
            >
              <span>{{ item.label }}</span>
            </div>
          </Border>
        </div>
        <div class="right">
          <div v-if="taskIndex == 0">
            <Border>
              <div class="right_inner">
                <div class="head_tools">
                  <section>
                    <label>区域选择：</label>
                    <CommonSelect :style="{ width: '120px' }" />
                  </section>
                  <section>
                    <label>任务名称：</label>
                    <CommonEdit :style="{ width: '140px' }" />
                  </section>
                  <section>
                    <label>任务时间：</label>
                    <CommonSelect :style="{ width: '140px' }" />
                  </section>
                  <div class="random">
                    <span>随 机</span>
                  </div>
                  <div class="setting">
                    <img src="@/components/common/image/setting.png" />
                  </div>
                </div>
                <div class="staff_list">
                  <label>随机检查组名单：</label>
                  <span>(随机人员姓名)</span>
                </div>
                <div class="tb_out">
                  <div class="tb_header">
                    <span>类别</span>
                    <span>名称</span>
                    <span>详细地址</span>
                    <span>点位负责人</span>
                    <span>联系方式</span>
                  </div>
                  <div class="tb_body">
                    <div v-for="(item, index) in taskList" :key="index">
                      <span>{{ item.type }}</span>
                      <span>
                        <el-popover placement="bottom-start" trigger="hover" :content="item.name">
                          <p slot="reference">{{ item.name }}</p>
                        </el-popover>
                      </span>
                      <span>{{ item.address }}</span>
                      <span>
                        <p v-for="( oitem, oindex) in item.manager" :key="oindex">{{ oitem }}</p>
                      </span>
                      <span>
                        <p v-for="( oitem, oindex) in item.tel" :key="oindex">{{ oitem }}</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Border>
            <div class="footer">
              <div class="save">
                <span>保存任务</span>
              </div>
            </div>
          </div>
          <div v-else>
            <Border>
              <div class="history_right_header">
                <div class="inner_top">
                  <div class="inner_top_left">
                    <label>任务名称查询：</label>
                    <CommonEdit :style="{ width: '150px' }" />
                  </div>
                  <div class="inner_top_right">
                    <label>时间点查询：</label>
                    <CommonEdit :style="{ width: '150px' }" />
                  </div>
                </div>
                <div class="inner_bottom">
                  <div class="inner_bottom_left">
                    <label>具体点位查询：</label>
                    <CommonEdit :style="{ width: '150px' }" />
                  </div>
                  <div class="inner_bottom_right">
                    <label>人员名称查询：</label>
                    <CommonEdit :style="{ width: '150px' }" />
                  </div>
                </div>
              </div>
            </Border>
            <Border>
              <div class="history_right_body">
                <div class="tb_header">
                  <span>任务名称</span>
                  <span>任务时间</span>
                  <span>点位数</span>
                  <span>抽取数</span>
                  <span>操作</span>
                </div>
                <div class="tb_body">
                  <div v-for="(item, index) in historyTaskList" :key="index">
                    <span>{{ item.name }}</span>
                    <span>{{ item.time }}</span>
                    <span>{{ item.point_num }}/{{ item.point_sum }}</span>
                    <span>{{ item.extract_num }}/{{ item.extract_sum }}</span>
                    <span>
                      <div class="detail" @click="checkDetail(item)">
                        <img src="@/components/common/image/checkDetail.png" />
                        <span>查看详情</span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </Border>
          </div>
        </div>
      </div>
    </div>

    <RandomDetail v-show="detailShow" />

    <div class="modal"></div>
  </div>
</template>

<script>
/* eslint-disable */
import Border from "@/components/common/widget/border";
import CommonSelect from "@/components/city/widget/commonSelect";
import CommonEdit from "@/components/city/widget/commonEdit";
import RandomDetail from "@/components/city/widget/randomDetail";
export default {
  data() {
    return {
      taskIndex: 0,
      taskTypeList: [
        {
          label: "双随机任务",
        },
        {
          label: "历史随机任务",
        },
      ],
      taskList: [
        {
          type: "交通路口、主要交通路口、示范样板路",
          name: "温州大道东龙路口",
          address: "温州大道东龙路交叉路口",
          manager: ["XXX", "ABC"],
          tel: ["123456789", "123456789"],
        },
        {
          type: "未成年人心理健康指导中心",
          name: "东龙社区综合文化服务中心",
          address: "南郊街道方公路6号二楼",
          manager: ["XXX"],
          tel: ["123456789"],
        },
        {
          type: "交通路口、主要交通路口、示范样板路",
          name: "温州大道东龙路口",
          address: "温州大道东龙路交叉路口",
          manager: ["XXX", "ABC"],
          tel: ["123456789", "123456789"],
        },
        {
          type: "未成年人心理健康指导中心",
          name: "东龙社区综合文化服务中心",
          address: "南郊街道方公路6号二楼",
          manager: ["XXX"],
          tel: ["123456789"],
        },
        {
          type: "交通路口、主要交通路口、示范样板路",
          name: "温州大道东龙路口",
          address: "温州大道东龙路交叉路口",
          manager: ["XXX", "ABC"],
          tel: ["123456789", "123456789"],
        },
        {
          type: "未成年人心理健康指导中心",
          name: "东龙社区综合文化服务中心",
          address: "南郊街道方公路6号二楼",
          manager: ["XXX"],
          tel: ["123456789"],
        },
        {
          type: "交通路口、主要交通路口、示范样板路",
          name: "温州大道东龙路口",
          address: "温州大道东龙路交叉路口",
          manager: ["XXX", "ABC"],
          tel: ["123456789", "123456789"],
        },
        {
          type: "未成年人心理健康指导中心",
          name: "东龙社区综合文化服务中心",
          address: "南郊街道方公路6号二楼",
          manager: ["XXX"],
          tel: ["123456789"],
        },
      ],
      historyTaskList: [
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
        {
          name: "文明城市日常随机督察",
          time: "2020-07-20",
          point_num: 200,
          point_sum: 800,
          extract_num: 10,
          extract_sum: 100,
        },
      ],
      detailShow: false,
    };
  },
  components: { Border, CommonSelect, CommonEdit, RandomDetail },
  methods: {
    changeTask(index) {
      this.taskIndex = index;
    },
    checkDetail(obj) {
      console.log("obj", obj);
      this.detailShow = true;
    },
  },
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
    background-color: rgba(81, 118, 188, 0.8);
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
      display: flex;

      .left {
        padding: 0 15px;

        > div:nth-child(2) {
          margin-top: 15px;
        }

        .task_btn {
          padding: 15px;
          background: #224aaa;
          border-radius: 4px;
          cursor: pointer;

          span {
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 600;
          }
        }

        .active {
          background: linear-gradient(
            0deg,
            rgba(249, 120, 34, 1),
            rgba(241, 199, 99, 1)
          );
          box-shadow: 0px 2px 2px 0px rgba(54, 98, 193, 0.4),
            0px 1px 1px 0px rgba(155, 234, 246, 0.8),
            0px -1px 0px 0px rgba(29, 74, 166, 0.5);
        }
      }

      .right {
        .right_inner {
          width: 740px;
          height: 400px;
          background-color: #204ba9;
          border-radius: 4px;
          padding: 8px 13px;

          .head_tools {
            display: flex;
            justify-content: space-between;
            align-items: center;
            label {
              font-family: PingFang SC;
              font-size: 14px;
              color: #2ae8b7;
            }

            .random {
              height: 26px;
              line-height: 26px;
              padding: 0 10px;
              border-radius: 3px;
              background: linear-gradient(
                0deg,
                rgba(249, 120, 34, 1),
                rgba(241, 199, 99, 1)
              );
              cursor: pointer;

              span {
                font-family: PingFang SC;
                font-size: 14px;
              }
            }

            .setting {
              padding: 5px 6px 3px;
              border-radius: 3px;
              background: linear-gradient(
                0deg,
                rgba(18, 123, 227, 1),
                rgba(95, 207, 244, 1)
              );
              cursor: pointer;

              img {
                width: 14px;
                height: 14px;
              }
            }
          }

          .staff_list {
            text-align: left;
            margin: 10px 0;
            label {
              font-family: PingFang SC;
              font-size: 14px;
              color: #2ae8b7;
            }
            span {
              font-family: PingFang SC;
              font-size: 14px;
            }
          }

          .tb_out {
            height: 330px;
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
                  width: 25%;
                  // text-align: left;
                }
                &:nth-child(2) {
                  width: 20%;
                }
                &:nth-child(3) {
                  width: 20%;
                }
                &:nth-child(4) {
                  width: 15%;
                }
                &:nth-child(5) {
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
                    width: 25%;
                  }
                  &:nth-child(2) {
                    width: 20%;
                    text-align: left;
                  }
                  &:nth-child(3) {
                    width: 20%;
                  }
                  &:nth-child(4) {
                    width: 15%;
                  }
                  &:nth-child(5) {
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

        .history_right_header {
          width: 740px;
          background-color: #204ba9;
          border-radius: 4px;
          padding: 8px 13px;

          .inner_top,
          .inner_bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
              font-family: PingFang SC;
              font-size: 14px;
              color: #2ae8b7;
            }
          }

          .inner_top {
            margin-bottom: 15px;
          }
        }

        .history_right_body {
          height: 330px;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #204ba9;
          padding: 8px 15px;

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
                width: 25%;
                // text-align: left;
              }
              &:nth-child(2) {
                width: 20%;
              }
              &:nth-child(3) {
                width: 20%;
              }
              &:nth-child(4) {
                width: 15%;
              }
              &:nth-child(5) {
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
                  width: 25%;
                }
                &:nth-child(2) {
                  width: 20%;
                  // text-align: left;
                }
                &:nth-child(3) {
                  width: 20%;
                }
                &:nth-child(4) {
                  width: 15%;
                }
                &:nth-child(5) {
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

              > span:last-child {
                .detail {
                  color: #6deab1;
                  cursor: pointer;
                  display: inline-block;
                  // align-items: center;
                  border-bottom: 0.06rem solid #6deab1;

                  // > span {
                  //   position: relative;

                  //   &::before {
                  //     content: "";
                  //     position: absolute;
                  //     top: 50%;
                  //     left: -14px;
                  //     transform: translate(0, -50%);
                  //     margin-right: 15px;
                  //     height: 14px;
                  //     width: 14px;
                  //     // margin-right: 5px;
                  //     // background-color: #ffe048;
                  //     background-image: url("~@/components/common/image/checkDetail.png");
                  //   }
                  // }

                  img {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                  }
                }
              }
            }
          }
        }

        .border:nth-child(2) {
          margin-top: 15px;
        }
      }

      .footer {
        padding: 15px 0;

        .save {
          display: inline-block;
          padding: 6px 12px;
          background: linear-gradient(
            0deg,
            rgba(249, 120, 34, 1),
            rgba(241, 199, 99, 1)
          );
          border-radius: 4px;
          cursor: pointer;

          span {
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 600;
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
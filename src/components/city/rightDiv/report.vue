<template>
  <div class="report">
    <div class="rDiv1">
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

    <div class="rDiv2">
      <span class="title">文明创建生命周期</span>
      <div class="timeline">
        <div v-for="(item, index) in activities" :key="index" class="line_item">
          <div class="line_left">
            <Border>
              <div class="time_card">
                <span class="time">{{ item.timestamp }}</span>
                <span class="type" >
                  <img :src="require(`@/components/common/image/${item.icon}.png`)" />
                  {{ item.label }}
                </span>
              </div>
            </Border>
          </div>
          <div class="line_right">
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </div>
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
      },
      activities: [
        {
          timestamp: "2020-06-30",
          label: "整改上报",
          icon: "整改上报",
          content: "委派滨江街道2位负责人完成7项点位任务整改工作"
        },
        {
          timestamp: "2020-07-10",
          label: "志愿者上报",
          icon: "志愿者上报",
          content: "组织7人志愿者团队对点位进行文明维护、文明宣传活动"
        },
        {
          timestamp: "2020-07-18",
          label: "巡查上报",
          icon: "巡查上报",
          content: "巡检人员寻访，发现“公益宣传”未达标"
        },
        {
          timestamp: "2020-07-22",
          label: "无人机巡查",
          icon: "无人机巡查",
          content: "委派滨江街道2位负责人完成7项点位任务整改工作"
        },
        {
          timestamp: "2020-07-23",
          label: "双随机督察",
          icon: "双随机督察",
          content: "委派滨江街道2位负责人完成7项点位任务整改工作"
        },
        {
          timestamp: "2020-07-24",
          label: "公众举报",
          icon: "公众举报",
          content: "委派滨江街道2位负责人完成7项点位任务整改工作"
        }
      ]
    };
  },
  components: { Border },
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

  .rDiv1 {
    > div {
      padding: 0 15px;
    }
  }

  .tb {
    .tb_out {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding: 0 5px;
      background-color: #234aaa;
      border-radius: 5px;

      .tb_in {
        display: flex;
        align-items: center;
        padding: 2px;
        box-sizing: border-box;
        font-family: PingFang SC;
        font-size: 14px;

        img {
          width: 10px;
          height: 10px;
          margin-right: 6px;
        }
      }

      .tb_in {
        // height: 25%;
        width: 100%;
      }
    }
  }

  .rDiv2 {
    .timeline {
      // height: 300px;
      // border: 1px solid #000;
      // background-color: lightskyblue;
      overflow-x: hidden;
      overflow-y: auto;
      // display: flex;
      padding: 0 15px;

      .line_item {
        width: 100%;
        // height: 60%;
        display: flex;

        .line_left {
          width: 45%;
          // height: 60%;
          padding: 5px 7px 5px 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          .time_card {
            width: 87px;
            background-color: #234aa9;
            padding: 4px;
            border-radius: 4px;
            .time {
              display: block;
              font-family: PingFang SC;
              font-size: 13px;
              text-align: center;
            }
            .type {
              display: flex;
              justify-content: space-around;
              align-items: center;
              font-family: PingFang SC;
              font-size: 14px;
              text-align: center;

              img {
                width: 14px;
                height: 14px;
                // margin-right: 6px;
              }
            }
          }
        }

        .line_right {
          width: 55%;
          // height: 60%;
          border-left: 1px solid #fff;
          padding: 20px 10px;
          display: flex;
          align-items: center;

          .content {
            width: 100%;
            // height: 50%;
            background-color: #1946a5;
            position: relative;
            border-radius: 4px;
            padding: 6px;
            font-family: PingFang SC;
            font-size: 13px;

            &::before {
              content: " ";
              border-width: 6px;
              position: absolute;
              display: block;
              // width: 0;
              // height: 0;
              border-color: transparent;
              border-style: solid;
              left: -6px;
              top: 50%;
              transform: translate(0, -50%);
              border-right-color: #1946a5;
              border-left-width: 0;
            }
          }
        }
      }






    }
  }
}
</style>
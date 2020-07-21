<template>
  <div class="detail">
    <div class="rDiv1">
      <div class="back-block">
        <span class="detail-btn analyze" @click="back"></span>
        <span class="detail-btn detail_checked"></span>
        <span class="detail-btn report" @click="report"></span>
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

              <template v-for="item in option.relation">
                <div class="tb_in">
                  <img src="../../common/image/detail_man.png" />
                  <span>责任人：{{ item.name }}</span>
                </div>
                <div class="tb_in">
                  <img src="../../common/image/detail_phone.png" />
                  <span>联系方式：{{ item.phone }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">点位监控</span>
      <span class="analyze">周边分析</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>

        <video
          src="http://172.20.89.68:5001/s/lc/icon/canvassImg/book/lc_new.mp4"
          muted="muted"
          controls="controls"
          loop="loop"
        ></video>
      </div>
    </div>

    <div class="rDiv4">
      <span class="title">展示模块</span>
      <div class="chart-bg">
        <span class="row1"></span>
        <span class="row2"></span>
        <span class="col2"></span>
        <span class="col1"></span>
        <div class="moduleList">
          <div
            v-for="(item, index) in moduleList"
            :key="index"
            :style="{ background: item.background }"
            class="module"
          >
            <span class="finish-tag">{{ item.isFinish ? `已完成` : `未完成` }}</span>
            <p class="module-label">{{ item.label }}</p>
            <p class="module-enlabel">{{ item.enLabel }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
export default {
  data() {
    return {
      option: {
        name: "滨江街道办事处",
        type: "街道办事处",
        relation: [
          {
            type: "街道负责人",
            name: "XXX",
            phone: "123456789"
          },
          {
            type: "部门负责人",
            name: "XXX",
            phone: "123456789"
          }
        ]
      },
      moduleList: [
        {
          label: "公益宣传",
          enLabel: "GongYiXuanChuan",
          isFinish: true,
          background: `linear-gradient(90deg, rgba(64, 124, 246, 1), rgba(132, 234, 252, 1))`
        },
        {
          label: "环境秩序",
          enLabel: "HuanJingZhiXu",
          isFinish: true,
          background: `linear-gradient(90deg, rgba(89, 135, 245, 1), rgba(239, 130, 255, 1))`
        },
        {
          label: "垃圾分类",
          enLabel: "LaJiFenLei",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(255, 139, 41, 1), rgba(255, 192, 30, 1))`
        },
        {
          label: "消防安全",
          enLabel: "XiaoFangAnQuan",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(242, 71, 168, 1), rgba(239, 149, 81, 1))`
        },
        {
          label: "公厕管理",
          enLabel: "GongCeGuanLi",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(255, 88, 110, 1), rgba(255, 158, 68, 1))`
        },
        {
          label: "基础设施",
          enLabel: "JiChuSheShi",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(64, 124, 246, 1), rgba(132, 234, 252, 1))`
        },
        {
          label: "优质服务",
          enLabel: "YouZhiFuWu",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(89, 135, 245, 1), rgba(239, 130, 255, 1))`
        }
      ]
    };
  },
  methods: {
    back() {
      // console.log(this.$parent);
      this.$parent.$parent.rightCheckIndex = 0;
    },
    report() {
      this.$parent.$parent.rightCheckIndex = 2;
    },
    getItem(glzd) {
      if (!glzd) return;

      console.log("n", glzd);
      const that = this;

      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
        OPTION
      ).then(([QueryTask, Query, Graphic]) => {
        const queryTask = new QueryTask({
          url:
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/5"
        });
        const query = new Query();
        query.outFields = ["*"];
        query.where = `GLZD = '${glzd}'`;
        // query.returnGeometry = true;
        queryTask.execute(query).then(res => {
          if (res.features.length) {
            // console.log(res.features);

            const ds = res.features;

            that.option = {
              name: ds[0].attributes.名称,
              type: ds[0].attributes.类型,
              relation: []
            };

            ds.map(({ attributes }) => {
              that.option.relation.push({
                name: attributes.联系人,
                phone: attributes.联系方式
              });
            });

            // console.log("op", that.option);

            /* that.option = {
              name,
              type: "街道办事处",
              relation: [
                {
                  type: "街道负责人",
                  name: "XXX",
                  phone: "123456789"
                },
                {
                  type: "部门负责人",
                  name: "XXX",
                  phone: "123456789"
                }
              ]
            }; */
          }
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  // border: 1px solid #035acd;
  text-align: left;
  // overflow-x: hidden;

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
      background-color: #5271a7;
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
          width: 15px;
          height: 15px;
          //   background-repeat: no-repeat;
          //   background-size: 100% 100%;
          //   margin-top: 2px;
          margin-right: 6px;
        }
      }

      .tb_in:nth-of-type(even) {
        width: 53%;
      }

      .tb_in:nth-of-type(odd) {
        width: 47%;
      }
      .tb_in:first-child {
        // height: 25%;
        width: 100%;
        // box-sizing: border-box;
        // border: 1px solid red;
      }
    }
  }

  .rDiv3 {
    position: relative;
    .analyze {
      display: inline-block;
      font-family: PingFang SC;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.06em;
      background-image: linear-gradient(#289ff0, #244dd7);
      // color: #ffe048;
      // border-left: 4px solid #ffe048;
      // margin: 13px 15px 10px;
      padding: 7px 15px;
      position: absolute;
      top: 5px;
      right: 25px;
      border-radius: 24px;
      cursor: pointer;
    }

    video {
      width: 100%;
    }
  }

  .rDiv4 {
    .moduleList {
      padding: 7px;
      background-color: #2049ab;
      border-radius: 5px;

      .module {
        display: inline-block;
        width: 47%;
        height: 60px;
        margin-bottom: 5px;
        box-shadow: 0px 1px 1px 0px rgba(26, 64, 153, 0.4),
          0px 1px 1px 0px rgba(255, 255, 255, 0.5),
          0px -1px 0px 0px rgba(67, 130, 246, 0.5);
        border-radius: 3px;
        cursor: pointer;

        &:nth-child(odd) {
          margin-right: 6%;
        }

        .finish-tag {
          display: inline-block;
          font-family: PingFang SC;
          font-size: 12px;
          background-color: #fe9174;
          padding-right: 15px;
          border-top-left-radius: 3px;
          border-top-right-radius: 7px;
          border-bottom-right-radius: 7px;
        }

        .module-label {
          text-align: center;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0px 1px 0px rgba(64, 162, 247, 1);
        }

        .module-enlabel {
          text-align: center;
          font-size: 5px;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-shadow: 0px 1px 0px rgba(64, 162, 247, 1);
        }
      }
    }
  }
}
</style>
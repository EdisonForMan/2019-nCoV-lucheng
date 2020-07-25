<template>
  <div class="detail">
    <!-- <div class="rDiv1">
      <div class="back-block">
        <span class="detail-btn analyze" @click="back"></span>
        <span class="detail-btn detail_checked"></span>
        <span class="detail-btn report" @click="report"></span>
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
        </Border>
      </div>
    </div>

    <div class="rDiv3">
      <span class="title">点位监控</span>
      <span class="analyze">周边分析</span>
      <div>
        <Border>
          <div>
            <video
              id="myVideo"
              class="video-js vjs-default-skin vjs-big-play-centered"
              muted
              controls
              preload="auto"
              data-setup="{}"
              style="width: 100%;height: auto"
            >
              <source
                id="source"
                src="http://video-surveillance.ousutec.com.cn:6713/mag/hls/90fdea47347c4426bb4990c8dabcf933/1/live.m3u8"
                type="application/x-mpegURL"
              />
            </video>
          </div>
        </Border>
      </div>
    </div>

    <div class="rDiv4">
      <span class="title">展示模块</span>
      <div>
        <Border>
          <div class="moduleList">
            <div
              v-for="(item, index) in moduleList"
              :key="index"
              :style="{ background: item.background }"
              class="module"
            >
              <span class="finish-tag">{{ item.isFinish ? `已完成` : `未完成` }}</span>
              <p class="module-label">{{ item.label }}</p>
              <!-- <p class="module-enlabel">{{ item.enLabel }}</p> -->
            </div>
          </div>
        </Border>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION, spatialReference, IMAGELAYER } from "@/components/common/Tmap";
import Border from "@/components/common/widget/border";

import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      myVideo: null,
      option: {
        name: "南郊街道办事处",
        type: "街道办事处",
        relation: [
          {
            name: "南郊街道—厉震",
            phone: "13505777057",
          },
        ],
      },
      tag: 1,
      moduleList: [
        {
          label: "公益宣传",
          enLabel: "GongYiXuanChuan",
          isFinish: true,
          background: `linear-gradient(90deg, rgba(64, 124, 246, 1), rgba(132, 234, 252, 1))`,
        },
        {
          label: "环境秩序",
          enLabel: "HuanJingZhiXu",
          isFinish: true,
          background: `linear-gradient(90deg, rgba(89, 135, 245, 1), rgba(239, 130, 255, 1))`,
        },
        {
          label: "垃圾分类",
          enLabel: "LaJiFenLei",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(255, 139, 41, 1), rgba(255, 192, 30, 1))`,
        },
        {
          label: "消防安全",
          enLabel: "XiaoFangAnQuan",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(242, 71, 168, 1), rgba(239, 149, 81, 1))`,
        },
        {
          label: "公厕管理",
          enLabel: "GongCeGuanLi",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(255, 88, 110, 1), rgba(255, 158, 68, 1))`,
        },
        {
          label: "基础设施",
          enLabel: "JiChuSheShi",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(64, 124, 246, 1), rgba(132, 234, 252, 1))`,
        },
        {
          label: "优质服务",
          enLabel: "YouZhiFuWu",
          isFinish: false,
          background: `linear-gradient(90deg, rgba(89, 135, 245, 1), rgba(239, 130, 255, 1))`,
        },
      ],
    };
  },
  components: { Border },
  computed: {
    ...mapState({
      lcwmxxList: (state) => state.lcwmxxList,
      lcwmkcbList: (state) => state.lcwmkcbList,
    }),
  },
  async mounted() {
    await this.fetchlcwmxxList();
    await this.fetchlcwmkcbList();
    await this.initModule();

    await this.initVideo();
  },
  methods: {
    ...mapActions(["fetchlcwmxxList", "fetchlcwmkcbList"]),

    back() {
      this.$parent.$parent.rightCheckIndex = 0;
    },
    report() {
      this.$parent.$parent.rightCheckIndex = 2;
    },
    getItem(glzd) {
      if (!glzd) return;

      // console.log("n", glzd);
      const that = this;

      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
        OPTION
      ).then(([QueryTask, Query, Graphic]) => {
        const queryTask = new QueryTask({
          url:
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/5",
        });
        const query = new Query();
        query.outFields = ["*"];
        query.where = `GLZD = '${glzd}'`;
        // query.returnGeometry = true;
        queryTask.execute(query).then((res) => {
          if (res.features.length) {
            // console.log(res.features);

            const ds = res.features;

            that.option = {
              name: ds[0].attributes.名称,
              type: ds[0].attributes.类型,
              relation: [],
            };

            ds.map(({ attributes }) => {
              that.option.relation.push({
                name: attributes.联系人,
                phone: attributes.联系方式,
              });
            });
          }
        });
      });
    },

    // 初始化视频
    initVideo() {
      return new Promise((resolve, reject) => {
        this.myVideo = this.$video("myVideo", {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
        });
        this.myVideo.play();
        resolve(true);
      });
    },

    // 初始化模块
    initModule() {
      return new Promise((resolve, reject) => {
        // console.log("obj", this.lcwmkcbList);

        const list = this.lcwmkcbList;

        const sObj = {};
        const sArr = [];

        list.map(({ TAG, KC_TAG, KCNR, KCBZ }) => {
          if (!sObj[TAG]) sObj[TAG] = {};
          if (!sObj[TAG][KC_TAG]) sObj[TAG][KC_TAG] = {};
          if (!sObj[TAG][KC_TAG]["content"]) sObj[TAG][KC_TAG]["content"] = [];
          sObj[TAG][KC_TAG]["index"] = KC_TAG;
          sObj[TAG][KC_TAG]["label"] = KCNR;
          sObj[TAG][KC_TAG]["content"].push(KCBZ);
        });

        // console.log("sobj", sObj);

        resolve(true);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  // border: 1px solid #035acd;
  text-align: left;
  // overflow-x: hidden;

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

  .rDiv2 {
    > div {
      padding: 0 15px;
    }
  }

  .rDiv3 {
    position: relative;

    > div {
      padding: 0 15px;
    }

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
      height: 153px;
    }

    .video-js .vjs-tech {
      position: relative !important;
    }
  }

  .rDiv4 {
    > div {
      padding: 0 15px;
    }

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
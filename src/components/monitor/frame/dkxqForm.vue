<template>
  <div id="dkxqForm">
    <a @click="close">×</a>
    <div class="block block1">
      <span class="title">做地详情</span>
      <div class="carousel">
        <el-carousel height="200px" autoplay>
          <el-carousel-item v-for="item in imgNum" :key="item"></el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="block block2">
      <span class="title">区块优势</span>
      <div>
        <ul>
          <li v-for="(item,index) in qktable" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="block block3">
      <span class="title">问题清单</span>
      <div>
        <ul>
          <li v-for="(item,index) in qtable" :key="index">
            <div :style="{background:item.color}">
              <span>{{item.text}}</span>
              <br />
              <span>{{item.tf}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <span>负责人：李先生</span>
      <span style="margin-left: 20px;">联系方式：0577-88030503</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { mapState } from "vuex";

export default {
  name: "dkxqForm",
  data() {
    return {
      server,
      imgNum: 4,
      qtable: []
    };
  },
  components: {},
  computed: {
    ...mapState({
      zdjzList: state => state.zdjzList,
      dkxxList: state => state.dkxxList
    })
  },
  created() {
    this.qktable = [
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      },
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      },
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      }
    ];

    this.qtable = [
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" }
    ];
  },
  mounted() {},
  methods: {
    close() {
      this.$parent.dkxqShow = false;
    },
    getItem(name, imgName) {
      const that = this;

      const imgList = imgName == "/" ? [] : imgName.split(";");

      this.imgNum = imgList.length;

      console.log("list", imgList);

      if (imgList.length) {
        imgList.map((item, index) => {
          $(".el-carousel__item")
            .eq(index)
            .css({
              "background-image": `url("${server}/icon/做地/${item}")`
            });
        });
      }

      const list = this.zdjzList.filter(({ GLZD }) => name == GLZD);

      if (list.length) {
        const item = list[0];
        that.qtable = [
          {
            text: "是否已审批到位",
            tf: item.TDZSZJS1,
            color:
              item.TDZSZJS1 == "是"
                ? "rgba(58,209,75,0.3)"
                : "rgba(255,51,83,0.3)"
          },
          {
            text: "土地使用权是否已收回",
            tf: item.TDSYQ2,
            color:
              item.TDSYQ2 == "是"
                ? "rgba(58,209,75,0.3)"
                : "rgba(255,51,83,0.3)"
          },
          {
            text: "建筑物是否已拆除",
            tf: item.JZW3,
            color:
              item.JZW3 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "土地证是否已注销",
            tf: item.TDZ4,
            color:
              item.TDZ4 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "管线是否已迁移",
            tf: item.GX5,
            color:
              item.GX5 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "地表附着物是否已清理",
            tf: item.DBFZW6,
            color:
              item.DBFZW6 == "是"
                ? "rgba(58,209,75,0.3)"
                : "rgba(255,51,83,0.3)"
          },
          {
            text: "土地污染是否已治理",
            tf: item.TDWR7,
            color:
              item.TDWR7 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "场地是否已平整",
            tf: item.CD8,
            color:
              item.CD8 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "水域占用是否已审批",
            tf: item.SY9,
            color:
              item.SY9 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          },
          {
            text: "围墙放样地籍图是否完成",
            tf: item.WQFY10,
            color:
              item.WQFY10 == "是"
                ? "rgba(58,209,75,0.3)"
                : "rgba(255,51,83,0.3)"
          },
          {
            text: "土地是否收储",
            tf: item.TDSC11,
            color:
              item.TDSC11 == "是"
                ? "rgba(58,209,75,0.3)"
                : "rgba(255,51,83,0.3)"
          },
          {
            text: "是否挂牌",
            tf: item.GP12,
            color:
              item.GP12 == "是" ? "rgba(58,209,75,0.3)" : "rgba(255,51,83,0.3)"
          }
        ];
      }
    }
  }
};
</script>

<style lang="less" scoped>
#dkxqForm {
  position: absolute;
  width: 450px;
  height: 88%;
  background: rgba(4, 30, 117, 0.5);
  border-left: 1px solid #04ecff;
  border-right: 1px solid #04ecff;
  border-radius: 6px;
  z-index: 30;
  top: 10%;
  margin: auto;
  box-sizing: border-box;
  transition: all 1s;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  a {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  .block {
    text-align: left;
    width: 100%;
    height: 31%;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 5px;
      left: 20px;
      font-weight: 600;
      border-left: 5px solid;
      padding-left: 5px;
    }
    div {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
    }
  }

  .block1 {
    .carousel {
      height: 100%;
      padding: 15px 20px;

      .el-carousel__item:nth-child(2n) {
        // background-color: #99a9bf;
        background-image: url("../../common/image/dk/B-04a现场照.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .el-carousel__item:nth-child(2n + 1) {
        // background-color: #d3dce6;
        background-image: url("../../common/image/dk/现场图3.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .block2 {
    div {
      padding: 17px 15px;
      ul {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: rgba(31, 54, 92, 0.5);
        li {
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
          padding: 19px;
          p {
            font-size: 16px;
            color: rgba(211, 154, 69, 1);
            line-height: 22px;
          }
        }
      }
    }
  }

  .block3 {
    div {
      padding: 10px 0px;
      text-align: center;
      ul {
        width: 100%;
        height: 100%;
        list-style: none;
        li {
          width: 30%;
          display: inline-block;
          text-align: center;
          padding: 5px;
          div {
            width: 100%;
            height: 46px;
            display: inline-block;
            padding-top: 5px;

            span {
              font-size: 7px;
            }
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;
    height: 28px;
    line-height: 28px;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
  }

  .block2 ul::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: #1a3561;
    border-radius: 10px;
  }
  .block2 ul::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #45cdff;
    border-radius: 10px;
  }
}
</style>
<template>
  <div class="detail">
    <div class="back-block">
      <span class="back" @click="back">返回</span>
    </div>

    <span class="title">{{ option.name }}</span>
    <div>
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
      }
    };
  },
  methods: {
    back() {
      // console.log(this.$parent);
      this.$parent.$parent.detailShow = false;
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
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/lcwm_lc/MapServer/2"
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
  border: 1px solid #035acd;
  text-align: left;

  .back-block {
    .back {
      display: inline-block;
      font-size: 16px;
      font-weight: 500;
      letter-spacing: 0.08em;
      color: #fff;
      border: 2px solid #4bd5ec;
      margin: 12px 10px;
      padding: 5px 10px;
      border-radius: 7px;
      background-color: #233d6d;
      cursor: pointer;
    }
  }

  .title {
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: #fff;
    border-left: 5px solid #f4cf67;
    margin: 17px 10px 10px;
    padding-left: 5px;
  }

  .tb {
    .tb_out {
      //   height: 200px;
      //   width: 90%;
      //   border: 1px solid black;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin: 0 10px;
      padding: 0 5px;
      background-color: #5271a7;

      .tb_in {
        display: flex;
        align-items: center;
        // height: 25%;
        padding: 7px 2px;
        // width: 50%;
        box-sizing: border-box;
        // border: 1px solid red;

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
}
</style>
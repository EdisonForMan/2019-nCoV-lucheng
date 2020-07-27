<template>
  <div class="topNumber">
    <span class="row1"></span>
    <span class="row2"></span>
    <span class="col2"></span>
    <span class="col1"></span>

    <div>
      <div class="top_header">
        <div class="header_item">
          <img src="@/components/common/image/flag_red.png" />
          <span>红旗数量</span>
        </div>
        <div class="header_item">
          <span>文明城市任务点</span>
        </div>
        <div class="header_item">
          <img src="@/components/common/image/flag_white.png" />
          <span>白旗数量</span>
        </div>
      </div>

      <div class="top_body">
        <div class="body_item">
          <div class="flag-num">
            <span class="inner_row"></span>
            <span class="inner_col"></span>
            <div>{{ redNum }}</div>
          </div>
        </div>
        <div class="body_item">
          <div class="flag-num">
            <span class="inner_row"></span>
            <span class="inner_col"></span>
            <div>{{ taskSum }}</div>
          </div>
        </div>
        <div class="body_item">
          <div class="flag-num">
            <span class="inner_row"></span>
            <span class="inner_col"></span>
            <div>{{ whiteNum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      country: ``,
      taskSum: 0,
      redNum: 0,
      whiteNum: 0,
      countMap: {},
    };
  },
  computed: {
    ...mapState({
      lcwmxxList: (state) => state.lcwmxxList,
    }),
  },
  async mounted() {
    !this.lcwmxxList.length && (await this.fetchlcwmxxList());
    await this.loadData();
  },
  methods: {
    ...mapActions(["fetchlcwmxxList"]),

    // 加载数据
    loadData() {
      return new Promise((resolve, reject) => {
        const list = this.lcwmxxList;
        this.taskSum = list.length;

        let redNum = 0;
        let whiteNum = 0;

        list.map(({ FLAG }) => {
          if (FLAG == 1) redNum++;
          else whiteNum++;
        });

        this.redNum = redNum;
        this.whiteNum = whiteNum;

        this.countMap["全区"] = {
          redNum,
          whiteNum,
          taskSum: this.taskSum,
        };

        resolve(true);
      });
    },

    filterItems(country) {
      if (!this.countMap[country]) {
        const list = this.lcwmxxList.filter((item) => {
          return item.District == country;
        });

        const taskSum = list.length;
        let redNum = 0;
        let whiteNum = 0;

        list.map(({ FLAG }) => {
          if (FLAG == 1) redNum++;
          else whiteNum++;
        });

        this.countMap[country] = {
          redNum,
          whiteNum,
          taskSum,
        };

        this.redNum = this.countMap[country].redNum;
        this.whiteNum = this.countMap[country].whiteNum;
        this.taskSum = this.countMap[country].taskSum;
      } else {
        this.redNum = this.countMap[country].redNum;
        this.whiteNum = this.countMap[country].whiteNum;
        this.taskSum = this.countMap[country].taskSum;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.topNumber {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 20;
  background: rgba(0, 63, 189, 0.6);

  .row1,
  .row2,
  .col1,
  .col2 {
    position: absolute;
    padding: 5px;
    border-style: solid;
    border-color: #fff;
  }

  .row1 {
    border-width: 0.3rem 0 0 0.3rem;
    top: -0.15rem;
    left: -0.15rem;
  }

  .row2 {
    border-width: 0.3rem 0.3rem 0 0;
    top: -0.15rem;
    right: -0.15rem;
  }

  .col1 {
    border-width: 0 0 0.3rem 0.3rem;
    bottom: -0.15rem;
    left: -0.15rem;
  }

  .col2 {
    border-width: 0 0.3rem 0.3rem 0;
    bottom: -0.15rem;
    right: -0.15rem;
  }

  .top_header,
  .top_body {
    > div {
      width: 120px;
    }
  }

  .top_header {
    .header_item {
      display: inline-block;
      padding: 7px 3px 3px;
      position: relative;

      img {
        width: 12px;
        height: 13px;
        margin-right: 7px;
      }

      span {
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 600;
        color: #0ef6f8;
      }
    }
  }

  .top_body {
    .body_item {
      display: inline-block;
      padding: 4px 3px 12px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -1px;
        transform: translate(0, -50%);
        height: 70%;
        width: 2px;
        background-color: #0ef6f8;
      }

      &:first-child::after {
        width: 0px;
      }

      &:nth-child(1) .flag-num {
        color: #fe402c;
      }

      &:nth-child(2) .flag-num {
        color: #39fb0c;
      }
    }

    .flag-num {
      font-size: 34px;
      position: relative;
      background: rgba(5, 53, 129, 0.6);
      font-family: DS-DIGIB;
      display: inline-block;

      > div {
        width: 85px;
        height: 44px;
        line-height: 44px;
      }

      .inner_row,
      .inner_col {
        position: absolute;
        padding: 5px;
        border-style: solid;
        border-color: #fff;
      }

      .inner_row {
        border-top-left-radius: 3px;
        border-width: 0.2rem 0 0 0.2rem;
        top: -0.1rem;
        left: -0.1rem;
      }

      .inner_col {
        border-bottom-right-radius: 3px;
        border-width: 0 0.2rem 0.2rem 0;
        bottom: -0.1rem;
        right: -0.1rem;
      }
    }
  }
}
</style>
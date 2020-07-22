<template>
  <div id="detailForm">
    <a @click="() => { $parent.detailShow = false }">×</a>
    <div class="block block1">
      <span class="title">照片</span>
      <div class="carousel">
        <el-carousel height="150px" autoplay>
          <el-carousel-item v-for="item in imgNum" :key="item"></el-carousel-item>
        </el-carousel>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgNum: 2
    };
  }
};
</script>

<style lang="less" scoped>
#detailForm {
  position: fixed;
  width: 490px;
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

  > a {
    position: absolute;
    z-index: 32;
    top: 0px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }

  .block {
    text-align: left;
    width: 100%;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bolder;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 5px;
      left: 20px;
      border-left: 5px solid;
      padding-left: 5px;
    }
    > div {
      width: 100%;
      height: calc(100% - 33px);
      box-sizing: border-box;
    }
  }

  .block1 {
    height: 26%;

    .name {
      position: absolute;
      font-size: 22px;
      font-weight: bolder;
      color: rgba(97, 235, 255, 1);
      top: 5px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .carousel {
      padding: 15px 20px;

      .el-carousel__item:nth-child(2n) {
        background-image: url("../../common/image/暂无图片.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-image: url("../../common/image/暂无图片.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
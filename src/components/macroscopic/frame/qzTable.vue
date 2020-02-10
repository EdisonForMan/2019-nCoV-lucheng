<template>
  <div
    id="qzTable"
    style="position: absolute;width:280px;height: 300px;background: #24386a;border: 1px solid #04ecff;z-index: 20;top: 18%;overflow: hidden;overflow-y: auto;"
    v-show="qzTableShow"
  >
    <span style="font-size: 20px;margin-top: 2px;display: inline-block;">圈主信息</span>
    <span
      id="close"
      @click="()=>{this.qzTableShow=false}"
      style="float: right;padding: 0px 5px;font-size: 17px;cursor: pointer;"
    >x</span>
    <div id="qztableCentent"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qzTableShow: false //弹出框默认隐藏
    };
  },
  methods: {
    qzTableFun() {
      this.qzTableShow = true; //弹出框默认隐藏
    }
  }
};
</script>

<style>
#qztableCentent {
  width: 98%;
  margin-top: 2%;
  margin-left: 3%;
}
#qztableCentent p {
  width: 87%;
  padding: 5px 12px;
  text-align: left;
  /* border-bottom: 1px dashed #fff; */
}

#qztableCentent td,
#qztableCentent th {
  border: 1px solid #fff;
  padding: 10px 10px;
}
</style>
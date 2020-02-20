<template>
  <div id="topDateDiv">
    <ul>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">103</span> 宗
        </h4>
        <p style="color: #d793ff;">出让地块</p>
        <h4>
          累计
          <span style="color: #6dff3d;">3</span> 宗
        </h4>
      </li>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">10</span> 亿
        </h4>
        <p style="color: #ff8d4a;">出让金额</p>
        <h4>
          累计
          <span style="color: #6dff3d;">103</span> 亿
        </h4>
      </li>
      <li>
        <h4>
          计划
          <span style="color: #ff3229;">103</span> 亩
        </h4>
        <p style="color: #eee72d;">出让面积</p>
        <h4>
          累计
          <span style="color: #6dff3d;">103</span> 亩
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#topDateDiv {
  position: absolute;
  top: 90px;
  width: 100%;

  ul li {
    width: 5%;
    margin: 0px 15px;
    display: inline-block;
    background-color: #1b45a7;
    border: 1px solid #07e2e8;
    padding: 5px 9px;
    color: #07e2e8;

    span {
      font-size: 21px;
    }

    p {
      font-weight: bolder;
      margin: 5px;
    }
  }
}
</style>
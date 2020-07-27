<template>
  <!-- 边框 -->
  <div class="border">
    <span class="row1"></span>
    <span class="row2"></span>
    <span class="col2"></span>
    <span class="col1"></span>
    <div class="border_inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.border {
  position: relative;
  padding: 0.2rem;

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
    border-width: 0.2rem 0 0 0.2rem;
    top: 0rem;
    left: 0rem;
  }

  .row2 {
    border-width: 0.2rem 0.2rem 0 0;
    top: 0rem;
    right: 0rem;
  }

  .col1 {
    border-width: 0 0 0.2rem 0.2rem;
    bottom: 0rem;
    left: 0rem;
  }

  .col2 {
    border-width: 0 0.2rem 0.2rem 0;
    bottom: 0rem;
    right: 0rem;
  }

  .border_inner {
    padding: 7px;
    border: 1px solid #3659a5;
  }
}
</style>
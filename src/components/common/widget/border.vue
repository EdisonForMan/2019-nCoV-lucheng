<template>
  <!-- 边框 -->
  <div class="border">
    <span class="row1"></span>
    <span class="row2"></span>
    <span class="col2"></span>
    <span class="col1"></span>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.border {
  position: relative;
  margin: 0 15px;
  padding: 7px;
  border: 1px solid #3659a5;

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
</style>
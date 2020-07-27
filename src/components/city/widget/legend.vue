<template>
  <div class="legend">
    <img
      class="icon"
      :src="require(`@/components/common/image/${ show ? `legend_off` : `legend_on`}.png`)"
      v-on:click="show = !show"
    />
    <transition name="fade">
      <div class="panel" v-if="show">
        <img src="@/components/common/image/legend_panel.png" />
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="less" scoped>
.legend {
  position: fixed;
  bottom: 2%;
  transition: all 1s;
  z-index: 21;

  .icon {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  .panel {
    display: inline;
  }
}
</style>
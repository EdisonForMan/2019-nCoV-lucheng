<template>
  <div class="Com_content Macroscopic">
    <div class="tip_wrapper" v-if="warnShow">
      <div class="message_box">
        <div class="message_box_content">防疫指挥地图模块已下架</div>
        <!-- <div class="message_box_btns">
          <button type="button" class="button" @click="close">
            <span>确定</span>
          </button>
        </div> -->
      </div>
    </div>
    <div class="tip_modal" v-if="warnShow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      warnShow: true
    };
  },
  methods: {
    close() {
      this.$goRoute("city", false);
      this.selected(2);
    }
  }
};
</script>
<style scoped lang="less">
@import url("./Macroscopic.less");
</style>
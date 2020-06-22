<template>
  <div id="app">
    <login />
    <transition name="fade">
      <p v-if="show" class="title">{{text}}</p>
    </transition>
  </div>
</template>

<script>
import login from "@/components/login.vue";
export default {
  name: "app",
  components: {
    login
  },
  data() {
    return {
      show: false,
      text: ""
    };
  },
  methods: {
    hint(val) {
      let that = this;
      this.show = true;
      this.text = val || "";
      setTimeout(() => {
        that.show = false;
      }, 3000);
    }
  }
};
</script>

<style lang="less">
@import url("components/common/css/common.less");
</style>

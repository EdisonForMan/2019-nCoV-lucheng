<template>
  <div class="Com_content control">
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" />
    </div>
  </div>
</template>

<script>
import commonArcgis from "./Arcgis";
export default {
  name: "control",
  data() {
    return {};
  },
  components: {
    commonArcgis
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
 <style scoped lang="less">
@import url("./control.less");
</style>
<template>
  <div id="topDateDiv">
    <ul style="display: flex;">
      <li>
        <div class="topDateDiv-img-1"></div>
        <div class="topDateDiv-right-content">
          <div class="topDateDiv-text" style="color: rgb(255, 40, 58);">确诊{{ SHI_QU_DATA.QZ }}</div>
          <div class="topDateDiv-xz">今日{{ SHI_QU_DATA.QZXZ }}</div>
        </div>
      </li>
      <li>
        <div class="topDateDiv-img-2"></div>
        <div class="topDateDiv-right-content">
          <div class="topDateDiv-text" style="color: #cd77ff;">重症{{ SHI_QU_DATA.ZZ }}</div>
          <div class="topDateDiv-xz">今日{{ SHI_QU_DATA.ZZXZ }}</div>
        </div>
      </li>
      <li>
        <div class="topDateDiv-img-3"></div>
        <div class="topDateDiv-right-content">
          <div class="topDateDiv-text" style="color: rgb(30, 255, 149);">出院{{ SHI_QU_DATA.CY }}</div>
          <div class="topDateDiv-xz">今日{{ SHI_QU_DATA.CYXZ }}</div>
        </div>
      </li>
      <li>
        <div class="topDateDiv-img-4"></div>
        <div class="topDateDiv-right-content">
          <div class="topDateDiv-text" style="color: rgb(126, 126, 126);">死亡{{ SHI_QU_DATA.SW }}</div>
          <div class="topDateDiv-xz">今日{{ SHI_QU_DATA.SWXZ }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {SHI_QU_DATA} from '../common/shiquData.js';
export default {
  name: 'topDateDiv',
  data () {
    return {
      SHI_QU_DATA
    }
  }
};
</script>

<style>
#topDateDiv {
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
}
#topDateDiv ul li {
  display: flex;
  align-items: center;
  margin: 0 60px;
}
.topDateDiv-right-content {
  margin-left: 10px;
  text-align: left;
}
.topDateDiv-text {
  font-weight: bolder;
}
.topDateDiv-xz {
  font-size: 12px;
}
.topDateDiv-img-1 {
  width: 40px;
  height: 40px;
  background: url(./img/4.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.topDateDiv-img-2 {
  width: 40px;
  height: 40px;
  background: url(./img/1.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.topDateDiv-img-3 {
  width: 40px;
  height: 40px;
  background: url(./img/3.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
.topDateDiv-img-4 {
  width: 40px;
  height: 40px;
  background: url(./img/5.png) 0 0 no-repeat;
  background-size: 100% 100%;
}
</style>
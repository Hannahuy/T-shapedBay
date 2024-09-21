<template>
  <div class="page">
    <div class="top">
      <div class="top-title">丁字湾数字孪生系统</div>
    </div>
    <div class="left"></div>
    <div class="bottom"></div>
    <div class="right"></div>
    <div class="topMenu">
      <div class="topMenu-left">
        <div class="topMenu-left-title" :class="{ 'topMenu-left-title-active': selected === '监测调查' }"
          @click="selectMenu('监测调查')">
          监测调查
        </div>
        <div class="topMenu-left-title" style="margin-left: 2.3vh;"
          :class="{ 'topMenu-left-title-active': selected === '生态动力' }" @click="selectMenu('生态动力')">
          生态动力
        </div>
      </div>
      <div class="topMenu-right">
        <div class="topMenu-right-title" :class="{ 'topMenu-right-title-active': selected === '生态网格' }"
          @click="selectMenu('生态网格')">
          生态网格
        </div>
        <div class="topMenu-right-title" style="margin-left: 2.3vh;"
          :class="{ 'topMenu-right-title-active': selected === '趋势预测' }" @click="selectMenu('趋势预测')">
          趋势预测
        </div>
      </div>
    </div>
    <UEpage />
    <MonitoringSurveys v-if="selected === '监测调查'" />
    <Ecodynamics v-if="selected === '生态动力'" />
    <EcologicalGrid v-if="selected === '生态网格'" />
    <TrendForecasting v-if="selected === '趋势预测'" />
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { callUIInteraction, addResponseEventListener } from "../module/webrtcVideo/webrtcVideo.js";
import UEpage from './UE/UEpage.vue'
import Ecodynamics from './Menu/Ecodynamics.vue';
import MonitoringSurveys from './Menu/MonitoringSurveys.vue';
import TrendForecasting from './Menu/TrendForecasting.vue';
import EcologicalGrid from './Menu/EcologicalGrid.vue';
let selected = ref('监测调查'); // 默认选中监测调查
const selectMenu = (menu) => {
  callUIInteraction({
    ModuleName: `${menu}`,
    FunctionName: `${menu}`,
    State: true,
  });
  if (selected.value !== menu) {
    callUIInteraction({
      ModuleName: `${selected.value}`,
      FunctionName: `${selected.value}`,
      State: false,
    });
  }
  selected.value = menu;
};
onMounted(() => {
  if (window.performance.navigation.type == 1) {
    console.log("页面被刷新")
  } else {
    console.log("首次被加载")
  }
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `监测调查`,
    State: true,
  });
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.page>div {
  pointer-events: auto;
}

.top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 16vh;
  background-image: url('../assets/top.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.left {
  position: absolute;
  left: 0;
  width: 12vh;
  height: 100%;
  background-image: url('../assets/left.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8.5vh;
  background-image: url('../assets/bottom.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.right {
  position: absolute;
  right: 0;
  width: 12vh;
  height: 100%;
  background-image: url('../assets/right.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.top-title {
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 3.8vh;
  color: #FEFFFF;
  text-align: center;
  background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5vh;
}

.topMenu {
  width: 100%;
}

.topMenu-left {
  width: 50vh;
  display: flex;
  position: absolute;
  z-index: 3;
  left: 28.5vh;
  top: 2.8vh;
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 1.8vh;
  text-align: center;
  color: #CFEFFF;
  line-height: 3.5vh;
  letter-spacing: 0.2vh;
}

.topMenu-right {
  width: 50vh;
  display: flex;
  position: absolute;
  z-index: 3;
  right: 6.6vh;
  top: 2.8vh;
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 1.8vh;
  text-align: center;
  color: #CFEFFF;
  line-height: 3.5vh;
  letter-spacing: 0.2vh;
}

.topMenu-left-title {
  width: 13vh;
  height: 3.5vh;
  background-image: url('../assets/img/leftmenu.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.topMenu-right-title {
  width: 13vh;
  height: 3.5vh;
  background-image: url('../assets/img/rightmenu.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.topMenu-left-title-active {
  width: 13vh;
  height: 3.5vh;
  color: white;
  background-image: url('../assets/img/leftmenu-active.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}

.topMenu-right-title-active {
  width: 13vh;
  height: 3.5vh;
  color: white;
  background-image: url('../assets/img/rightmenu-active.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
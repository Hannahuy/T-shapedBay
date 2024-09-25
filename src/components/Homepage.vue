<template>
  <div class="page">
    <div class="top">
      <div class="top-title">丁字湾典型生态数字孪生系统</div>
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
    <div class="righticon">
      <img :src="selectedWeather" class="imageicon" alt="" @click="weathernext">
      <img src="../assets/img/海面.png" class="imageicon" style="width: 2vh;" alt="" @click="offing">
      <img src="../assets/img/视角.png" class="imageicon" style="width: 2.3vh;" alt="" @click="perspective">
    </div>
    <div class="weatherBox" v-if="showWeather">
      <img src="../assets/img/晴天.png" class="imageicon" alt="" @click="selectWeather('晴天')">
      <img src="../assets/img/阴天.png" class="imageicon" alt="" @click="selectWeather('阴天')">
      <img src="../assets/img/雨天.png" class="imageicon" alt="" @click="selectWeather('雨天')">
      <img src="../assets/img/雪天.png" class="imageicon" alt="" @click="selectWeather('雪天')">
    </div>
    <div v-if="selected === '监测调查'">
      <MonitoringSurveys />
    </div>
    <div v-if="selected === '生态动力'">
      <Ecodynamics />
    </div>
    <EcologicalGrid v-if="selected === '生态网格'" />
    <div v-if="selected === '趋势预测'">
      <TrendForecasting />
    </div>
  </div>
  <UEpage />
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
  if (selected.value !== menu) {
    callUIInteraction({
      ModuleName: `${selected.value}`,
      FunctionName: `${selected.value}`,
      State: false,
    });
  }
  callUIInteraction({
    ModuleName: `${menu}`,
    FunctionName: `${menu}`,
    State: true,
  });
  selected.value = menu;
};
const showWeather = ref(false);
const selectedWeather = ref('/src/assets/img/晴天.png');
const weathernext = () => {
  showWeather.value = !showWeather.value;
}
const selectWeather = (weather) => {
  showWeather.value = false;
  switch (weather) {
    case '晴天':
      selectedWeather.value = '/src/assets/img/晴天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '晴天'
      });
      break;
    case '阴天':
      selectedWeather.value = '/src/assets/img/阴天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '阴天'
      });
      break;
    case '雨天':
      selectedWeather.value = '/src/assets/img/雨天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '雨天'
      });
      break;
    case '雪天':
      selectedWeather.value = '/src/assets/img/雪天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '雪天'
      });
      break;
  }
};
const offing = () => {
  callUIInteraction({
    ModuleName: `其他`,
    FunctionName: `海面`,
  });
}
const perspective = () => {
  callUIInteraction({
    ModuleName: `其他`,
    FunctionName: `视角`,
  });
}
onMounted(() => {
  if (window.performance.navigation.type == 1) {
    console.log("页面被刷新")
  } else {
    console.log("首次被加载")
  }
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `互花米草`,
    State: true,
    Time: '2019',
  });
  console.log('监测调查');
  callUIInteraction({
    ModuleName: `其他`,
    FunctionName: `天气`,
    Weather: '晴天'
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
  line-height: 5.5vh;
  background-image: url('../assets/top.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 3;
  pointer-events: none !important;
}

.left {
  position: absolute;
  left: 0;
  width: 12vh;
  height: 100%;
  background-image: url('../assets/left2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8.5vh;
  background-image: url('../assets/bottom2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.right {
  position: absolute;
  right: 0;
  width: 12vh;
  height: 100%;
  background-image: url('../assets/right2.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 2;
}

.top-title {
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 3.2vh;
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
  width: 30vh;
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
  width: 30vh;
  display: flex;
  position: absolute;
  z-index: 3;
  right: 26.6vh;
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

.righticon {
  width: 13vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 3;
  right: 2.4vh;
  top: 3vh;
}

.imageicon {
  width: 3vh;
  cursor: pointer;
}

.weatherBox {
  position: absolute;
  right: 2.4vh;
  top: 6.2vh;
  width: 20vh;
  height: 5vh;
  background-image: url('../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 20;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
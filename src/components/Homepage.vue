<template>
  <div class="page">
    <div class="top">
      <div class="top-title">
        <div class="top-title-left">
          <div style="width: 10.5vh;">晴天</div>
          <div>18℃ ~ 27℃</div>
        </div>
        <div class="top-title-middle">丁字湾典型生态数字孪生系统</div>
        <div class="top-title-right">{{ dayTime }}</div>
      </div>
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
        <div class="topMenu-right-title" :class="{ 'topMenu-right-title-active': selected === '生态网络' }"
          @click="selectMenu('生态网络')">
          生态网络
        </div>
        <div class="topMenu-right-title" style="margin-left: 2.3vh;"
          :class="{ 'topMenu-right-title-active': selected === '趋势预测' }" @click="selectMenu('趋势预测')">
          趋势预测
        </div>
      </div>
    </div>
    <div v-if="selected === '监测调查'">
      <MonitoringSurveys />
    </div>
    <div v-if="selected === '生态动力'">
      <Ecodynamics />
    </div>
    <EcologicalGrid v-if="selected === '生态网络'" />
    <div v-if="selected === '趋势预测'">
      <TrendForecasting />
    </div>
    <div v-show="!selected">
      <Home />
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
import Home from './Menu/Home.vue'

const dayTime = ref('');
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  dayTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 格式化时间
};

let selected = ref('');
let lastActiveButton = ref('')
const selectMenu = (menu) => {
  if (selected.value === menu) {
    lastActiveButton.value = selected.value;
    selected.value = '';
    callUIInteraction({
      ModuleName: `${lastActiveButton.value}`,
      FunctionName: `${lastActiveButton.value}`,
      State: false,
    });
  } else {
    lastActiveButton.value = selected.value;
    selected.value = menu;
    if (lastActiveButton.value) {
      callUIInteraction({
        ModuleName: `${lastActiveButton.value}`,
        FunctionName: `${lastActiveButton.value}`,
        State: false,
      });
    }
    if (menu !== '趋势预测') {
      callUIInteraction({
        ModuleName: `${menu}`,
        FunctionName: `${menu}`,
        State: true,
      });
    }
  }
}
const interval = ref(null);

onMounted(() => {
  if (window.performance.navigation.type == 1) {
    console.log("页面被刷新")
  } else {
    console.log("首次被加载")
  }
  callUIInteraction({
    ModuleName: `其他`,
    FunctionName: `天气`,
    Weather: '晴天'
  });
  interval.value = setInterval(updateTime, 1000);
  updateTime(); // 初始化时间
});
onUnmounted(() => {
  clearInterval(interval)
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
  height: 8.5vh;
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 3vh;
  color: #FEFFFF;
  background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.3vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vh;
  box-sizing: border-box;
}

.top-title-left {
  width: 23vh;
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 1.6vh;
  color: #FEFFFF;
  text-align: center;
  background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  padding: 1.5vh;
  box-sizing: border-box;
  letter-spacing: 0vh;
}

.top-title-middle {
  margin-bottom: 3vh;
}

.top-title-right {
  width: 23vh;
  font-family: HYLingXinJ;
  font-weight: bold;
  font-size: 1.6vh;
  color: #FEFFFF;
  text-align: center;
  background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0vh;
  margin-top: 0.5vh;
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
</style>
<template>
  <!-- 右侧工具栏 -->
  <div class="righticon">
    <img :src="selectedWeather" class="imageicon" alt="" @click="weathernext">
    <img src="../../assets/img/海面.png" class="imageicon" style="width: 2vh;" alt="" @click="offing">
    <img src="../../assets/img/视角.png" class="imageicon" style="width: 2.3vh;" alt="" @click="perspective">
  </div>
  <div class="weatherBox" v-if="showWeather">
    <img src="../../assets/img/晴天.png" class="imageicon" alt="" @click="selectWeather('晴天')">
    <img src="../../assets/img/阴天.png" class="imageicon" alt="" @click="selectWeather('阴天')">
    <img src="../../assets/img/雨天.png" class="imageicon" alt="" @click="selectWeather('雨天')">
    <img src="../../assets/img/雪天.png" class="imageicon" alt="" @click="selectWeather('雪天')">
  </div>
  <!-- 时间轴 -->
  <div class="bottombox-left">
    <div class="bottombox-button">
      <el-button type="primary" class="bottombox-play" :class="{ active: activePlay === 'play' }"
        @click="togglePlay"></el-button>
    </div>
    <div class="bottombox">
      <div class="bottombox-slider">
        <div :style="adjustedStyle">
          <span class="bottombox-slider-span">{{ formattedTime }}</span>
        </div>
        <el-slider :step="3600000" v-model="timePlay" :show-tooltip="false" :min="min" :max="max" :marks="marks"
          style="position: relative; z-index: 1; width: 1725px" @change="gettimePlay">
        </el-slider>
      </div>
    </div>
  </div>
  <!-- 鸟类点击弹窗 -->
  <div class="bird" v-show="birdShow">
    <div class="rightBox-top-title-dialog">
      {{ birdstation }}
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="closebird">
    <div class="rightBox-bottom-content">
      <div class="rightBox-bottom-content-radius"></div>
      <div style="display: flex;justify-content: space-between;padding: 0 1vh;margin-top: 3vh;text-align: center;">
        <div class="content-radius-left">
          <div style="font-size: 1vh;color:#CFEFFF;margin-bottom: 0.5vh;">
            <span style="font-size: 1.6vh;color:#00E7FF;">{{ speciesList.length }}</span>种
          </div>
          <div style="width: 5.5vh;height:0.2vh;background-color: #26569d;"></div>
          <div style="font-size: 1.2vh;color:#00E7FF;margin-top: 0.5vh;">鸟类种类</div>
        </div>
        <div class="content-radius-right">
          <div style="font-size: 1vh;color:#CFEFFF;margin-bottom: 0.5vh;">
            <span style="font-size: 1.6vh;color:#00E7FF;">{{ countspeciesList }}</span>只
          </div>
          <div style="width: 5.5vh;height:0.2vh;background-color: #26569d;"></div>
          <div style="font-size: 1.2vh;color:#00E7FF;margin-top: 0.5vh;">鸟类数量</div>
        </div>
      </div>
    </div>
    <div class="species">
      <div class="species-item" v-for="(item, index) in speciesList" :key="index" :class="{
          'odd-item': index % 2 === 0,
          'even-item': index % 2 !== 0,
          'active-item': activeIndex === index
        }" @click="handleClick(index, item)">
        <div>{{ index + 1 }}</div>
        <div>{{ item.name }}</div>
        <div>{{ item.count }}</div>
      </div>
    </div>
    <div class="Carousel">
      <el-carousel height="16vh">
        <el-carousel-item v-for="(image, index) in imageArray" :key="index" v-if="imageArray.length > 0">
          <img :src="image" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="rightBox-top-title-dialog" style="margin-top: 1vh;">
      鸟种资料
    </div>
    <div class="brieflydata1">
      <table class="custom-table">
        <tbody>
          <tr v-for="(item, index) in animalData" :key="index">
            <td>{{ item.title }}</td>
            <td>{{ item.txt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="briefly" v-show="birdShow">
    <img src="../../assets/img/close.png" alt="" class="close2" @click="closebird">
    <div class="rightBox-top-title-dialog">
      详细信息
    </div>
    <div class="brieflydata">
      <div v-for="(item, index) in animalDatalist" :key="index">
        <div style="font-size: 1.6vh;font-weight: bold;">{{ item.title }}</div>
        <div style="font-size: 1.2vh;">{{ item.txt }}</div>
      </div>
    </div>
  </div>
  <!-- 牡蛎点击弹窗 -->
  <div class="oysters" v-show="oystersShow">
    <div class="rightBox-top-title-dialog">
      牡蛎数据
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="closeoysters">
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2">
        <tbody>
          <tr>
            <td></td>
            <td>牡蛎礁面积(m²)</td>
            <td>造礁牡蛎密度(个/m³)</td>
            <td>造礁牡蛎生物量(g/m³)</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2023.10</td>
            <td>20689</td>
            <td>3097.6</td>
            <td>30137.44</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2024.04</td>
            <td>/</td>
            <td>3260.8</td>
            <td>25209.38</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightBox-top-title-dialog">
      礁栖生物类群-2023
    </div>
    <div class="oystersecharts" ref="chartRef6"></div>
    <div class="rightBox-top-title-dialog">
      礁栖生物类群-2024
    </div>
    <div class="oystersecharts" ref="chartRef7"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs'
import axios from "axios";
const charts = [];
const chartRef6 = ref(null);
const chartRef7 = ref(null);
const initChart = (chartRef, source) => {
  const chart = echarts.init(chartRef.value);
  charts.push(() => {
    chart.dispose();
    initChart(chartRef, source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item',
      valueFormatter: function (value) {
        return value + ' %';
      }
    },
    series: [
      {
        // name: 'Composition',
        type: 'pie',
        data: source,
        radius: '55%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: { color: '#CFEFFF' },
        itemStyle: {
          color: (params) => {
            const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  });
};
const reloadChart = () => {
  charts.forEach((chart) => chart());
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

const timePick = ref(dayjs("2023-08-21").toDate());
const timePlay = ref(null);
const activePlay = ref("");
// 暂停/播放
let previousPlayState = "";
let intervalTime = null;
let playInterval = null;
const togglePlay = () => {
  intervalTime = 16.6665;
  previousPlayState = activePlay.value;
  activePlay.value = activePlay.value === "play" ? "" : "play";
  if (activePlay.value === "play") {
    playInterval = setInterval(() => {
      timePlay.value = dayjs(timePlay.value).add(1, "minute").valueOf();
      if (activePlay.value !== "play") {
        clearInterval(playInterval);
      }
    }, intervalTime);
  } else {
    clearInterval(playInterval);
  }
};
const min = ref(dayjs(timePick.value).startOf("day").valueOf());
// 将 max 设置为当天的23点
const max = ref(dayjs(timePick.value).hour(23).minute(0).second(0).valueOf());

const formattedTime = computed(() => {
  const time = dayjs(timePlay.value);
  return time.format("YYYY/MM/DD HH:mm");
});

const style = computed(() => {
  const length = max.value - min.value,
    progress = timePlay.value - min.value,
    left = (progress / length) * 93;
  return {
    paddingLeft: `${left}%`,
  };
});

const adjustedStyle = computed(() => {
  const baseStyle = style.value;
  const divWidth = 125; // 计算宽度为125px
  const totalWidth = 1725;
  const leftPadding = parseFloat(baseStyle.paddingLeft);

  if ((leftPadding / 100) * totalWidth + divWidth > totalWidth) {
    return {
      paddingLeft: `${((totalWidth - divWidth) / totalWidth) * 100}%`,
    };
  }
  return baseStyle;
});

// 定义 slider 的刻度
const marks = computed(() => {
  const marks = {};
  const start = dayjs(min.value);
  for (let i = 0; i <= 23; i++) {
    const markTime = start.add(i, 'hour');
    marks[markTime.valueOf()] = {
      style: {
        color: '#ffffff'
      },
      label: markTime.format('HH:mm')
    };
  }
  return marks;
});
watch(timePlay, (newVal) => {
  const currentTime = dayjs(newVal);
  if (currentTime.minute() === 0 && currentTime.second() === 0) {
    const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
      ModuleName: `生态动力`,
      FunctionName: `标量场可视化`,
      State: true,
      Time: formattedTime,
    });
    // console.log('生态动力',`标量场可视化`,true,formattedTime, selectvalue.value,selectedItemname.value);
    sessionStorage.setItem('timePlay', formattedTime);
  }
  if (currentTime.isSame(dayjs(max.value))) {
    activePlay.value = '';
  }
});
// 监听时间轴
const gettimePlay = (e) => {
  timePlay.value = dayjs(e).second(0).valueOf(); // 确保秒数为 0
  if (activePlay.value === "play") {
    activePlay.value = "";
  }
}
// 鸟弹窗
const birdShow = ref(false);
const speciesList = ref([]);
const birdstation = ref(null)
const activeIndex = ref(0);
const animalData = ref([]);
const animalDatalist = ref([]);
const imageArray = ref([]);

// 点击动物名显示信息
const handleClick = (index, item) => {
  activeIndex.value = index;
  axios.get(`http://192.168.0.227:8088/animal/getAnimal/${item.name}`).then((res) => {
    animalData.value = res.data.data.info.鸟种资料;
    animalDatalist.value = res.data.data.info.详细信息;
    imageArray.value = res.data.data.images.imageArray.map(image => `http://192.168.0.227:8088${image.path}`);
  });
};
const countspeciesList = ref(0);

const closebird = () => {
  birdShow.value = false;
}
const closeoysters = () => {
  oystersShow.value = false;
}
const oystersShow = ref(false);

const myHandleResponseFunction = (data) => {
  console.log(data);
  const datajson = JSON.parse(data);
  birdShow.value = false;

  if (datajson.Funcation === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return;
  } else if (datajson.Funcation === '站点点击查询') {
    birdShow.value = true;
    birdstation.value = datajson.Data.siteName;
    speciesList.value = datajson.Data.animalsCount;
    countspeciesList.value = speciesList.value.reduce((total, animal) => total + animal.count, 0);

    axios.get(`http://192.168.0.227:8088/animal/getAnimal/${datajson.Data.animalsCount[0].name}`).then((res) => {
      animalData.value = res.data.data.info.鸟种资料;
      animalDatalist.value = res.data.data.info.详细信息;
      imageArray.value = res.data.data.images.imageArray.map(image => `http://192.168.0.227:8088${image.path}`);
    });
  }
}

onMounted(() => {
  const storedTime = sessionStorage.getItem('timePlay');
  if (storedTime) {
    timePlay.value = dayjs(storedTime).valueOf(); // 从 sessionStorage 获取值
  } else {
    timePlay.value = dayjs('2023-08-21 06:00:00').valueOf(); // 默认值
  }
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `互花米草`,
    State: true,
    Time: '2019',
  });
  initChart(chartRef6, [
    { value: 5, name: '刺胞动物' },
    { value: 30, name: '节肢动物' },
    { value: 25, name: '环节动物' },
    { value: 35, name: '软体动物' },
    { value: 5, name: '星虫动物' },
  ]);
  initChart(chartRef7, [
    { value: 3, name: '刺胞动物' },
    { value: 3, name: '纽形动物' },
    { value: 3, name: '扁形动物' },
    { value: 25, name: '节肢动物' },
    { value: 22, name: '环节动物' },
    { value: 41, name: '软体动物' },
    { value: 3, name: '星虫动物' },
  ]);
  window.addEventListener("resize", reloadChart);
  addResponseEventListener("handle_responses", myHandleResponseFunction);
});
onUnmounted(() => {
  window.removeEventListener("resize", reloadChart);
});
</script>

<style scoped>
.leftBox {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  height: 88vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1.5vh;
  box-sizing: border-box;
}

.rightBox {
  position: absolute;
  right: 2.4vh;
  top: 10vh;
  width: 30vh;
  height: 88vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1.5vh;
  box-sizing: border-box;
}

.rightBox-top {
  width: 100%;
  height: 21.25vh;
}

.rightBox-middle {
  width: 100%;
  height: 21.25vh;
}

.rightBox-middle2 {
  width: 100%;
  height: 21.25vh;
}

.rightBox-bottom {
  width: 100%;
  height: 21.25vh;
}

.rightBox-top-title,
.rightBox-bottom-title {
  width: 100%;
  height: 3vh;
  background-image: url('../../assets/img/rightboxtitle.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #FFFFFF;
  font-size: 1.6vh;
  font-weight: bold;
  line-height: 3vh;
  padding-left: 3vh;
  box-sizing: border-box;
}

.rightBox-top-title-dialog {
  width: 100%;
  height: 3vh;
  background-image: url('../../assets/img/rightboxtitle.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #FFFFFF;
  font-size: 1.6vh;
  font-weight: bold;
  line-height: 3vh;
  padding-left: 3vh;
  box-sizing: border-box;
}

.rightBox-top-table,
.rightBox-bottom-table,
.rightBox-bottom-content,
.rightBox-middle2-content,
.leftBox-top-table,
.leftBox-bottom-table,
.leftBox-middle2-content,
.leftBox-bottom-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
}

.bottombox-left {
  width: 97.5%;
  height: 5vh;
  background-image: url('../../assets/img/timebackground.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: 2.5vh;
  margin-left: 2.4vh;
  z-index: 10;
}

.bottombox {
  padding: 0 3vh 0 11vh;
  position: absolute;
  bottom: 2vh;
  box-sizing: border-box;
  display: flex;
  z-index: 5;
}

.bottombox-button {
  position: absolute;
  bottom: 0.5vh;
  left: 0.9%;
  display: flex;
  align-items: center;
  z-index: 10;
}

.bottombox-play {
  background-image: url("../../assets/img/Timeout.png");
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 55% 50%;
  border-radius: 100%;
  border: 0;
  width: 4vh;
  height: 4vh;
}

.bottombox-play.active {
  background-image: url("../../assets/img/Play.png");
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
  background-size: 70% 70%;
  border-radius: 100%;
  border: 0;
  width: 4vh;
  height: 4vh;
}

.bottombox-slider-span {
  width: 12.5vh;
  background-color: #42aeff;
  border-radius: 1.25rem;
  color: white;
  display: block;
  text-align: center;
  font-size: 1.4vh;
}

.bottombox-slider :deep(.el-slider__button) {
  background-color: transparent;
  border: 0;
}

.bottombox-slider :deep(.el-slider__bar) {
  background: linear-gradient(to right, #0088ff, #00f2fe);
  /* 渐变蓝色 */
}

.bottombox-slider :deep(.el-slider__marks-text) {
  color: white !important;
}

.bird {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  height: 80vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.species {
  margin: 1vh 0;
  overflow-y: auto;
  width: 100%;
  max-height: 16vh;
}

.species-item {
  width: 100%;
  height: 2.5vh;
  color: #CFEFFF;
  font-size: 1.4vh;
  line-height: 2.5vh;
  display: flex;
  justify-content: space-between;
  padding: 0 1vh;
  box-sizing: border-box;
  margin-bottom: 1vh;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.odd-item {
  background-image: url('../../assets/img/tablecontent.png');
}

.even-item {
  background-image: url('../../assets/img/tablecontent2.png');
}

.active-item {
  background-image: url('../../assets/img/tablecontentactive.png');
}

.Carousel {
  width: 100%;
  height: 16vh;
  flex-shrink: 0;
}

:deep(.el-carousel__button) {
  width: 2vh;
}

:deep(.el-carousel__indicator.is-active button) {
  width: 2vh;
}

.briefly {
  width: 30vh;
  height: 80vh;
  position: absolute;
  right: 7.4vh;
  top: 10vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  color: #CFEFFF;
  font-size: 1.4vh;
}

.brieflydata1 {
  margin-top: 1vh;
  overflow-y: auto;
  min-height: 22vh;
}

.brieflydata {
  height: 71.5vh;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 0.5vh;
  /* 滚动条的宽度 */
  height: 0.5vh;
  /* 滚动条的高度 */
}

::-webkit-scrollbar-track {
  background: #0f5aa15d;
  /* 滚动条轨道的背景 */
  border-radius: 1vh;
  /* 轨道的圆角 */
}

::-webkit-scrollbar-thumb {
  background: #3386e462;
  /* 滚动条的颜色 */
  border-radius: 1vh;
  /* 滚动条的圆角 */
}

::-webkit-scrollbar-thumb:hover {
  background: #1289d8;
  /* 鼠标悬停时的颜色 */
}


:deep(.el-tabs__item) {
  color: #CFEFFF;
}

:deep(.el-tabs__item.is-active, .el-tabs__item:hover) {
  color: #409eff !important;
}

.custom-table {
  border-collapse: collapse;
  width: 100%;
  color: #b7cffc;
}

.custom-table th,
.custom-table td {
  border: 0.2vh solid #416491;
  padding: 0.8vh;
  text-align: center;
  font-size: 1vh;
  width: 0%;
}

.custom-table2 {
  border-collapse: collapse;
  width: 100%;
  color: #b7cffc;
}

.custom-table2 th,
.custom-table2 td {
  border: 0.2vh solid #416491;
  padding: 0.8vh;
  text-align: center;
  font-size: 1vh;
  width: 0%;
}

.close {
  cursor: pointer;
  width: 2vh;
  position: absolute;
  right: 1vh;
  top: 2vh;
}

.close2 {
  cursor: pointer;
  width: 2vh;
  position: absolute;
  right: 1vh;
  top: 1vh;
}

.oysters {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  max-height: 80vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh 1.5vh 0 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.oystersecharts {
  width: 26.75vh;
  height: 20vh;
}

:deep(.el-tabs__item) {
  width: 13.5vh;
  padding: 0 !important;
}

.rightBox-bottom-content {
  position: relative;
  margin-top: 1vh;
  width: 100%;
  height: 11vh;
  background-image: url('../../assets/img/rightbottombox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rightBox-bottom-content-radius {
  position: absolute;
  left: 8.8vh;
  top: 1vh;
  width: 9vh;
  height: 9vh;
  background-image: url('../../assets/img/radius.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: rotate 2s linear infinite;
  /* 持续旋转动画 */
}

.righticon {
  height: 15vh;
  width: 4vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 3;
  right: 2.4vh;
  top: 50%;
  transform: translateY(-50%);
}

.imageicon {
  width: 3vh;
  cursor: pointer;
}

.weatherBox {
  position: absolute;
  right: 2.4vh;
  top: 32%;
  transform: translateY(-32%);
  width: 4vh;
  height: 18vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
<template>
  <div class="page">
    <div class="leftBox">
      <div class="rightBox-top">
        <div class="rightBox-top-title">
          潮间带生物类群组成
        </div>
        <div class="leftBox-top-table" ref="chartRef1"></div>
      </div>
      <div class="rightBox-middle">
        <div class="rightBox-bottom-title">
          大型底栖动物组成比例图
        </div>
        <div class="leftBox-bottom-table"></div>
      </div>
      <div class="rightBox-middle2">
        <div class="rightBox-bottom-title">
          浮游植物组成比例图
        </div>
        <div class="leftBox-middle2-content"></div>
      </div>
      <div class="rightBox-bottom">
        <div class="rightBox-bottom-title">
          海水水质评价参数及标准
        </div>
        <div class="leftBox-bottom-content">
          <el-table :data="tableData1" style="width: 100%;" :header-cell-style="{
            background: 'transparent', fontSize: '1.4vh',
            'text-align': 'center',
          }" height="17.5vh">
            <el-table-column prop="project" label="项目" width="60" align="center" />
            <el-table-column prop="PH" label="PH" width="70" align="center" />
            <el-table-column prop="DO" label="DO" width="70" align="center" />
            <el-table-column prop="COD" label="COD" width="70" align="center" />
            <el-table-column prop="Inorganicnitrogen" label="无机氮" width="70" align="center" />
            <el-table-column prop="Activephosphate" label="活性磷酸盐" width="100" align="center" />
          </el-table>
        </div>
      </div>
    </div>
    <div class="rightBox">
      <div class="rightBox-top">
        <div class="rightBox-top-title">
          生物多样性评价结果
        </div>
        <div class="rightBox-top-table">
          <el-table :data="tableData2" style="width: 100%;" :header-cell-style="{
            background: 'transparent', fontSize: '1.4vh',
            'text-align': 'center',
          }" height="16.25vh">
            <el-table-column prop="Stations" label="站位" width="60" align="center" />
            <el-table-column prop="Diversity" label="多样性指数" width="100" align="center" />
            <el-table-column prop="Uniformity" label="均匀度" width="70" align="center" />
            <el-table-column prop="Dominance" label="优势度" width="70" align="center" />
            <el-table-column prop="Richness" label="丰富度" width="70" align="center" />
            <el-table-column prop="threshold" label="指数阈值" width="80" align="center" />
            <el-table-column prop="level" label="等级" width="100" align="center" />
          </el-table>
        </div>
      </div>
      <div class="rightBox-middle">
        <div class="rightBox-bottom-title">
          水质沉积物单指标评价结果
        </div>
        <div class="rightBox-bottom-table">
          <el-table :data="tableData3" style="width: 100%;" :header-cell-style="{
            background: 'transparent', fontSize: '1.4vh',
            'text-align': 'center',
          }" height="16.25vh">
            <el-table-column prop="StationNumber" label="站号" width="60" align="center" />
            <el-table-column prop="PH" label="PH" width="60" align="center" />
            <el-table-column prop="DO" label="DO" width="60" align="center" />
            <el-table-column prop="COD" label="COD" width="60" align="center" />
            <el-table-column prop="Inorganicnitrogen" label="无机氮" width="70" align="center" />
            <el-table-column prop="phosphate" label="磷酸盐" width="70" align="center" />
            <el-table-column prop="Nutritionalization" label="是否富营养化" width="120" align="center" />
          </el-table>
        </div>
      </div>
      <div class="rightBox-middle2">
        <div class="rightBox-bottom-title">
          环境DNA多样性
        </div>
        <div class="rightBox-middle2-content"></div>
      </div>
      <div class="rightBox-bottom">
        <div class="rightBox-bottom-title">
          浮游动物组成比例
        </div>
        <div class="rightBox-bottom-content"></div>
      </div>
    </div>
    <!-- 顶部选择 -->
    <div class="topMenu">
      <el-radio-group v-model="topMenu" size="large" @change="topMenuChange">
        <el-radio-button label="互花米草" value="互花米草" />
        <el-radio-button label="鸟类" value="鸟类" />
        <el-radio-button label="牡蛎" value="牡蛎" />
        <el-radio-button label="文昌鱼" value="文昌鱼" />
        <el-radio-button label="水质沉积物" value="水质沉积物" />
      </el-radio-group>
    </div>
    <!-- 时间轴 -->
    <div class="bottombox-left">
      <div class="bottombox">
        <div class="bottombox-slider">
          <el-slider :step="1" v-model="timePlay" :show-tooltip="false" :min="min" :max="max" :marks="marks"
            style="position: relative; z-index: 1; width: 1000px" v-show="showSilder">
          </el-slider>
        </div>
      </div>
    </div>
    <!-- 鸟类点击弹窗 -->
    <div class="bird" v-show="birdShow">
      <div class="rightBox-top-title-dialog">
        XX站点
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
          <el-carousel-item>
            <img src="../../assets/img/text4.png" alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/text5.png" alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/text6.png" alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/text3.png" alt="" style="width: 100%;height: 100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="briefly">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handletabClick">
          <el-tab-pane label="鸟种资料" name="first">
            <table class="custom-table">
              <thead>
                <tr>
                  <td>中文目名</td>
                  <td></td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>中文科名</td>
                  <td></td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>中文属名</td>
                  <td></td>
                </tr>
              </thead>
              <thead>
                <tr>
                  <td>层级</td>
                  <td></td>
                </tr>
              </thead>
            </table>
          </el-tab-pane>
          <el-tab-pane label="简介" name="second">
            222
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
const tableData1 = ref([
  {
    project: '一类',
    PH: '7.8~8.5',
    DO: '>6',
    COD: '≤2',
    Inorganicnitrogen: '≤0.20',
    Activephosphate: '≤0.015'
  },
  {
    project: '二类',
    PH: '7.8~8.5',
    DO: '>5',
    COD: '≤3',
    Inorganicnitrogen: '≤0.30',
    Activephosphate: '≤0.030'
  },
  {
    project: '三类',
    PH: '6.8~8.8',
    DO: '>4',
    COD: '≤4',
    Inorganicnitrogen: '≤0.40',
    Activephosphate: '≤0.030'
  },
  {
    project: '四类',
    PH: '6.8~8.8',
    DO: '>3',
    COD: '≤25',
    Inorganicnitrogen: '≤0.50',
    Activephosphate: '≤0.045'
  }
])
const tableData2 = ref([
  {
    Stations: '1',
    Diversity: '1.00',
    Uniformity: '1.00',
    Dominance: '1.00',
    Richness: '1.00',
    threshold: '1.00',
    level: '多样性一般',
  },
  {
    Stations: '2',
    Diversity: '1.50',
    Uniformity: '0.95',
    Dominance: '0.75',
    Richness: '1.00',
    threshold: '1.42',
    level: '多样性一般',
  },
  {
    Stations: '3',
    Diversity: '1.25',
    Uniformity: '0.79',
    Dominance: '0.83',
    Richness: '0.77',
    threshold: '0.99',
    level: '多样性一般',
  },
  {
    Stations: '4',
    Diversity: '1.00',
    Uniformity: '1.00',
    Dominance: '1.00',
    Richness: '1.00',
    threshold: '1.00',
    level: '多样性一般',
  },
])
const tableData3 = ref([
  {
    StationNumber: '1',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '一类',
    phosphate: '一类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '2',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '一类',
    phosphate: '一类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '3',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '二类',
    phosphate: '二类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '4',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '四类',
    phosphate: '一类',
    Nutritionalization: '富营养化',
  },
])
let charts = []
let chartRef1 = ref(null);
let initChart1 = (source) => {
  let chart = echarts.init(chartRef1.value);
  charts.push(() => {
    chart.dispose();
    initChart1(source);
  });
  chart.setOption({
    dataset: {
      sourceHeader: false,
      source: source,
    },
    grid: {
      top: '30',
      bottom: "0",
      left: '5',
      right: "5",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        fontSize: 12
      },
      formatter: (params) => {
        let data = params[0].data;
        if (!data[1]) {
          return;
        }
        let tooltip = `时间：${data[0]}<br>气温：${data[1]} °C`;
        return tooltip;
      },
    },
    xAxis: {
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(255,255,255,0.1)",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(255,255,255,0.1)",
        },
      },
      axisTick: {
        show: false,
      },
      boundaryGap: true,
      axisLabel: {
        textStyle: {
          color: "#C5F1FF",
          fontSize:12
        },
      },
    },
    yAxis: {
      name: "气温 (°C)",
      nameTextStyle: {
        color: "#C5F1FF",
        fontSize:12
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(255,255,255,0.2)",
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: "rgba(255,255,255,0.2)",
        },
      },
      axisLabel: {
        interval: 3,
        textStyle: {
          color: "#C5F1FF",
          fontSize:12
        },
      },
      min: 0,
      max: 40,
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 0,
        itemStyle: {
          color: "#FF5733", // 修改为气温的颜色
        },
        encode: { x: 0, y: [1] },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "#FF5733",
                },
                {
                  offset: 0.9,
                  color: "rgba(255,165,79,0.2)",
                },
              ],
              false
            ),
          },
        },
      },
    ],
  });
};
let reloadChart = () => {
  charts.forEach((chart) => {
    chart();
  });
};
const showSilder = ref(true)
const topMenu = ref('互花米草');
const timePlay = ref(2019);
const min = ref(2019);
const max = ref(2023);

// 定义 slider 的刻度
const marks = computed(() => {
  if (topMenu.value === '互花米草') {
    const marks = {};
    const start = min.value;
    const end = max.value;
    for (let year = start; year <= end; year++) {
      marks[year] = {
        style: {
          color: '#FFFFFF',
        },
        label: year.toString()
      };
    }
    return marks;
  } else if (topMenu.value === '鸟类') {
    return {
      0: {
        style: {
          color: '#FFFFFF',
        },
        label: '2023.06'
      },
      1: {
        style: {
          color: '#FFFFFF',
        },
        label: '2023.08'
      },
      2: {
        style: {
          color: '#FFFFFF',
        },
        label: '2023.11'
      },
      3: {
        style: {
          color: '#FFFFFF',
        },
        label: '2024.04'
      }
    };
  } else if (topMenu.value === '牡蛎') {
    return {
      0: {
        style: {
          color: '#FFFFFF',
        },
        label: '2023.10'
      },
      1: {
        style: {
          color: '#FFFFFF',
        },
        label: '2024.04'
      },
    };
  } else {
    return null;
  }
});

const topMenuChange = (value) => {
  topMenu.value = value;
  showSilder.value = true;
  if (value === '互花米草') {
    timePlay.value = 2019;
    min.value = 2019;
    max.value = 2023;
  } else if (value === '鸟类') {
    timePlay.value = 0;
    min.value = 0;
    max.value = 3;
  } else if (value === '牡蛎') {
    timePlay.value = 0;
    min.value = 0;
    max.value = 1;
  } else {
    showSilder.value = false;
  }
};

// 监听 timePlay 的变化
watch(timePlay, (newVal) => {
  console.log(newVal);
});

const birdShow = ref(false);
const speciesList = ref([
  { name: '斑嘴鸭', count: 'XX只' },
  { name: '琵嘴鸭', count: 'XX只' },
  { name: '白鹭', count: 'XX只' },
  // { name: '黑尾鸥', count: 'XX只' },
  // { name: '苍鹭', count: 'XX只' },
  // { name: '斑尾塍鹬', count: 'XX只' },
  // { name: '翘嘴鹬', count: 'XX只' },
  // { name: '中白鹭', count: 'XX只' },
  // { name: '中杓鹬', count: 'XX只' },

]);
const activeIndex = ref(0);
const handleClick = (index, item) => {
  activeIndex.value = index;
  console.log(`Clicked on: ${item.name}, Count: ${item.count}`);
};
const activeName = ref('first')

const handletabClick = (tab, event) => {
  console.log(tab, event)
}

onMounted(() => {
  initChart1([
    ["00:00", "19"],
    ["01:00", "19"],
    ["02:00", "20"],
    ["03:00", "20"],
    ["04:00", "20"],
    ["05:00", "21"],
    ["06:00", "21"],
    ["07:00", "22"],
    ["08:00", "22"],
    ["09:00", "23"],
    ["10:00", "24"],
    ["11:00", "25"],
    ["12:00", "28"],
    ["13:00", "30"],
    ["14:00", "32"],
    ["15:00", "34"],
    ["16:00", "36"],
    ["17:00", "35"],
    ["18:00", "33"],
    ["19:00", "30"],
    ["20:00", "28"],
    ["21:00", "25"],
    ["22:00", "22"],
    ["23:00", "20"],
  ]);
  window.addEventListener("resize", reloadChart);
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

.rightBox-top-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
}

.rightBox-bottom-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
}

.rightBox-middle2-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.rightBox-bottom-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text4.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-top-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  /* background-image: url('../../assets/img/text5.png');
  background-repeat: no-repeat;
  background-size: 100% 100%; */
}

.leftBox-bottom-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text6.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-middle2-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text7.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-bottom-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
}

.bottombox-left {
  width: 62%;
  height: 5vh;
  position: absolute;
  bottom: 2.5vh;
  z-index: 20;
  left: 50%;
  transform: translateX(-50%);
}


.bottombox {
  padding: 0 3vh 0 9vh;
  position: absolute;
  bottom: 2vh;
  box-sizing: border-box;
  display: flex;
  z-index: 5;
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

.topMenu {
  position: absolute;
  z-index: 12;
  top: 9vh;
  left: 50%;
  transform: translateX(-50%);
}

.bird {
  position: absolute;
  left: 34.4vh;
  top: 10vh;
  width: 30vh;
  height: 80vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
}

.species {
  margin: 1vh 0;
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
}

:deep(.el-carousel__button) {
  width: 2vh;
}

:deep(.el-carousel__indicator.is-active button) {
  width: 2vh;
}

.briefly {
  width: 100%;
  height: 45.5vh;
  color: #CFEFFF;
  font-size: 1.4vh;
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
  font-size: 1.2vh;
  /* width: 50%; */
}



:deep(.el-table__body-wrapper) {
  font-size: 1.2vh;
}

:deep(.el-table--fit) {
  padding: 0;
}

:deep(.el-table, .el-table__expanded-cell) {
  background-color: transparent;
  border: none;
}

:deep(.el-table th) {
  background-color: transparent;
  border: none;
}

:deep(.el-table tr) {
  background-color: transparent;
  border: none;
}

:deep(.el-table--enable-row-transition .el-table__body td, .el-table .cell) {
  background-color: transparent;
  border: none;
}

:deep(.el-table__header-wrapper th) {
  background-color: transparent;
  border: none;
}

:deep(.el-table__body-wrapper td) {
  border: none;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: transparent;
}

/* 去掉中间数据的分割线 */
:deep(.el-table__row > td) {
  border: none;
}

/* 去掉上面的线 */
:deep(.el-table th.is-leaf) {
  border: none;
}

:deep(.el-table__inner-wrapper:before) {
  display: none;
}

:deep(.el-table .cell) {
  color: #b7cffc;
}
</style>
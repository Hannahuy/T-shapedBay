<template>
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
      <div class="leftBox-bottom-table" ref="chartRef2"></div>
    </div>
    <div class="rightBox-middle2">
      <div class="rightBox-bottom-title">
        浮游植物组成比例图
      </div>
      <div class="leftBox-middle2-content" ref="chartRef3"></div>
    </div>
    <div class="rightBox-bottom">
      <div class="rightBox-bottom-title">
        海水水质评价参数及标准
      </div>
      <div class="leftBox-bottom-content">
        <el-table :data="tableData1" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.1vh',
          'text-align': 'center',
        }" height="17.5vh">
          <el-table-column prop="project" label="项目" width="50" align="center" />
          <el-table-column prop="PH" label="PH" width="60" align="center" />
          <el-table-column prop="DO" label="DO" width="50" align="center" />
          <el-table-column prop="COD" label="COD" width="50" align="center" />
          <el-table-column prop="Inorganicnitrogen" label="无机氮" width="60" align="center" />
          <el-table-column prop="Activephosphate" label="活性磷酸盐" width="80" align="center" />
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
          background: 'transparent', fontSize: '1.1vh',
          'text-align': 'center',
        }" height="16.25vh">
          <el-table-column prop="Stations" label="站位" width="50" align="center" />
          <el-table-column prop="Diversity" label="多样性指数" width="80" align="center" />
          <el-table-column prop="Uniformity" label="均匀度" width="60" align="center" />
          <el-table-column prop="Dominance" label="优势度" width="60" align="center" />
          <el-table-column prop="Richness" label="丰富度" width="60" align="center" />
          <el-table-column prop="threshold" label="指数阈值" width="70" align="center" />
          <el-table-column prop="level" label="等级" width="80" align="center" />
        </el-table>
      </div>
    </div>
    <div class="rightBox-middle">
      <div class="rightBox-bottom-title">
        水质沉积物单指标评价结果
      </div>
      <div class="rightBox-bottom-table">
        <el-table :data="tableData3" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.1vh',
          'text-align': 'center',
        }" height="16.25vh">
          <el-table-column prop="StationNumber" label="站号" width="60" align="center" />
          <el-table-column prop="PH" label="PH" width="50" align="center" />
          <el-table-column prop="DO" label="DO" width="50" align="center" />
          <el-table-column prop="COD" label="COD" width="50" align="center" />
          <el-table-column prop="Inorganicnitrogen" label="无机氮" width="60" align="center" />
          <el-table-column prop="phosphate" label="磷酸盐" width="60" align="center" />
          <el-table-column prop="Nutritionalization" label="是否富营养化" width="90" align="center" />
        </el-table>
      </div>
    </div>
    <div class="rightBox-middle2">
      <div class="rightBox-bottom-title">
        环境DNA多样性
      </div>
      <div class="rightBox-middle2-content" ref="chartRef4"></div>
    </div>
    <div class="rightBox-bottom">
      <div class="rightBox-bottom-title">
        浮游动物组成比例
      </div>
      <div class="rightBox-bottom-content" ref="chartRef5"></div>
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
  <div class="bird" v-if="birdShow">
    <div class="rightBox-top-title-dialog">
      {{ birdstation }}
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="closebird">
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
    <div class="briefly">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="鸟种资料" name="first">
          <div class="brieflydata">
            <table class="custom-table">
              <tbody>
                <tr v-for="(item, index) in animalData" :key="index">
                  <td>{{ item.title }}</td>
                  <td>{{ item.txt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="简介" name="second">
          <div class="brieflydata">
            <div v-for="(item, index) in animalDatalist" :key="index">
              <div style="font-size: 1.6vh;font-weight: bold;">{{ item.title }}</div>
              <div style="font-size: 1.2vh;">{{ item.txt }}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
import axios from "axios";
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
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};
let chartRef2 = ref(null);
let initChart2 = (source) => {
  let chart = echarts.init(chartRef2.value);
  charts.push(() => {
    chart.dispose();
    initChart2(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};
let chartRef3 = ref(null);
let initChart3 = (source) => {
  let chart = echarts.init(chartRef3.value);
  charts.push(() => {
    chart.dispose();
    initChart3(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};
let chartRef4 = ref(null);
let initChart4 = (source) => {
  let chart = echarts.init(chartRef4.value);
  charts.push(() => {
    chart.dispose();
    initChart4(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: source
      }
    ]
  });
};
let chartRef5 = ref(null);
let initChart5 = (source) => {
  let chart = echarts.init(chartRef5.value);
  charts.push(() => {
    chart.dispose();
    initChart5(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};
let chartRef6 = ref(null);
let initChart6 = (source) => {
  let chart = echarts.init(chartRef6.value);
  charts.push(() => {
    chart.dispose();
    initChart6(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
};
let chartRef7 = ref(null);
let initChart7 = (source) => {
  let chart = echarts.init(chartRef7.value);
  charts.push(() => {
    chart.dispose();
    initChart7(source);
  });
  chart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: source,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
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
  const commonStyle = { style: { color: '#FFFFFF' } };
  if (topMenu.value === '互花米草') {
    const marks = {};
    const start = min.value;
    const end = max.value;
    for (let year = start; year <= end; year++) {
      marks[year] = { ...commonStyle, label: year.toString() };
    }
    return marks;
  }
  const labels = {
    '鸟类': [
      '2023.06',
      '2023.08',
      '2023.11',
      '2024.04'
    ],
  };
  if (labels[topMenu.value]) {
    return labels[topMenu.value].map((label, index) => ({
      ...commonStyle,
      label: label
    })).reduce((acc, curr, index) => {
      acc[index + (topMenu.value === '鸟类' ? 0 : 4)] = curr;
      return acc;
    }, {});
  }
  return null;
});
const clickStatus = {
  '牡蛎': false,
  '互花米草': true,
  '鸟类': false,
};

const topMenuChange = (value) => {
  // 取消之前的点击状态
  for (const key in clickStatus) {
    if (key !== value) {
      if (clickStatus[key]) {
        callUIInteraction({
          ModuleName: `监测调查`,
          FunctionName: `${key}`,
          State: false,
        });
        clickStatus[key] = false;
      }
    }
  }
  if (!clickStatus[value]) {
    if (value === '牡蛎' || value === '文昌鱼' || value === '水质沉积物') {
      callUIInteraction({
        ModuleName: `监测调查`,
        FunctionName: `${value}`,
        State: true,
      });
    }
    clickStatus[value] = true;
  }
  topMenu.value = value;
  showSilder.value = true;
  birdShow.value = false;
  oystersShow.value = false;
  if (value === '牡蛎') {
    oystersShow.value = true;
    initChart6([
      { value: 5, name: '刺胞动物' },
      { value: 30, name: '节肢动物' },
      { value: 25, name: '环节动物' },
      { value: 35, name: '软体动物' },
      { value: 5, name: '星虫动物' },
    ]);
    initChart7([
      { value: 3, name: '刺胞动物' },
      { value: 3, name: '纽形动物' },
      { value: 3, name: '扁形动物' },
      { value: 25, name: '节肢动物' },
      { value: 22, name: '环节动物' },
      { value: 41, name: '软体动物' },
      { value: 3, name: '星虫动物' },
    ]);
  }
  if (value === '互花米草') {
    timePlay.value = 2019;
    min.value = 2019;
    max.value = 2023;
  } else if (value === '鸟类') {
    timePlay.value = 0;
    min.value = 0;
    max.value = 3;
  } else {
    showSilder.value = false;
  }
};

// 监听 timePlay 的变化
const logMapping = {
  '鸟类': {
    0: '2023.06',
    1: '2023.08',
    2: '2023.11',
    3: '2024.04',
  },
  '互花米草': {
    2019: '2019',
    2020: '2020',
    2021: '2021',
    2022: '2022',
    2023: '2023',
  },
};

watch(timePlay, (newVal) => {
  const menu = topMenu.value;
  const logValue = logMapping[menu]?.[newVal];
  if (logValue !== undefined) {
    callUIInteraction({
      ModuleName: `监测调查`,
      FunctionName: `${menu}`,
      State: true,
      Time: `${logValue}`,
    });
  }
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

const activeName = ref('first')

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
  if (datajson.Function === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return
  } else if (datajson.Function === '色带范围') {
    birdstation.value = datajson.Data.StationName;
    axios.get(`http://192.168.0.227:8088/animal/getAnimal/${datajson.name[0]}`).then((res) => {
      animalData.value = res.data.data.info.鸟种资料;
      animalDatalist.value = res.data.data.info.详细信息;
      imageArray.value = res.data.data.images.imageArray.map(image => `http://192.168.0.227:8088${image.path}`);
    });
  }
}

onMounted(() => {
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `互花米草`,
    State: true,
    Time: '2019',
  });
  initChart1([
    { value: 19.18, name: '节肢动物' },
    { value: 39.73, name: '软体动物' },
    { value: 31.51, name: '环节动物' },
    { value: 1.37, name: '原足动物' },
    { value: 1.37, name: '星虫动物' },
    { value: 1.37, name: '扁形动物' },
    { value: 1.37, name: '腕足动物' },
    { value: 1.37, name: '脊索动物' },
    { value: 1.37, name: '刺胞动物' },
    { value: 1.37, name: '纽形动物' },
  ]);
  initChart2([
    { value: 46.15, name: '多毛类' },
    { value: 30.77, name: '软体动物' },
    { value: 15.38, name: '甲壳类' },
    { value: 3.85, name: '头索动物' },
    { value: 3.85, name: '纽形动物' },
  ]);
  initChart3([
    { value: 12.5, name: '蓝藻门' },
    { value: 87.5, name: '硅藻门' },
  ]);
  initChart4([
    { value: '1', name: 'a1' },
    { value: '1', name: 'a2' },
    { value: '1', name: 'b1' },
    { value: '1', name: 'b1' },
    { value: '1', name: 'c1' },
    { value: '1', name: 'c2' },
  ]);
  initChart5([
    { value: 20, name: '肛肠动物' },
    { value: 40, name: '节肢动物' },
    { value: 7, name: '毛颚动物' },
    { value: 33, name: '其他幼体' },
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
  max-height: 80vh;
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
  flex-shrink: 0;
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
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  color: #CFEFFF;
  font-size: 1.4vh;
}

.brieflydata {
  max-height: 39vh;
  overflow-y: auto;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 1vh;
  /* 滚动条的宽度 */
  height: 1vh;
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

:deep(.el-table__body-wrapper) {
  font-size: 1vh;
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

.close {
  cursor: pointer;
  width: 2vh;
  position: absolute;
  right: 1vh;
  top: 2vh;
}

.oysters {
  position: absolute;
  left: 34.4vh;
  top: 10vh;
  width: 30vh;
  max-height: 80vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.oystersecharts {
  width: 26.75vh;
  height: 20vh;
}
</style>
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
const charts = [];
const chartRef1 = ref(null);
const chartRef2 = ref(null);
const chartRef3 = ref(null);
const chartRef4 = ref(null);
const chartRef5 = ref(null);
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
        radius: ['40%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center',
          color: '#CFEFFF'
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
const reloadChart = () => {
  charts.forEach((chart) => chart());
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
  topMenu.value = value;
  showSilder.value = true;
  birdShow.value = false;
  oystersShow.value = false;
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
    if (value === '鸟类') {
      callUIInteraction({
        ModuleName: `监测调查`,
        FunctionName: topMenu.value,
        Time: `2023.06`,
        State: true,
      });
    } else if (value === '互花米草') {
      callUIInteraction({
        ModuleName: `监测调查`,
        FunctionName: topMenu.value,
        Time: `2019`,
        State: true,
      });
    } else {
      callUIInteraction({
        ModuleName: `监测调查`,
        FunctionName: topMenu.value,
        State: true,
      });
    }
    clickStatus[value] = true;
  }
  if (value === '牡蛎') {
    oystersShow.value = true;
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
const logMapping = {
  0: '2023.06',
  1: '2023.08',
  2: '2023.11',
  3: '2024.04',
  2019: '2019',
  2020: '2020',
  2021: '2021',
  2022: '2022',
  2023: '2023',
};
const gettimePlay = (e) => {
  const timeValue = logMapping[e];
  if (timeValue) {
    callUIInteraction({
      ModuleName: `监测调查`,
      FunctionName: topMenu.value,
      State: true,
      Time: timeValue
    });
  } else {
    console.error(`未找到对应的时间值: ${e}`);
  }
}

const birdShow = ref(false);
const speciesList = ref([
  // { name: '斑嘴鸭', count: 'XX只' },
  // { name: '琵嘴鸭', count: 'XX只' },
  // { name: '白鹭', count: 'XX只' },
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
  birdShow.value = false;
  if (datajson.Funcation === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return
  } else if (datajson.Funcation === '站点点击查询') {
    birdShow.value = true;
    birdstation.value = datajson.Data.siteName;
    speciesList.value = datajson.Data.animalsCount;
    axios.get(`http://192.168.0.227:8088/animal/getAnimal/${datajson.Data.animalsCount[0].name}`).then((res) => {
      animalData.value = res.data.data.info.鸟种资料;
      animalDatalist.value = res.data.data.info.详细信息;
      imageArray.value = res.data.data.images.imageArray.map(image => `http://192.168.0.227:8088${image.path}`);
    });
  }
}

onMounted(() => {
  initChart(chartRef1, [
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
  initChart(chartRef2, [
    { value: 46.15, name: '多毛类' },
    { value: 30.77, name: '软体动物' },
    { value: 15.38, name: '甲壳类' },
    { value: 3.85, name: '头索动物' },
    { value: 3.85, name: '纽形动物' },
  ]);
  initChart(chartRef3, [
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
  initChart(chartRef5, [
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
</style>
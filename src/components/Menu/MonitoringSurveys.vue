<template>
  <!-- 指北针 -->
  <div class="North" id="compass" v-show="showNorth">
    <img src="/img/指北针.png" style="width: 10vh; height: 10vh;" alt="指北针" id="compassImage">
  </div>
  <!-- 右侧工具栏 -->
  <div class="righticon">
    <el-tooltip class="box-item" effect="dark" content="天气" placement="left">
      <img :src="selectedWeather" class="imageicon" alt="" @click="weathernext">
    </el-tooltip>
    <el-tooltip class="box-item" effect="dark" content="海面" placement="left">
      <img src="../../assets/img/海面.png" class="imageicon" style="width: 2vh;" alt="" @click="offing">
    </el-tooltip>
    <el-tooltip class="box-item" effect="dark" content="视角恢复" placement="left">
      <img src="../../assets/img/视角.png" class="imageicon" style="width: 2.3vh;" alt="" @click="perspective">
    </el-tooltip>
    <el-tooltip class="box-item" effect="dark" content="等深线" placement="left">
      <img src="../../assets/img/等深线.png" class="imageicon" style="width: 2.3vh;" alt="" @click="contour">
    </el-tooltip>
  </div>
  <div class="weatherBox" v-if="showWeather">
    <img src="/img/晴天.png" class="imageicon" alt="" @click="selectWeather('晴天')">
    <img src="/img/阴天.png" class="imageicon" alt="" @click="selectWeather('阴天')">
    <img src="/img/雨天.png" class="imageicon" alt="" @click="selectWeather('雨天')">
    <img src="/img/雪天.png" class="imageicon" alt="" @click="selectWeather('雪天')">
  </div>
  <!-- 时间轴 -->
  <div class="bottomCalendar">
    <el-date-picker v-model="timePick" type="date" :editable="false" />
  </div>
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
    <img src="../../assets/img/close.png" alt="" class="close" @click="birdShow = false">
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
    <img src="../../assets/img/close.png" alt="" class="close2" @click="birdShow = false">
    <div class="rightBox-top-title-dialog">
      详细信息
    </div>
    <div class="brieflydata">
      <div v-for="(item, index) in animalDatalist" :key="index">
        <div style="font-size: 1.6vh;font-weight: bold;color:#00E7FF;text-align: center;margin-bottom: 1vh;">{{
    item.title }}</div>
        <div style="font-size: 1.2vh;text-indent: 2em;margin-bottom: 1vh;">{{ item.txt }}</div>
      </div>
    </div>
  </div>
  <!-- 牡蛎点击弹窗 -->
  <div class="oysters" v-show="oystersShow">
    <div class="rightBox-top-title-dialog">
      牡蛎数据
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="oystersShow = false">
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2">
        <tbody>
          <tr>
            <td></td>
            <td>牡蛎礁面积(m²)</td>
            <td>造礁牡蛎密度(个/m²)</td>
            <td>造礁牡蛎生物量(g/m²)</td>
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
    <div class="oystersecharts" ref="chartRef1"></div>
    <div class="rightBox-top-title-dialog">
      礁栖生物类群-2024
    </div>
    <div class="oystersecharts" ref="chartRef2"></div>
  </div>
  <!-- 牡蛎礁右侧弹窗 -->
  <div class="oystersright" v-show="oystersShow">
    <div class="rightBox-top-title-dialog">
      牡蛎示例图
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="oystersShow = false">
    <div class="Carousel">
      <el-carousel height="16vh">
        <el-carousel-item v-for="(image, index) in imageoysters" :key="index" v-if="imageoysters.length > 0">
          <img :src="image" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="rightBox-top-title-dialog">
      牡蛎介绍
    </div>
    <div>
      长牡蛎(Crassostrea gigas)，俗称太平洋牡蛎、大连湾牡蛎，隶属于软体动物门(Mollusca)，双壳纲(Bivalvia)，牡蛎目(Ostreida)，牡蛎科(Ostridae)，巨蛎属(Crassostrea)。长牡蛎自然分布在我国长江以北沿海的潮间带与潮下带，是我国辽宁、河北、山东、江苏等省的主要养殖贝类。该物种在韩国和日本沿海也有自然分布，后经多次引种，目前也是法国、美国、澳大利亚和南非等国的主产牡蛎。
长牡蛎为一种广温广盐性的海洋双壳贝类，适温范围为-3～32 ℃，最适生长温度为5～28 ℃，适盐范围为15～35，最适生长盐度为20～31。长牡蛎生活史中存在营浮游生活的幼虫期，至幼虫变态期以其左壳固定在外物上生活，终生不再移动。牡蛎是滤食性贝类，幼虫期可以摄食直径在10μm以内的有机颗粒和单胞藻；成体的食物包括浮游植物、有机碎屑、小型浮游动物等。具有群聚的特点，偏好以牡蛎壳等贝壳为附着基质，因此常形成由不同年龄的个体群聚而成的牡蛎礁。
长牡蛎的性成熟年龄为1龄，一般为雌雄异体，亦有雌雄同体和性别转换现象。通常一龄时雄贝比例较高，二龄时则雌雄近等。长牡蛎属多次性产卵型贝类，丁字湾海域长牡蛎产卵期为5月上旬至7月下旬。温度、盐度和潮汐的变化均会诱导其产卵、排精。长牡蛎怀卵量较大，1龄牡蛎的平均怀卵量在800万粒～856.8万粒，2龄牡蛎的平均怀卵量在2333.80万粒～2900万粒之间。由于丁字湾牡蛎礁区附着基质丰富、长牡蛎幼虫补充量大，因此牡蛎礁能够正常发育，且造礁牡蛎密度较大。
    </div> -->
  </div>
  <!-- 互花米草弹窗 -->
  <div class="Spartinaalterniflora" v-show="SpartinaalternifloraShow">
    <div class="rightBox-top-title-dialog">
      时间选择
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="SpartinaalternifloraShow = false">
    <div>
      <el-radio-group v-model="radio" style="display: flex;flex-direction: column;" @change="radioChange">
        <el-radio :value="2019">2019</el-radio>
        <el-radio :value="2020">2020</el-radio>
        <el-radio :value="2021">2021</el-radio>
        <el-radio :value="2022">2022</el-radio>
        <el-radio :value="2023">2023</el-radio>
      </el-radio-group>
    </div>
    <div class="rightBox-top-title-dialog">
      面积变化表格
    </div>
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2">
        <tbody>
          <tr>
            <td>年份</td>
            <td>面积(km²)</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2019</td>
            <td>5.23</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2020</td>
            <td>6.70</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2021</td>
            <td>7.74</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2022</td>
            <td>2.97</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>2023</td>
            <td>4.77</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightBox-top-title-dialog">
      面积变化折线图
    </div>
    <div class="oystersecharts" ref="chartRef5"></div>
  </div>
  <!-- 水质沉积物弹窗 -->
  <div class="sediment" v-show="showSediment">
    <div class="rightBox-top-title-dialog">
      时间选择
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="showSediment = false">
    <div>
      <el-radio-group v-model="radio2" style="display: flex;flex-direction: column;" @change="radioChange2">
        <el-radio value="2023.06">2023.06</el-radio>
        <el-radio value="2023.08">2023.08</el-radio>
        <el-radio value="2023.11">2023.11</el-radio>
        <el-radio value="2024.04">2024.04</el-radio>
      </el-radio-group>
    </div>
    <div class="rightBox-top-title-dialog1">
      水质数据
      <span>{{ tablename }}</span>
    </div>
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2">
        <tbody>
          <tr v-for="(value, key) in waterQuality" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightBox-top-title-dialog1">
      沉积物数据
      <span>{{ tablename }}</span>
    </div>
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2" v-if="sediment.粒级含量">
        <thead>
          <tr>
            <th rowspan="4">Eh(mV)</th>
            <th colspan="2">{{ sediment['Eh(mV)'] }}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th rowspan="4">名称或代号</th>
            <th colspan="2">{{ sediment.名称或代号 }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="4">粒级含量</td>
            <td>砾石(%) >2mm</td>
            <td>{{ sediment.粒级含量['砾石(%)'] }}</td>
          </tr>
          <tr>
            <td>砂(%) 0.063~2mm</td>
            <td>{{ sediment.粒级含量['砂(%)'] }}</td>
          </tr>
          <tr>
            <td>粉砂(%) 0.004~0.063mm</td>
            <td>{{ sediment.粒级含量['粉砂(%)'] }}</td>
          </tr>
          <tr>
            <td>粘土(%) <0.004mm </td>
            <td>{{ sediment.粒级含量['粘土(%)'] }}</td>
          </tr>
        </tbody>
      </table>
      <table class="custom-table2" v-else>
        <thead>
          <tr>
            <th rowspan="4">Eh(mV)</th>
            <th colspan="2">{{ sediment['Eh(mV)'] }}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th rowspan="4">有机碳(%)</th>
            <th colspan="2">{{ sediment['有机碳(%)'] }}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th rowspan="4">硫化物(×10⁻⁶)</th>
            <th colspan="2">{{ sediment['硫化物(×10⁻⁶)'] }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <!-- 水质沉积物右侧弹窗 -->
  <div class="rightBox" v-show="showSediment">
    <div class="rightBox-top">
      <div class="rightBox-top-title">
        大型底栖动物组成比例图
      </div>
      <img src="../../assets/img/close.png" alt="" class="close" @click="showSediment = false">
      <div class="leftBox-bottom-table" ref="chartRef8"></div>
    </div>
    <div class="rightBox-middle">
      <div class="rightBox-bottom-title">
        浮游植物组成比例图
      </div>
      <div class="rightBox-bottom-table">
        <div class="leftBox-middle2-content" ref="chartRef7"></div>
      </div>
    </div>
    <div class="rightBox-middle2">
      <div class="rightBox-bottom-title">
        浮游动物组成比例
      </div>
      <div class="rightBox-bottom-content-chart" ref="chartRef3"></div>
    </div>
    <div class="rightBox-bottom">
      <div class="rightBox-bottom-title">
        环境DNA多样性
      </div>
      <div class="rightBox-middle2-content" ref="chartRef4"></div>
    </div>
  </div>
  <!-- 潮间带 -->
  <div class="Intertidalzone" v-show="showIntertidalzone">
    <div class="rightBox-top-title-dialog">
      {{ IntertidalzoneName }}
    </div>
    <img src="../../assets/img/close.png" alt="" class="close" @click="showIntertidalzone = false">
    <div style="margin-top: 1vh;margin-bottom: 1vh;text-align: center;color:#CFEFFF;font-size: 1.6vh;">
      日期：2024.04.26 ~ 2024.04.29</div>
    <div class="rightBox-top-title-dialog">
      生物种类多样性
    </div>
    <div style="margin-top: 1vh;margin-bottom: 1vh;">
      <table class="custom-table2">
        <tbody>
          <tr>
            <td>平均密度</td>
            <td>{{ Intertidalzonedata }}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>生物量</td>
            <td>{{ Intertidalzonedata2 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="rightBox-top-title-dialog">
      生物种类多样性
    </div>
    <div class="oystersecharts" ref="chartRef6"></div>
    <div class="rightBox-top-title-dialog">
      优势物种
    </div>
    <div class="Carousel" style="margin-top: 1vh;">
      <el-carousel height="16vh">
        <el-carousel-item v-for="(image, index) in imageSediment" :key="index" v-if="imageSediment.length > 0">
          <img :src="image" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs'
import axios from "axios";
const radio = ref(2019)
const radio2 = ref('2023.06')
const Intertidalzonedata2 = ref(null);
const Intertidalzonedata = ref(null);
const IntertidalzoneName = ref(null);
const showSediment = ref(false);
const showIntertidalzone = ref(false);
const showNorth = ref(false)
const charts = [];
const chartRef1 = ref(null);
const chartRef2 = ref(null);
const chartRef3 = ref(null);
const chartRef4 = ref(null);
const chartRef5 = ref(null);
const chartRef6 = ref(null);
const chartRef7 = ref(null);
const chartRef8 = ref(null);
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
const initChart2 = (source) => {
  let chart = echarts.init(chartRef5.value);
  charts.push(() => {
    chart.dispose();
    initChart2(source);
  });
  chart.setOption({
    dataset: {
      sourceHeader: false,
      source: source,
    },
    grid: {
      top: '15%',
      bottom: "0",
      left: "10",
      right: "5",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {

      },
      formatter: (params) => {
        let data = params[0].data;
        if (!data[1]) {
          return;
        }
        let tooltip = `时间：${data[0]}<br>面积：${data[1]} km²`;
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
        },
      },
    },
    yAxis: {
      name: "k㎡",
      nameTextStyle: {
        color: "#C5F1FF",
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
        textStyle: {
          color: "#C5F1FF",
        },
      },
      min: 0,
      max: 10,
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 0,
        itemStyle: {
          color: "#00B0FF", // 修改为降水的颜色
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
                  color: "#00B0FF",
                },
                {
                  offset: 0.9,
                  color: "rgba(26,201,255,0)",
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

const showWeather = ref(false);
const selectedWeather = ref('img/晴天.png');
const weathernext = () => {
  showWeather.value = !showWeather.value;
}
const selectWeather = (weather) => {
  showWeather.value = false;
  switch (weather) {
    case '晴天':
      selectedWeather.value = 'img/晴天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '晴天'
      });
      break;
    case '阴天':
      selectedWeather.value = 'img/阴天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '阴天'
      });
      break;
    case '雨天':
      selectedWeather.value = 'img/雨天.png';
      callUIInteraction({
        ModuleName: `其他`,
        FunctionName: `天气`,
        Weather: '雨天'
      });
      break;
    case '雪天':
      selectedWeather.value = 'img/雪天.png';
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

const contour = () => {
  callUIInteraction({
    ModuleName: `其他`,
    FunctionName: `等深线`,
  });
}

const timePick = ref(dayjs("2024-08-01").toDate());
const timePlay = ref(null);
const activePlay = ref("");
// 暂停/播放
let previousPlayState = null;
let intervalTime = null;
let playInterval = null;
const togglePlay = () => {
  intervalTime = 400;
  previousPlayState = activePlay.value;
  activePlay.value = activePlay.value === "play" ? "" : "play";
  if (activePlay.value === "play") {
    playInterval = setInterval(() => {
      timePlay.value = dayjs(timePlay.value).add(1, "hour").valueOf();
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
watch(timePick, (newVal) => {
  const selectedDate = dayjs(newVal);
  min.value = selectedDate.startOf("day").valueOf();
  // 更新 max 为当天23点
  max.value = selectedDate.hour(23).minute(0).second(0).valueOf();
  // 仅在 timePlay 为 null 时设置为当天的 00:00:00
  if (!timePlay.value) {
    timePlay.value = selectedDate.startOf("day").valueOf();
  }
});
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
      ModuleName: `监测调查`,
      FunctionName: `时间轴`,
      Time: formattedTime,
    });
    // console.log('监测调查',`标量场可视化`,true,formattedTime, selectvalue.value,selectedItemname.value);
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
const imageSediment = ref([]);
const imageoysters = ref([
  '/img/牡蛎礁1.jpg',
  '/img/牡蛎礁2.jpg',
  '/img/牡蛎礁3.jpg'
]);
console.log(imageoysters.value);
// 点击动物名显示信息
const handleClick = (index, item) => {
  activeIndex.value = index;
  axios.get(window.VITE_APP_BASE_API + `/animal/getAnimal/${item.name}`).then((res) => {
    animalData.value = res.data.data.info.鸟种资料;
    animalDatalist.value = res.data.data.info.详细信息;
    imageArray.value = res.data.data.images.imageArray.map(image => window.VITE_APP_BASE_API + `${image.path}`);
  });
};
const countspeciesList = ref(0);
const oystersShow = ref(false);
const SpartinaalternifloraShow = ref(false);

const radioChange = (e) => {
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `互花米草`,
    State: true,
    Time: e
  });
}

const radioChange2 = (e) => {
  callUIInteraction({
    ModuleName: `监测调查`,
    FunctionName: `水质沉积物`,
    State: true,
    Time: e
  });

  const data = {
    time: e
  };

  axios.post(window.VITE_APP_BASE_API + `/animal/getBioRecord`, data).then((res) => {
    const results = res.data.data; // 获取结果数组
    // 遍历结果数组
    results.forEach(item => {
      const type = item.type; // 获取类型
      const records = item.records.data; // 获取记录数据
      if (type === '浮游植物') {
        initChart(chartRef7, records);
      } else if (type === '底栖生物') {
        initChart(chartRef8, records);
      } else if (type === '浮游动物') {
        initChart(chartRef3, records);
      }
    });
  });
};
const waterQuality = ref({});
const sediment = ref({});
const tablename = ref(null);
const toggleVisibility = (visibleEntities) => {
  birdShow.value = visibleEntities.includes('bird');
  oystersShow.value = visibleEntities.includes('oyster');
  SpartinaalternifloraShow.value = visibleEntities.includes('Spartinaalterniflora');
  showSediment.value = visibleEntities.includes('sediment');
  showIntertidalzone.value = visibleEntities.includes('intertidalzone');
};

const initChartsByData = (charts, data) => {
  charts.forEach(([chartRef, chartData]) => initChart(chartRef, chartData));
};

const myHandleResponseFunction = (data) => {
  // console.log(data);
  const datajson = JSON.parse(data);

  if (datajson.Function === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return;
  }

  switch (datajson.Function) {
    case '鸟类点击查询':
      toggleVisibility(['bird']);
      activeIndex.value = 0;
      birdstation.value = datajson.Data.siteName;
      speciesList.value = datajson.Data.animalsCount;
      countspeciesList.value = speciesList.value.reduce((total, animal) => total + animal.count, 0);

      axios.get(window.VITE_APP_BASE_API + `/animal/getAnimal/${datajson.Data.animalsCount[0].name}`)
        .then((res) => {
          animalData.value = res.data.data.info.鸟种资料;
          animalDatalist.value = res.data.data.info.详细信息;
          imageArray.value = res.data.data.images.imageArray.map(image => window.VITE_APP_BASE_API + `${image.path}`);
        });
      break;

    case '牡蛎礁点击查询':
      toggleVisibility(['oyster']);
      initChartsByData([
        [chartRef1, [
          { value: 5, name: '刺胞动物' },
          { value: 30, name: '节肢动物' },
          { value: 25, name: '环节动物' },
          { value: 35, name: '软体动物' },
          { value: 5, name: '星虫动物' },
        ]],
        [chartRef2, [
          { value: 3, name: '扁形动物' },
          { value: 3, name: '刺胞动物' },
          { value: 22, name: '环节动物' },
          { value: 25, name: '节肢动物' },
          { value: 3, name: '纽形动物' },
          { value: 41, name: '软体动物' },
          { value: 3, name: '星虫动物' },
        ]],
      ]);
      break;

    case '互花米草点击查询':
      toggleVisibility(['Spartinaalterniflora']);
      initChart2([
        ["2019", "5.23"],
        ["2020", "6.70"],
        ["2021", "7.74"],
        ["2022", "2.97"],
        ["2023", "4.77"],
      ]);
      break;

    case '水质沉积物点击查询':
      toggleVisibility(['sediment']);
      const data = {
        time: 2023.06
      };
      axios.post(window.VITE_APP_BASE_API + `/animal/getBioRecord`, data).then((res) => {
        const results = res.data.data; // 获取结果数组
        // 遍历结果数组
        results.forEach(item => {
          const type = item.type; // 获取类型
          const records = item.records.data; // 获取记录数据
          if (type === '浮游植物') {
            initChart(chartRef7, records);
          } else if (type === '底栖生物') {
            initChart(chartRef8, records);
          } else if (type === '浮游动物') {
            initChart(chartRef3, records);
          }
        });
      });
      tablename.value = datajson.Data.name;
      waterQuality.value = datajson.Data.waterQuality;
      sediment.value = datajson.Data.sediment;
      break;

    case '潮间带点击查询':
      toggleVisibility(['intertidalzone']);
      IntertidalzoneName.value = datajson.Data.name;
      Intertidalzonedata.value = datajson.Data.density;
      Intertidalzonedata2.value = datajson.Data.biomass;

      const statisticsData = datajson.Data.statistics;
      const total = Object.values(statisticsData).reduce((sum, value) => sum + value, 0);
      const chartData = Object.keys(statisticsData).map(key => ({
        name: key,
        value: parseFloat(((statisticsData[key] / total) * 100).toFixed(1)),
      }));
      initChart(chartRef6, chartData);
      break;

    case '指北针':
      const angle = datajson.angle;
      const compassImage = document.getElementById('compassImage');
      compassImage.style.transform = `rotate(${angle}deg)`;
    default:
      console.warn('Unknown function type:', datajson.Function);
  }
};


onMounted(() => {
  const storedTime = sessionStorage.getItem('timePlay');
  if (storedTime) {
    timePlay.value = dayjs(storedTime).valueOf(); // 直接设置 timePlay
    timePick.value = dayjs(storedTime).toDate(); // 设置 timePick
  } else {
    timePlay.value = dayjs('2024-08-01 00:00:00').valueOf(); // 默认值
    timePick.value = dayjs('2024-08-01').toDate(); // 默认值
  }
  callUIInteraction({
    ModuleName: `监测调查`,
    State: true,
  });
  window.addEventListener("resize", reloadChart);
  addResponseEventListener("handle_responses", myHandleResponseFunction);
});
onUnmounted(() => {
  window.removeEventListener("resize", reloadChart);
});
</script>

<style scoped>
.rightBox {
  position: absolute;
  right: 7.4vh;
  top: 10vh;
  width: 30vh;
  height: 80vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1.5vh;
  box-sizing: border-box;
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

.rightBox-top-title-dialog1 {
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
  padding-right: 3vh;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.rightBox-top-title-dialog1 span {
  font-size: 1.2vh;
}

.rightBox-top,
.rightBox-middle,
.rightBox-middle2,
.rightBox-bottom {
  width: 100%;
  height: 18.4vh;
}

.rightBox-bottom-table,
.rightBox-bottom-content,
.rightBox-bottom-content-chart,
.leftBox-middle2-content,
.leftBox-bottom-table {
  margin: 1vh 0;
  width: 27vh;
  height: 14vh;
}

.rightBox-middle2-content {
  margin: 1vh 0;
  width: 27vh;
  height: 18.25vh;
  background-image: url('../../../public/img/DNA.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.bottomCalendar {
  position: absolute;
  bottom: 12vh;
  left: 3vh;
  width: 13.5vh;
  height: 2.5rem;
  color: rgb(0, 113, 204);
  border-radius: 1.25rem;
  line-height: 2.5rem;
  border: 0;
  cursor: pointer;
  padding: 0;
  font-size: 1.8vh;
  z-index: 3;
}

.bottomCalendar :deep(.el-input__wrapper) {
  position: absolute;
  z-index: 1000;
  width: 13.5vh;
  height: 2.5rem;
  color: rgb(0, 113, 204);
  border-radius: 1.25rem;
  background: #fff;
  line-height: 2.5rem;
  border: 0;
  cursor: pointer;
  padding: 0;
  font-size: 1.8vh;
}

.bottomCalendar :deep(.el-input__prefix-inner) {
  display: none !important;
}

.bottomCalendar :deep(.el-input__inner) {
  margin-right: 1.5vh;
  color: rgb(0, 113, 204);
  cursor: pointer;
  text-align: center;
  margin: 0;
}

.bottomCalendar :deep(.el-input__suffix-inner) {
  display: none !important;
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
  min-height: 4vh;
  max-height: 10vh;
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
  margin-top: 1vh;
  margin-bottom: 1vh;
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
  margin-top: 1vh;
  height: 72vh;
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
  font-size: 1.1vh;
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

.oystersright{
  position: absolute;
  right: 7.4vh;
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
  margin-top: 1vh;
}

:deep(.el-tabs__item) {
  width: 13.5vh;
  padding: 0 !important;
}

.rightBox-bottom-content {
  position: relative;
  margin-top: 1vh;
  width: 100%;
  max-height: 11vh !important;
  min-height: 11vh !important;
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
  height: 20vh;
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
  top: 28%;
  transform: translateY(-28%);
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

.Spartinaalterniflora {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  height: 71vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

:deep(.el-radio) {
  margin-right: 0;
  color: #b7cffc;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
  color: #b7cffc;
}

.sediment {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  max-height: 81.5vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.Intertidalzone {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
  height: 64.5vh;
  z-index: 10;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 1.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.North {
  position: absolute;
  z-index: 3;
  right: 2.4vh;
  bottom: 10vh;
}
</style>
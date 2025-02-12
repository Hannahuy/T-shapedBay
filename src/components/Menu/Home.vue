<template>
  <div class="leftBox">
    <div class="rightBox-top">
      <div class="rightBox-top-title">总体评价</div>
      <!-- <div class="rightBox-top-title" @click="goToOverallEvaluation">总体评价</div> -->
      <!-- <div class="leftBox-top-table">
        <test :gDataFulldata="gDataFulldata" />
      </div> -->
      <div class="leftBox-top-table">
        <div class="lefttopbox">
          <div class="lefttopbox-item" @click="showDetail('海湾生境')">
            <div style="margin-top: 0.2vh; font-weight: bold; font-size: 1.6vh">
              {{ bayEnv }}
            </div>
            <div style="margin-top: 4vh; font-size: 1.5vh">海湾生境</div>
          </div>
          <div class="lefttopbox-item" @click="showDetail('海湾生物')">
            <div style="margin-top: 0.2vh; font-weight: bold; font-size: 1.6vh">
              {{ bayBio }}
            </div>
            <div style="margin-top: 4vh; font-size: 1.5vh">海湾生物</div>
          </div>
          <div class="lefttopbox-item" @click="showDetail('威胁因素')">
            <div style="margin-top: 0.2vh; font-weight: bold; font-size: 1.6vh">
              {{ bayThreat }}
            </div>
            <div style="margin-top: 4vh; font-size: 1.5vh">威胁因素</div>
          </div>
        </div>
        <div class="lefttopbox2">
          <div class="lefttopbox-item2">
            <div style="
                color: #ffffff;
                font-size: 1.5vh;
                margin-left: 5.5vh;
                margin-top: 0.8vh;
                margin-bottom: 0.5vh;
              ">
              综合指数
            </div>
            <div style="color: aqua; font-size: 1.6vh; font-weight: bold; margin-left: 5.5vh">
              {{ overall }}
            </div>
          </div>
          <div class="lefttopbox-item2">
            <div style="
                color: #ffffff;
                font-size: 1.5vh;
                margin-left: 5.5vh;
                margin-top: 0.8vh;
                margin-bottom: 0.5vh;
              ">
              健康状况
            </div>
            <div style="color: aqua; font-size: 1.6vh; font-weight: bold; margin-left: 5.5vh">
              {{ bayHealth }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightBox-middle2">
      <div class="rightBox-bottom-title">
        水质沉积物单指标评价结果
        <div class="moretable" @click="Seemore"></div>
      </div>
      <div class="leftBox-middle2-content">
        <!-- <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{
            background: 'transparent',
            fontSize: '1.2vh',
            'text-align': 'center',
          }"
          height="16.5vh"
        > -->
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{
          background: 'transparent',
          fontSize: '1.2vh',
          'text-align': 'center',
        }" height="27.5vh">
          <el-table-column prop="Stations" label="站号" width="70" align="center" />
          <el-table-column prop="PH" label="PH" width="50" align="center" />
          <el-table-column prop="DO" label="DO" width="50" align="center" />
          <el-table-column prop="COD" label="COD" width="50" align="center" />
          <el-table-column prop="Inorganicnitrogen" label="无机氮" width="60" align="center" />
          <el-table-column prop="phosphate" label="磷酸盐" width="60" align="center" />
          <el-table-column prop="Nutritionalization" label="是否富营养化" width="90" align="center" />
          <el-table-column prop="有机碳" label="有机碳" width="60" align="center">
            <template #header>
              <span style="color: rgb(251, 255, 0)">有机碳</span>
            </template>
          </el-table-column>
          <el-table-column prop="硫化物" label="硫化物" width="50" align="center">
            <template #header>
              <span style="color: rgb(251, 255, 0)">硫化物</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="rightBox-bottom">
      <div class="rightBox-bottom-title">生物多样性评价结果</div>
      <div class="leftBox-bottom-content">
        <div class="tablebtn-box">
          <div class="tablebtn" :class="{ active: selectedButton === '浮游植物' }" @click="selectButton('浮游植物')">
            浮游植物
          </div>
          <div class="tablebtn" :class="{ active: selectedButton === '浮游动物' }" @click="selectButton('浮游动物')">
            浮游动物
          </div>
          <div class="tablebtn" :class="{ active: selectedButton === '底栖生物' }" @click="selectButton('底栖生物')">
            底栖生物
          </div>
        </div>
        <!-- <el-table
          :data="tableData2"
          style="width: 100%"
          :header-cell-style="{
            background: 'transparent',
            fontSize: '1.3vh',
            'text-align': 'center',
          }"
          height="16.5vh"
        > -->
        <el-table :data="tableData2" style="width: 100%" :header-cell-style="{
          background: 'transparent',
          fontSize: '1.3vh',
          'text-align': 'center',
        }" height="23.5vh">
          <el-table-column prop="Stations" label="站号" width="70" align="center" />
          <el-table-column prop="Diversity" label="多样性指数" width="90" align="center" />
          <el-table-column prop="Uniformity" label="均匀度" width="60" align="center" />
          <el-table-column prop="Dominance" label="优势度" width="60" align="center" />
          <el-table-column prop="Richness" label="丰富度" width="60" align="center" />
          <el-table-column prop="level" label="多样性等级" width="90" align="center" />
          <el-table-column prop="threshold" label="生物多样性指数阈值" width="140" align="center" />
        </el-table>
      </div>
    </div>
  </div>
  <div class="rightBox">
    <div class="rightBox-top-right">
      <div class="rightBox-top-title">丁字湾简介</div>
      <div class="rightBox-top-table">
        <p>
          丁字湾位于青岛市即墨区，
          莱阳，海阳三地的交界处，北纬36度32'40”，东经120度44'58”，
          海湾主体呈北西-南东走向，湾顶部在麻姑岛附近折而向西，
          继五龙河口向延伸，湾口则转向东偏南方向，整个形态大致呈”丁”字形，故名丁字湾。海呈狭长的半封闭的状深入陆地，从湾口到湾顶长22公里，最宽处(底坊滩至鲁岛附近)约12.3公里，
          最窄处(香岛附近)约2.5公里，口门宽(栲栳岛至宅南嘴)
          约2.8公里，湾内岸线蜿蜒曲折，岬湾相间，又被分成几个海湾(或称滩地)
          ，计有栲栳滩，芝坊滩，鲁岛滩，力岛滩，湾顶滩及五龙河三角洲等，
          岬角处多为基岩裸露，形成海蚀崖，但多数因泥沙淤积已为潮水所不及。
        </p>
        <p>
          丁字湾周围被山丘环抱，南，北方向为剥蚀山丘，高程为70米上，下为切割山坡地，表面被残积-坡积物覆盖，西北方向为冲积平原。
          流入丁字湾流有五龙河，白沙可，蓬险河，店集河，贤友河，黄塘河，
          鳌子河，朱埠河，羊郡河等。
        </p>
      </div>
    </div>
    <div class="rightBox-middle-right">
      <div class="rightBox-bottom-title">潜在风险点</div>
      <div class="rightBox-bottom-table">
        <p>养殖废水和河流输入氮磷营养盐，海水呈现富营养化，夏季尤甚；</p>
        <p>
          环湾人为用海程度较为剧烈，人工岸线占比较高，以水产养殖业、制盐业、道路交通和能源工业为主；
        </p>
        <p>
          互花米草入侵致使淤积加剧，并导致滩涂湿地和原生盐沼生态系统退化，滨海鸟类受到威胁；
        </p>
        <p>陆源径流量萎缩，滨海半咸水生态系统趋于海洋化；</p>
        <p>水体连通性差，容易遭受海洋热浪侵袭，对围堰养殖业威胁最大。</p>
      </div>
    </div>
  </div>
  <div class="selectbox">
    <a-select v-model:value="selectedEcological" style="width: 20vh" @change="onEcologicalChange">
      <a-select-option v-for="Ecological in EcologicalOptions" :key="Ecological.value" :value="Ecological.value">
        {{ Ecological.label }}
      </a-select-option>
    </a-select>
  </div>
  <div class="morebox" v-show="morebox">
    <div class="close" @click="morebox = false"></div>
    <div class="moreboxtitle">水质评价因子质量指数</div>
    <div style="width: 100%; height: 33.5vh; padding: 1vh; boxsizing: border-box">
      <div class="tablebtn-box">
        <div class="tablebtn" :class="{ active: selectedButton2 === '一类' }" @click="selectButton2('一类')">
          一类
        </div>
        <div class="tablebtn" :class="{ active: selectedButton2 === '二类' }" @click="selectButton2('二类')">
          二类
        </div>
        <div class="tablebtn" :class="{ active: selectedButton2 === '三类' }" @click="selectButton2('三类')">
          三类
        </div>
        <div class="tablebtn" :class="{ active: selectedButton2 === '四类' }" @click="selectButton2('四类')">
          四类
        </div>
      </div>
      <el-table :data="tableData3" style="width: 100%" :header-cell-style="{
        background: 'transparent',
        fontSize: '1.3vh',
        'text-align': 'center',
      }" height="16vh">
        <el-table-column prop="station" label="站号" width="120" align="center" />
        <el-table-column prop="pH" label="pH" width="120" align="center" />
        <el-table-column prop="DO" label="DO" width="120" align="center" />
        <el-table-column prop="COD" label="COD" width="120" align="center" />
        <el-table-column prop="inorganicNitrogen" label="无机氮" width="120" align="center" />
        <el-table-column prop="phosphate" label="磷酸盐" width="100" align="center" />
        <el-table-column prop="sulfur" label="硫化物" width="100" align="center">
          <template #header>
            <span style="color: rgb(251, 255, 0)">硫化物</span>
          </template>
        </el-table-column>
        <el-table-column prop="organicCarbon" label="有机碳" width="100" align="center">
          <template #header>
            <span style="color: rgb(251, 255, 0)">有机碳</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="nexttitle">超标率</div>
      <el-table :data="tableRateData" style="width: 100%" :header-cell-style="{
        background: 'transparent',
        fontSize: '1.3vh',
        'text-align': 'center',
      }" height="8.5vh">
        <el-table-column v-for="(rate, indicator) in tableRateData[0]" :key="indicator" :label="indicator"
          :prop="indicator" align="center" />
      </el-table>
    </div>
    <div class="chart" ref="chartRef"></div>
  </div>
  <div class="echartsBox" v-show="showEchartsBox">
    <div class="echartsBox-title">{{ detailTitle }}</div>
    <div class="echartsBox-close" @click="showEchartsBox = false"></div>
    <div class="echartsBox-content">
      <div class="echartsBox-right" ref="chartRef2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener, } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from "element-plus";
import axios from "axios";
import test from "../Menu/test.vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
// const goToOverallEvaluation = () => {
//   router.push("/test2");
// };

const selectedEcological = ref("");
const EcologicalOptions = ref([]);
const tableData = ref([]);
const tableData2 = ref([]);
const tableData3 = ref([]);
const tableRateData = ref([]);
// const gDataFulldata = ref();
const bayBio = ref(null);
const bayEnv = ref(null);
const bayHealth = ref(null);
const bayThreat = ref(null);
const overall = ref(null);
const selectedButton = ref("浮游植物");
const showEchartsBox = ref(true);
const detailTitle = ref("");
const Clicktitle = ref(null);

const selectButton = (button) => {
  selectedButton.value = button;
  CreatureEvaluation();
};

const getTime = () => {
  axios.get(window.VITE_APP_BASE_API + "/overall/getTime").then((res) => {
    EcologicalOptions.value = res.data.data.map(date => ({
      value: date,
      label: date
    }));
    if (res.data.data.length > 0) {
      selectedEcological.value = res.data.data[0];
      OverallRating();
      WaterEvaluation();
      CreatureEvaluation();
    }
  });
};
const getOverallRating = () => {
  const params = {
    name: Clicktitle.value,
    time: selectedEcological.value,
  }
  axios.post(window.VITE_APP_BASE_API + "/overall/getRadarData/", params).then((res) => {
    if (res.data.data === null) {
      showEchartsBox.value = false;
      ElMessage.warning("暂无数据");
    } else {
      showEchartsBox.value = true;
      initRadarChart(res.data.data);
    }
  });
};

const OverallRating = () => {
  if (!selectedEcological.value) return;
  axios
    .get(window.VITE_APP_BASE_API + "/overall/getOverall/" + selectedEcological.value)
    .then((res) => {
      bayBio.value = res.data.data.bayBio;
      bayEnv.value = res.data.data.bayEnv;
      bayHealth.value = res.data.data.bayHealth;
      bayThreat.value = res.data.data.bayThreat;
      overall.value = res.data.data.overall;
    });
};
const WaterEvaluation = () => {
  if (!selectedEcological.value) return;
  tableData.value = [];
  const params = {
    category: "",
    name: "",
    time: selectedEcological.value,
  };

  axios
    .post(window.VITE_APP_BASE_API + "/water/getEvaReAll", params)
    .then((res) => {
      const data = res.data.data;
      const qualityData = data.quality.map((item) => {
        const sedimentItem = data.sediment.find((s) => s.name === item.name) || {};
        return {
          Stations: item.name,
          有机碳: sedimentItem.evaRe ? sedimentItem.evaRe["有机碳"] : "无数据",
          硫化物: sedimentItem.evaRe ? sedimentItem.evaRe["硫化物"] : "无数据",
          PH: item.evaRe["pH"],
          DO: item.evaRe["DO"],
          COD: item.evaRe["COD"],
          Inorganicnitrogen: item.evaRe["无机氮"],
          phosphate: item.evaRe["磷酸盐"],
          Nutritionalization: item.evaRe["是否富营养化"],
        };
      });
      tableData.value = qualityData;
    })
    .catch((error) => {
      ElMessage.warning("未获取水质沉积物数据！");
    });
};

const CreatureEvaluation = () => {
  if (!selectedEcological.value) return;
  tableData2.value = [];
  const params = {
    category: selectedButton.value,
    name: "",
    time: selectedEcological.value,
  };
  axios
    .post(window.VITE_APP_BASE_API + "/animal/getEvaReAll", params)
    .then((res) => {
      const data = res.data.data;
      tableData2.value = data.map((item) => ({
        Stations: item.name,
        Diversity: item.evaRe["多样性指数"],
        Uniformity: item.evaRe["均匀度"],
        Dominance: item.evaRe["优势度"],
        Richness: item.evaRe["丰富度"],
        threshold: item.evaRe["生物多样性指数阈值"],
        level: item.evaRe["多样性等级"],
      }));
    })
    .catch((error) => {
      ElMessage.warning("未获取生物多样性数据！");
    });
};
const onEcologicalChange = () => {
  showEchartsBox.value = false;
  morebox.value = false;
  OverallRating();
  WaterEvaluation();
  CreatureEvaluation();
};
const morebox = ref(false);
const selectedButton2 = ref("一类");
const selectButton2 = (button) => {
  selectedButton2.value = button;
  getmoretabledata();
};
const Seemore = () => {
  if (tableData.value.length === 0) {
    ElMessage.warning("水质沉积物数据为空，无法查看更多信息！");
    return;
  }
  morebox.value = !morebox.value;
  if (morebox.value) {
    getmoretabledata();
  }
};

const getmoretabledata = () => {
  const params = {
    time: selectedEcological.value,
    category: selectedButton2.value,
  };

  axios
    .post(window.VITE_APP_BASE_API + "/water/getExeStdByCategory", params)
    .then((res) => {
      const data = res.data.data;
      const formattedData = [];
      const rateData = {};
      let chartData = [["指标", "最小值", "最大值"]];

      for (const station in data) {
        if (station === "最小值" || station === "最大值") {
          const quality = data[station].quality;
          const sediment = data[station].sediment;

          for (const key in quality) {
            const row = chartData.find((row) => row[0] === key);
            if (row) {
              row[station === "最小值" ? 1 : 2] = quality[key];
            } else {
              const newRow = [
                key,
                station === "最小值" ? quality[key] : null,
                station === "最大值" ? quality[key] : null,
              ];
              chartData.push(newRow);
            }
          }
          for (const key in sediment) {
            const row = chartData.find((row) => row[0] === key);
            if (row) {
              row[station === "最小值" ? 1 : 2] = sediment[key];
            } else {
              const newRow = [
                key,
                station === "最小值" ? sediment[key] : null,
                station === "最大值" ? sediment[key] : null,
              ];
              chartData.push(newRow);
            }
          }
        }

        if (station !== "最小值" && station !== "最大值" && station !== "超标率") {
          const quality = data[station].quality;
          const sediment = data[station].sediment;

          formattedData.push({
            station: station,
            pH: quality.pH,
            DO: quality.DO,
            COD: quality.COD,
            inorganicNitrogen: quality["无机氮"],
            phosphate: quality["磷酸盐"],
            sulfur: sediment["硫化物"],
            organicCarbon: sediment["有机碳"],
          });
        }
      }
      // console.log(JSON.stringify(chartData));

      tableData3.value = formattedData;

      if (data["超标率"]) {
        for (const indicator in data["超标率"].quality) {
          rateData[indicator] = data["超标率"].quality[indicator];
        }
      }
      tableRateData.value = [rateData];
      initChart1(chartData);
    })
    .catch((error) => {
      console.error("数据获取失败:", error);
    });
};

const showDetail = (title) => {
  Clicktitle.value = title;
  detailTitle.value = title + "评价详情";
  getOverallRating();
};

let chartRef = ref(null);
let charts = [];
let initChart1 = (source) => {
  let fontSize = (document.body.clientHeight / 100) * 1.2;
  let chart = echarts.init(chartRef.value);
  charts.push(() => {
    chart.dispose();
    initChart1(source);
  });
  chart.setOption({
    dataset: {
      sourceHeader: true,
      source: source,
    },
    grid: {
      top: "15%",
      bottom: "3%",
      left: fontSize,
      right: "3%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      textStyle: {
        fontSize: fontSize * 1.2,
      },
      formatter: (params) => {
        if (!params.length) return "";
        const name = params[0].name;
        const minValue = params.find((item) => item.seriesName === "最小值")?.data[1];
        const maxValue = params.find((item) => item.seriesName === "最大值")?.data[2];

        return `
        数据名称：${name}<br>
        最小值：${minValue || "无"}<br>
        最大值：${maxValue || "无"}
      `;
      },
    },
    legend: {
      data: ["最小值", "最大值"],
      textStyle: {
        color: "#C5F1FF",
        fontSize: fontSize,
      },
      top: "1%",
      left: "center",
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
          fontSize,
        },
      },
    },
    yAxis: {
      name: "指数",
      nameTextStyle: {
        color: "#C5F1FF",
        fontSize,
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
          fontSize,
        },
      },
    },
    series: [
      {
        name: "最小值",
        type: "bar",
        itemStyle: {
          color: "#00FFFF",
        },
        encode: { x: 0, y: 1 },
      },
      {
        name: "最大值",
        type: "bar",
        itemStyle: {
          color: "#FF5733",
        },
        encode: { x: 0, y: 2 },
      },
    ],
  });
};

let chartRef2 = ref(null);

const initRadarChart = (data) => {
  let chart = echarts.init(chartRef2.value);
  charts.push(() => {
    chart.dispose();
    initRadarChart(data); // 重新初始化图表
  });

  const indicators = Object.keys(data).map(key => {
    let max = 40; // 默认最大值为40
    if (key == "污水排放量" || key == "养殖面积" || key == "干扰廊道" || key == "有害赤潮累积发生面积" || key == "围填海面积") {
      max = 20; // 如果是威胁因素，最大值为20
    }
    console.log(key);
    console.log(max);

    return {
      name: key,
      max: max
    };
  });

  const values = Object.values(data);

  chart.setOption({
    tooltip: {},
    radar: {
      name: {
        textStyle: {
          color: "#0ae7f8",
          fontSize: 18,
          borderRadius: 3,
          padding: [3, 5],
        },
      },
      indicator: indicators,
      splitLine: {
        lineStyle: {
          color: "#05396c",
        },
      },
      splitArea: {
        areaStyle: {
          color: ["#010e46", "#010e46"],
        },
      },
      axisLine: {
        lineStyle: {
          color: "#075994",
        },
      },
    },
    series: [
      {
        name: "统计",
        type: "radar",
        symbol: "circle",
        symbolSize: 10, // 增大点的大小
        data: [
          {
            value: values,
            name: "统计",
            lineStyle: {
              color: "#0a78b5",
            },
            itemStyle: {
              color: "#e0c92a",
              borderColor: "#065d95",
            },
            areaStyle: {
              // 使用渐变色
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, color: 'rgba(0, 255, 255, 0.8)'
                  },
                  {
                    offset: 1, color: 'rgba(63, 169, 245, 0.8)'
                  }
                ],
              },
              offset: 0.5,
            },
          },
        ],
      },
    ],
  });
};
// #00ffff   #3fa9f5   80%
let reloadChart = () => {
  charts.splice(-2).forEach((chart) => {
    chart();
  });
};
const myHandleResponseFunction = (data) => {
  const datajson = JSON.parse(data);
  if (datajson.Function === "报错") {
    ElMessage({
      message: datajson.Type,
      type: "warning",
    });
    return;
  }
};

onMounted(() => {
  getTime();
  addResponseEventListener("handle_responses", myHandleResponseFunction);
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
  width: 33vh;
  height: 88vh;
  background-image: url("../../assets/img/rightbox.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1vh;
  box-sizing: border-box;
}

.rightBox {
  position: absolute;
  right: 2.4vh;
  top: 10vh;
  width: 33vh;
  height: 88vh;
  background-image: url("../../assets/img/rightbox.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1vh;
  box-sizing: border-box;
}

.rightBox-top {
  width: 100%;
  /* height: 41.25vh; */
  height: 23.25vh;
}

.rightBox-top-right {
  width: 100%;
  max-height: 58.5vh;
  overflow-y: auto;
}

.rightBox-middle-right {
  width: 100%;
  color: #b7cffc;
}

.rightBox-top-right p {
  text-indent: 3.2ch;
  /* 每段行缩进2个字符 */
  margin-bottom: 0.1em;
  font-size: 1.5vh;
  line-height: 2.3vh;
  color: #e9faff;
}

.rightBox-middle-right p {
  text-indent: 3.2ch;
  /* 每段行缩进2个字符 */
  margin-bottom: 0.1em;
  font-size: 1.5vh;
  line-height: 2.1vh;
  color: #e9faff;
}

.rightBox-top-title,
.rightBox-bottom-title {
  width: 100%;
  height: 3vh;
  background-image: url("../../assets/img/rightboxtitle.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #ffffff;
  font-size: 1.6vh;
  font-weight: bold;
  line-height: 3vh;
  padding-left: 3vh;
  box-sizing: border-box;
  position: relative;
}

.rightBox-top-table {
  height: 50vh;
  margin: 1vh 0;
  background-image: url("../../assets/img/图层 62.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.5vh 1vh;
}

.rightBox-bottom-table {
  height: 26.5vh;
  margin: 1vh 0;
  background-image: url("../../assets/img/图层 42.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0.5vh 1vh;
}

.leftBox-top-table {
  margin: 1vh 0;
  /* height: 36vh; */
  height: 16.25vh;
}

.leftBox-bottom-table {
  margin: 1vh 0;
  height: 16.25vh;
}

.leftBox-middle2-content {
  margin: 1vh 0;
  /* height: 16.5vh; */
  height: 27.5vh;
}

.leftBox-bottom-content {
  margin: 1vh 0;
  /* height: 19vh; */
  height: 27.5vh;
}

.lefttopbox {
  margin-top: 1.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lefttopbox-item {
  width: 8vh;
  height: 8vh;
  color: white;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.lefttopbox-item:nth-child(1) {
  background-image: url("../../assets/img/leftblue.png");
}

.lefttopbox-item:nth-child(2) {
  background-image: url("../../assets/img/middlegreen.png");
}

.lefttopbox-item:nth-child(3) {
  background-image: url("../../assets/img/rightgreen.png");
}

.lefttopbox2 {
  margin-top: 2vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lefttopbox-item2 {
  width: 14vh;
  height: 7vh;
  color: white;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lefttopbox-item2:nth-child(1) {
  background-image: url("../../assets/img/left2box (2).png");
}

.lefttopbox-item2:nth-child(2) {
  background-image: url("../../assets/img/left2box (1).png");
}

::-webkit-scrollbar-track {
  background: #084077;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(0, #6bebff 0%, #0071bc 100%);
}

.selectbox {
  position: absolute;
  right: 50%;
  transform: translateX(50%);
  top: 10vh;
  z-index: 3;
}

:deep(.ant-select-selector) {
  background-color: unset !important;
  border: 1px solid rgb(59, 99, 187) !important;
  color: #fff !important;
  font-size: 1.4vh;
  background-image: url("../../assets/img/back-btn.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

:deep(.ant-select-arrow) {
  color: white;
}

:deep(.el-table__body-wrapper) {
  font-size: 1.1vh;
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

:deep(.el-table__row) {
  color: white;
}

:deep(.el-table__row:nth-child(odd)) {
  background: url("../../assets/img/osi-item2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

:deep(.el-table__row:nth-child(even)) {
  background: url("../../assets/img/osi-item3.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

:deep(.el-table__row:hover) {
  background: url("../../assets/img/osi-item4.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
  padding: 0 0.5vh;
}

:deep(.el-table thead) {
  color: #00ffff;
}

:deep(.el-scrollbar__thumb) {
  background: linear-gradient(0, #6bebff 0%, #0071bc 100%);
}

.moretable {
  width: 2.5vh;
  height: 2.5vh;
  background-image: url("../../assets/img/moretable.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 1vh;
  top: 0.2vh;
  cursor: pointer;
}

.tablebtn-box {
  display: flex;
  justify-content: space-evenly;
}

.tablebtn {
  width: 8vh;
  height: 3vh;
  background-image: url("../../assets/img/button-bt.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: white;
  font-size: 1.4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-image 0.3s;
}

.tablebtn.active {
  background-image: url("../../assets/img/button-at.png");
}

.morebox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vh;
  height: 65vh;
  background-image: url("../../assets/img/morebox.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.close {
  width: 2vh;
  height: 2vh;
  background-image: url("../../assets/img/close2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: 2vh;
  right: 1vh;
  cursor: pointer;
}

.moreboxtitle {
  width: 100%;
  height: 6vh;
  color: white;
  line-height: 6vh;
  font-size: 1.8vh;
  font-weight: bold;
  margin-left: 4vh;
}

.nexttitle {
  width: 100%;
  text-align: center;
  padding: 1vh;
  color: white;
  font-size: 1.8vh;
  font-weight: bold;
}

.chart {
  width: 85vh;
  height: 25vh;
}

.viewbox {
  width: 85vh;
  height: 85vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0071bc;
  z-index: 6;
}

.echartsBox {
  width: 85vh;
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url("../../assets/img/step/adddata2.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.echartsBox-title {
  width: 100%;
  height: 5vh;
  line-height: 5vh;
  font-size: 1.8vh;
  font-weight: bold;
  color: white;
  padding-left: 3vh;
  margin-top: 0.7vh;
}

.echartsBox-close {
  position: absolute;
  right: 1.5vh;
  top: 1.5vh;
  cursor: pointer;
  width: 2vh;
  height: 2vh;
}

.echartsBox-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65vh;
  padding: 1.5vh;
  box-sizing: border-box;
}

.echartsBox-right {
  width: 80vh;
  height: 65vh;
}
</style>

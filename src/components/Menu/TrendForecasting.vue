<template>
    <div class="rightbox">
        <div class="rightbox-middle">
            <div class="rightbox-middle-content">
                <div class="rightBox-top-title-dialog">
                    情景选择
                </div>
                <div style="margin-top: 1vh;margin-bottom: 1vh;">
                    <el-radio-group v-model="radio" style="display: flex;justify-content: center;align-items: center;"
                        @change="changeRadio">
                        <el-radio value="浒苔情景">浒苔情景</el-radio>
                        <el-radio value="陆源污染情景">陆源污染情景</el-radio>
                    </el-radio-group>
                </div>
                <div class="rightBox-top-title-dialog">
                    参数名称
                </div>
                <div class="rightbox-table">
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <td>{{ tablehead }}</td>
                                <td><el-input v-model="tabledata" /></td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td>{{ tablehead2 }}</td>
                                <td><el-input v-model="tabledata2" /></td>
                            </tr>
                        </thead>
                    </table>
                    <div>
                        <el-button class="buttonstyles" type="primary" @click="drive">驱动模型</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="left-button" v-if="showselect">
        <FunctionMenu :functionData="layerFunction" :defaultSelect="false" :Multiple="false"
            @functionSelected="handleFunctionSelection" />
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
                    style="position: relative; z-index: 1; width: 1560px" @change="gettimePlay">
                </el-slider>
            </div>
        </div>
    </div>
    <!-- 右下角选择 -->
    <div class="right-select" v-if="showselect">
        <!-- <div class="top-leftbox-middle-content-div-2">
            <div class="top-leftbox-middle-content-div-2-content">
                <div class="color-bar-one">
                    <a-slider v-model:value="Zaxis" vertical :reverse="true" @change="getZaxis" :min="0" :max="20"
                        :step="1" tooltipPlacement="top" />
                </div>
                <span class="top-leftbox-middle-content-div-2-span">层级</span>
            </div>
            <div class="top-leftbox-middle-content-div-2-content">
                <div class="color-bar-two">
                    <a-slider v-model:value="threshold" vertical :reverse="true" @change="getthreshold" :min="0"
                        :max="1" :step="0.01" tooltipPlacement="top" />
                </div>
                <span class="top-leftbox-middle-content-div-2-span">特征范围</span>
            </div>
        </div> -->
        <el-checkbox-group v-model="selectvalue" @change="selectchange" class="checkbox-group">
            <el-checkbox label="水面表层" value="水面表层0级" />
            <el-checkbox label="水面中上层" value="水面表层1级" />
            <el-checkbox label="水面中层" value="水面表层2级" />
            <el-checkbox label="水面中下层" value="水面表层3级" />
            <el-checkbox label="水面底层" value="水面表层4级" />
        </el-checkbox-group>
    </div>
    <!-- 右上角查询表格 -->
    <div class="smallWindow" v-if="showSmallWindow">
        <img src="../../assets/img/close.png" alt="" class="close" @click="close">
        <table class="custom-table2">
            <thead>
                <tr>
                    <td>数据值</td>
                    <td>{{ Datavar }}</td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <td>类型</td>
                    <td>{{ Datatype }}</td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <td>时间</td>
                    <td>{{ Datatime }}</td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <td>层级</td>
                    <td>{{ layer }}</td>
                </tr>
            </thead>
        </table>
    </div>
    <!-- 右下角颜色条 -->
    <div class="right-button" v-if="showselect">
        <div class="leftbar">{{ barType }}</div>
        <div class="rightbar">
            <span>{{ barMin }}</span>
            <span>{{ barMax }}</span>
        </div>
    </div>
    <!-- 图表弹窗 -->
    <el-button class="elbutton" type="primary" v-if="showselect" @click="handlechart">查看数据</el-button>
    <div class="fishecharts" v-if="showChart">
        <img src="../../assets/img/close.png" alt="" class="close2" @click="showChart = false">
        <div class="chartcontent" ref="chartcontent"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import FunctionMenu from '../Common/FunctionMenu.vue'
import dayjs from 'dayjs'
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
import axios from "axios";

const showChart = ref(false);
const chartcontent = ref(null);
const radioEng = ref(null);
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const handlechart = () => {
    showChart.value = true;
    if (radioselection.value == '浒苔情景') {
        radioEng.value = 'Hutai';
    } else if (radioselection.value == '陆源污染情景') {
        radioEng.value = 'HighRiver';
    }
    axios.get(window.VITE_APP_BASE_API + `/biomass/getAllBTP/${radioEng.value}`).then((res) => {
        const btpLineList = res.data.data.btpLineList;
        initChart(btpLineList);
    });
};

const radio = ref('浒苔情景');
const tablehead = ref('浒苔面积（㎡）');
const tablehead2 = ref('浒苔生物量（kg/㎡）');
const tabledata = ref(218300);
const tabledata2 = ref(2);
const radioselection = ref('浒苔情景');
const changeRadio = (e) => {
    radioselection.value = e;
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    const currentSelectValues = Array.from(selectvalue.value);
    if (e == '浒苔情景') {
        tablehead.value = '浒苔面积（㎡）'
        tablehead2.value = '浒苔生物量（kg/㎡）'
        tabledata.value = 218300;
        tabledata2.value = 2;
    } else {
        tablehead.value = '无机氮（mg/m³）'
        tablehead2.value = '无机磷（mg/m³）'
        tabledata.value = 200;
        tabledata2.value = 100;
    }
    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionName: radioselection.value,
        State: true,
        Time: formattedTime,
        Type: selectedItemname.value,
        Layer: currentSelectValues,
    });
    // console.log({
    //     ModuleName: `趋势预测`,
    //     FunctionName: e,
    //     State: true,
    //     Time: formattedTime,
    //     Type: selectedItemname.value,
    //     Layer: currentSelectValues,
    // });
}
const layerFunction = ref([]);
const drive = () => {
    if (tabledata.value == '' || tabledata2.value == '') {
        ElMessage.warning('请输入数据');
        return;
    } else {
        showselect.value = true;
        // 根据选中的情景设置 layerFunction
        if (radioselection.value === '浒苔情景') {
            layerFunction.value = [
                {
                    name: "浮游动物碳",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游动物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游动物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "浮游植物碳",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "叶绿素a",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游动物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游动物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "硝酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "铵盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物磷.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物磷-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "磷酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物氮.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物氮-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "硅酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/叶绿素.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/叶绿素-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "溶解氧",
                    check: false,
                    image: new URL(
                        "../../assets/img/溶解氧.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/溶解氧-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "碎屑碳",
                    check: false,
                    image: new URL(
                        "../../assets/img/溶解氧.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/溶解氧-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "半滑舌鳎",
                    check: false,
                    image: new URL(
                        "../../assets/img/溶解氧.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/溶解氧-active.png",
                        import.meta.url
                    ).href,
                }
            ];
        } else if (radioselection.value === '陆源污染情景') {
            layerFunction.value = [
                {
                    name: "浮游动物碳",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游动物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游动物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "浮游植物碳",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "叶绿素a",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游动物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游动物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "硝酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物碳.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物碳-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "铵盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物磷.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物磷-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "磷酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/浮游植物氮.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/浮游植物氮-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "硅酸盐",
                    check: false,
                    image: new URL(
                        "../../assets/img/叶绿素.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/叶绿素-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "溶解氧",
                    check: false,
                    image: new URL(
                        "../../assets/img/溶解氧.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/溶解氧-active.png",
                        import.meta.url
                    ).href,
                },
                {
                    name: "半滑舌鳎",
                    check: false,
                    image: new URL(
                        "../../assets/img/溶解氧.png",
                        import.meta.url
                    ).href,
                    imageActive: new URL(
                        "../../assets/img/溶解氧-active.png",
                        import.meta.url
                    ).href,
                }
            ];
        }
    }
}
const selectedItemname = ref(null);

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
        left = (progress / length) * 95;
    return {
        paddingLeft: `${left}%`,
    };
});

const adjustedStyle = computed(() => {
    const baseStyle = style.value;
    const divWidth = 125; // 计算宽度为125px
    const totalWidth = 1560;
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
        const currentSelectValues = Array.from(selectvalue.value);  // 恢复
        if (selectedItemname.value !== null) {
            callUIInteraction({
                ModuleName: `趋势预测`,
                // FunctionMenu: '要素切换',
                Time: formattedTime,
                Type: selectedItemname.value,
                FunctionName: radioselection.value,
                State: true,
                Layer: currentSelectValues,
            });
            // console.log({
            //     ModuleName: `趋势预测`,
            //     // FunctionMenu: '要素切换',
            //     Time: formattedTime,
            //     Type: selectedItemname.value,
            //     FunctionName: `标量场可视化`,
            //     State: true,
            //     Layer: currentSelectValues,
            // });
        }
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

const showselect = ref(false);
const handleFunctionSelection = (selectedItem) => {
    selectedItemname.value = selectedItem.name;
    if (timePlay.value == null) {
        timePlay.value = sessionStorage.getItem('timePlay');
    }
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    const currentSelectValues = Array.from(selectvalue.value);
    callUIInteraction({
        ModuleName: `趋势预测`,
        // FunctionMenu: '要素切换',
        Time: formattedTime,
        Type: selectedItem.name,
        FunctionName: radioselection.value,
        State: true,
        Layer: currentSelectValues,
    });
    // console.log({
    //     ModuleName: `趋势预测`,
    //     // FunctionMenu: '要素切换',
    //     Time: formattedTime,
    //     Type: selectedItem.name,
    //     FunctionName: radioselection.value,
    //     State: true,
    //     Layer: currentSelectValues,
    // });
};
const barType = ref(null);
const barMin = ref(0);
const barMax = ref(0);
const Datavar = ref(null);
const Datatype = ref(null);
const Datatime = ref(null);
const layer = ref(null);
const showSmallWindow = ref(false);
const close = () => {
    showSmallWindow.value = false;
};
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
        barType.value = datajson.Data.Type;
        barMin.value = datajson.Data.NorMin;
        barMax.value = datajson.Data.NorMax;
    } else if (datajson.Function === '点击查询') {
        showSmallWindow.value = true;
        Datavar.value = datajson.Data.var;
        Datatype.value = datajson.Data.type;
        Datatime.value = datajson.Data.time;
        layer.value = datajson.Data.layer;
    } else {

    }
}
// const Zaxis = ref(0);
// const threshold = ref(0);
// // 多层
// const getZaxis = (e) => {
//     callUIInteraction({
//         ModuleName: `趋势预测`,
//         FunctionMenu: "多层剖切",
//         Value:e
//     });
// };
// // 特征
// const getthreshold = (e) => {
//     callUIInteraction({
//         ModuleName: `趋势预测`,
//         FunctionMenu: "特征阈值",
//         Value:e
//     });
// };
// 多选
const selectvalue = ref([
    "水面表层0级",
    "水面表层1级",
    "水面表层2级",
    "水面表层3级",
    "水面表层4级"
]);

const selectchange = (selectedValues) => {
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionName: radioselection.value,
        State: true,
        Time: formattedTime,
        Layer: selectedValues, // 传递选中的值
        Type: selectedItemname.value
    });
    // console.log({
    //     ModuleName: `趋势预测`,
    //     FunctionName: radioselection.value,
    //     State: true,
    //     Time: formattedTime,
    //     Layer: selectedValues, // 传递选中的值
    //     Type: selectedItemname.value
    // });
}
const charts = [];
let initChart = (source) => {
    let chart = echarts.init(chartcontent.value);
    charts.push(() => {
        chart.dispose();
        initChart(source);
    });

    const seriesData = source.map(item => ({
        name: item.name,
        type: 'line',
        data: item.data,
        itemStyle: {
            color: getRandomColor() // 随机颜色
        },
        areaStyle: {
            color: 'rgba(0, 176, 255, 0.3)'
        }
    }));

    // 获取x轴的标签
    const xAxisData = source[0].data.map((_, index) => `时段 ${index + 1}`);

    chart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            textStyle: {
                color: '#CFEFFF' // 设置图例文字颜色
            },
            padding: [10, 20] // 增加上下左右的边距
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                color: '#CFEFFF'
            },
            axisLine: {
                lineStyle: {
                    color: '#CFEFFF'
                }
            }
        },
        yAxis: {
            type: 'value',
            // name: '面积 (km²)',
            axisLabel: {
                color: '#CFEFFF'
            },
            axisLine: {
                lineStyle: {
                    color: '#CFEFFF'
                }
            },
            splitLine: {
                show: true, // 显示分割线
                lineStyle: {
                    color: 'rgba(207, 239, 255, 0.5)', // 设置线的颜色为浅色
                    type: 'dashed' // 设置为虚线
                }
            }
        },
        grid: {
            left: '5%',
            right: '4%',
            bottom: '5%',
            top: '28%'
        },
        series: seriesData
    });
};

const reloadChart = () => {
    charts.forEach((chart) => chart());
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
    addResponseEventListener("handle_responses", myHandleResponseFunction);
    window.addEventListener("resize", reloadChart);
});
onUnmounted(() => {
    window.removeEventListener("resize", reloadChart);
});
</script>

<style scoped>
.left-button {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
}

.bottomCalendar {
    position: absolute;
    bottom: 3.5vh;
    right: 3vh;
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
    width: 89%;
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
    left: 0.8%;
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

.right-button {
    width: 15%;
    height: 2vh;
    display: flex;
    position: absolute;
    bottom: 11vh;
    right: 2.4vh;
    z-index: 3;
}

.leftbar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 0.5vh;
    border-bottom-left-radius: 0.5vh;
    width: 18%;
    background-color: #FFFFFF;
    font-size: 1.6vh;
}

.rightbar {
    width: 82%;
    border-top-right-radius: 0.5vh;
    border-bottom-right-radius: 0.5vh;
    background-image: url('../../assets/img/colorbar.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    font-size: 1.6vh;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: 0 1vh;
    box-sizing: border-box;
    justify-content: space-between;
}

.smallWindow {
    position: absolute;
    right: 2.4vh;
    top: 42vh;
    width: 40vh;
    height: 22vh;
    z-index: 10;
    background-image: url('../../assets/img/资源 71.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
}

.custom-table {
    border-collapse: collapse;
    width: 90%;
    color: #b7cffc;
    margin-top: 1vh;
    z-index: 3;
}

.custom-table th,
.custom-table td {
    border: 0.2vh solid #416491;
    padding: 0.8vh;
    text-align: center;
    height: 3vh;
    width: 50%;
}

.custom-table2 {
    border-collapse: collapse;
    width: 90%;
    color: #b7cffc;
    margin-top: 1vh;
    z-index: 3;
}

.custom-table2 th,
.custom-table2 td {
    border: 0.2vh solid #416491;
    padding: 0.8vh;
    text-align: center;
    height: 3vh;
    width: 50%;
}

.right-select {
    position: absolute;
    bottom: 14.5vh;
    right: 2.4vh;
    z-index: 3;
    background-image: url('../../assets/img/rightbox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 15vh;
    height: 18vh;
    padding: 1vh 0vh 1vh 2.5vh;
    box-sizing: border-box;
}

/* .right-select {
    position: absolute;
    bottom: 15.5vh;
    right: 2.4vh;
    z-index: 3;
    background-image: url('../../assets/img/rightbox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 16vh;
    height: 25vh;
    padding: 1vh;
    box-sizing: border-box;
} */

:deep(.el-checkbox) {
    color: #b7cffc;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
    color: #b7cffc;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    /* 竖直排列 */
}

:deep(.el-select__wrapper) {
    border-radius: 0;
}

.close {
    cursor: pointer;
    width: 2.5vh;
    position: absolute;
    right: 0.5vh;
    top: 0.5vh;
}

.close2 {
    cursor: pointer;
    width: 2.5vh;
    position: absolute;
    right: 1.5vh;
    top: 0.5vh;
    z-index: 20;
}

.top-leftbox-middle-content-div-2 {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 22vh;
    color: #b7cffc;
}

.top-leftbox-middle-content-2-span {
    width: 100%;
    height: 5vh;
    line-height: 6vh;
    padding-left: 1vh;
    font-size: 2vh;
    display: block;
    font-family: YouSheBiaoTiHei;
    box-sizing: border-box;
}

.top-leftbox-middle-content-div-2-content {
    width: 9vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5vh;
}

.color-bar-one {
    height: 15vh;
    margin-bottom: 2.5vh;
}

.color-bar-two {
    height: 15vh;
    margin-bottom: 2.5vh;
}

.rightbox {
    position: absolute;
    top: 7vh;
    right: 2.4vh;
    z-index: 3;
}

.rightbox-middle {
    width: 40vh;
    height: 32.5vh;
    background-image: url("../../assets/img/框-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 2vh;
    padding: 2vh;
    box-sizing: border-box;
    color: #b7cffc;
}

:deep(.el-radio.el-radio--large) {
    height: auto;
}

:deep(.el-radio.el-radio--large .el-radio__label) {
    color: #b7cffc;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: #0a6adf;
    background: #0a6adf;
}

:deep(.el-radio__inner) {
    border: none;
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

.rightbox-table {
    margin-top: 1vh;
}

.custom-table {
    border-collapse: collapse;
    width: 100%;
}

.custom-table th,
.custom-table td {
    border: 0.1vh solid #416491;
    padding: 0.8vh;
    text-align: center;
    height: 4vh;
    width: 50%;
}

.buttonstyles {
    margin-top: 2vh;
    margin-left: 37vh;
    border-radius: 0;
    background-color: #0a6adf;
    border: 0;
    position: absolute;
    right: 2vh;
    bottom: 2.4vh;
}

:deep(.el-radio__label) {
    color: #b7cffc;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: #b7cffc;
}

:deep(.el-input__wrapper) {
    border-radius: 0;
}

.fishecharts {
    width: 110vh;
    height: 45vh;
    z-index: 3;
    position: absolute;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
    background-image: url("../../assets/img/框-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1.5vh;
    box-sizing: border-box;
}

.chartcontent {
    width: 107vh;
    height: 42vh;
}

.elbutton {
    position: absolute;
    z-index: 4;
    bottom: 15vh;
    right: 20vh;
}
</style>
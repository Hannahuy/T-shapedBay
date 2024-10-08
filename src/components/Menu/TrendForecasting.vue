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
            <el-checkbox label="水面表层0级" value="水面表层0级" />
            <el-checkbox label="水面表层1级" value="水面表层1级" />
            <el-checkbox label="水面表层2级" value="水面表层2级" />
            <el-checkbox label="水面表层3级" value="水面表层3级" />
            <el-checkbox label="水面表层4级" value="水面表层4级" />
        </el-checkbox-group>
    </div>
    <!-- 右下角颜色条 -->
    <div class="right-button" v-if="showselect">
        <div class="leftbar">{{ barType }}</div>
        <div class="rightbar">
            <span>{{ barMin }}</span>
            <span>{{ barMax }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import FunctionMenu from '../Common/FunctionMenu.vue'
import dayjs from 'dayjs'
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';

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
const drive = () => {
    if (tabledata.value == '' || tabledata2.value == '') {
        ElMessage.warning('请输入数据');
        return
    } else {
        showselect.value = true;
    }
}

const selectedItemname = ref(null);

let layerFunction = [
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
    }
]

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
            sessionStorage.setItem('timePlay', formattedTime);
        }
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
const myHandleResponseFunction = (data) => {
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

onMounted(() => {
    const storedTime = sessionStorage.getItem('timePlay');
    if (storedTime) {
        timePlay.value = dayjs(storedTime).valueOf(); // 从 sessionStorage 获取值
    } else {
        timePlay.value = dayjs('2024-08-01 00:00:00').valueOf(); // 默认值
    }
    addResponseEventListener("handle_responses", myHandleResponseFunction);
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
    top: 12vh;
    width: 40vh;
    height: 25vh;
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
    top: 10vh;
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
</style>
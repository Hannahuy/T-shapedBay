<template>
    <div class="leftbox">
        <div class="leftbox-middle">
            <div class="leftbox-middle-content">
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
                <div class="leftbox-table">
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
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs'
const radio = ref('浒苔情景');
const tablehead = ref('浒苔面积（㎡）');
const tablehead2 = ref('浒苔生物量（kg/㎡）');
const tabledata = ref('');
const tabledata2 = ref('');
const changeRadio = (e) => {
    if (e == '浒苔情景') {
        tablehead.value = '浒苔面积（㎡）'
        tablehead2.value = '浒苔生物量（kg/㎡）'
    } else {
        tablehead.value = '无机氮（mg/m³）'
        tablehead2.value = '无机磷（mg/m³）'
    }
}
const drive = () => {
    if (tabledata.value == '' || tabledata2.value == '') {
        ElMessage.warning('请输入数据');
        return
    } else {

    }
}

const timePick = ref(dayjs("2024-08-01").toDate());
const timePlay = ref(null);
const activePlay = ref("");
// 暂停/播放
let previousPlayState = null;
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
            ModuleName: `趋势预测`,
            FunctionMenu: '时间轴',
            Time: formattedTime,
        });
        // console.log('趋势预测', formattedTime, selectedItemname.value, '333333333333333333333');
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
onMounted(() => {
    const storedTime = sessionStorage.getItem('timePlay');
    if (storedTime) {
        timePlay.value = dayjs(storedTime).valueOf(); // 从 sessionStorage 获取值
    } else {
        timePlay.value = dayjs('2024-08-01 00:00:00').valueOf(); // 默认值
    }
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionMenu: '时间轴',
        Time: formattedTime,
    });
    // console.log(`趋势预测`, formattedTime, selectedItemname.value, '444444444444444444');
});
</script>

<style scoped>
.leftbox {
    position: absolute;
    top: 10vh;
    left: 2.4vh;
    z-index: 3;
}

.leftbox-middle {
    width: 40vh;
    height: 33.8vh;
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

.leftbox-table {
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
</style>
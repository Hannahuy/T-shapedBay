<template>
    <div class="bottombox-left2">
        <div class="bottombox-button2">
            <el-button type="primary" class="bottombox-play2" :class="{ active: activePlay2 === 'play' }"
                @click="togglePlay2"></el-button>
        </div>
        <div class="bottombox2">
            <div class="bottombox-slider2">
                <div :style="adjustedStyle2">
                    <span class="bottombox-slider2-span">{{ formattedTime2 }}</span>
                </div>
                <el-slider :step="1" v-model="timePlay2" :show-tooltip="false" :min="min2" :max="max2" :marks="marks2"
                    style="position: relative; z-index: 1;" @change="gettimePlay2">
                </el-slider>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
const timePlay2 = ref(null);
const activePlay2 = ref("");
const selectedItemname = ref(null);
const min2 = ref(2024);
const max2 = ref(2053);
// 暂停/播放
let previousPlayState2 = null;
let intervalTime2 = null;
let playInterval2 = null;
const togglePlay2 = () => {
    intervalTime2 = 400;
    previousPlayState2 = activePlay2.value;
    activePlay2.value = activePlay2.value === "play" ? "" : "play";

    if (activePlay2.value === "play") {
        if (timePlay2.value === null) {
            timePlay2.value = min2.value;
        }

        playInterval2 = setInterval(() => {
            timePlay2.value++;
            if (timePlay2.value >= max2.value) {
                clearInterval(playInterval2);
                activePlay2.value = "";
            }
        }, intervalTime2);
    } else {
        clearInterval(playInterval2);
    }
};

const formattedTime2 = computed(() => {
    const time = timePlay2.value;
    return time;
});

const style2 = computed(() => {
    const length = max2.value - min2.value,
        progress = timePlay2.value - min2.value,
        left = (progress / length) * 95;
    return {
        paddingLeft: `${left}%`,
    };
});

const adjustedStyle2 = computed(() => {
    const baseStyle = style2.value;
    const divWidth = 62;
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
const marks2 = computed(() => {
    const marks = {};
    const startYear = 2024;
    const endYear = 2053;

    for (let year = startYear; year <= endYear; year++) {
        marks[year] = {
            style: {
                color: '#ffffff'
            },
            label: year.toString()
        };
    }

    return marks;
});

watch(timePlay2, (newVal) => {
    if (selectedItemname.value !== null) {
        callUIInteraction({
            ModuleName: `趋势预测`,
            Time: newVal,
            Type: selectedItemname.value,
            FunctionName: radioselection.value,
            State: true,
        });
    }
});
// 监听时间轴
const gettimePlay2 = () => {
    if (activePlay2.value === "play") {
        activePlay2.value = "";
    }
}
onMounted(() => {
    timePlay2.value = 2024;
});
</script>

<style scoped>
.bottombox-left2 {
    width: 96%;
    height: 6vh;
    background-image: url('../../assets/img/timebackground.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 1.5vh;
    margin-left: 1.5vh;
    z-index: 10;
}

.bottombox2 {
    padding: 0 3vh 0 9.3vh;
    position: absolute;
    bottom: 1vh;
    box-sizing: border-box;
    display: flex;
    z-index: 5;
}

.bottombox-button2 {
    position: absolute;
    bottom: 1vh;
    left: 0.76%;
    display: flex;
    align-items: center;
    z-index: 10;
}

.bottombox-play2 {
    background-image: url("../../assets/img/Timeout.png");
    background-repeat: no-repeat;
    background-color: transparent;
    background-position: 55% 50%;
    border-radius: 100%;
    border: 0;
    width: 4vh;
    height: 4vh;
}

.bottombox-play2.active {
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

.bottombox-slider2 {
    width: 89.5vw;
}

.bottombox-slider2-span {
    width: 6.5vh;
    background-color: #42aeff;
    border-radius: 1.25rem;
    color: white;
    display: block;
    text-align: center;
    font-size: 1.4vh;
}

.bottombox-slider2 :deep(.el-slider__button) {
    background-color: transparent;
    border: 0;
}

.bottombox-slider2 :deep(.el-slider__bar) {
    background: linear-gradient(to right, #0088ff, #00f2fe);
    /* 渐变蓝色 */
}

.bottombox-slider2 :deep(.el-slider__marks-text) {
    color: white !important;
}
</style>
<template>
    <div class="left-button">
        <FunctionMenu :functionData="layerFunction" :Multiple="false" @functionSelected="handleFunctionSelection" />
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
    <div class="right-select" v-show="showselect">
        <el-checkbox-group v-model="selectvalue" @change="selectchange" class="checkbox-group">
            <el-checkbox label="水面表层0级" value="水面表层0级" />
            <el-checkbox label="水面表层1级" value="水面表层1级" />
            <el-checkbox label="水面表层2级" value="水面表层2级" />
            <el-checkbox label="水面表层3级" value="水面表层3级" />
            <el-checkbox label="水面表层4级" value="水面表层4级" />
        </el-checkbox-group>
    </div>
    <!-- 右下角颜色条 -->
    <div class="right-button">
        <div class="leftbar">{{ barType }}</div>
        <div class="rightbar">
            <span>{{ barMin }}</span>
            <span>{{ barMax }}</span>
        </div>
    </div>
    <!-- 右上角查询表格 -->
    <div class="smallWindow" v-if="showSmallWindow">
        <img src="../../assets/img/close.png" alt="" class="close" @click="close">
        <table class="custom-table">
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
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import FunctionMenu from '../Common/FunctionMenu.vue'
import dayjs from 'dayjs'
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';

const selectedItemname = ref(null);

let layerFunction = [
    {
        name: "水位",
        check: false,
        image: new URL(
            "../../assets/img/水位.png",
            import.meta.url
        ).href,
        imageActive: new URL(
            "../../assets/img/水位-active.png",
            import.meta.url
        ).href,
    },
    {
        name: "流速",
        check: false,
        image: new URL(
            "../../assets/img/流速.png",
            import.meta.url
        ).href,
        imageActive: new URL(
            "../../assets/img/流速-active.png",
            import.meta.url
        ).href,
    },
    {
        name: "浮游动物碳",
        check: true,
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
        name: "浮游植物磷",
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
        name: "浮游植物氮",
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
        name: "叶绿素",
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
        name: "初级生产力",
        check: false,
        image: new URL(
            "../../assets/img/初级生产力.png",
            import.meta.url
        ).href,
        imageActive: new URL(
            "../../assets/img/初级生产力-active.png",
            import.meta.url
        ).href,
    },
    {
        name: "无机磷",
        check: false,
        image: new URL(
            "../../assets/img/无机磷.png",
            import.meta.url
        ).href,
        imageActive: new URL(
            "../../assets/img/无机磷-active.png",
            import.meta.url
        ).href,
    },
    {
        name: "无机氮",
        check: false,
        image: new URL(
            "../../assets/img/无机氮.png",
            import.meta.url
        ).href,
        imageActive: new URL(
            "../../assets/img/无机氮-active.png",
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
            Layer: selectvalue.value,
            Type: selectedItemname.value
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
const selectvalue = ref([
    "水面表层0级",
    "水面表层1级",
    "水面表层2级",
    "水面表层3级",
    "水面表层4级"
]);

const showselect = ref(true);
const handleFunctionSelection = (selectedItem) => {
    selectedItemname.value = selectedItem.name;
    showselect.value = selectedItem.name !== "水位";
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
        ModuleName: `生态动力`,
        FunctionName: `标量场可视化`,
        State: true,
        Time: formattedTime,
        Layer: selectvalue.value,
        Type: selectedItem.name
    });
    // console.log('生态动力', `标量场可视化`, true, formattedTime, selectvalue.value, selectedItem.name);
};
const selectchange = (selectedValues) => {
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
        ModuleName: `生态动力`,
        FunctionName: `标量场可视化`,
        State: true,
        Time: formattedTime,
        Layer: selectedValues, // 传递选中的值
        Type: selectedItemname.value
    });
    // console.log('生态动力', `标量场可视化`, true, formattedTime, selectedValues, selectedItemname.value);
}
const showSmallWindow = ref(false);
const barType = ref(null);
const barMin = ref(0);
const barMax = ref(0);
const Datavar = ref(null);
const Datatype = ref(null);
const Datatime = ref(null);
const layer = ref(null);
const close = () => {
    showSmallWindow.value = false;
};
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
        showSmallWindow.value = true;
        Datavar.value = datajson.Data.var;
        Datatype.value = datajson.Data.type;
        Datatime.value = datajson.Data.time;
        layer.value = datajson.Data.layer;
    } else {

    }
}

onMounted(() => {
    const storedTime = sessionStorage.getItem('timePlay');
    if (storedTime) {
        timePlay.value = dayjs(storedTime).valueOf(); // 从 sessionStorage 获取值
    } else {
        timePlay.value = dayjs('2023-08-21 06:00:00').valueOf(); // 默认值
    }
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    callUIInteraction({
        ModuleName: `生态动力`,
        FunctionName: `标量场可视化`,
        State: true,
        Time: formattedTime,
        Layer: selectvalue.value,
        Type: selectedItemname.value
    });
    // console.log('生态动力',`标量场可视化`,true,formattedTime, selectvalue.value,selectedItemname.value);
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
</style>
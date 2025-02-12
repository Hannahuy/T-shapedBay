<template>
    <div class="rightbox">
        <div class="rightbox-middle">
            <div class="rightbox-middle-content">
                <div class="rightBox-top-title-dialog">
                    情景选择
                </div>
                <div class="radiobox-container">
                    <div class="radiobox" :class="{ active: selectedButton === '浒苔情景' }" @click="selectButton('浒苔情景')">浒苔情景
                    </div>
                    <div class="radiobox" :class="{ active: selectedButton === '陆源污染情景' }" @click="selectButton('陆源污染情景')">
                        陆源污染情景</div>
                </div>
                <div class="rightBox-top-title-dialog">
                    参数名称
                </div>
                <div class="rightbox-table">
                    <div class="rightbox-table1">
                        <div class="rightbox-tabletitle">{{ tablehead }}：</div>
                        <el-input v-model="tabledata" style="width: 12vh;" placeholder="请输入数值" />
                    </div>
                    <div class="rightbox-table2">
                        <div class="rightbox-tabletitle">{{ tablehead2 }}：</div>
                        <el-input v-model="tabledata2" style="width: 12vh;" placeholder="请输入数值" />
                    </div>
                    <div class="buttonstyles" @click="drive">驱动模型</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 左侧菜单 -->
    <div class="left-menu" v-if="showmenu">
        <div class="itemMenu" :class="{ active: activeIndex === index }" v-for="(item, index) in menuItems" :key="index"
            @click="changeBackground(index)">
            <div class="itemMenuicon" :class="index === 0 ? 'icon-stys' : 'icon-kjyc'"></div>
            {{ item }}
        </div>
    </div>
    <div class="left-button" v-if="showselect">
        <FunctionMenuoth :functionData="layerFunction" :defaultSelect="false" :Multiple="false"
            @functionSelected="handleFunctionSelection" @close="showselect = false" />
    </div>
    <div class="left-button-2" v-if="showselect2">
        <FunctionMenuother :functionData="layerFunction2" :defaultSelect="false" :Multiple="false"
            @functionSelected="handleFunctionSelection" @close="showselect2 = false" />
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
                    style="position: relative; z-index: 1;" @change="gettimePlay">
                </el-slider>
            </div>
        </div>
    </div>
    <!-- 右下角选择 -->
    <div class="rightbottombox" v-if="showselect">
        <div class="rightbottombox-top">
            <div class="rightbottombox-btn" :class="{ active: selectedButton2 === '体剖切' }" @click="selectButton2('体剖切')">体剖切
            </div>
            <div class="rightbottombox-btn" :class="{ active: selectedButton2 === '十字切片' }" @click="selectButton2('十字切片')">
                十字切片</div>
        </div>
        <div class="rightbottombox-content" v-if="selectedButton2 === '体剖切'">
            <div>
                <div class="rightbottombox-content-title">
                    <div>TOP</div>
                    <div>BOTTOM</div>
                </div>
                <el-slider v-model="slidervalue" range show-stops :step="0.01" :min="0" :max="1" style="width: 25vh;" />
            </div>
            <div>
                <div class="rightbottombox-content-title">
                    <div>LEFT</div>
                    <div>RIGHT</div>
                </div>
                <el-slider v-model="slidervalue2" range show-stops :step="0.01" :min="0" :max="1" style="width: 25vh;" />
            </div>
            <div>
                <div class="rightbottombox-content-title">
                    <div>FRONT</div>
                    <div>BACK</div>
                </div>
                <el-slider v-model="slidervalue3" range show-stops :step="0.01" :min="0" :max="1" style="width: 25vh;" />
            </div>
        </div>
        <div class="rightbottombox-content" v-if="selectedButton2 === '十字切片'">
            <div>
                <div class="rightbottombox-content-title2">
                    CROSS POSITION
                </div>
                <div class="crossback" @mousedown="startDragging">
                    <div class="crossback-point" :style="pointStyle"></div>
                </div>
            </div>
            <div style="margin-top: 1vh;">
                <div class="rightbottombox-content-title2">
                    THICK
                </div>
                <div class="numbtn">
                    <div class="numbtn-change" @click="decrease">-</div>
                    <el-input v-model="THICK" style="width: 8vh; height: 3vh;" @input="validateInput" />
                    <div class="numbtn-change" @click="increase">+</div>
                </div>
            </div>
        </div>
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
    <div class="right-button" v-if="showselectbar">
        <div class="leftbar">{{ barType }}</div>
        <div class="rightbar" :class="selectedItemname === '流速' ? 'rightbar-flow' : 'rightbar-normal'">
            <span>{{ barMax }}</span>
            <span>{{ barMin }}</span>
        </div>
    </div>
    <!-- 图表弹窗 -->
    <div class="buttonstyles2" v-if="showselect2" @click="handlechart">查看数据</div>
    <div class="fishecharts" v-if="showChart" v-loading="loading" element-loading-background="rgba(39 ,88 ,139, 0.8)">
        <img src="../../assets/img/close.png" alt="" class="close2" @click="showChart = false">
        <div class="chartcontent" ref="chartcontent"></div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import FunctionMenuoth from '../Common/FunctionMenuoth.vue'
import FunctionMenuother from '../Common/FunctionMenuother.vue'
import dayjs from 'dayjs'
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
import axios from "axios";

const menuItems = ref(['生态要素预测', '生物量空间预测']);
const showselect2 = ref(false);
const loading = ref(false)
const activeIndex = ref(null);
const showselectbar = ref(false);
const showmenu = ref(false)
const changeBackground = (index) => {
    if (activeIndex.value === index) {
        activeIndex.value = null;
        showselect.value = false;
        showselectbar.value = false;
        showselect2.value = false;
    } else {
        activeIndex.value = index;
        if (index === 0) {
            showselect.value = true;
            showselectbar.value = true;
            showselect2.value = false;
        } else if (index === 1) {
            showselect2.value = true;
            showselect.value = false;
            showselectbar.value = true;
        }
    }
}
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
    loading.value = true;
    if (radioselection.value == '浒苔情景') {
        radioEng.value = 'Hutai';
    } else if (radioselection.value == '陆源污染情景') {
        radioEng.value = 'HighRiver';
    }
    axios.get(window.VITE_APP_BASE_API + `/biomass/getAllBTP/${radioEng.value}`).then((res) => {
        const btpLineList = res.data.data.btpLineList;
        initChart(btpLineList);
        loading.value = false;
    });
};

const tablehead = ref('浒苔面积（㎡）');
const tablehead2 = ref('浒苔生物量（kg/㎡）');
const tabledata = ref(218300);
const tabledata2 = ref(2);
const radioselection = ref('浒苔情景');
const layerFunction = ref([]);
const layerFunction2 = ref([
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
    },
    {
        name: "扁玉螺",
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
        name: "方氏云鳚",
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
        name: "浮游动物",
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
        name: "浮游植物",
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
        name: "海仙人掌",
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
        name: "花鲈",
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
        name: "环节动物",
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
        name: "棘皮动物",
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
        name: "尖海龙",
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
        name: "经氏壳蛞蝓",
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
        name: "口虾蛄",
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
        name: "脉红螺",
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
        name: "牡蛎",
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
        name: "其它底层鱼类",
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
        name: "其它甲壳动物",
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
        name: "其它软体动物",
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
        name: "其它虾类",
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
        name: "其它蟹类",
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
        name: "其它中上层鱼类",
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
        name: "日本蟳",
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
        name: "三疣梭子蟹",
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
        name: "碎屑",
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
        name: "头足类",
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
        name: "细纹狮子鱼",
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
        name: "鰕虎鱼类",
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
        name: "鲬",
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
        name: "长蛇鲻",
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
        name: "中国蛤蜊",
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
        name: "纵肋织纹螺",
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
]);
const selectedButton = ref('浒苔情景');
const selectButton = (button) => {
    selectedButton.value = button;
    radioselection.value = button;
    const formattedTime = dayjs(timePlay.value).format('YYYY-MM-DD HH:mm:ss');
    activeIndex.value = null;
    showmenu.value = false;
    showselect.value = false;
    showselectbar.value = false;
    showselect2.value = false;

    if (button == '浒苔情景') {
        tablehead.value = '浒苔面积（㎡）';
        tablehead2.value = '浒苔生物量（kg/㎡）';
        tabledata.value = 218300;
        tabledata2.value = 2;
    } else {
        tablehead.value = '无机氮（mg/m³）';
        tablehead2.value = '无机磷（mg/m³）';
        tabledata.value = 200;
        tabledata2.value = 100;
    }

    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionName: radioselection.value,
        State: true,
        Time: formattedTime,
        Type: selectedItemname.value,
    });
};
const drive = () => {
    if (tabledata.value == '' || tabledata2.value == '') {
        ElMessage.warning('请输入数据');
        return;
    } else {
        showmenu.value = true;
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
        if (selectedItemname.value !== null) {
            callUIInteraction({
                ModuleName: `趋势预测`,
                // FunctionMenu: '要素切换',
                Time: formattedTime,
                Type: selectedItemname.value,
                FunctionName: radioselection.value,
                State: true,
            });
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
    callUIInteraction({
        ModuleName: `趋势预测`,
        // FunctionMenu: '要素切换',
        Time: formattedTime,
        Type: selectedItem.name,
        FunctionName: radioselection.value,
        State: true,
    });
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

const TOP = ref(0);
const BOTTOM = ref(1);
const LEFT = ref(0);
const RIGHT = ref(1);
const FRONT = ref(0);
const BACK = ref(1);
const CROSSX = ref(0);
const CROSSY = ref(0);
const THICK = ref(0);
const THRESHOLD = ref(1);
const selectedButton2 = ref('体剖切');
const slidervalue = ref([0, 1])
const slidervalue2 = ref([0, 1])
const slidervalue3 = ref([0, 1])
const selectButton2 = (button) => {
    selectedButton2.value = button;
};
watch(slidervalue, (newVal) => {
    TOP.value = newVal[0];
    BOTTOM.value = newVal[1];
    logSliderValues();
});

watch(slidervalue2, (newVal) => {
    LEFT.value = newVal[0];
    RIGHT.value = newVal[1];
    logSliderValues();
});

watch(slidervalue3, (newVal) => {
    FRONT.value = newVal[0];
    BACK.value = newVal[1];
    logSliderValues();
});

const logSliderValues = () => {
    callUIInteraction({
        ModuleName: `生态动力`,
        FunctionName: `空间分析`,
        SelectFunction: selectedButton.value,
        Values: {
            TOP: TOP.value,
            BOTTOM: BOTTOM.value,
            RIGHT: RIGHT.value,
            LEFT: LEFT.value,
            FRONT: FRONT.value,
            BACK: BACK.value,
            THRESHOLD: THRESHOLD.value
        }
    });
    // console.log({
    //     ModuleName: `生态动力`,
    //     FunctionName: `空间分析`,
    //     SelectFunction: selectedButton.value,
    //     Values: {
    //         TOP: TOP.value,
    //         BOTTOM: BOTTOM.value,
    //         RIGHT: RIGHT.value,
    //         LEFT: LEFT.value,
    //         FRONT: FRONT.value,
    //         BACK: BACK.value,
    //         THRESHOLD: THRESHOLD.value
    //     }
    // });
};
// 增加
const increase = () => {
    const nextValue = parseFloat((THICK.value + 0.001).toFixed(3));
    if (nextValue <= 0.05) {
        THICK.value = nextValue;
    }
    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionName: `空间分析`,
        SelectFunction: selectedButton2.value,
        Values: {
            'CROSS-X': pointPosition.value.x,
            'CROSS-Y': pointPosition.value.y,
            "THICK": THICK.value,
            "THRESHOLD": THRESHOLD.value
        }
    });
    // console.log({
    //     ModuleName: `趋势预测`,
    //     FunctionName: `空间分析`,
    //     SelectFunction: selectedButton2.value,
    //     Values: {
    //         'CROSS-X': pointPosition.value.x,
    //         'CROSS-Y': pointPosition.value.y,
    //         "THICK": THICK.value,
    //         "THRESHOLD": THRESHOLD.value
    //     }
    // });
};

// 减少
const decrease = () => {
    const nextValue = parseFloat((THICK.value - 0.001).toFixed(3));
    if (nextValue >= 0) {
        THICK.value = nextValue;
    }
    callUIInteraction({
        ModuleName: `趋势预测`,
        FunctionName: `空间分析`,
        SelectFunction: selectedButton2.value,
        Values: {
            'CROSS-X': pointPosition.value.x,
            'CROSS-Y': pointPosition.value.y,
            "THICK": THICK.value,
            "THRESHOLD": THRESHOLD.value
        }
    });
    // console.log({
    //     ModuleName: `趋势预测`,
    //     FunctionName: `空间分析`,
    //     SelectFunction: selectedButton2.value,
    //     Values: {
    //         'CROSS-X': pointPosition.value.x,
    //         'CROSS-Y': pointPosition.value.y,
    //         "THICK": THICK.value,
    //         "THRESHOLD": THRESHOLD.value
    //     }
    // });
};

const validateInput = () => {
    let value = parseFloat(THICK.value);
    if (isNaN(value)) {
        THICK.value = 0;
    } else if (value < 0) {
        THICK.value = 0;
    } else if (value > 0.05) {
        THICK.value = 0.05;
    } else {
        THICK.value = parseFloat(value.toFixed(3));
    }
};

const pointPosition = ref({ x: 0.5, y: 0.5 }); // 初始位置为中心
let lastPrintedPosition = { x: null, y: null };
const isDragging = ref(false); // 标记是否正在拖拽

const movePoint = (event) => {
    if (!isDragging.value) {
        const crossbackElement = event.currentTarget;
        const rect = crossbackElement.getBoundingClientRect();

        // 获取点击位置相对于 crossback 的位置
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 计算百分比位置，确保在 0 到 1 之间
        CROSSX.value = Math.max(0, Math.min(1, (x / rect.width)));
        CROSSY.value = Math.max(0, Math.min(1, (y / rect.height)));

        pointPosition.value = {
            x: parseFloat(CROSSX.value.toFixed(2)),
            y: parseFloat(CROSSY.value.toFixed(2))
        };

        updatePointPosition();
    }
};

// 开始拖拽
const startDragging = (event) => {
    isDragging.value = true;
    movePoint(event); // 初始化位置
    document.addEventListener('mousemove', dragPoint);
    document.addEventListener('mouseup', stopDragging);
};

// 拖拽中
const dragPoint = (event) => {
    if (isDragging.value) {
        const crossbackElement = document.querySelector('.crossback');
        const rect = crossbackElement.getBoundingClientRect();

        // 获取鼠标位置相对于 crossback 的位置
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        CROSSX.value = Math.max(0, Math.min(1, (x / rect.width)));
        CROSSY.value = Math.max(0, Math.min(1, (y / rect.height)));

        pointPosition.value = {
            x: parseFloat(CROSSX.value.toFixed(2)),
            y: parseFloat(CROSSY.value.toFixed(2))
        };
        updatePointPosition();
    }
};

// 停止拖拽
const stopDragging = () => {
    isDragging.value = false;
    document.removeEventListener('mousemove', dragPoint);
    document.removeEventListener('mouseup', stopDragging);
};

const updatePointPosition = () => {
    if (pointPosition.value.x !== lastPrintedPosition.x || pointPosition.value.y !== lastPrintedPosition.y) {
        callUIInteraction({
            ModuleName: `生态动力`,
            FunctionName: `空间分析`,
            SelectFunction: selectedButton.value,
            Values: {
                'CROSS-X': pointPosition.value.x,
                'CROSS-Y': pointPosition.value.y,
                "THICK": THICK.value,
                "THRESHOLD": THRESHOLD.value
            }
        });
        // console.log({
        //     ModuleName: `生态动力`,
        //     FunctionName: `空间分析`,
        //     SelectFunction: selectedButton.value,
        //     Values: {
        //         'CROSS-X': pointPosition.value.x,
        //         'CROSS-Y': pointPosition.value.y,
        //         "THICK": THICK.value,
        //         "THRESHOLD": THRESHOLD.value
        //     }
        // });
        // 更新上一次打印的坐标
        lastPrintedPosition.x = pointPosition.value.x;
        lastPrintedPosition.y = pointPosition.value.y;
    }
};


const pointStyle = computed(() => {
    return {
        left: `${pointPosition.value.x * 100}%`, // 转换为百分比
        top: `${pointPosition.value.y * 100}%`,   // 转换为百分比
        transform: 'translate(-50%, -50%)' // 使点的中心对齐
    };
});

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

.left-button-2 {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: absolute;
}

.bottomCalendar {
    position: absolute;
    bottom: 3vh;
    right: 6vh;
    width: 13.5vh;
    height: 5vh;
    color: rgb(255, 255, 255);
    line-height: 4vh;
    border: 0;
    cursor: pointer;
    padding: 0;
    font-size: 1.8vh;
    z-index: 3;
    font-weight: bold;
}

.bottomCalendar :deep(.el-input__wrapper) {
    position: absolute;
    z-index: 1000;
    width: 15vh;
    height: 6.5vh;
    color: rgb(255, 255, 255);
    line-height: 4vh;
    border: 0;
    cursor: pointer;
    padding: 0;
    font-size: 1.8vh;
    background-image: url('../../assets/img/timebox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: transparent;
    border-radius: none;
    box-shadow: none;
    font-weight: bold;
}

.bottomCalendar :deep(.el-input__prefix-inner) {
    margin-left: 1vh;
}

.bottomCalendar :deep(.el-input__inner) {
    margin-right: 1.5vh;
    color: rgb(255, 255, 255);
    cursor: pointer;
    margin: 0;
    font-weight: bold;
}

.bottomCalendar :deep(.el-input__suffix-inner) {
    display: none !important;
}

.bottombox-left {
    width: 88%;
    height: 6vh;
    background-image: url('../../assets/img/timebackground.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 1.5vh;
    margin-left: 1.5vh;
    z-index: 10;
}

.bottombox {
    padding: 0 3vh 0 10vh;
    position: absolute;
    bottom: 1vh;
    box-sizing: border-box;
    display: flex;
    z-index: 5;
}

.bottombox-button {
    position: absolute;
    bottom: 1vh;
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

.bottombox-slider {
    width: 81.25vw;
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
    width: 3vh;
    height: 34vh;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 1vh;
    right: 1vh;
    z-index: 3;
}

.leftbar {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    border-top-left-radius: 0.5vh;
    border-top-right-radius: 0.5vh;
    width: 3vh;
    height: 2.5vh;
    font-size: 1.6vh;
    color: white;
    direction: rtl;
    /* 右到左的文本方向 */
}

.rightbar {
    width: 3vh;
    height: 32vh;
    border-bottom-left-radius: 0.5vh;
    border-bottom-right-radius: 0.5vh;
    background-image: url('../../assets/img/colorbar.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: white;
    font-size: 1.6vh;
    font-weight: bold;
    display: flex;
    flex-direction: column;
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
    left: 2.4vh;
    z-index: 3;
}

.rightbox-middle {
    width: 40vh;
    height: 32.5vh;
    background-image: url("../../assets/img/bacg-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 2vh;
    padding: 2vh;
    box-sizing: border-box;
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
    height: 2.5vh;
    background-image: url('../../assets/img/rightboxtitle2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #FFFFFF;
    font-size: 1.65vh;
    font-weight: bold;
    line-height: 1vh;
    padding-left: 2vh;
    box-sizing: border-box;
}

.rightbox-table {
    width: 100%;
    height: 11vh;
    margin-top: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.buttonstyles {
    width: 12vh;
    height: 4vh;
    margin-top: 2vh;
    margin-left: 37vh;
    border-radius: 0;
    background-image: url('../../assets/img/drive.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 0;
    position: absolute;
    right: 2vh;
    bottom: 2.4vh;
    color: white;
    font-size: 1.7vh;
    font-weight: bold;
    letter-spacing: 0.3vh;
    margin-left: 0.3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.buttonstyles2 {
    width: 12vh;
    height: 4vh;
    border-radius: 0;
    background-image: url('../../assets/img/drive.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border: 0;
    position: absolute;
    right: 6vh;
    bottom: 10vh;
    color: white;
    font-size: 1.7vh;
    font-weight: bold;
    letter-spacing: 0.3vh;
    margin-left: 0.3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    width: 50vw;
    height: 45vh;
    z-index: 3;
    position: absolute;
    bottom: 10vh;
    left: 50%;
    transform: translateX(-50%);
    background-image: url("../../assets/img/bacg-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1.5vh;
    box-sizing: border-box;
}

.chartcontent {
    width: 48vw;
    height: 42vh;
}

.elbutton {
    position: absolute;
    z-index: 4;
    bottom: 10vh;
    right: 8vh;
}

.left-menu {
    position: absolute;
    height: 18vh;
    width: 20vh;
    left: 3vh;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    color: white;
    z-index: 2;
}

.itemMenu {
    width: 18vh;
    height: 4vh;
    background-image: url('../../assets/img/icontitile-1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    line-height: 3.5vh;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.8vh;
    display: flex;
    align-items: center;
}

.icon-stys {
    width: 1.5vh;
    height: 1.5vh;
    background-image: url('../../assets/img/stys.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1.3vh;
    margin-right: 1.5vh;
}

.icon-kjyc {
    width: 1.5vh;
    height: 1.5vh;
    background-image: url('../../assets/img/kjyc.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: 1.3vh;
    margin-right: 1.5vh;
}

.itemMenu.active {
    background-image: url('../../assets/img/icontitile-active-1.png');
}

.radiobox-container {
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.radiobox {
    width: 14.5vh;
    height: 4vh;
    background-image: url('../../assets/img/btn2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding-left: 3.2vh;
    box-sizing: border-box;
    color: #E6F8FF;
    font-weight: bold;
    font-size: 1.6vh;
    cursor: pointer;
}

.radiobox.active {
    background-image: url('../../assets/img/btn2-act.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #ffffff;
}

.rightbox-table1 {
    width: 35vh;
    height: 4vh;
    background-image: url('../../assets/img/areatable.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1vh;
}

.rightbox-table2 {
    width: 35vh;
    height: 4vh;
    background-image: url('../../assets/img/numtable.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 1vh;
}

.rightbox-tabletitle {
    height: 4vh;
    color: #E6F8FF;
    font-size: 1.6vh;
    display: flex;
    align-items: center;
}

.rightbox-table :deep(.el-input__wrapper:hover) {
    box-shadow: none;
}

.rightbox-table :deep(.el-input__wrapper) {
    background-color: transparent;
    border: 0;
    box-shadow: none;
}

.rightbox-table :deep(.el-input__inner) {
    color: #00FFFF;
    font-size: 1.6vh;
    font-weight: bold;
}

.rightbottombox {
    width: 30vh;
    height: 27.5vh;
    background-image: url('../../assets/img/databox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 9vh;
    right: 9vh;
    padding: 1vh;
    box-sizing: border-box;
}

.rightbottombox-top {
    width: 100%;
    height: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.rightbottombox-btn {
    width: 13vh;
    height: 4vh;
    background-image: url('../../assets/img/rightbtn.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.8vh;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

.rightbottombox-btn.active {
    background-image: url('../../assets/img/rightbtn-active.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.rightbottombox-content {
    width: 100%;
    height: calc(100% - 5vh);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.rightbottombox-content-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #E1F9FF;
    font-size: 1.4vh;
    font-weight: bold;
}

.rightbottombox-content-title2 {
    width: 100%;
    display: flex;
    align-items: center;
    color: #E1F9FF;
    font-size: 1.4vh;
    font-weight: bold;
}

.crossback {
    margin-top: 1vh;
    position: relative;
    width: 28vh;
    height: 11vh;
    border-radius: .5vh;
    background-image: url('../../assets/img/pointback.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
}

.crossback-point {
    position: absolute;
    width: 2.5vh;
    height: 2.5vh;
    background-image: url('../../assets/img/point.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
}

.numbtn {
    width: 28vh;
    height: 4vh;
    margin-top: .5vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.numbtn-change {
    width: 6vh;
    height: 3vh;
    background-image: url('../../assets/img/numbtn.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 1.6vh;
    font-weight: bold;
    cursor: pointer;
}

.numbtn :deep(.el-input__inner) {
    color: white !important;
    text-align: center;
}

.numbtn :deep(.el-input__wrapper) {
    border: 0.1vh solid #1367a8;
    background-color: #01467e;
    box-shadow: none;
}

.rightbottombox-content :deep(.el-slider__bar) {
    background: linear-gradient(to bottom, #FFFFFF, #00FFFF, #0FEAFD);
}

.rightbottombox-content :deep(.el-slider__button) {
    border: 0;
    background-color: transparent;
    background-image: url('../../assets/img/silderbutton.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 2vh;
    height: 2vh;
    background-position: center;
}

:deep(.ant-slider-rail) {
    position: absolute;
    width: 2vh;
    right: -0.3vh;
    background-color: transparent !important;
    background-image: url('../../assets/img/colorbar.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

:deep(.ant-slider-track, .ant-silder:hover) {
    background-color: transparent !important;
}

:deep(.ant-slider:hover .ant-slider-rail) {
    background-color: transparent !important;
}

:deep(.ant-slider-handle) {
    left: 0;
}
</style>
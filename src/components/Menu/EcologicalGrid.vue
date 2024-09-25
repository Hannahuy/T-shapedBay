<template>
    <div class="Ecologpage">
        <div class="top">
            <div class="top-left">
                <div class="toptitle">
                    能量流动数据
                </div>
                <div class="container" ref="chartRef1"></div>
            </div>
            <div class="top-middle">
                <div class="toptitle">
                    总体特征参数
                </div>
                <div class="container" ref="chartRef2"></div>
            </div>
            <div class="top-right">
                <div class="toptitle">
                    功能组关键指数
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="toptitle">
                    建设参数
                </div>
                <div class="container" ref="chartRef3"></div>
            </div>
            <div class="middle-middle">
                <div class="toptitle">
                    营养级传递效率
                </div>
            </div>
            <div class="middle-right">
                <div class="toptitle">
                    参数数值
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <div class="toptitle">
                    营养级能量传递效率
                </div>
                <div class="container" ref="chartRef4"></div>
            </div>
            <div class="bottom-right">
                <div class="toptitle">
                    生产力利用情况
                </div>
                <div style="display: flex;width: 100%;height: cala(100% - 3.5vh);">
                    <div class="container5" ref="chartRef5"></div>
                    <div class="container6" ref="chartRef6"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const charts = [];
const chartRef1 = ref(null);
const chartRef2 = ref(null);
const chartRef3 = ref(null);
const chartRef4 = ref(null);
const chartRef5 = ref(null);
const chartRef6 = ref(null);
let initChart1 = () => {
    let chart = echarts.init(chartRef1.value);
    charts.push(() => {
        chart.dispose();
        initChart1();
    });
    chart.setOption({
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true,
                    color: '#CFEFFF'  // 修改节点名称颜色
                },
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20,
                },
                data: [
                    {
                        name: '日本鳟',
                        x: 300,
                        y: 300
                    },
                    {
                        name: '头足类',
                        x: 500,
                        y: 200
                    },
                    {
                        name: '许氏平鼬',
                        x: 700,
                        y: 300
                    },
                    {
                        name: '其他底层鱼类',
                        x: 900,
                        y: 300
                    },
                    {
                        name: '节肢动物',
                        x: 1100,
                        y: 400
                    },
                    {
                        name: '浮游植物',
                        x: 1300,
                        y: 500
                    },
                    {
                        name: '小型底栖动物',
                        x: 300,
                        y: 500
                    }
                ],
                links: [
                    {
                        source: '日本鳟',
                        target: '头足类',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FFD700'  // 修改边的颜色
                        }
                    },
                    {
                        source: '头足类',
                        target: '许氏平鼬',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FF8C00'  // 修改边的颜色
                        }
                    },
                    {
                        source: '许氏平鼬',
                        target: '其他底层鱼类',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FFD700'  // 修改边的颜色
                        }
                    },
                    {
                        source: '其他底层鱼类',
                        target: '节肢动物',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FF8C00'  // 修改边的颜色
                        }
                    },
                    {
                        source: '节肢动物',
                        target: '浮游植物',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FFD700'  // 修改边的颜色
                        }
                    },
                    {
                        source: '日本鳟',
                        target: '小型底栖动物',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FF8C00'  // 修改边的颜色
                        }
                    },
                    {
                        source: '小型底栖动物',
                        target: '浮游植物',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FF8C00'  // 修改边的颜色
                        },
                    },
                    {
                        source: '日本鳟',
                        target: '其他底层鱼类',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FFD700'  // 修改边的颜色
                        },
                    },
                    {
                        source: '节肢动物',
                        target: '日本鳟',
                        lineStyle: {
                            curveness: 0.2,
                            color: '#FFD700'  // 修改边的颜色
                        },
                    },
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    });
};

let initChart2 = () => {
    let chart = echarts.init(chartRef2.value);
    charts.push(() => {
        chart.dispose();
        initChart2();
    });
    const hours = [
        '生态系统规模', '系统成熟度', '组织程度', '能量传递效率',
        '生态系统规模1', '系统成熟度1', '组织程度1', '能量传递效率1',
        '生态系统规模2', '系统成熟度2', '组织程度2', '能量传递效率2'
    ];
    const data = [
        [0, 0, 5], [1, 1, 3], [2, 2, 4], [3, 3, 6],
        [4, 4, 2], [5, 5, 7], [6, 6, 5], [7, 7, 4],
        [8, 8, 6], [9, 9, 3], [10, 10, 5], [11, 11, 2]
    ];
    chart.setOption({
        polar: {},
        tooltip: {
            formatter: function (params) {
                return (
                    params.value[2] +
                    ' commits  '
                );
            },
        },
        angleAxis: {
            type: 'category',
            data: hours,
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#3B63D1', // 设置颜色为蓝色
                    type: 'dashed', // 设置为虚线
                    width: 2
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF' // 设置角度轴标签文字颜色
                }
            }
        },
        radiusAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisLabel: {
                rotate: 45,
                textStyle: {
                    color: '#CFEFFF' // 设置半径轴标签文字颜色
                }
            }
        },
        series: [
            {
                name: 'Punch Card',
                type: 'scatter',
                coordinateSystem: 'polar',
                symbolSize: function (val) {
                    return val[2] * 5;
                },
                data: data,
                itemStyle: {
                    color: 'orange' // 设置颜色为橙色
                },
                animationDelay: function (idx) {
                    return idx * 5;
                }
            }
        ]
    });
};
let initChart5 = () => {
    let chart = echarts.init(chartRef5.value);
    charts.push(() => {
        chart.dispose();
        initChart5();
    });
    chart.setOption({
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [0.8, 58212, '环节动物'],
                [0.21, 78254, '许氏平鼬'],
                [0.4, 41032, '浮游植物'],
                [0.31, 12755, '浮游动物'],
                [0.7, 20145, '海胆'],
                [0.41, 79146, '小型底栖动物'],
                [0.6, 91852, '其它贝类'],
                [0.54, 101852, '日本鳟'],
                [0.7, 20112, '头足类']
            ]
        },
        xAxis: {
            name: '',
            show: false, // 隐藏 x 轴
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF'
                }
            }
        },
        visualMap: {
            show: false,
            orient: 'horizontal',
            right: '5%',  // 设置右边距
            top: '5%',     // 设置上边距
            min: 0,
            max: 1,
            text: ['1.0 ', '0.0 '],
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const score = params.data[0].toFixed(2); // 保留两位小数
                const product = params.data[2];
                return `Product: ${product}<br/>Score: ${score}<br/>`;
            }
        },
        grid: {
            left: '2%',
            right: '5%',
            bottom: '1%',
            top: '15%',
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                encode: {
                    y: 'product'
                }
            }
        ]
    });
}

let initChart6 = () => {
    let chart = echarts.init(chartRef6.value);
    charts.push(() => {
        chart.dispose();
        initChart6();
    });
    chart.setOption({
        dataset: {
            source: [
                ['score', 'amount', 'product'],
                [0.8, 58212, '环节动物'],
                [0.21, 78254, '许氏平鼬'],
                [0.4, 41032, '浮游植物'],
                [0.31, 12755, '浮游动物'],
                [0.7, 20145, '海胆'],
                [0.41, 79146, '小型底栖动物'],
                [0.6, 91852, '其它贝类'],
                [0.54, 101852, '日本鳟'],
                [0.7, 20112, '头足类']
            ]
        },
        xAxis: {
            name: '',
            show: false, // 隐藏 x 轴
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF'
                }
            }
        },
        visualMap: {
            // show: false,
            orient: 'horizontal',
            right: '5%',  // 设置右边距
            top: '0%',     // 设置上边距
            min: 0,
            max: 1,
            text: ['1.0 ', '0.0 '],
            dimension: 0,
            inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
            },
            textStyle: {
                color: '#CFEFFF' // 设置文字颜色
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                const score = params.data[0].toFixed(2); // 保留两位小数
                const product = params.data[2];
                return `Product: ${product}<br/>Score: ${score}<br/>`;
            }
        },
        grid: {
            left: '2%',
            right: '5%',
            bottom: '1%',
            top: '15%',
            containLabel: true
        },
        series: [
            {
                type: 'bar',
                encode: {
                    y: 'product'
                }
            }
        ]
    });
}
const reloadChart = () => {
    charts.forEach((chart) => chart());
};
onMounted(() => {
    initChart1();
    initChart2();
    initChart5();
    initChart6();
    window.addEventListener("resize", reloadChart);
});
onUnmounted(() => {
    window.removeEventListener("resize", reloadChart);
});
</script>

<style scoped>
.Ecologpage {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/img/menu3background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.top,
.middle,
.bottom {
    width: 97%;
    height: 29vh;
    z-index: 3;
    margin-top: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.top {
    margin-top: 6vh;
}

.middle {
    margin-top: 1vh;
}

.bottom {
    margin-top: 1vh;
}

.top-left {
    width: 76vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topleft.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.top-middle {
    width: 56.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topmiddle.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.top-right {
    width: 58.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-left {
    width: 64vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-middle {
    width: 62.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-right {
    width: 64.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bottom-left {
    width: 96vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/bottomright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bottom-right {
    width: 96vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/bottomright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.toptitle {
    width: 100%;
    height: 3.5vh;
    font-family: HYLingXinJ;
    font-weight: bold;
    font-size: 2vh;
    line-height: 3.5vh;
    color: #FEFFFF;
    text-align: center;
    background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.2vh;
    margin-left: 0.3vh;
}

.container {
    width: 100%;
    height: calc(100% - 3.5vh);
    padding: 1.5vh 1vh 1vh 1vh;
    box-sizing: border-box;
}

.container5,
.container6 {
    width: 100%;
    height: 26vh;
    padding: 1.5vh 0vh 1vh 0vh;
    box-sizing: border-box;
}
</style>
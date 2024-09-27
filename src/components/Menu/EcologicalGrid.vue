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
                <div class="container1">
                    <div class="content1 ha">口虾姑</div>
                    <div class="content1 hb">环节动物</div>
                    <div class="content1 hc">浮游动物</div>
                    <div class="content2 hd">其他贝类</div>
                    <div class="content2 he">其他底层鱼类</div>
                    <div class="content2 hf">小型底栖生物</div>
                    <div class="content2 hg">扁平螺</div>
                    <div class="content3 hi">脉红螺</div>
                    <div class="content3 hj">海 胆</div>
                    <div class="content3 hk">节肢动物</div>
                    <div class="content3 hl">鍛虎鱼</div>
                    <div class="content4 hm">鮞 鱼</div>
                    <div class="content4 hn">许氏平鲉</div>
                    <div class="content4 ho">日本鲟</div>
                    <div class="content5 hp">海 星</div>
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
                <div class="container3"></div>
            </div>
            <div class="middle-right">
                <div class="toptitle">
                    参数数值
                </div>
                <div class="middle-right-content">
                    <div class="middle-right-content-left">
                        <div class="content-left-title">
                            系统平均路径长度
                        </div>
                        <div class="content-left-content">
                            <div
                                style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                <span class="content-left-content-span">4151</span>
                                <span class="content-left-content-span2">Finn's循环指数(%)</span>
                            </div>
                            <div
                                style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                <span class="content-left-content-span">4151</span>
                                <span class="content-left-content-span2">系统平均路径长度</span>
                            </div>
                        </div>
                    </div>
                    <div class="middle-right-content-right">
                        <div class="content-right-title">
                            组织程度参数
                        </div>
                        <div style="display: flex;justify-content: space-evenly;">
                            <div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">聚合度</span>
                                </div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">相对冗余度</span>
                                </div>
                            </div>
                            <div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">相对聚合度</span>
                                </div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">总信息容量</span>
                                </div>
                            </div>
                            <div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">冗余度</span>
                                </div>
                                <div
                                    style="display: flex;flex-direction: column;position: relative;justify-content: center;align-items: center;">
                                    <img src="../../assets/img/EcologicalGrid/资源 31.png" alt="" class="image-raido">
                                    <span class="content-left-content-span1">4151</span>
                                    <span class="content-left-content-span2">Capacity</span>
                                </div>
                            </div>
                        </div>
                    </div>
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

    // 初始数据
    const data = [
        { name: '日本鳟', x: 300, y: 300 },
        { name: '头足类', x: 500, y: 200 },
        { name: '许氏平鼬', x: 700, y: 300 },
        { name: '其他底层鱼类', x: 900, y: 300 },
        { name: '节肢动物', x: 1100, y: 400 },
        { name: '浮游植物', x: 1300, y: 500 },
        { name: '小型底栖动物', x: 300, y: 500 }
    ];

    const links = [
        { source: '日本鳟', target: '头足类', lineStyle: { curveness: 0.2, color: '#FFD700' } },
        { source: '头足类', target: '许氏平鼬', lineStyle: { curveness: 0.2, color: '#FF8C00' } },
        { source: '许氏平鼬', target: '其他底层鱼类', lineStyle: { curveness: 0.2, color: '#FFD700' } },
        { source: '其他底层鱼类', target: '节肢动物', lineStyle: { curveness: 0.2, color: '#FF8C00' } },
        { source: '节肢动物', target: '浮游植物', lineStyle: { curveness: 0.2, color: '#FFD700' } },
        { source: '日本鳟', target: '小型底栖动物', lineStyle: { curveness: 0.2, color: '#FF8C00' } },
        { source: '小型底栖动物', target: '浮游植物', lineStyle: { curveness: 0.2, color: '#FF8C00' } },
        { source: '日本鳟', target: '其他底层鱼类', lineStyle: { curveness: 0.2, color: '#FFD700' } },
        { source: '节肢动物', target: '日本鳟', lineStyle: { curveness: 0.2, color: '#FFD700' } }
    ];
    chart.setOption({
        tooltip: {
            trigger: 'item',
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 20,
                roam: true,
                label: {
                    show: true,
                    color: '#CFEFFF'
                },
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20,
                    color: '#FFFFFF'
                },
                data: data.map(item => ({
                    ...item,
                    itemStyle: {
                        color: '#FFFFFF',
                        borderColor: '#4085a6',
                        borderWidth: 4
                    },
                    label: {
                        show: true,
                        color: '#CFEFFF',
                        position: [-10, 25]
                    }
                })),
                links: links,
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    });
    // 监听鼠标事件
    chart.on('mouseover', function (params) {
        if (params.dataType === 'edge') {
            const highlightedLink = params.data;
            // 更新线条样式
            const updatedLinks = links.map(link => {
                return {
                    ...link,
                    lineStyle: {
                        ...link.lineStyle,
                        opacity: link.source === highlightedLink.source && link.target === highlightedLink.target ? 1 : 0.2,
                        width: link.source === highlightedLink.source && link.target === highlightedLink.target ? 4 : 2
                    }
                };
            });
            chart.setOption({
                series: [{
                    links: updatedLinks
                }]
            });
        }
    });
    chart.on('mouseout', function () {
        chart.setOption({
            series: [{
                links: links
            }]
        });
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
                rotate: 0,
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
                    return val[2] * 3; // 将乘数改为3以减小圆点大小
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
let initChart3 = () => {
    let chart = echarts.init(chartRef3.value);
    charts.push(() => {
        chart.dispose();
        initChart3();
    });
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['建设前', '建设中', '建设后'],
            align: 'left',
            right: 10,
            textStyle: {
                color: "#CFEFFF"
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 35
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            top: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['中小客',
                '大客',
                '小货',
                '中货',
                '大货',
                '大客',
                '小货',
                '中货',
                '大货',
                '小货',
                '中货',
                '大货',
            ],
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#063374",
                    width: 1,
                    type: "solid"
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: "#CFEFFF",
                },
                interval: 0
            },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                // formatter: '{value} %',
                textStyle: {
                    color: "#CFEFFF",
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                show: false,
            }
        }],
        series: [{
            name: '建设前',
            type: 'bar',
            data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66, 78, 89],
            barWidth: 5, //柱子宽度
            barGap: 1, //柱子之间间距
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#16cef9'
                    }, {
                        offset: 1,
                        color: '#0a2f45'
                    }]),
                    opacity: 1,
                }
            }
        }, {
            name: '建设中',
            type: 'bar',
            data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46, 52, 68],
            barWidth: 5,
            barGap: 1,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#dcfafc'
                    }, {
                        offset: 1,
                        color: '#3c5569'
                    }]),
                    opacity: 1,
                }
            }
        }, {
            name: '建设后',
            type: 'bar',
            data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86, 92, 95],
            barWidth: 5,
            barGap: 1,
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#f8ad3a'
                    }, {
                        offset: 1,
                        color: '#192b34'
                    }]),
                    opacity: 1,
                }
            }
        }]
    });
};
let initChart4 = () => {
    const names = [
        '环节动物',
        '浮游植物',
        '浮游动物',
        '小型底栖动物',
        '日本鳟',
        '头足类',
        '海胆',
        '节肢动物',
        '口虾姑'
    ];
    const years = ['2001', '2002', '2003', '2004', '2005', '2006'];
    const shuffle = (array) => {
        let currentIndex = array.length;
        let randomIndex = 0;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex]
            ];
        }
        return array;
    };
    const generateRankingData = () => {
        const map = new Map();
        const defaultRanking = Array.from({ length: names.length }, (_, i) => i * 10); // y轴数据
        for (const _ of years) {
            const shuffleArray = shuffle(defaultRanking);
            names.forEach((name, i) => {
                map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
            });
        }
        return map;
    };
    const generateSeriesList = () => {
        const seriesList = [];
        const rankingMap = generateRankingData();
        rankingMap.forEach((data, name) => {
            const series = {
                name,
                symbol: 'circle', // 使用圆点
                symbolSize: 8, // 设置圆点大小为5
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                endLabel: {
                    show: true,
                    formatter: '{a}',
                    distance: 20,
                    color: '#CFEFFF'
                },
                lineStyle: {
                    width: 4,
                },
                data
            };
            seriesList.push(series);
        });
        return seriesList;
    };
    let chart = echarts.init(chartRef4.value);
    charts.push(() => {
        chart.dispose();
        initChart4();
    });
    chart.setOption({
        tooltip: {
            trigger: 'item'
        },
        grid: {
            left: 15,
            right: 100,
            bottom: 0,
            top: 15,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(207, 239, 255, 0.2)' // 设置为淡色
                }
            },
            axisLabel: {
                margin: 15,
                fontSize: 16,
                color: '#CFEFFF'
            },
            boundaryGap: false,
            data: years,
            axisLine: {
                lineStyle: {
                    color: 'rgba(207, 239, 255, 0.2)' // 设置为淡色
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                margin: 15,
                fontSize: 16,
                formatter: '{value}',
                color: '#CFEFFF'
            },
            min: 0,
            max: 90,
            interval: 10,
            axisLine: {
                lineStyle: {
                    color: 'rgba(207, 239, 255, 0.2)' // 设置为淡色
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(207, 239, 255, 0.2)' // 设置为淡色
                }
            }
        },
        series: generateSeriesList()
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
                color: ['#f4ac3d', '#C0B777', '#16cffb']
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
                showBackground: true,
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
                color: ['#f4ac3d', '#C0B777', '#16cffb']
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
                showBackground: true,
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
    initChart3();
    initChart4();
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

.container1 {
    width: 100%;
    height: calc(100% - 3.5vh);
    padding: 1.5vh 1vh 1vh 1vh;
    box-sizing: border-box;
    position: relative;
}

.container5,
.container6 {
    width: 100%;
    height: 26vh;
    padding: 1.5vh 0vh 1vh 0vh;
    box-sizing: border-box;
}

.content1 {
    padding: 0.5vh 1vh;
    box-sizing: border-box;
    text-align: center;
    color: #ffffffa2;
    background-image: url('../../assets/img/EcologicalGrid/资源 24.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content2 {
    padding: 0.5vh 1vh;
    box-sizing: border-box;
    text-align: center;
    color: #ffffffb0;
    background-image: url('../../assets/img/EcologicalGrid/资源 25.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content3 {
    padding: 0.5vh 1vh;
    box-sizing: border-box;
    text-align: center;
    color: #ffffffcb;
    background-image: url('../../assets/img/EcologicalGrid/资源 26.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content4 {
    padding: 0.5vh 1vh;
    box-sizing: border-box;
    text-align: center;
    color: #ffffffea;
    background-image: url('../../assets/img/EcologicalGrid/资源 27.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content5 {
    padding: 0.5vh 1vh;
    box-sizing: border-box;
    text-align: center;
    color: #ffffff;
    background-image: url('../../assets/img/EcologicalGrid/资源 28.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
}

.ha {
    width: 8vh;
    position: absolute;
    top: 13vh;
    right: 10vh;
    font-size: 1.4vh;
}

.hb {
    width: 9vh;
    position: absolute;
    top: 2vh;
    right: 12vh;
    font-size: 1.4vh;
}

.hc {
    width: 9vh;
    position: absolute;
    top: 20vh;
    left: 2vh;
    font-size: 1.4vh;
}

.hd {
    width: 8vh;
    position: absolute;
    top: 4vh;
    right: 2vh;
    font-size: 1.4vh;
}

.he {
    width: 12vh;
    position: absolute;
    font-size: 1.3vh;
    left: 2vh;
    top: 2vh;
}

.hf {
    width: 12vh;
    position: absolute;
    top: 17vh;
    right: 1vh;
    font-size: 1.4vh;
}

.hg {
    width: 7vh;
    position: absolute;
    left: 20vh;
    bottom: 2vh;
    font-size: 1.4vh;
}

.hi {
    width: 10vh;
    position: absolute;
    right: 10vh;
    bottom: 1vh;
    font-size: 1.8vh;
}

.hj {
    width: 9vh;
    position: absolute;
    left: 4vh;
    bottom: 11vh;
    font-size: 1.8vh;
}

.hk {
    width: 10vh;
    position: absolute;
    left: 10vh;
    bottom: 16vh;
    font-size: 1.8vh;
}

.hl {
    width: 10vh;
    position: absolute;
    left: 28vh;
    bottom: 6vh;
    font-size: 1.8vh;
}

.hm {
    width: 10vh;
    position: absolute;
    right: 6vh;
    top: 8vh;
    font-size: 1.8vh;
}

.hn {
    width: 10vh;
    position: absolute;
    right: 26vh;
    top: 3vh;
    font-size: 1.8vh;
}

.ho {
    width: 10vh;
    position: absolute;
    left: 11vh;
    bottom: 6vh;
    font-size: 1.8vh;
}

.hp {
    width: 10vh;
    position: absolute;
    left: 24vh;
    top: 10vh;
    font-size: 2vh;
}

.middle-right-content {
    width: 100%;
    height: calc(100% - 3.5vh);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vh 1.5vh 1vh 1.5vh;
    box-sizing: border-box;
}

.middle-right-content-left {
    height: 100%;
    width: 22vh;
    background-image: url('../../assets/img/EcologicalGrid/资源 29.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-right-content-right {
    height: 100%;
    width: 38.5vh;
    background-image: url('../../assets/img/EcologicalGrid/资源 30.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content-left-title {
    height: 3.2vh;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 0.2vh;
    line-height: 3.2vh;
}

.content-right-title {
    height: 3.2vh;
    text-align: center;
    color: #FFFFFF;
    letter-spacing: 0.5vh;
    line-height: 3.2vh;
}

.content-left-content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.content-right-content {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.image-raido {
    width: 8vh;
    height: 8vh;
}

.content-left-content-span {
    position: absolute;
    color: #00FFFD;
    font-weight: bold;
    top: 2.9vh;
    left: 4.6vh;
}

.content-left-content-span1 {
    position: absolute;
    color: #00FFFD;
    font-weight: bold;
    top: 2.9vh;
    left: 2vh;
}

.content-left-content-span2 {
    color: #C7E4FF;
    font-size: 1.6vh;
}

.container3 {
    width: 100%;
    height: calc(100% - 3.5vh);
    padding: 1.5vh 1vh 1vh 1vh;
    box-sizing: border-box;
    background-image: url('../../assets/img/EcologicalGrid/贴图.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
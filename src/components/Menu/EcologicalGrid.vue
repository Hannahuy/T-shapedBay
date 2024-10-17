<template>
    <div class="Ecologpage">
        <div class="contentmax" v-show="showChart">
            <div class="contentmax-box">
                <div class="closemax" @click="showChart = false"></div>
                <div class="toptitlemax">
                    食物网结构
                </div>
                <div class="chartmax" ref="chartRef3"></div>
            </div>
        </div>
        <div class="top">
            <div class="top-left">
                <div class="toptitle" style="cursor: pointer;" @click="showChart = true">
                    食物网结构
                </div>
                <div class="container" ref="chartRef1"></div>
            </div>
            <div class="top-middle">
                <div class="toptitle">
                    食物网特征参数
                </div>
                <div class="container" ref="chartRef2"></div>
            </div>
            <div class="top-right">
                <div class="toptitle">
                    食物网监控状况等级
                </div>
                <div class="container">
                    <div class="container-top">
                        <div style="margin-bottom: 2vh;">当前状态：
                            <span :style="{ color: getColor('良') }">良 Ⅱ</span>
                        </div>
                    </div>
                    <div class="container-bottom">
                        <div class="container-bottom-left">
                            <div class="container-bottom-level">Ⅰ</div>
                            <div class="container-bottom-font">优</div>
                        </div>
                        <div class="container-bottom-middle">
                            <div class="container-bottom-level">Ⅱ</div>
                            <div class="container-bottom-font">良</div>
                        </div>
                        <div class="container-bottom-middle2">
                            <div class="container-bottom-level">Ⅲ</div>
                            <div class="container-bottom-font">中</div>
                        </div>
                        <div class="container-bottom-right">
                            <div class="container-bottom-level">Ⅳ</div>
                            <div class="container-bottom-font">差</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="toptitle">
                    食物网关键物种
                </div>
                <div class="container1">
                    <div class="content1 hq">方氏云鳚</div>
                    <div class="content1 hr">扁玉螺</div>
                    <div class="content1 hs">细纹狮子鱼</div>
                    <div class="content1 ht">口虾蛄</div>
                    <div class="content1 ha">牡蛎</div>
                    <div class="content1 hb">尖海龙</div>
                    <div class="content2 hc">其它蟹类</div>
                    <div class="content2 hd">中国蛤蜊</div>
                    <div class="content2 he">长蛇鲻</div>
                    <div class="content2 hf">脉红螺</div>
                    <div class="content3 hg">鰕虎鱼类</div>
                    <div class="content3 hi">头足类</div>
                    <div class="content3 hj">花鲈</div>
                    <div class="content3 hk">中上层鱼类</div>
                    <div class="content4 hl">半滑舌鳎</div>
                    <div class="content4 hm">虾类</div>
                    <div class="content5 hn">三疣梭子蟹</div>
                    <div class="content5 ho">日本蟳</div>
                    <div class="content5 hp">鲬</div>
                </div>
            </div>
            <div class="middle-middle">
                <div class="toptitle">
                    食物网不同营养级间能量传递情况
                </div>
                <div class="container3">
                    <div class="container3-content"></div>
                </div>
            </div>
            <div class="middle-right">
                <div class="toptitle">
                    生物量金字塔
                </div>
                <div class="middle-right-content" ref="chartRef4"></div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <div class="toptitle">
                    食物网中个生物所在营养级
                </div>
                <div class="container" ref="chartRef5"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import animal from '/public/data/animal.json'
import animal1 from '/public/data/animal1.json'
import appraise from '/public/data/评价指数.json'

const charts = [];
const chartRef1 = ref(null);
const chartRef2 = ref(null);
let initChart1 = () => {
    let chart = echarts.init(chartRef1.value);
    charts.push(() => {
        chart.dispose();
        initChart1();
    });
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
                data: animal.data.map(item => {
                    const colorMap = {
                        'red': ["浮游植物", "浮游动物", "海仙人掌"],
                        'orange': ["其它甲壳动物", "环节动物", "其它软体动物", "棘皮动物", "纵肋织纹螺", "扁玉螺", "经氏壳蛞蝓"],
                        '#f2cc01': ["中国蛤蜊", "牡蛎", "脉红螺"],
                        '#D6ee01': ["其它虾类", "其它蟹类", "日本蟳", "头足类", "三疣梭子蟹", "其它底层鱼类", "口虾蛄"],
                        '#01efef': ["碎屑", "方氏云鳚", "细纹狮子鱼", "尖海龙", "花鲈", "鲬", "长蛇鲻", "半滑舌鳎"],
                        '#75ff8d': ["鰕虎鱼类", "其它中上层鱼类"]
                    };
                    const sizeMap = {
                        "碎屑": 30,
                        "浮游植物": 24,
                        "其它软体动物": 27,
                        "中国蛤蜊": 27,
                        "浮游动物": 21,
                        "牡蛎": 18,
                        "棘皮动物": 18,
                        "其它虾类": 15,
                        "其它中上层鱼类": 15
                    };

                    let color = '#FFFFFF'; // 默认颜色
                    let size = 9; // 默认大小

                    for (const [key, values] of Object.entries(colorMap)) {
                        if (values.includes(item.name)) {
                            color = key;
                            size = sizeMap[item.name] || 9; // 根据项目名称设置大小，默认值为9
                            break;
                        }
                    }
                    // 根据 item.name 的长度计算 position 的第一个值
                    const positionOffset = -4 * Math.min(item.name.length, 6); // 限制最大长度为6
                    return {
                        ...item,
                        itemStyle: {
                            color: color,
                            borderColor: '#4085a6',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#CFEFFF',
                            position: [positionOffset, size],
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: [4, 4],
                            borderRadius: 4
                        },
                        symbolSize: size
                    };
                }),
                links: animal.links,
                lineStyle: {
                    opacity: 0.9,
                    width: 1,
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
            const updatedLinks = animal.links.map(link => {
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
                links: animal.links
            }]
        });
    });
};
const chartRef3 = ref(null);
let initChart3 = () => {
    let chart = echarts.init(chartRef3.value);
    charts.push(() => {
        chart.dispose();
        chartRef3();
    });
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
                data: animal1.data.map(item => {
                    const colorMap = {
                        'red': ["浮游植物", "浮游动物", "海仙人掌"],
                        'orange': ["其它甲壳动物", "环节动物", "其它软体动物", "棘皮动物", "纵肋织纹螺", "扁玉螺", "经氏壳蛞蝓"],
                        '#f2cc01': ["中国蛤蜊", "牡蛎", "脉红螺"],
                        '#D6ee01': ["其它虾类", "其它蟹类", "日本蟳", "头足类", "三疣梭子蟹", "其它底层鱼类", "口虾蛄"],
                        '#01efef': ["碎屑", "方氏云鳚", "细纹狮子鱼", "尖海龙", "花鲈", "鲬", "长蛇鲻", "半滑舌鳎"],
                        '#75ff8d': ["鰕虎鱼类", "其它中上层鱼类"]
                    };
                    const sizeMap = {
                        "碎屑": 30,
                        "浮游植物": 24,
                        "其它软体动物": 27,
                        "中国蛤蜊": 27,
                        "浮游动物": 21,
                        "牡蛎": 18,
                        "棘皮动物": 18,
                        "其它虾类": 15,
                        "其它中上层鱼类": 15
                    };

                    let color = '#FFFFFF'; // 默认颜色
                    let size = 9; // 默认大小

                    for (const [key, values] of Object.entries(colorMap)) {
                        if (values.includes(item.name)) {
                            color = key;
                            size = sizeMap[item.name] || 9; // 根据项目名称设置大小，默认值为9
                            break;
                        }
                    }
                    // 根据 item.name 的长度计算 position 的第一个值
                    const positionOffset = -4 * Math.min(item.name.length, 6); // 限制最大长度为6
                    return {
                        ...item,
                        itemStyle: {
                            color: color,
                            borderColor: '#4085a6',
                            borderWidth: 2
                        },
                        label: {
                            show: true,
                            color: '#CFEFFF',
                            position: [positionOffset, size],
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: [4, 4],
                            borderRadius: 4
                        },
                        symbolSize: size
                    };
                }),
                links: animal1.links,
                lineStyle: {
                    opacity: 0.9,
                    width: 1,
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
            const updatedLinks = animal1.links.map(link => {
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
                links: animal1.links
            }]
        });
    });
};
const showChart = ref(false);
let initChart2 = () => {
    let chart = echarts.init(chartRef2.value);
    charts.push(() => {
        chart.dispose();
        initChart2();
    });

    let dataMax = 4; // 判断索引，0差1重2良3优
    const Dataarr = [];

    const source = {
        data: appraise.评价指标.map(item => item.current_value),
        indicator: appraise.评价指标.map(item => ({
            name: item.name,
            max: dataMax,
            '优Ⅰ': item['优Ⅰ'],
            '良Ⅱ': item['良Ⅱ'],
            '中Ⅲ': item['中Ⅲ'],
            '差Ⅳ': item['差Ⅳ']
        }))
    };

    // 遍历每个数据项
    source.data.forEach((value, index) => {
        const indicator = source.indicator[index];
        if (indicator.name == '总初级生产量/总呼吸量' || indicator.name == '总初级生产量/总生物量') {
            if (value >= indicator['差Ⅳ']) {
                Dataarr.push(1);
            } else if (value < indicator['差Ⅳ'] && value >= indicator['中Ⅲ']) {
                Dataarr.push(1);
            } else if (value < indicator['中Ⅲ'] && value >= indicator['良Ⅱ']) {
                Dataarr.push(2);
            } else if (value < indicator['良Ⅱ'] && value > indicator['优Ⅰ']) {
                Dataarr.push(3);
            } else {
                Dataarr.push(4);
            }
        } else {
            if (value >= indicator['优Ⅰ']) {
                Dataarr.push(4); // 优Ⅰ
            } else if (value >= indicator['良Ⅱ'] && value < indicator['优Ⅰ']) {
                Dataarr.push(3); // 良Ⅱ
            } else if (value >= indicator['中Ⅲ'] && value < indicator['良Ⅱ']) {
                Dataarr.push(2); // 中Ⅲ
            } else if (value >= indicator['差Ⅳ'] && value < indicator['中Ⅲ']) {
                Dataarr.push(1); // 差Ⅳ
            } else {
                Dataarr.push(1); // 差Ⅳ
            }
        }
    });


    const buildSeries = function (data) {
        const helper = data.map((item, index) => {
            const arr = new Array(data.length);
            arr.splice(index, 1, item);
            return arr;
        });

        return [data, ...helper].map((item, index) => {
            return {
                type: 'radar',
                itemStyle: {
                    color: 'orange'
                },
                lineStyle: {
                    color: index === 0 ? 'orange' : 'transparent'
                },
                areaStyle: {
                    color: index === 0 ? 'orange' : 'transparent',
                    opacity: 0.3
                },
                tooltip: {
                    show: index === 0 ? false : true,
                    formatter: function () {
                        const indicatorIndex = index - 1; // 获取指标的索引
                        const indicator = appraise.评价指标[indicatorIndex]; // 获取原始指标数据
                        const currentValue = source.data[indicatorIndex]; // 获取当前值
                        let level = '差Ⅳ';
                        if (currentValue >= indicator['优Ⅰ']) {
                            level = '优Ⅰ';
                        } else if (currentValue >= indicator['良Ⅱ'] && currentValue < indicator['优Ⅰ']) {
                            level = '良Ⅱ';
                        } else if (currentValue >= indicator['中Ⅲ'] && currentValue < indicator['良Ⅱ']) {
                            level = '中Ⅲ';
                        } else if (currentValue >= indicator['差Ⅳ'] && currentValue < indicator['中Ⅲ']) {
                            level = '差Ⅳ';
                        } else {
                            level = '差Ⅳ';
                        }
                        if (indicator.name == '总初级生产量/总呼吸量' || indicator.name == '总初级生产量/总生物量') {
                            if (currentValue >= indicator['差Ⅳ']) {
                                level = '差Ⅳ';
                            } else if (currentValue < indicator['差Ⅳ'] && currentValue >= indicator['中Ⅲ']) {
                                level = '差Ⅳ';
                            } else if (currentValue < indicator['中Ⅲ'] && currentValue >= indicator['良Ⅱ']) {
                                level = '中Ⅲ';
                            } else if (currentValue < indicator['良Ⅱ'] && currentValue > indicator['优Ⅰ']) {
                                level = '良Ⅱ';
                            } else {
                                level = '优Ⅰ';
                            }
                        }
                        return `${indicator.name}：${currentValue}  ${level}`;
                    }
                },
                z: index === 0 ? 1 : 2,
                data: [item]
            };
        });
    };

    chart.setOption({
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: source.indicator.map(indicator => ({
                name: indicator.name,
                max: indicator.max,
                axisLabel: {
                    show: indicator.name === '连接指数' // 仅显示“连接指数”的轴标签
                }
            })),
            shape: 'circle',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: '#CFEFFF' // 设置指示器名称颜色
                }
            },
            axisLabel: {
                show: true,
                showMinLabel: false,
                color: '#FFFFFF',
                formatter: function (value) {
                    switch (value) {
                        case 1:
                            return '差';
                        case 2:
                            return '中';
                        case 3:
                            return '良';
                        case 4:
                            return '优';
                        default:
                            return '';
                    }
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#3B63D1', // 设置分割线颜色
                    width: 2,
                    type: 'dashed' // 设置为虚线
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#3B63D1' // 设置轴线颜色
                }
            },
            splitArea: {
                areaStyle: {
                    color: 'rgba(255, 255, 255, 0.1)' // 设置分割区域颜色
                }
            }
        },

        series: buildSeries(Dataarr)
    });
};
const getColor = (status) => {
    switch (status) {
        case '优':
            return '#78EC40';
        case '良':
            return '#3EA9F3';
        case '中':
            return '#FBED21';
        case '差':
            return '#E95925';
        default:
            return '#FFFFFF'; // 默认颜色
    }
};
const chartRef4 = ref(null);
let initChart4 = () => {
    let chart = echarts.init(chartRef4.value);
    charts.push(() => {
        chart.dispose();
        initChart4();
    });

    // 更新数据
    let data = [
        { value: 8.79, name: 'Ⅰ' },
        { value: 32.81, name: 'Ⅱ' },
        { value: 4.98, name: 'Ⅲ' },
        { value: 0.63, name: 'Ⅳ' }
    ];

    let sum = data.length; // 由于要等分，sum 直接用数据的数量

    let addUp = 0;
    let top = 5;
    let heightFactor = 2; // 增加高度的系数
    let color = ['RGBA(0,0,255,1)', 'RGBA(34,230,111, 1)', 'RGBA(209,155,16,1)', 'RGBA(255,0,0,1)']; // 添加颜色以适应四个数据

    data = data.map((item, index) => {
        let itemValue = (70 / sum) * heightFactor; // 每个项的高度等分并放大
        top += itemValue;
        return {
            value: addUp += itemValue,
            name: item.name,
            realValue: item.value,
            label: {
                show: true,
                color: '#CFEFFF',
                fontSize: 18,
                position: 'inside',
                formatter: () => {
                    return `${item.name} ${item.value} t/km²`;
                }
            },
            itemStyle: {
                height: `${itemValue}%`,
                borderColor: color[index],
                shadowColor: color[index],
                shadowBlur: 100
            }
        };
    });
    chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: (params) => {
                return `${params.name} ${params.value} t/km²`;
            }
        },
        color: [{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'RGBA(0,0,255,0.7)' // 0% 处的颜色
            }, {
                offset: 1, color: 'RGBA(0,0,255,0.2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        }, {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'RGBA(34,230,111, 0.5)' // 0% 处的颜色
            }, {
                offset: 1, color: 'RGBA(34,230,111, 0.2)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        }, {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'RGBA(209,155,16,0.5)' // 新颜色
            }, {
                offset: 1, color: 'RGBA(209,155,16,0.2)' // 新颜色
            }],
            global: false // 缺省为 false
        }, {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'RGBA(255,0,0,0.5)' // 新颜色
            }, {
                offset: 1, color: 'RGBA(255,0,0,0.2)' // 新颜色
            }],
            global: false // 缺省为 false
        }],
        series: [{
            type: 'funnel',
            sort: 'ascending',
            data: data,
            bottom: "5%"
        }]
    });
};
const chartRef5 = ref(null);
let initChart5 = () => {
    let chart = echarts.init(chartRef5.value);
    charts.push(() => {
        chart.dispose();
        initChart5();
    });
    let xAxisData = ['方氏云鳚', '小型甲壳动物', '长蛇鲻', '纵肋织纹螺', '口虾蛄', '细纹狮子鱼', '其它底层鱼类',
        '海仙人掌', '头足类', '扁玉螺', '其它蟹类', '半滑舌鳎', '花鲈', '尖海龙',
        '三疣梭子蟹', '鰕虎鱼类', '环节动物', '鲬', '脉红螺', '日本蟳', '经氏壳蛞蝓',
        '虾类', '浮游动物', '其它中上层鱼类', '中国蛤蜊', '牡蛎', '棘皮动物', '浮游植物',
        '其它软体动物'];

    let seriesData = [-1.92116, -1.69897, -1.57946, -1.54942, -1.50805, -1.47432, -1.45593,
    -1.39794, -1.22185, -1.08295, -1.0739, -0.96613, -0.9029, -0.84063,
    -0.69151, -0.67778, -0.46852, -0.43123, -0.22064, -0.1827, -0.18046,
        0.15062, 0.16137, 0.19285, 0.50515, 0.58092, 0.5977, 0.94399, 1.28353];

    chart.setOption({
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            left: '1%',
            right: '3%',
            bottom: '1%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: '#CFEFFF',
                    fontSize: 10
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 't/km²',
            nameTextStyle: {
                color: '#CFEFFF',
                fontSize: 12
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(0, 0, 0, 0.2)',
                    type: 'dashed'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#CFEFFF',
                    fontSize: 12
                }
            }
        },
        series: [{
            name: '生物量',
            type: 'bar',
            data: seriesData,
            itemStyle: {
                // 使用蓝色渐变
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#2196F3' }, // 深蓝色
                        { offset: 1, color: '#64B5F6' }  // 浅蓝色
                    ],
                    global: false // 缺省为 false
                }
            }
        }]
    });
};
const reloadChart = () => {
    charts.forEach((chart) => chart());
};
onMounted(() => {
    initChart1();
    initChart2();
    initChart3();
    initChart4();
    initChart5();
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
    background-image: url('../../assets/img/EcologicalGrid/middleleft.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-middle {
    width: 72.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middlemiddle.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-right {
    width: 54.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bottom-left {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/bottomleft.png');
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
    width: 6vh;
    position: absolute;
    bottom: 3vh;
    left: 7vh;
    font-size: 1.2vh;
}

.hb {
    width: 7vh;
    position: absolute;
    top: 6vh;
    left: 8vh;
    font-size: 1.2vh;
}

.hc {
    width: 8vh;
    position: absolute;
    top: 10vh;
    left: 4vh;
    font-size: 1.3vh;
}

.hd {
    width: 8vh;
    position: absolute;
    top: 10vh;
    right: 2vh;
    font-size: 1.3vh;
}

.he {
    width: 8vh;
    position: absolute;
    font-size: 1.3vh;
    left: 7vh;
    bottom: 8.5vh;
}

.hf {
    width: 8vh;
    position: absolute;
    top: 17vh;
    right: 9vh;
    font-size: 1.3vh;
}

.hg {
    width: 9vh;
    position: absolute;
    right: 18vh;
    bottom: 8vh;
    font-size: 1.4vh;
}

.hi {
    width: 8vh;
    position: absolute;
    right: 10vh;
    top: 4vh;
    font-size: 1.4vh;
}

.hj {
    width: 9vh;
    position: absolute;
    right: 13vh;
    bottom: 13vh;
    font-size: 1.4vh;
}

.hk {
    width: 11vh;
    position: absolute;
    left: 15vh;
    bottom: 14vh;
    font-size: 1.4vh;
}

.hl {
    width: 11vh;
    position: absolute;
    left: 28vh;
    bottom: 3vh;
    font-size: 1.6vh;
}

.hm {
    width: 10vh;
    position: absolute;
    right: 20vh;
    top: 5vh;
    font-size: 1.6vh;
}

.hn {
    width: 12vh;
    position: absolute;
    right: 32vh;
    top: 3vh;
    font-size: 1.8vh;
}

.ho {
    width: 10vh;
    position: absolute;
    left: 20vh;
    bottom: 8vh;
    font-size: 1.8vh;
}

.hp {
    width: 10vh;
    position: absolute;
    left: 28vh;
    top: 10vh;
    font-size: 2vh;
}

.hq {
    width: 7vh;
    position: absolute;
    right: 12vh;
    bottom: 1vh;
    font-size: 1vh;
}

.hr {
    width: 6vh;
    position: absolute;
    left: 15vh;
    bottom: 1.5vh;
    font-size: 1vh;
}

.hs {
    width: 8vh;
    position: absolute;
    left: 3vh;
    top: 2vh;
    font-size: 1.2vh;
}

.ht {
    width: 6vh;
    position: absolute;
    right: 4vh;
    top: 1.5vh;
    font-size: 1.2vh;
}

.middle-right-content {
    width: 100%;
    height: calc(100% - 3.5vh);
    padding: 2vh 1.5vh 1vh 1.5vh;
    box-sizing: border-box;
}

.container3 {
    width: 100%;
    height: calc(100% - 3.5vh);
    padding: 1.5vh 1vh 1vh 1vh;
    box-sizing: border-box;
}

.container3-content {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/贴图.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.container-top {
    margin-top: 1vh;
    width: 100%;
    height: 8vh;
    background-image: url('../../assets/img/EcologicalGrid/toprightstatus.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #C7E4FF;
    font-size: 1.8vh;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.2vh;
}

.container-top span {
    font-weight: bold;
    font-size: 2.2vh;
}

.container-bottom {
    width: 100%;
    height: 14vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.container-bottom-left {
    width: 13.5vh;
    height: 13.5vh;
    background-image: url('../../assets/img/EcologicalGrid/优.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.container-bottom-middle {
    width: 13.5vh;
    height: 13.5vh;
    background-image: url('../../assets/img/EcologicalGrid/良.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.container-bottom-middle2 {
    width: 13.5vh;
    height: 13.5vh;
    background-image: url('../../assets/img/EcologicalGrid/中.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.container-bottom-right {
    width: 13.5vh;
    height: 13.5vh;
    background-image: url('../../assets/img/EcologicalGrid/差.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.container-bottom-level {
    color: white;
    font-weight: bold;
    font-size: 2vh;
    position: absolute;
    left: 50%;
    top: 4vh;
    transform: translate(-50%);
}

.container-bottom-font {
    color: #C7E4FF;
    font-size: 1.8vh;
    position: absolute;
    bottom: 1.5vh;
    left: 50%;
    transform: translateX(-50%);
}

.contentmax {
    position: absolute;
    top: 9vh;
    width: 180vh;
    height: 88vh;
    z-index: 4;
    background-image: url('../../assets/img/EcologicalGrid/contentmaxback.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.contentmax-box {
    width: 180vh;
    height: 88vh;
    background-image: url('../../assets/img/EcologicalGrid/contentmax.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.chartmax {
    width: 180vh;
    height: 88vh;
}

.toptitlemax {
    width: 100%;
    height: 8.5vh;
    font-family: HYLingXinJ;
    font-weight: bold;
    font-size: 3vh;
    line-height: 8.5vh;
    color: #FEFFFF;
    text-align: center;
    background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.2vh;
    margin-left: 0.3vh;
    position: absolute;
}

.closemax {
    position: absolute;
    top: 2vh;
    right: 2vh;
    width: 4vh;
    height: 4vh;
    cursor: pointer;
    z-index: 5;
}
</style>
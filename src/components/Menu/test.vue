<template>
    <div>
        <div id="legend">
            <button @click="toggleComponentTitles"><span class="dot purple"></span> Commerce Components</button><br>
            <button @click="toggleProductTitles" class="button-dim"><span class="dot green"></span> Products</button><br>
            <button @click="toggleFeatureTitles" class="button-dim"><span class="dot blue"></span> Features</button>
        </div>
        <div id="3d-graph"
            :class="{ 'show-componentTitles': showComponentTitles, 'show-productTitles': showProductTitles, 'show-featureTitles': showFeatureTitles }">
        </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const showComponentTitles = ref(true);
const showProductTitles = ref(false);
const showFeatureTitles = ref(false);
const gDataFull = {
    nodes: [
        {
            id: 0,
            title: '综合指标',
            group: 1,
            productId: '综合指标',
        },
        {
            id: 1,
            title: '海湾生境-盐沼',
            group: 1,
            productId: '海湾生境-盐沼',
        },
        {
            id: 2,
            title: '海湾生境',
            group: 1,
            productId: '海湾生境',
        },
        {
            id: 3,
            title: '海湾生物',
            group: 1,
            productId: '海湾生物',
        },
        {
            id: 4,
            title: '威胁因素',
            group: 1,
            productId: '威胁因素',
        },
        {
            id: 5,
            title: '盐沼植被',
            group: 2,
            productId: '盐沼植被',
        },
        {
            id: 6,
            title: '生物群落',
            group: 2,
            productId: '生物群落',
        },
        {
            id: 7,
            title: '环境要素',
            group: 2,
            productId: '环境要素',
        },
        {
            id: 8,
            title: '盐沼面积',
            group: 2,
            productId: '盐沼面积',
        },
        {
            id: 9,
            title: '盐沼植被盖度',
            group: 2,
            productId: '盐沼植被盖度',
        },
        {
            id: 10,
            title: '盐沼植被宽度',
            group: 2,
            productId: '盐沼植被宽度',
        },
        {
            id: 11,
            title: '大型底栖生物密度',
            group: 2,
            productId: '大型底栖生物密度',
        },
        {
            id: 12,
            title: '大型底栖生物生物量',
            group: 2,
            productId: '大型底栖生物生物量',
        },
        {
            id: 13,
            title: '沉积物水溶性盐',
            group: 2,
            productId: '沉积物水溶性盐',
        },
        {
            id: 14,
            title: '沉积物pH',
            group: 2,
            productId: '沉积物pH',
        },
        {
            id: 15,
            title: '典型生态系统',
            group: 3,
            productId: '典型生态系统',
        },
        {
            id: 16,
            title: '沉积物',
            group: 3,
            productId: '',
        },
        {
            id: 17,
            title: '纳潮量水交换率',
            group: 3,
            productId: '',
        },
        {
            id: 18,
            title: '水中初级生产力',
            group: 3,
            productId: '',
        },
        {
            id: 19,
            title: '富营养化程度',
            group: 3,
            productId: '',
        },
        {
            id: 20,
            title: '牡蛎礁',
            group: 3,
            productId: '',
        },
        {
            id: 21,
            title: '密度',
            group: 3,
            productId: '',
        },
        {
            id: 22,
            title: '牡蛎补充量',
            group: 3,
            productId: '',
        },
        {
            id: 23,
            title: '礁体高度',
            group: 3,
            productId: '',
        },
        {
            id: 24,
            title: '活体斑块面积',
            group: 3,
            productId: '',
        },
        {
            id: 25,
            title: '硫化物',
            group: 3,
            productId: '',
        },
        {
            id: 26,
            title: '有机物',
            group: 3,
            productId: '',
        },
        {
            id: 27,
            title: '纳潮量',
            group: 3,
            productId: '',
        },
        {
            id: 28,
            title: '水交换率',
            group: 3,
            productId: '',
        },
        {
            id: 29,
            title: '鱼卵、仔鱼游泳动物',
            group: 4,
            productId: '',
        },
        {
            id: 30,
            title: '物种数量',
            group: 4,
            productId: '',
        },
        {
            id: 31,
            title: '植被面积',
            group: 4,
            productId: '',
        },
        {
            id: 32,
            title: '香农-维纳指数',
            group: 4,
            productId: '',
        },
        {
            id: 33,
            title: '鱼卵数量',
            group: 4,
            productId: '',
        },
        {
            id: 34,
            title: '仔鱼数量',
            group: 4,
            productId: '',
        },
        {
            id: 35,
            title: '游泳动物',
            group: 4,
            productId: '',
        },
        {
            id: 36,
            title: '浮游植物',
            group: 4,
            productId: '',
        },
        {
            id: 37,
            title: '浮游动物',
            group: 4,
            productId: '',
        },
        {
            id: 38,
            title: '大型底栖动物',
            group: 4,
            productId: '',
        },
        {
            id: 39,
            title: '干扰廊道',
            group: 5,
            productId: '',
        },
        {
            id: 40,
            title: '养殖面积',
            group: 5,
            productId: '',
        },
        {
            id: 41,
            title: '围填海面积',
            group: 5,
            productId: '',
        },
        {
            id: 42,
            title: '污水排放量',
            group: 5,
            productId: '',
        },
        {
            id: 43,
            title: '有害赤潮发生面积',
            group: 5,
            productId: '',
        },
        {
            id: 44,
            title: '干扰廊道总长度',
            group: 5,
            productId: '',
        },
        {
            id: 45,
            title: '海湾滩涂湿地面积',
            group: 5,
            productId: '',
        },

    ],
    links: [
        { source: 1, target: 0 },
        { source: 2, target: 0 },
        { source: 3, target: 0 },
        { source: 4, target: 0 },
        { source: 5, target: 1 },
        { source: 6, target: 1 },
        { source: 7, target: 1 },
        { source: 8, target: 5 }, { source: 9, target: 5 }, { source: 10, target: 5 },
        { source: 11, target: 6 }, { source: 12, target: 6 },
        { source: 13, target: 7 }, { source: 14, target: 7 },
        { source: 15, target: 2 }, { source: 16, target: 2 }, { source: 17, target: 2 }, { source: 18, target: 2 }, { source: 19, target: 2 },
        { source: 20, target: 15 }, { source: 1, target: 15 },
        { source: 21, target: 20 }, { source: 22, target: 20 }, { source: 23, target: 7 }, { source: 24, target: 7 },
        { source: 25, target: 16 }, { source: 26, target: 16 },
        { source: 27, target: 17 }, { source: 28, target: 17 },
        { source: 29, target: 3 }, { source: 30, target: 3 }, { source: 31, target: 3 }, { source: 32, target: 3 },
        { source: 33, target: 29 }, { source: 34, target: 29 }, { source: 35, target: 29 },
        { source: 36, target: 32 }, { source: 37, target: 32 }, { source: 38, target: 32 },
        { source: 39, target: 4 }, { source: 40, target: 4 }, { source: 41, target: 4 }, { source: 42, target: 4 }, { source: 43, target: 4 },
        { source: 44, target: 39 }, { source: 45, target: 39 },
    ],
}
let Graph;

onMounted(() => {
    // Initialize the graph
    Graph = ForceGraph3D({
        extraRenderers: [new CSS2DRenderer()],
    })(document.getElementById('3d-graph'))
        .graphData(gDataFull)
        .nodeRelSize(6)
        .nodeResolution(20)
        .nodeColor((node) => getNodeColor(node.group, 3))
        .nodeOpacity(1)
        .onNodeClick((node) => {
            updateSearchParam('node', node.title);
            moveCameraToNode(Graph, node);
        })
        .nodeThreeObject((node) => {
            const nodeEl = document.createElement('div');
            nodeEl.innerHTML = `<span>${node.title}</span>`;
            nodeEl.style.color = '#a1a1a1';
            nodeEl.className = 'node-label';
            nodeEl.classList.add(`group-${node.group}`);
            return new CSS2DObject(nodeEl);
        })
        .nodeThreeObjectExtend(true)
        .linkThreeObject((link) => {
            const linkSourceGroup = gDataFull.nodes.find(node => node.id === link.source);
            const linkTargetGroup = gDataFull.nodes.find(node => node.id === link.target);
            const colors = new Float32Array(
                [].concat(
                    ...getLinkColorArray(linkSourceGroup.group, linkTargetGroup.group).map(color => [
                        color[0] / 255,
                        color[1] / 255,
                        color[2] / 255,
                    ]),
                ),
            );

            const material = new THREE.LineBasicMaterial({
                vertexColors: true,
                opacity: 1,
                transparent: true,
            });
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            return new THREE.Line(geometry, material);
        });
});

onBeforeUnmount(() => {
    if (Graph) {
        Graph = null; // Cleanup the graph instance
    }
});

// Toggle functions
const toggleComponentTitles = () => {
    showComponentTitles.value = !showComponentTitles.value;
};

const toggleProductTitles = () => {
    showProductTitles.value = !showProductTitles.value;
};

const toggleFeatureTitles = () => {
    showFeatureTitles.value = !showFeatureTitles.value;
};

// Node color function
function getNodeColor(group, hover) {
    switch (group) {
        case 0:
            return `rgba(${hexToRGB('#dd9f27', true)},${hover / 3})`;
        case 1:
            return `rgba(${hexToRGB('#855fe2', true)},${hover / 3})`;
        case 2:
            return `rgba(${hexToRGB('#5372d2', true)},${hover / 3})`;
        case 3:
            return `rgba(${hexToRGB('#009a91', true)},${hover / 3})`;
        default:
            return `rgba(255, 255, 255, ${hover / 3})`; // Default color
    }
}

// Link color function
function getLinkColorArray(sourceGroup, targetGroup) {
    if (sourceGroup === 0) {
        if (targetGroup === 1) {
            return [hexToRGB('#896723', false), hexToRGB('#422b7a', false)];
        }
    } else if (sourceGroup === 1) {
        if (targetGroup === 0) {
            return [hexToRGB('#422b7a', false), hexToRGB('#896723', false)];
        } else if (targetGroup === 2) {
            return [hexToRGB('#381c7b', false), hexToRGB('#104a5c', false)];
        }
    } else if (sourceGroup === 2) {
        if (targetGroup === 3) {
            return [hexToRGB('#1d3377', false), hexToRGB('#104e4a', false)];
        } else if (targetGroup === 1) {
            return [hexToRGB('#104a5c', false), hexToRGB('#381c7b', false)];
        } else if (targetGroup === 2) {
            return [hexToRGB('#5372d2', false), hexToRGB('#5372d2', false)];
        }
    } else if (sourceGroup === 3) {
        if (targetGroup === 2) {
            return [hexToRGB('#104e4a', false), hexToRGB('#1d3377', false)];
        } else if (targetGroup === 3) {
            return [hexToRGB('#104e4a', false), hexToRGB('#104e4a', false)];
        } else if (targetGroup === 1) {
            return [hexToRGB('#104e4a', false), hexToRGB('#422b7a', false)];
        }
    }

    // Default return if no specific color found
    return [hexToRGB('#104e4a', false), hexToRGB('#1d3377', false)];
}

// Hex to RGB conversion function
function hexToRGB(h, isString) {
    let r = 0, g = 0, b = 0;

    // 3 digits
    if (h.length === 4) {
        r = '0x' + h[1] + h[1];
        g = '0x' + h[2] + h[2];
        b = '0x' + h[3] + h[3];
    } else if (h.length === 7) { // 6 digits
        r = '0x' + h[1] + h[2];
        g = '0x' + h[3] + h[4];
        b = '0x' + h[5] + h[6];
    }

    return isString ? `${+r},${+g},${+b}` : [+r, +g, +b];
}

// Update URL parameters
function updateSearchParam(paramName, paramValue) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(paramName, paramValue);
    const newUrl = `${window.location.origin}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, '', newUrl);
}

// Move camera to node
function moveCameraToNode(Graph, node) {
    const distance = 250;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    const newPos = {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio,
    };

    Graph.cameraPosition(newPos, node, 1500);
}
</script>

<style scoped>
.dot {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}

.dot.purple {
    background-color: rgb(198 142 255);
    color: #855fe2;
}

.dot.green {
    background-color: #4be3da;
}

.dot.blue {
    background-color: #7294ff;
}

#legend {
    position: absolute;
    display: block;
    z-index: 9999;
    top: 50px;
    color: aliceblue;
    font-family: 'Shopify Sans Web Medium';
}

#toggle {
    position: relative;
    display: block;
    /* z-index: 9999; */
}

#ProductToggle {
    position: relative;
    display: block;
    /* z-index: 9999; */
    /*top: 28px;*/
}

.node-label {
    font-size: 14px;
    /* padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5); */
    user-select: none;
    /* display: none; */
    opacity: 0;
    font-family: 'Shopify Sans Web Medium';
    font-weight: medium;
}

.node-label span {
    display: block;
    padding: 1px 4px;
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.8);
    transform: translateX(calc(50% + 20px));
    font-family: 'Shopify Sans Web Medium';
    font-weight: medium;
}

.group-0,
.group-1,
.group-2,
.group-3 {
    opacity: 0;
}

.show-title .group-0,
.show-title .group-1,
.show-title .group-3 {
    opacity: 1 !important;
}

.show-product .group-2 {
    opacity: 1 !important;
}

.show-productTitles .group-3 {
    opacity: 1 !important;
}

.show-featureTitles .group-2 {
    opacity: 1 !important;
}

.show-componentTitles .group-1 {
    opacity: 1 !important;
}

.highlight,
.show-product .highlight,
.show-title .highlight,
.show-componentTitles .highlight,
.show-featureTitles .highlight,
.show-productTitles .highlight {
    opacity: 1 !important;
}

.dim {
    opacity: 0 !important;
}

.show-title .dim {
    opacity: 0 !important;
}

.button-dim {
    opacity: 0.5 !important;
}

button {
    background-color: black;
    color: white;
    border: 0;
    margin: 5px 10px;
    padding: 10px 10px;
    border-radius: 12px;
    font-family: 'Shopify Sans Web Medium';
}

button>span {
    text-align: center;
    display: relative;
    vertical-align: middle;
}
</style>
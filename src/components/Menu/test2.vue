<template>
  <div class="testbox">
    <div id="3d-graph" class="graph-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import ForceGraph3D from "3d-force-graph";
import * as THREE from "three";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { UnrealBloomPass } from "https://esm.sh/three/examples/jsm/postprocessing/UnrealBloomPass.js";

// const props = defineProps({
//     gDataFulldata: {
//         type: Object,
//         default: () => {
//             return {
//                 nodes: [],
//                 links: [],
//             };
//         },
//     },
// });

let gDataFulldata = {
  nodes: [
    {
      id: 0,
      title: "综合评估",
      value: {
        综合指数: 86.875,
        健康状况: "稳定",
      },
      group: 1,
    },
    {
      id: 1,
      title: "海湾生境-盐沼",
      value: 25.0,
      group: 1,
    },
    {
      id: 2,
      title: "海湾生境",
      value: 38.125,
      group: 1,
    },
    {
      id: 3,
      title: "海湾生物",
      value: 28.75,
      group: 1,
    },
    {
      id: 4,
      title: "威胁因素",
      value: 20.0,
      group: 1,
    },
    {
      id: 5,
      title: "盐沼植被",
      value: 30,
      group: 2,
    },
    {
      id: 6,
      title: "生物群落",
      value: 20,
      group: 2,
    },
    {
      id: 7,
      title: "环境要素",
      value: "NaN",
      group: 2,
    },
    {
      id: 8,
      title: "盐沼面积",
      value: {
        基准值: 91.38,
        isSelected: true,
        评估年份值: 91.38,
      },
      group: 2,
    },
    {
      id: 9,
      title: "盐沼植被盖度",
      value: {
        基准值: 0,
        isSelected: false,
        评估年份值: 0,
      },
      group: 2,
    },
    {
      id: 10,
      title: "盐沼植被宽度",
      value: {
        基准值: 20,
        isSelected: true,
        评估年份值: 20,
      },
      group: 2,
    },
    {
      id: 11,
      title: "大型底栖动物密度",
      value: {
        基准值: 271,
        isSelected: true,
        评估年份值: 462,
      },
      group: 2,
    },
    {
      id: 12,
      title: "大型底栖动物生物量",
      value: {
        基准值: 38.13,
        isSelected: true,
        评估年份值: 13.06,
      },
      group: 2,
    },
    {
      id: 13,
      title: "沉积物水溶性盐",
      value: {
        赋值: 0,
        isSelected: false,
        评估年份值: 0,
      },
      group: 2,
    },
    {
      id: 14,
      title: "沉积物pH",
      value: {
        赋值: 1,
        isSelected: true,
        评估年份值: 9.16,
      },
      group: 2,
    },
    {
      id: 15,
      title: "典型生态系统",
      value: "NaN",
      group: 3,
    },
    {
      id: 16,
      title: "沉积物",
      value: "NaN",
      group: 3,
    },
    {
      id: 17,
      title: "纳潮量水交换率",
      value: "NaN",
      group: 3,
    },
    {
      id: 18,
      title: "水中初级生产力",
      value: {
        isSelected: true,
        评估年份各初级生产力平均值: 157.5,
        参照中处理生产力: 184,
      },
      group: 3,
    },
    {
      id: 19,
      title: "富营养化程度",
      value: {
        各站位平均值: 0.3,
        isSelected: true,
      },
      group: 3,
    },
    {
      id: 20,
      title: "牡蛎礁",
      value: 40,
      group: 3,
    },
    {
      id: 21,
      title: "密度",
      value: {
        基准值: 3097.6,
        isSelected: true,
        评估年份值: 3260.8,
      },
      group: 3,
    },
    {
      id: 22,
      title: "牡蛎补充量",
      value: {
        基准值: 0,
        isSelected: false,
        评估年份值: 0,
      },
      group: 3,
    },
    {
      id: 23,
      title: "礁体高度",
      value: {
        基准值: 0,
        isSelected: false,
        评估年份值: 0,
      },
      group: 3,
    },
    {
      id: 24,
      title: "活体斑块面积",
      value: {
        基准值: 20000,
        isSelected: false,
        评估年份值: 0,
      },
      group: 3,
    },
    {
      id: 25,
      title: "硫化物",
      value: {
        各站位平均值: 0.47,
        isSelected: true,
      },
      group: 3,
    },
    {
      id: 26,
      title: "有机物",
      value: {
        各站位平均值: 52.95,
        isSelected: true,
      },
      group: 3,
    },
    {
      id: 27,
      title: "纳潮量",
      value: {
        isSelected: true,
        参照系: 144000000,
        评估年份值: 144000000,
      },
      group: 3,
    },
    {
      id: 28,
      title: "水交换率",
      value: {
        isSelected: true,
        参照系: 64,
        评估年份值: 64,
      },
      group: 3,
    },
    {
      id: 29,
      title: "鱼卵、仔鱼游泳动物",
      value: 40,
      group: 4,
    },
    {
      id: 30,
      title: "物种数量",
      value: {
        参照中生物物种数量: 199,
        isSelected: true,
        评估年份数据合计: 172,
      },
      group: 4,
    },
    {
      id: 31,
      title: "植被面积",
      value: {
        isSelected: true,
        评估年份: 91.38,
        参照系: 91.38,
      },
      group: 4,
    },
    {
      id: 32,
      title: "香农-维纳指数",
      value: 25,
      group: 4,
    },
    {
      id: 33,
      title: "鱼卵数量",
      value: {
        isSelected: true,
        评估年份: 14.63,
        参照系: 4.8,
      },
      group: 4,
    },
    {
      id: 34,
      title: "仔鱼数量",
      value: {
        isSelected: true,
        评估年份: 10.68,
        参照系: 1.9,
      },
      group: 4,
    },
    {
      id: 35,
      title: "游泳动物",
      value: {
        isSelected: true,
        评估年份: 2546,
        参照系: 40.6,
      },
      group: 4,
    },
    {
      id: 36,
      title: "浮游植物",
      value: {
        isSelected: true,
        "香农-维纳指数H'": 2.46,
      },
      group: 4,
    },
    {
      id: 37,
      title: "浮游动物",
      value: {
        isSelected: true,
        "香农-维纳指数H'": 1.65,
      },
      group: 4,
    },
    {
      id: 38,
      title: "大型底栖动物",
      value: {
        isSelected: true,
        "香农-维纳指数H'": 1.66,
      },
      group: 4,
    },
    {
      id: 39,
      title: "干扰廊道",
      value: 20,
      group: 5,
    },
    {
      id: 40,
      title: "养殖面积",
      value: {
        基准值: 89.6,
        isSelected: true,
        评估年份: 89.6,
      },
      group: 5,
    },
    {
      id: 41,
      title: "围填海面积",
      value: {
        isSelected: true,
        评估年份: 90.1,
        参照系: 90.1,
      },
      group: 5,
    },
    {
      id: 42,
      title: "污水排放量",
      value: {
        基准值: 0,
        isSelected: false,
        评估年份: 0,
      },
      group: 5,
    },
    {
      id: 43,
      title: "有害赤潮发生面积",
      value: {
        基准值: 0,
        isSelected: false,
        评估年份: 0,
      },
      group: 5,
    },
    {
      id: 44,
      title: "干扰廊道总长度",
      value: {
        isSelected: true,
        评估年份: 268.7,
        参照系: 268.7,
      },
      group: 5,
    },
    {
      id: 45,
      title: "海湾滩涂湿地面积",
      value: {
        isSelected: true,
        评估年份: 35.8,
        参照系: 35.8,
      },
      group: 5,
    },
  ],
  links: [
    {
      source: 1,
      target: 0,
    },
    {
      source: 2,
      target: 0,
    },
    {
      source: 3,
      target: 0,
    },
    {
      source: 4,
      target: 0,
    },
    {
      source: 5,
      target: 1,
    },
    {
      source: 6,
      target: 1,
    },
    {
      source: 7,
      target: 1,
    },
    {
      source: 8,
      target: 5,
    },
    {
      source: 9,
      target: 5,
    },
    {
      source: 10,
      target: 5,
    },
    {
      source: 11,
      target: 6,
    },
    {
      source: 12,
      target: 6,
    },
    {
      source: 13,
      target: 7,
    },
    {
      source: 14,
      target: 7,
    },
    {
      source: 15,
      target: 2,
    },
    {
      source: 16,
      target: 2,
    },
    {
      source: 17,
      target: 2,
    },
    {
      source: 18,
      target: 2,
    },
    {
      source: 19,
      target: 2,
    },
    {
      source: 20,
      target: 15,
    },
    {
      source: 1,
      target: 15,
    },
    {
      source: 21,
      target: 20,
    },
    {
      source: 22,
      target: 20,
    },
    {
      source: 23,
      target: 20,
    },
    {
      source: 24,
      target: 20,
    },
    {
      source: 25,
      target: 16,
    },
    {
      source: 26,
      target: 16,
    },
    {
      source: 27,
      target: 17,
    },
    {
      source: 28,
      target: 17,
    },
    {
      source: 29,
      target: 3,
    },
    {
      source: 30,
      target: 3,
    },
    {
      source: 31,
      target: 3,
    },
    {
      source: 32,
      target: 3,
    },
    {
      source: 33,
      target: 29,
    },
    {
      source: 34,
      target: 29,
    },
    {
      source: 35,
      target: 29,
    },
    {
      source: 36,
      target: 32,
    },
    {
      source: 37,
      target: 32,
    },
    {
      source: 38,
      target: 32,
    },
    {
      source: 39,
      target: 4,
    },
    {
      source: 40,
      target: 4,
    },
    {
      source: 41,
      target: 4,
    },
    {
      source: 42,
      target: 4,
    },
    {
      source: 43,
      target: 4,
    },
    {
      source: 44,
      target: 39,
    },
    {
      source: 45,
      target: 39,
    },
  ],
};

let gDataFull;
let Graph;

const highlightNodes = new Set();
const highlightLinks = new Set();
let hoverNode = null;
const highlightTitles = ref([
  "综合评估",
  "海湾生物",
  "威胁因素",
  "海湾生境",
  "海湾生境-盐沼",
]);
const onNodeHoverHandler = (node) => {
  if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

  // 清空高光状态
  highlightNodes.clear();
  highlightLinks.clear();

  if (node) {
    // 高光当前节点及其邻居
    highlightNodes.add(node);
    if (node.neighbors) {
      node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
      node.links.forEach((link) => highlightLinks.add(link));
    }

    // 鼠标悬停时清空 `highlightTitles` 的高光效果
    highlightTitles.value = [];
  } else {
    // 鼠标移开时恢复 `highlightTitles` 的高光效果
    highlightTitles.value = [
      "综合评估",
      "海湾生物",
      "威胁因素",
      "海湾生境",
      "海湾生境-盐沼",
    ];
  }

  hoverNode = node || null;

  updateHighlight();
};
function updateHighlight() {
  Graph.nodeColor(Graph.nodeColor())
    .nodeThreeObject(Graph.nodeThreeObject())
    .linkThreeObject(Graph.linkThreeObject());
}
const processGraphData = () => {
  gDataFull.links.forEach((link) => {
    const a = gDataFull.nodes[link.source];
    const b = gDataFull.nodes[link.target];
    !a.neighbors && (a.neighbors = []);
    !b.neighbors && (b.neighbors = []);
    a.neighbors.push(b);
    b.neighbors.push(a);

    !a.links && (a.links = []);
    !b.links && (b.links = []);
    a.links.push(link);
    b.links.push(link);
  });
};

const handleResize = () => {
  if (Graph) {
    const container = document.getElementById("3d-graph");
    const width = container.clientWidth;
    const height = container.clientHeight;
    Graph.width(width).height(height); // 更新图形的宽高
  }
};

const initializeGraph = () => {
  const container = document.getElementById("3d-graph");
  const width = container.clientWidth; // 获取容器的宽度
  const height = container.clientHeight; // 获取容器的高度
  Graph = ForceGraph3D({
    extraRenderers: [new CSS2DRenderer()],
  })(document.getElementById("3d-graph"))
    .graphData(gDataFull)
    .height(height) //画布高度
    .width(width) //画布宽度
    .backgroundColor("rgba(8,34,64,0)") //画布背景色
    .showNavInfo(false) //禁用页脚
    .nodeRelSize(6)
    .nodeResolution(20)
    .nodeColor((node) =>
      highlightNodes.size
        ? highlightNodes.has(node)
          ? node === hoverNode
            ? getNodeColor(node.group, 3)
            : getNodeColor(node.group, 2.5)
          : getNodeColor(node.group, 0.5)
        : getNodeColor(node.group, 3)
    )
    .nodeOpacity(1)
    .linkDirectionalArrowLength(6)
    .onNodeClick((node) => {
      const distance = 250;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
      const newPos =
        node.x || node.y || node.z
          ? {
              x: node.x * distRatio,
              y: node.y * distRatio,
              z: node.z * distRatio,
            }
          : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

      Graph.cameraPosition(newPos, node, 1500); // ms transition duration
    })
    .nodeThreeObject((node) => {
      const nodeEl = document.createElement("div");

      let content = `<span>${node.title}</span><br>`;
      if (typeof node.value === "object" && node.value !== null) {
        for (const [key, val] of Object.entries(node.value)) {
          if (key === "isSelected") continue;
          content += `${key}: ${val}<br>`;
        }
      } else {
        content += `Value: ${node.value}<br>`;
      }

      nodeEl.innerHTML = content;

      const isHighlightedTitle = highlightTitles.value.includes(node.title);

      nodeEl.style.color =
        isHighlightedTitle || highlightNodes.has(node) ? "#ffffff" : "transparent";
      nodeEl.style.backgroundColor =
        isHighlightedTitle || highlightNodes.has(node)
          ? "rgba(0, 0, 0, 0.8)"
          : "transparent";
      nodeEl.style.padding = isHighlightedTitle || highlightNodes.has(node) ? "1vh" : "0";
      nodeEl.style.fontSize =
        isHighlightedTitle || highlightNodes.has(node) ? "1.2vh" : "0";
      nodeEl.style.borderRadius = "2vh";
      nodeEl.style.marginLeft = "6vh";
      nodeEl.className = `node-label group-${node.group} `;

      if (highlightNodes.size && (isHighlightedTitle || highlightNodes.has(node))) {
        nodeEl.classList.add("highlight");
      } else if (highlightNodes.size) {
        nodeEl.classList.add("dim");
      }
      return new CSS2DObject(nodeEl);
    })

    .nodeThreeObjectExtend(true)
    .onNodeHover(onNodeHoverHandler)
    .linkThreeObject((link) => {
      const linkSourceGroup = gDataFull.nodes[link.source]
        ? gDataFull.nodes[link.source].group
        : gDataFull.nodes[link.source.id].group;
      const linkTargetGroup = gDataFull.nodes[link.target]
        ? gDataFull.nodes[link.target].group
        : gDataFull.nodes[link.target.id].group;
      const colors = new Float32Array(
        [].concat(
          ...getLinkColorArray(linkSourceGroup, linkTargetGroup).map((color) => [
            color[0] / 255,
            color[1] / 255,
            color[2] / 255,
          ])
        )
      );

      const opacity = highlightLinks.size ? (highlightLinks.has(link) ? 1 : 0.25) : 1;

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        opacity: opacity,
        transparent: true,
      });
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(2 * 3), 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      return new THREE.Line(geometry, material);
    })
    .linkPositionUpdate((line, { start, end }) => {
      if (!Graph) return;
      const startR = Graph.nodeRelSize();
      const endR = Graph.nodeRelSize();
      const lineLen = Math.sqrt(
        ["x", "y", "z"]
          .map((dim) => Math.pow((end[dim] || 0) - (start[dim] || 0), 2))
          .reduce((acc, v) => acc + v, 0)
      );

      const linePos = line.geometry.getAttribute("position");

      linePos.set(
        [startR / lineLen, 1 - endR / lineLen]
          .map((t) =>
            ["x", "y", "z"].map((dim) => start[dim] + (end[dim] - start[dim]) * t)
          )
          .flat()
      );
      linePos.needsUpdate = true;
      return true;
    });
  processGraphData();

  const bloomPass = new UnrealBloomPass();
  bloomPass.strength = 1.5;
  bloomPass.radius = 1;
  bloomPass.threshold = 0.1;
  Graph.postProcessingComposer().addPass(bloomPass);

  function getNodeColor(group, hover) {
    switch (group) {
      case 1:
        return `rgba(${hexToRGB("#dd9f27", true)},${hover / 3})`;
      case 2:
        return `rgba(${hexToRGB("#855fe2", true)},${hover / 3})`;
      case 3:
        return `rgba(${hexToRGB("#5372d2", true)},${hover / 3})`;
      case 4:
        return `rgba(${hexToRGB("#009a91", true)},${hover / 3})`;
      case 5:
        return `rgba(${hexToRGB("#009a91", true)},${hover / 3})`;
    }
  }

  function getLinkColorArray(sourceGroup, targetGroup) {
    if (sourceGroup === 0) {
      if (targetGroup === 1) {
        return [hexToRGB("#896723", false), hexToRGB("#422b7a", false)];
      }
    } else if (sourceGroup === 1) {
      if (targetGroup === 0) {
        return [hexToRGB("#422b7a", false), hexToRGB("#896723", false)];
      } else if (targetGroup === 2) {
        return [hexToRGB("#381c7b", false), hexToRGB("#104a5c", false)];
      }
    } else if (sourceGroup === 2) {
      if (targetGroup === 3) {
        return [hexToRGB("#1d3377", false), hexToRGB("#104e4a", false)];
      } else if (targetGroup === 1) {
        return [hexToRGB("#104a5c", false), hexToRGB("#381c7b", false)];
      } else if (targetGroup === 2) {
        return [hexToRGB("#5372d2", false), hexToRGB("#5372d2", false)];
      }
    } else if (sourceGroup === 3) {
      if (targetGroup === 2) {
        return [hexToRGB("#104e4a", false), hexToRGB("#1d3377", false)];
      } else if (sourceGroup === 3) {
        if (targetGroup === 2) {
          return [hexToRGB("#104e4a", false), hexToRGB("#1d3377", false)];
        } else if (targetGroup === 3) {
          return [hexToRGB("#104e4a", false), hexToRGB("#104e4a", false)];
        } else if (targetGroup === 1) {
          return [hexToRGB("#104e4a", false), hexToRGB("#422b7a", false)];
        }
      }
    }

    // we need to return something if TargetGroup has no value
    return [hexToRGB("#104e4a", false), hexToRGB("#1d3377", false)];
  }

  function hexToRGB(h, isString) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length === 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
    } else if (h.length === 7) {
      // 6 digits
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return isString ? `${+r},${+g},${+b}` : [+r, +g, +b];
  }
};

onMounted(() => {
  gDataFull = gDataFulldata; // 获取数据
  initializeGraph();
  window.addEventListener("resize", handleResize); // 添加窗口大小变化监听
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize); // 移除监听
  if (Graph) {
    Graph = null;
  }
});
</script>

<style scoped>
:deep(.graph-container) {
  width: 100%;
  height: 100vh;
}

body {
  position: relative;
  margin: 0;
}

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
  font-family: "Shopify Sans Web Medium";
}

#toggle {
  position: relative;
  display: block;
}

#ProductToggle {
  position: relative;
  display: block;
}

.node-label {
  font-size: 14px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  user-select: none;
  display: none;
  opacity: 0;
  font-family: "Shopify Sans Web Medium";
  font-weight: medium;
}

.node-label span {
  display: block;
  padding: 1px 4px;
  border-radius: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateX(calc(50% + 20px));
  font-family: "Shopify Sans Web Medium";
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
  font-family: "Shopify Sans Web Medium";
}

button > span {
  text-align: center;
  display: relative;
  vertical-align: middle;
}
</style>

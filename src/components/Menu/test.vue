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

const props = defineProps({
  gDataFulldata: {
    type: Object,
    default: () => {
      return {
        nodes: [],
        links: [],
      };
    },
  },
});

let gDataFull;
let Graph;

const highlightNodes = new Set();
const highlightLinks = new Set();
let hoverNode = null;

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

// 监听 gDataFulldata 的变化
watch(
  () => props.gDataFulldata,
  (newData) => {
    if (newData && newData.nodes.length > 0) {
      gDataFull = newData; // 获取数据
      processGraphData(); // 处理数据
      initializeGraph(); // 初始化图形
    }
  },
  { immediate: true }
); // immediate: true 确保在组件挂载时也会执行一次
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

      // 构建节点标题
      let content = `<span>${node.title}</span><br>`;

      // 检查 value 是否为对象
      if (typeof node.value === "object" && node.value !== null) {
        // 遍历 value 对象的每个属性
        for (const [key, val] of Object.entries(node.value)) {
          // 跳过 isSelected 属性
          if (key === "isSelected") continue;
          content += `${key}: ${val}<br>`;
        }
      } else {
        // 如果 value 不是对象，直接显示
        content += `Value: ${node.value}<br>`;
      }

      nodeEl.innerHTML = content;

      const highlightTitles = [
        "综合评估",
        "海湾生物",
        "威胁因素",
        "海湾生境",
        "海湾生境-盐沼",
      ];
      const isHighlightedTitle = highlightTitles.includes(node.title);

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
    .onNodeHover((node) => {
      if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

      highlightNodes.clear();
      highlightLinks.clear();
      if (node) {
        highlightNodes.add(node);
        if (node.neighbors) {
          node.neighbors.forEach((neighbor) => highlightNodes.add(neighbor));
          node.links.forEach((link) => highlightLinks.add(link));
        }
      }

      hoverNode = node || null;

      updateHighlight();
    })
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

  const bloomPass = new UnrealBloomPass();
  bloomPass.strength = 1.5;
  bloomPass.radius = 1;
  bloomPass.threshold = 0.1;
  Graph.postProcessingComposer().addPass(bloomPass);

  function updateHighlight() {
    // trigger update of highlighted objects in scene
    Graph.nodeColor(Graph.nodeColor())
      .nodeThreeObject(Graph.nodeThreeObject())
      .linkThreeObject(Graph.linkThreeObject());
  }

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
  height: 36vh;
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

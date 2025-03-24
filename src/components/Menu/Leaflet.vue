<template>
    <div class="container">
        <div @click="emit('closeLeaflet')"></div>
        <div id="map" class="map"></div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const emit = defineEmits(["closeLeaflet"]);

// 计算贝塞尔曲线上的点
function bezierCurvePoints(start, control, end, numPoints = 100) {
    let points = [];
    for (let t = 0; t <= 1; t += 1 / numPoints) {
        let x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * control[0] + t * t * end[0];
        let y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * control[1] + t * t * end[1];
        points.push([x, y]);
    }
    return points;
}

// 获取子路径
function getSubPath(points, progress, length = 20) {
    let startIdx = Math.floor(progress * points.length);
    let endIdx = Math.min(startIdx + length, points.length - 1);
    return points.slice(startIdx, endIdx);
}

onMounted(() => {
    const map = L.map("map").setView([45, 0], 3);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
    }).addTo(map);

    const chinaCoords = [35.8617, 104.1954];
    const canadaCoords = [56.1304, -106.3468];

    // 计算贝塞尔曲线的控制点（增加偏移形成弧线）
    const controlPoint = [(chinaCoords[0] + canadaCoords[0]) / 2 + 20, (chinaCoords[1] + canadaCoords[1]) / 2];

    // 生成贝塞尔曲线上的点
    const curvedPathPoints = bezierCurvePoints(chinaCoords, controlPoint, canadaCoords);

    // 1. 添加底色曲线（淡色背景）
    L.polyline(curvedPathPoints, { color: "#cccccc", weight: 3, opacity: 0.5 }).addTo(map);

    // 2. 添加流动曲线
    let progress = 0;
    let gradientPolyline = L.polyline(getSubPath(curvedPathPoints, progress), { weight: 5 }).addTo(map);

    function animateGradientFlow() {
        progress += 0.005; // 速度调整
        if (progress > 1) progress = 0;

        const subPath = getSubPath(curvedPathPoints, progress);
        gradientPolyline.setLatLngs(subPath);

        requestAnimationFrame(animateGradientFlow);
    }

    animateGradientFlow(); // 启动动画

    // 添加标记点
    L.marker(chinaCoords).addTo(map).bindPopup("中国").openPopup();
    L.marker(canadaCoords).addTo(map).bindPopup("加拿大").openPopup();

    // 适应视图
    map.fitBounds(L.polyline(curvedPathPoints).getBounds());
});
</script>

<style scoped>
.container {
    width: 63vw;
    height: 75vh;
    padding: 1vh;
    position: absolute;
    z-index: 10;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #00a2ff5d;
}

.map {
    width: 100%;
    height: 100%;
}
</style>

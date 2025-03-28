<template>
    <div class="container">
        <div @click="emit('closeLeaflet')"></div>
        <!-- <div id="map" class="map"></div> -->
        <div id="lmap"></div>
        <div id="amap"></div>
    </div>
</template>

<script setup>
import { onMounted, defineEmits,shallowRef } from "vue";
import AMapLoader from '@amap/amap-jsapi-loader'
import L from 'leaflet'
import 'leaflet-customlayer'
import "leaflet/dist/leaflet.css";

const emit = defineEmits(["closeLeaflet"]);
let map,
  amap = shallowRef(null)

// let basemap = L.tileLayer(
//   'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
//   {
//     subdomains: ['1', '2', '3', '4']
//     // detectRetina: true
//   }
// )

const init = () => {
  return new Promise((resolve, reject) => {
    map = L.map('lmap', {
      center: [37.23, 122.2],
      zoom: 10,
      minZoom: 7,
    //   layers: [basemap],
      zoomControl: false,
      inertia: false
    })
    let attribution = map.attributionControl
    //替换默认的leaflet前缀改为自定义的logo和文字
    attribution.setPrefix('')
    attribution.addAttribution('审图号：GS (2023)4677号')
    // app.provide('lmap', map)
    resolve(map)
  })
}

const addAmap = () => {
  return new Promise((resolve, reject) => {
    window._AMapSecurityConfig = {
      securityJsCode: 'f71b61c90792e774376e6e05515b41bb'
    }
    AMapLoader.load({
      key: '2e0ca96566abc4371f8ed63117dff4ed',
      version: '2.0',
      plugins: []
    })
      .then(AMap => {
        amap = new AMap.Map('amap', {
          zoomEnable: true,
          dragEnable: true,
          resizeEnable: false,
          animateEnable: false,
          jogEnable: false,
          terrain: true
        })
        var position = new AMap.LngLat(122.2, 37.23)
        amap.setCenter(position)
        amap.setZoom(9)
        var styleName = 'amap://styles/darkblue'
        amap.setMapStyle(styleName)
        resolve(amap)
      })
      .catch(e => {
        console.error(e)
      })
  })
}

const addCustomLayer = () => {
  var customLayer = new L.customLayer({
    container: document.getElementById('amap'), // The DomElement object to display.
    zoom: 10,
    minZoom: 7,
    opacity: 1, // Opacity of the layer.
    visible: true, // Visible of the layer.
    zIndex: 1 // The explicit zIndex of the layer.
  })

  customLayer.on('layer-beforemount', function () {
    // console.log('layerBeforeMount')
  })

  customLayer.on('layer-mounted', function () {
    // console.log('layerMounted')
  })

  customLayer.on('layer-render', function (e) {
    if (!!amap) {
      // let azoom = amap.getZoom()
      amap.setZoomAndCenter(
        e.target._zoom,
        [e.target._center.lng, e.target._center.lat],
        true
      )
    }
  })

  customLayer.on('layer-beforedestroy', function () {
    // console.log('layerBeforeDestroy')
  })

  customLayer.on('layer-destroyed', function () {
    // console.log('layerDestroyed')
  })
  customLayer.addTo(map)
}

onMounted(async () => {
  await init()
  await addAmap()
  addCustomLayer()
})

// // 计算贝塞尔曲线上的点
// function bezierCurvePoints(start, control, end, numPoints = 100) {
//     let points = [];
//     for (let t = 0; t <= 1; t += 1 / numPoints) {
//         let x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * control[0] + t * t * end[0];
//         let y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * control[1] + t * t * end[1];
//         points.push([x, y]);
//     }
//     return points;
// }

// // 获取子路径
// function getSubPath(points, progress, length = 20) {
//     let startIdx = Math.floor(progress * points.length);
//     let endIdx = Math.min(startIdx + length, points.length - 1);
//     return points.slice(startIdx, endIdx);
// }

// onMounted(() => {
//     const map = L.map("map").setView([45, 0], 3);
//     L.tileLayer("https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}", {
//         maxZoom: 19,
//         attribution: "© OpenStreetMap",
//     }).addTo(map);

//     const chinaCoords = [35.8617, 104.1954];
//     const canadaCoords = [56.1304, -106.3468];

//     // 计算贝塞尔曲线的控制点（增加偏移形成弧线）
//     const controlPoint = [(chinaCoords[0] + canadaCoords[0]) / 2 + 20, (chinaCoords[1] + canadaCoords[1]) / 2];

//     // 生成贝塞尔曲线上的点
//     const curvedPathPoints = bezierCurvePoints(chinaCoords, controlPoint, canadaCoords);

//     // 1. 添加底色曲线（淡色背景）
//     L.polyline(curvedPathPoints, { color: "#cccccc", weight: 3, opacity: 0.5 }).addTo(map);

//     // 2. 添加流动曲线
//     let progress = 0;
//     let gradientPolyline = L.polyline(getSubPath(curvedPathPoints, progress), { weight: 5 }).addTo(map);

//     function animateGradientFlow() {
//         progress += 0.005; // 速度调整
//         if (progress > 1) progress = 0;

//         const subPath = getSubPath(curvedPathPoints, progress);
//         gradientPolyline.setLatLngs(subPath);

//         requestAnimationFrame(animateGradientFlow);
//     }

//     animateGradientFlow(); // 启动动画

//     // 添加标记点
//     L.marker(chinaCoords).addTo(map).bindPopup("中国").openPopup();
//     L.marker(canadaCoords).addTo(map).bindPopup("加拿大").openPopup();

//     // 适应视图
//     map.fitBounds(L.polyline(curvedPathPoints).getBounds());
// });
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

/* .map {
    width: 100%;
    height: 100%;
} */

#lmap {
  width: 100%;
  height: calc(100%);
  z-index: 2;
  background: rgba(0, 0, 0, 0);
}
#amap {
  position: absolute;
  bottom: 0;
  width: 63vw;
  height: 75vh;
  pointer-events: none;
  z-index: 1;
}
</style>

<template>
  <div class="container">
    <div @click="emit('closeLeaflet')"></div>
    <!-- <div id="map" class="map"></div> -->
    <div id="lmap"></div>
    <div id="amap"></div>
  </div>
</template>

<script setup>
import { onMounted, defineEmits, shallowRef } from "vue";
import AMapLoader from '@amap/amap-jsapi-loader'
import L from 'leaflet'
import 'leaflet-customlayer'
import "leaflet/dist/leaflet.css";
import '../../js/leafletLine.js'

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
      minZoom: 2,
      //   layers: [basemap],
      zoomControl: false,
      inertia: false
    }).setView([45, 180], 3);
    let attribution = map.attributionControl
    //替换默认的leaflet前缀改为自定义的logo和文字
    attribution.setPrefix('')
    // attribution.addAttribution('审图号：GS (2023)4677号')
    // L.marker([51.5, -0.09]).addTo(map)
    //   .bindPopup('这里是伦敦')
    //   .openPopup();

    const data = [{
      "from": [120.38, 36.07], // 青岛坐标
      "to": [238, 52],    // 加拿大坐标
      "labels": ["青岛", "加拿大"],
      "color": "#00BFFF"
    }];

    const migrationLayer = new L.migrationLayer({
      map: map,
      data: data,
      pulseRadius: 30,
      pulseBorderWidth: 3,
      arcWidth: 1,
      arcLabel: true,
      arcLabelFont: '14px sans-serif',
    });
    migrationLayer.addTo(map);
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
    minZoom: 2,
    opacity: 1, // Opacity of the layer.
    visible: true, // Visible of the layer.
    zIndex: -1 // The explicit zIndex of the layer.
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

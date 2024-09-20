<template>
    <div class="page">
        <div class="left-button">
            <FunctionMenu :functionData="layerFunction" :Multiple="true" />
        </div>
    </div>
</template>

<script setup>
import FunctionMenu from '../Common/FunctionMenu.vue'
let layerFunction = [
  {
    name: "水位",
    check: true,
    image: new URL(
      "../../assets/img/水位.png",
      import.meta.url
    ).href,
    imageActive: new URL(
      "../../assets/img/水位-active.png",
      import.meta.url
    ).href,
  },
  {
    name: "流速",
    check: true,
    image: new URL(
      "../../assets/img/流速.png",
      import.meta.url
    ).href,
    imageActive: new URL(
      "../../assets/img/流速-active.png",
      import.meta.url
    ).href,
  },
  {
    name: "浮游动物碳",
    check: true,
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
    check: true,
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
    name: "浮游植物磷",
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
    name: "浮游植物氮",
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
    name: "叶绿素",
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
    name: "初级生产力",
    check: false,
    image: new URL(
      "../../assets/img/初级生产力.png",
      import.meta.url
    ).href,
    imageActive: new URL(
      "../../assets/img/初级生产力-active.png",
      import.meta.url
    ).href,
  },
  {
    name: "无机磷",
    check: false,
    image: new URL(
      "../../assets/img/无机磷.png",
      import.meta.url
    ).href,
    imageActive: new URL(
      "../../assets/img/无机磷-active.png",
      import.meta.url
    ).href,
  },
  {
    name: "无机氮",
    check: false,
    image: new URL(
      "../../assets/img/无机氮.png",
      import.meta.url
    ).href,
    imageActive: new URL(
      "../../assets/img/无机氮-active.png",
      import.meta.url
    ).href,
  }
]
</script>

<style scoped>
.left-button {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
}
</style>
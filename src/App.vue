<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
*{
  margin: 0;
  padding: 0;
}
div {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.el-input__inner{
  text-align: left;
}
.ant-slider:hover .ant-slider-rail {
  background-color: #91caff !important;
}

.ant-slider-vertical .ant-slider-rail {
  background-color: #91caff !important;
}

.ant-slider .ant-slider-rail {
  background-color: #91caff !important;
}
</style>
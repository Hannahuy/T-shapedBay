<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
* {
  margin: 0;
  padding: 0;
}

div {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

.el-input__inner {
  text-align: left;
}

.el-picker__popper.el-popper {
  inset: auto auto 10vh 81.7% !important
}

.el-popper__arrow::before {
  display: none;
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
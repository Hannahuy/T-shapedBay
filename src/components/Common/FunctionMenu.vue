<template>
  <div class="container" ref="containerRef">
    <div v-for="(item, index) in props.functionData" :key="item.name">
      <template v-if="item.isParent">
        <div class="parent" :class="checkedFunction.indexOf(index) > -1 ? 'active' : ''">
          {{ item.name }}
        </div>
      </template>
      <template v-else>
        <div @click="onClick(item, index)" style="cursor: pointer;"
          :class="checkedFunction.indexOf(index) > -1 ? 'active' : ''">
          <div class="icon">
            <img :src="checkedFunction.indexOf(index) > -1
      ? item.imageActive
      : item.image
      " />
          </div>
          <div class="name" :style="{ letterSpacing: item.name.length == 2 ? '0.2rem' : '0' }">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineExpose, computed } from "vue";
import { callUIInteraction } from "../../module/webrtcVideo/webrtcVideo.js";

let containerRef = ref(null);
let checkedFunction = ref([]);
const props = defineProps({
  functionData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  Multiple: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
  defaultSelect: {
    type: Boolean,
    default: () => {
      return false;
    },
  },
});
const emit = defineEmits(['functionSelected']);
let onClick = (item, index) => {
  let _index = checkedFunction.value.indexOf(index);
  if (props.Multiple) {
    if (_index > -1) {
      // 取消选中
      // callUIInteraction({
      //   ModuleName: `${item.name}`,
      //   FunctionName: `${item.name}`,
      //   State: false,
      // });
      checkedFunction.value.splice(_index, 1);
    } else {
      // 选中
      callUIInteraction({
        ModuleName: `${item.name}`,
        FunctionName: `${item.name}`,
        State: true,
      });
      checkedFunction.value.push(index);
    }
  } else {
    if (_index > -1) {
      // 取消选中时，强制重新选中
      return; // 不允许取消选中
    } else {
      if (checkedFunction.value.length > 0) {
        // 如果有其他选中项，打印信息
        // callUIInteraction({
        //   ModuleName: `${props.functionData[checkedFunction.value[0]].name}`,
        //   FunctionName: `${props.functionData[checkedFunction.value[0]].name}`,
        //   State: false,
        // });
      }
      // 选中
      callUIInteraction({
        ModuleName: `${item.name}`,
        FunctionName: `${item.name}`,
        State: true,
      });
      checkedFunction.value = [index];
    }
  }
  emit('functionSelected', item);
};

onMounted(() => {
  let selectedIndex = props.functionData.findIndex(item => item.check);
  if (props.defaultSelect) {
    if (selectedIndex === -1 && props.functionData.length > 0) {
      // 如果没有选中项，默认选中第一个项
      onClick(props.functionData[0], 0);
    } else {
      for (let i = 0; i < props.functionData.length; i++) {
        if (props.functionData[i].check) {
          onClick(props.functionData[i], i);
        }
      }
    }
  } else {
    for (let i = 0; i < props.functionData.length; i++) {
        if (props.functionData[i].check) {
          onClick(props.functionData[i], i);
        }
      }
  }
});

onUnmounted(() => { });

defineExpose({
  onClick,
});
</script>
<style scoped>
.container {
    position: absolute;
    top: 50vh;
    transform: translateY(-50%);
    left: 20vh;
    z-index: 9;
    max-height: 50vh;
    width: 21vh;
    overflow-y: auto;
    background-image: url('../../assets/img/资源 172.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 1vh;
}
.container::-webkit-scrollbar {
    width: 0.8vh; /* 滚动条的宽度 */
}

.container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* 滚动条轨道的背景色 */
    border-radius: 1vh; /* 轨道的圆角 */
}

.container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5); /* 滚动条的颜色 */
    border-radius: 1vh; /* 滚动条的圆角 */
}

.container::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8); /* 滚动条悬停时的颜色 */
}

.container>div {
  margin: 2vh 0;
  white-space: nowrap;
}

.container>div>div>div {
  display: inline-block;
  vertical-align: middle;
}

.parent {
  width: max-content;
  padding: 1vh 1.5vh;
  color: #fff;
  font-size: 1.6vh;
  font-weight: bold;
}

.icon {
  width: 4vh;
  height: 4vh;
  background-image: url("../../assets/img/资源 8.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: rotate 10s linear infinite;
}

.active .icon {
  background-image: url("../../assets/img/资源 7.png");
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.container img {
  width: 2vh;
  height: 2vh;
  margin: 1vh;
  animation: reverseRotate 10s linear infinite;
}

@keyframes reverseRotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.name {
  width: 12vh;
  height: 3vh;
  line-height: 3vh;
  padding-left: 2vh;
  transform: translateX(-1.5vh);
  font-family: Microsoft YaHei;
  font-size: 1.8vh;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0px 2px 0px rgba(0, 25, 60, 0.68);
  background-image: url("../../assets/img/资源 5.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  letter-spacing: 0.2vh !important;
}

.active .name {
  background-image: url("../../assets/img/资源 6.png");
}
</style>

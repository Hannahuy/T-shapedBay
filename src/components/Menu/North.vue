<template>
    <div class="North" id="compass">
        <img src="/img/指北针.png" style="width: 10vh; height: 10vh;" alt="指北针" id="compassImage">
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
const myHandleResponseFunction = (data) => {
  const datajson = JSON.parse(data);
  if (datajson.Function === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return;
  } else if (datajson.Function === '指北针') {
    const angle = datajson.angle;
    const compassImage = document.getElementById('compassImage');
    compassImage.style.transform = `rotate(${angle}deg)`;
  }
}
onMounted(() => {
  addResponseEventListener("handle_responses", myHandleResponseFunction);
});
</script>

<style scoped>
.North {
  position: absolute;
  z-index: 3;
  right: 2.4vh;
  bottom: 10vh;
}
</style>
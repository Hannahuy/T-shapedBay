<template>
    <div id="UEplayer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { app_load, callUIInteraction } from '../../module/webrtcVideo/webrtcVideo.js';
import '../../module/webrtcVideo/player.css';
onMounted(() => {
    app_load(
        {
            serverUrl: 'http://192.168.0.124', // 像素流链接
            matchViewportResolution: true,
            autoConnection: true,
            showPlayOverlay: true,
            qualityControl: true,
            inputOptions: {
                controlScheme: 1,
                suppressBrowserKeys: false
            }
        },
        () => {
            console.log("成功");
            callUIInteraction({
                function: "刷新/true",
            });
        },
        () => {
            console.log("失败");
        }
    );
});
</script>

<style>
#UEplayer {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
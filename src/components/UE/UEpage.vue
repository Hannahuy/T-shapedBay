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
            // serverUrl: 'http://192.168.0.124:89', // 像素流链接
            // serverUrl: 'http://192.168.0.137:89', // 像素流链接
            serverUrl: 'http://localhost:89', // 像素流链接
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
                ModuleName: `监测调查`,
                State: true,
            });
            callUIInteraction({
                ModuleName: `生态动力`,
                FunctionName: `生态动力`,
                State: false,
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
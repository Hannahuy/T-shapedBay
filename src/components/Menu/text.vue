<template>
    <div class="page">
        <div class="rightBox">
            <div class="rightBox-top">
                <div class="rightBox-top-title">
                    浮游动物占比
                    <span class="Englishspan">zooplankton</span>
                </div>
                <div class="rightBox-top-content">

                </div>
            </div>
            <div class="rightBox-bottom">
                <div class="rightBox-bottom-title">
                    物种数量信息
                    <span class="Englishspan">information</span>
                </div>
                <div class="rightBox-bottom-content">
                    <div class="rightBox-bottom-content-radius">

                    </div>
                </div>
                <div class="rightBox-bottom-content2">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.rightBox {
    position: absolute;
    right: 2.4vh;
    top: 10vh;
    width: 40vh;
    height: 87vh;
    background-image: url('../../assets/img/rightbox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 10;
    padding: 1.5vh;
    box-sizing: border-box;
}

.rightBox-top {
    width: 100%;
    height: 43vh;
}

.rightBox-bottom {}

.rightBox-top-title,
.rightBox-bottom-title {
    width: 100%;
    height: 3vh;
    background-image: url('../../assets/img/rightboxtitle.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #FFFFFF;
    font-size: 1.6vh;
    font-weight: bold;
    line-height: 3vh;
    padding-left: 3vh;
    box-sizing: border-box;
}

.Englishspan {
    margin-left: 2vh;
    font-size: 1.2vh;
    color: #FFFFFF;
    font-weight: 100;
}

.rightBox-top-content {
    margin-top: 2vh;
    width: 100%;
    height: 16vh;
    background-image: url('../../assets/img/righttopbox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.rightBox-bottom-content {
    position: relative;
    margin-top: 2vh;
    width: 100%;
    height: 16vh;
    background-image: url('../../assets/img/rightbottombox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.rightBox-bottom-content-radius {
    position: absolute;
    left: 12.02vh;
    top: 1.7vh;
    width: 12.5vh;
    height: 12.5vh;
    background-image: url('../../assets/img/radius.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    animation: rotate 2s linear infinite;
    /* 持续旋转动画 */
}

.rightBox-bottom-content2 {
    width: 100%;
    height: 19vh;
    margin-top: 1vh;
    background-image: url('../../assets/img/backgroundborder.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>
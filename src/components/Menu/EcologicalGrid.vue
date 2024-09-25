<template>
    <div class="Ecologpage">
        <div class="top">
            <div class="top-left">
                <div class="toptitle">
                    能量流动数据
                </div>
            </div>
            <div class="top-middle">
                <div class="toptitle">
                    总体特征参数
                </div>
            </div>
            <div class="top-right">
                <div class="toptitle">
                    功能组关键指数
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="toptitle">
                    建设参数
                </div>
            </div>
            <div class="middle-middle">
                <div class="toptitle">
                    营养级传递效率
                </div>
            </div>
            <div class="middle-right">
                <div class="toptitle">
                    参数数值
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-left">
                <div class="toptitle">
                    营养级能量传递效率
                </div>
            </div>
            <div class="bottom-right">
                <div class="toptitle">
                    生产力利用情况
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.Ecologpage {
    width: 100vw;
    height: 100vh;
    background-image: url('../../assets/img/menu3background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.top,
.middle,
.bottom {
    width: 97%;
    height: 29vh;
    z-index: 3;
    margin-top: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.top {
    margin-top: 6vh;
}

.middle {
    margin-top: 1vh;
}

.bottom {
    margin-top: 1vh;
}

.top-left {
    width: 76vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topleft.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.top-middle {
    width: 56.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topmiddle.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.top-right {
    width: 58.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/topright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-left {
    width: 64vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-middle {
    width: 62.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.middle-right {
    width: 64.5vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/middleright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bottom-left {
    width: 96vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/bottomright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.bottom-right {
    width: 96vh;
    height: 100%;
    background-image: url('../../assets/img/EcologicalGrid/bottomright.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.toptitle {
    font-family: HYLingXinJ;
    font-weight: bold;
    font-size: 2vh;
    line-height: 3.2vh;
    color: #FEFFFF;
    text-align: center;
    background: linear-gradient(0deg, #C7E4FF 24.072265625%, #FFFFFF 24.560546875%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.2vh;
    margin-left: 0.3vh;
}
</style>
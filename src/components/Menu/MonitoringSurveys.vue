<template>
  <div class="page">
    <div class="leftBox">
      <div class="rightBox-top">
        <div class="rightBox-top-title">
          潮间带生物类群组成
          <!-- <span class="Englishspan">zooplankton</span> -->
        </div>
        <div class="leftBox-top-table">

        </div>
      </div>
      <div class="rightBox-middle">
        <div class="rightBox-bottom-title">
          大型底栖动物组成比例图
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="leftBox-bottom-table">

        </div>
      </div>
      <div class="rightBox-middle2">
        <div class="rightBox-bottom-title">
          浮游植物组成比例图
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="leftBox-middle2-content"></div>
      </div>
      <div class="rightBox-bottom">
        <div class="rightBox-bottom-title">
          海水水质评价参数及标准
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="leftBox-bottom-content"></div>
      </div>
    </div>
    <div class="rightBox">
      <div class="rightBox-top">
        <div class="rightBox-top-title">
          生物多样性评价结果
          <!-- <span class="Englishspan">zooplankton</span> -->
        </div>
        <div class="rightBox-top-table">

        </div>
      </div>
      <div class="rightBox-middle">
        <div class="rightBox-bottom-title">
          水质沉积物单指标评价结果
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="rightBox-bottom-table">

        </div>
      </div>
      <div class="rightBox-middle2">
        <div class="rightBox-bottom-title">
          环境DNA多样性
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="rightBox-middle2-content"></div>
      </div>
      <div class="rightBox-bottom">
        <div class="rightBox-bottom-title">
          浮游动物组成比例
          <!-- <span class="Englishspan">information</span> -->
        </div>
        <div class="rightBox-bottom-content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.leftBox {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 40vh;
  height: 88vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1.5vh;
  box-sizing: border-box;
}

.rightBox {
  position: absolute;
  right: 2.4vh;
  top: 10vh;
  width: 40vh;
  height: 88vh;
  background-image: url('../../assets/img/rightbox.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 10;
  padding: 1.5vh;
  box-sizing: border-box;
}

.rightBox-top {
  width: 100%;
  height: 21.25vh;
}

.rightBox-middle {
  width: 100%;
  height: 21.25vh;
}

.rightBox-middle2 {
  width: 100%;
  height: 21.25vh;
}

.rightBox-bottom {
  width: 100%;
  height: 21.25vh;
}

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

.rightBox-top-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.rightBox-bottom-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text2.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.rightBox-middle2-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text3.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.rightBox-bottom-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text4.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.leftBox-top-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text5.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-bottom-table {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text6.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-middle2-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text7.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.leftBox-bottom-content {
  margin: 1vh 0;
  width: 100%;
  height: 16.25vh;
  background-image: url('../../assets/img/text8.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
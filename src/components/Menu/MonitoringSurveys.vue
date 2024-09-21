<template>
  <div class="page">
    <div class="rightBox">
      <div class="rightBox-top">
        <div class="rightBox-top-title">
          浮游动物占比
          <span class="Englishspan">zooplankton</span>
        </div>
      </div>
      <div class="rightBox-bottom">
        <div class="rightBox-bottom-title">
          物种数量信息
          <span class="Englishspan">information</span>
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

.rightBox-bottom {
  
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
</style>
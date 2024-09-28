<template>
    <div class="leftbox">
        <div class="leftbox-middle">
            <div class="leftbox-middle-content">
                <div class="rightBox-top-title-dialog">
                    情景选择
                </div>
                <div style="margin-top: 1vh;margin-bottom: 1vh;">
                    <el-radio-group v-model="radio" style="display: flex;justify-content: center;align-items: center;"
                        @change="changeRadio">
                        <el-radio value="浒苔情景">浒苔情景</el-radio>
                        <el-radio value="陆源污染情景">陆源污染情景</el-radio>
                    </el-radio-group>
                </div>
                <div class="rightBox-top-title-dialog">
                    参数名称
                </div>
                <div class="leftbox-table">
                    <table class="custom-table">
                        <thead>
                            <tr>
                                <td>{{ tablehead }}</td>
                                <td><el-input v-model="tabledata" /></td>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td>{{ tablehead2 }}</td>
                                <td><el-input v-model="tabledata2" /></td>
                            </tr>
                        </thead>
                    </table>
                    <div>
                        <el-button class="buttonstyles" type="primary" @click="drive">驱动模型</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
const radio = ref('浒苔情景');
const tablehead = ref('浒苔面积（㎡）');
const tablehead2 = ref('浒苔生物量（kg/㎡）');
const tabledata = ref('');
const tabledata2 = ref('');
const changeRadio = (e) => {
    if (e == '浒苔情景') {
        tablehead.value = '浒苔面积（㎡）'
        tablehead2.value = '浒苔生物量（kg/㎡）'
    } else {
        tablehead.value = '无机氮（mg/m³）'
        tablehead2.value = '无机磷（mg/m³）'
    }
}
const drive = () => {
    if(tabledata.value == '' || tabledata2.value == ''){
        ElMessage.warning('请输入数据');
        return
    } else{

    }
}
</script>

<style scoped>
.leftbox {
    position: absolute;
    top: 10vh;
    left: 2.4vh;
    z-index: 3;
}

.leftbox-middle {
    width: 40vh;
    height: 33.8vh;
    background-image: url("../../assets/img/框-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 2vh;
    padding: 2vh;
    box-sizing: border-box;
    color: #b7cffc;
}

:deep(.el-radio.el-radio--large) {
    height: auto;
}

:deep(.el-radio.el-radio--large .el-radio__label) {
    color: #b7cffc;
}

:deep(.el-radio__input.is-checked .el-radio__inner) {
    background-color: #0a6adf;
    background: #0a6adf;
}

:deep(.el-radio__inner) {
    border: none;
}

.rightBox-top-title-dialog {
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

.leftbox-table {
    margin-top: 1vh;
}

.custom-table {
    border-collapse: collapse;
    width: 100%;
}

.custom-table th,
.custom-table td {
    border: 0.1vh solid #416491;
    padding: 0.8vh;
    text-align: center;
    height: 4vh;
    width: 50%;
}

.buttonstyles {
    margin-top: 2vh;
    margin-left: 37vh;
    border-radius: 0;
    background-color: #0a6adf;
    border: 0;
    position: absolute;
    right: 2vh;
    bottom: 2.4vh;
}

:deep(.el-radio__label) {
    color: #b7cffc;
}

:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: #b7cffc;
}
:deep(.el-input__wrapper){
    border-radius: 0;
}
</style>
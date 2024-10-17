<template>
  <div class="leftBox">
    <div class="rightBox-top">
      <div class="rightBox-top-title">
        总体评价
      </div>
      <div class="leftBox-top-table">
        <el-table :data="tableData4" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.6vh',
          'text-align': 'center',
        }" height="8.5vh">
          <el-table-column prop="habitat" label="海湾生境" align="center" />
          <el-table-column prop="creature" label="海湾生物" align="center" />
          <el-table-column prop="threatFactors" label="威胁因素" align="center" />
        </el-table>
        <div class="bottom-table">
          <el-table :data="tableData4" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.6vh',
          'text-align': 'center',
        }" height="8.5vh">
          <el-table-column label="综合指数" align="center">
            <template #default="{ row }">
              <span :style="{ color: getStatusColor(row.status) }">{{ row.Composite }}</span>
            </template>
          </el-table-column>
          <el-table-column label="健康状况" align="center">
            <template #default="{ row }">
              <span :style="{ color: getStatusColor(row.status) }">{{ row.status }}</span>
            </template>
          </el-table-column>
        </el-table>
        </div>
      </div>
    </div>
    <div class="rightBox-middle">
      <div class="rightBox-bottom-title">
        海水水质评价参数及标准
      </div>
      <div class="leftBox-bottom-table">
        <el-table :data="tableData1" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.2vh',
          'text-align': 'center',
        }" height="16.25vh">
          <el-table-column prop="project" label="项目" width="40" align="center" />
          <el-table-column prop="PH" label="PH" width="50" align="center" />
          <el-table-column prop="DO" label="DO" width="40" align="center" />
          <el-table-column prop="COD" label="COD" width="40" align="center" />
          <el-table-column prop="Inorganicnitrogen" label="无机氮" width="50" align="center" />
          <el-table-column prop="Activephosphate" label="活性磷酸盐" width="70" align="center" />
        </el-table>
      </div>
    </div>
    <div class="rightBox-middle2">
      <div class="rightBox-bottom-title">
        水质沉积物单指标评价结果
      </div>
      <div class="leftBox-middle2-content">
        <el-table :data="tableData3" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.2vh',
          'text-align': 'center',
        }" height="16.25vh">
          <el-table-column prop="StationNumber" label="站号" width="50" align="center" />
          <el-table-column prop="PH" label="PH" width="40" align="center" />
          <el-table-column prop="DO" label="DO" width="40" align="center" />
          <el-table-column prop="COD" label="COD" width="40" align="center" />
          <el-table-column prop="Inorganicnitrogen" label="无机氮" width="50" align="center" />
          <el-table-column prop="phosphate" label="磷酸盐" width="50" align="center" />
          <el-table-column prop="Nutritionalization" label="是否富营养化" width="80" align="center" />
        </el-table>
      </div>
    </div>
    <div class="rightBox-bottom">
      <div class="rightBox-bottom-title">
        生物多样性评价结果
      </div>
      <div class="leftBox-bottom-content">
        <el-table :data="tableData2" style="width: 100%;" :header-cell-style="{
          background: 'transparent', fontSize: '1.2vh',
          'text-align': 'center',
        }" height="16.25vh">
          <el-table-column prop="Stations" label="站位" width="40" align="center" />
          <el-table-column prop="Diversity" label="多样性指数" width="70" align="center" />
          <el-table-column prop="Uniformity" label="均匀度" width="50" align="center" />
          <el-table-column prop="Dominance" label="优势度" width="50" align="center" />
          <el-table-column prop="Richness" label="丰富度" width="50" align="center" />
          <el-table-column prop="threshold" label="指数阈值" width="60" align="center" />
          <el-table-column prop="level" label="等级" width="70" align="center" />
        </el-table>
      </div>
    </div>
  </div>
  <div class="rightBox">
    <div class="rightBox-top-right">
      <div class="rightBox-top-title">
        丁字湾简介
      </div>
      <div class="rightBox-top-table">
        <p>丁字湾位于青岛市即墨区， 莱阳，海阳三地的交界处，北纬36度32'40”，东经120度44'58”， 海湾主体呈北西-南东走向，湾顶部在麻姑岛附近折而向西，
        继五龙河口向延伸，湾口则转向东偏南方向，整个形态大致呈”丁”字形，故名丁字湾。海呈狭长的半封闭的状深入陆地，从湾口到湾顶长22公里，最宽处(底坊滩至鲁岛附近)约12.3公里，
        最窄处(香岛附近)约2.5公里，口门宽(栲栳岛至宅南嘴) 约2.8公里，湾内岸线蜿蜒曲折，岬湾相间，又被分成几个海湾(或称滩地) ，计有栲栳滩，芝坊滩，鲁岛滩，力岛滩，湾顶滩及五龙河三角洲等，
        岬角处多为基岩裸露，形成海蚀崖，但多数因泥沙淤积已为潮水所不及。</p>
        <p>丁字湾周围被山丘环抱，南，北方向为剥蚀山丘，高程为70米上，下为切割山坡地，表面被残积-坡积物覆盖，西北方向为冲积平原。 流入丁字湾流有五龙河，白沙可，蓬险河，店集河，贤友河，黄塘河，
        鳌子河，朱埠河，羊郡河等。</p>
      </div>
    </div>
    <div class="rightBox-middle-right">
      <div class="rightBox-bottom-title">
        潜在风险点
      </div>
      <div class="rightBox-bottom-table">
        <p>养殖废水和河流输入氮磷营养盐，海水呈现富营养化，夏季尤甚；</p>
        <p>环湾人为用海程度较为剧烈，人工岸线占比较高，以水产养殖业、制盐业、道路交通和能源工业为主；</p>
        <p>互花米草入侵致使淤积加剧，并导致滩涂湿地和原生盐沼生态系统退化，滨海鸟类受到威胁；</p>
        <p>陆源径流量萎缩，滨海半咸水生态系统趋于海洋化；</p>
        <p>水体连通性差，容易遭受海洋热浪侵袭，对围堰养殖业威胁最大。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";
import { callUIInteraction, addResponseEventListener } from "../../module/webrtcVideo/webrtcVideo.js";
import { ElMessage } from 'element-plus';
const tableData1 = ref([
  {
    project: '一类',
    PH: '7.8~8.5',
    DO: '>6',
    COD: '≤2',
    Inorganicnitrogen: '≤0.20',
    Activephosphate: '≤0.015'
  },
  {
    project: '二类',
    PH: '7.8~8.5',
    DO: '>5',
    COD: '≤3',
    Inorganicnitrogen: '≤0.30',
    Activephosphate: '≤0.030'
  },
  {
    project: '三类',
    PH: '6.8~8.8',
    DO: '>4',
    COD: '≤4',
    Inorganicnitrogen: '≤0.40',
    Activephosphate: '≤0.030'
  },
  {
    project: '四类',
    PH: '6.8~8.8',
    DO: '>3',
    COD: '≤25',
    Inorganicnitrogen: '≤0.50',
    Activephosphate: '≤0.045'
  }
])
const tableData2 = ref([
  {
    Stations: '1',
    Diversity: '1.00',
    Uniformity: '1.00',
    Dominance: '1.00',
    Richness: '1.00',
    threshold: '1.00',
    level: '多样性一般',
  },
  {
    Stations: '2',
    Diversity: '1.50',
    Uniformity: '0.95',
    Dominance: '0.75',
    Richness: '1.00',
    threshold: '1.42',
    level: '多样性一般',
  },
  {
    Stations: '3',
    Diversity: '1.25',
    Uniformity: '0.79',
    Dominance: '0.83',
    Richness: '0.77',
    threshold: '0.99',
    level: '多样性一般',
  },
  {
    Stations: '4',
    Diversity: '1.00',
    Uniformity: '1.00',
    Dominance: '1.00',
    Richness: '1.00',
    threshold: '1.00',
    level: '多样性一般',
  },
])
const tableData3 = ref([
  {
    StationNumber: '1',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '一类',
    phosphate: '一类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '2',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '一类',
    phosphate: '一类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '3',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '二类',
    phosphate: '二类',
    Nutritionalization: '否',
  },
  {
    StationNumber: '4',
    PH: '一类',
    DO: '一类',
    COD: '一类',
    Inorganicnitrogen: '四类',
    phosphate: '一类',
    Nutritionalization: '富营养化',
  },
])
const tableData4 = ref([
  {
    habitat: '38.1',
    creature: '28.8',
    threatFactors: '20',
    Composite: '86.9',
    status: '稳定',
  }
])
const getStatusColor = (status) => {
  switch (status) {
    case '稳定':
      return '#2EA043';
    case '受损':
      return '#D18616';
    case '严重受损':
      return '#F85149';
    default:
      return '#b7cffc'; // 默认颜色
  }
};

const myHandleResponseFunction = (data) => {
  const datajson = JSON.parse(data);
  if (datajson.Function === '报错') {
    ElMessage({
      message: datajson.Type,
      type: 'warning',
    });
    return
  }
}

onMounted(() => {
  addResponseEventListener("handle_responses", myHandleResponseFunction);
});
onUnmounted(() => {

});
</script>

<style scoped>
.leftBox {
  position: absolute;
  left: 2.4vh;
  top: 10vh;
  width: 30vh;
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
  width: 30vh;
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
.rightBox-top-right{
  width: 100%;
  color: #b7cffc;
  max-height: 58.5vh;
  overflow-y: auto;
}
.rightBox-middle-right{
  width: 100%;
  color: #b7cffc;
}

.rightBox-top-right p, .rightBox-middle-right p{
  text-indent: 3.5ch;
  /* 每段行缩进2个字符 */
  margin-bottom: 0.5em;
  font-size: 1.5vh;
  line-height: 2.05vh;
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
.rightBox-top-table {
  margin: 1vh 0;
}

.rightBox-bottom-table{
  margin: 1vh 0;
}

.leftBox-top-table,
.leftBox-bottom-table,
.leftBox-middle2-content,
.leftBox-bottom-content {
  margin: 1vh 0;
  width: 27vh;
  height: 16.25vh;
}

:deep(.el-table__body-wrapper) {
  font-size: 1.1vh;
}

:deep(.el-table--fit) {
  padding: 0;
}

:deep(.el-table, .el-table__expanded-cell) {
  background-color: transparent;
  border: none;
}

:deep(.el-table th) {
  background-color: transparent;
  border: none;
}

:deep(.el-table tr) {
  background-color: transparent;
  border: none;
}

:deep(.el-table--enable-row-transition .el-table__body td, .el-table .cell) {
  background-color: transparent;
  border: none;
}

:deep(.el-table__header-wrapper th) {
  background-color: transparent;
  border: none;
}

:deep(.el-table__body-wrapper td) {
  border: none;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background-color: transparent;
}

/* 去掉中间数据的分割线 */
:deep(.el-table__row > td) {
  border: none;
}

/* 去掉上面的线 */
:deep(.el-table th.is-leaf) {
  border: none;
}

:deep(.el-table__inner-wrapper:before) {
  display: none;
}

:deep(.el-table .cell) {
  color: #b7cffc;
  padding: 0 0.5vh
}
.leftBox-top-table :deep(.el-table__body-wrapper){
  font-size: 1.4vh;
}
.bottom-table :deep(.el-table__body-wrapper){
  font-size: 1.8vh;
}
</style>
<template>
    <div class="databox">
        <div class="title">数据添加</div>
        <div class="steps">
            <div class="steps-item" :class="currentStep === 0 ? 'active' : ''">
                海湾生境盐沼
            </div>
            <div class="steps-item" :class="currentStep === 1 ? 'active' : ''">
                海湾生境
            </div>
            <div class="steps-item" :class="currentStep === 2 ? 'active' : ''">
                海湾生物
            </div>
            <div class="steps-item" :class="currentStep === 3 ? 'active end' : 'completed end'">
                威胁因素
            </div>
        </div>
        <div class="content">
            <div v-if="currentStep === 0">
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left:1vh;">沼泽植被</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSaltMarshAreaChange" label="a.盐沼面积变化率" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshAreaChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSaltMarshAreaChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshAreaChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedSaltMarshAreaChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSaltMarshVegetationCoverChange" label="b.盐沼植被盖度变化率"
                                    size="large" style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshVegetationCoverChangeYear" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedSaltMarshVegetationCoverChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshVegetationCoverChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedSaltMarshVegetationCoverChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSaltMarshWidthChange" label="c.盐沼植被宽度变化率" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshWidthChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSaltMarshWidthChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSaltMarshWidthChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedSaltMarshWidthChange" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left:1vh;">生物群落</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedBenthicAnimalDensityChange" label="a.大型底栖动物密度变化率" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputBenthicAnimalDensityChangeYear" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedBenthicAnimalDensityChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputBenthicAnimalDensityChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedBenthicAnimalDensityChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedBenthicAnimalBiomassChange" label="b.大型底栖动物生物量变化率" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputBenthicAnimalBiomassChangeYear" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedBenthicAnimalBiomassChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputBenthicAnimalBiomassChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedBenthicAnimalBiomassChange" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left:1vh;">环境要素</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">赋值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSedimentPH" label="a.沉积物pH" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSedimentPHYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSedimentPH" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSedimentPHValue" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSedimentPH" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSedimentSalinity" label="b.沉积物水溶性盐总量" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSedimentSalinityYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSedimentSalinity" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSedimentSalinityValue" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSedimentSalinity" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentStep === 1">
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left:1vh;">a.纳潮量和水交换变化率</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">参照系</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedTidalVolume" label="纳潮量" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputTidalVolumeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedTidalVolume" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputTidalVolumeReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedTidalVolume" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedWaterExchangeRate" label="水交换率" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputWaterExchangeRateYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedWaterExchangeRate" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputWaterExchangeRateReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedWaterExchangeRate" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 72.5%;padding-left:1vh;">b.沉积物</div>
                        <div style="width: 27.5%;">各站位平均值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 72.5%;">
                                <el-checkbox v-model="checkedOrganicMatter" label="有机物" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOrganicMatterAverage" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedOrganicMatter" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 72.5%;">
                                <el-checkbox v-model="checkedSulfide" label="硫化物" size="large" style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSulfideAverage" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSulfide" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 72.5%;padding-left:1vh;"></div>
                        <div style="width: 27.5%;">各站位平均值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 72.5%;">c.富营养化程度</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputEutrophicationLevel" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 35%;padding-left:1vh;"></div>
                        <div style="width: 37.5%;">评估年份各初级生产力平均值</div>
                        <div style="width: 27.5%;">参照中初级生产力</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 35%;">d.水中初级生产力</div>
                            <div style="width: 37.5%;">
                                <el-input v-model="inputWaterPrimaryProductivity" placeholder="请输入内容"
                                    style="width: 22vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputReferencePrimaryProductivity" placeholder="请输入内容"
                                    style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 72.5%;padding-left:1vh;">e.典型生态系统</div>
                        <div style="width: 27.5%;"></div>
                    </div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left:3vh;">（1）牡蛎礁</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedOysterReefAreaChange" label="①活体牡蛎礁斑块面积变化" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterReefAreaChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedOysterReefAreaChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterReefAreaChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedOysterReefAreaChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedOysterReefHeightChange" label="②牡蛎礁礁体高度变化" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterReefHeightChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedOysterReefHeightChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterReefHeightChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedOysterReefHeightChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedOysterDensityChange" label="③牡蛎密度变化" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterDensityChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedOysterDensityChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterDensityChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedOysterDensityChange" />
                            </div>
                        </div>
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedOysterSupplementChange" label="④牡蛎补充量变化" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterSupplementChangeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedOysterSupplementChange" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputOysterSupplementChangeBaseline" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedOysterSupplementChange" />
                            </div>
                        </div>
                    </div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 3vh;"></div>
                        <div style="width: 27.5%;"></div>
                        <div style="width: 27.5%;">盐沼赋值</div>
                    </div>
                    <div class="content-body-item">
                        <div class="content-title2" style="width: 45%;padding-left: 3vh;">（2）盐沼</div>
                        <div style="width: 27.5%;"></div>
                        <div style="width: 27.5%;">
                            <el-input v-model="inputSaltMarshValue" placeholder="请输入内容" style="width: 16vh;" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentStep === 2">
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;">a.鱼卵、仔鱼及游泳动物</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">参照系</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedFishEggs" label="鱼卵数量" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputFishEggsYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedFishEggs" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputFishEggsReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedFishEggs" />
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedLarvae" label="仔鱼数量" size="large" style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputLarvaeYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedLarvae" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputLarvaeReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedLarvae" />
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedSwimmingAnimals" label="游泳动物" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSwimmingAnimalsYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSwimmingAnimals" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSwimmingAnimalsReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedSwimmingAnimals" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;">b.沉积物</div>
                        <div style="width: 27.5%;"></div>
                        <div style="width: 27.5%;">香农-维纳指数H'</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedPhytoplankton" label="浮游植物" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;"></div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputPhytoplanktonHIndex" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedPhytoplankton" />
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedZooplankton" label="浮游动物" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;"></div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputZooplanktonHIndex" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedZooplankton" />
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedBenthicAnimals" label="大型底栖生物" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;"></div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputBenthicAnimalsHIndex" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedBenthicAnimals" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份数据合计</div>
                        <div style="width: 27.5%;">参照中生物物种数量</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">c.物种数量</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSpeciesCountYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSpeciesCountReference" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">参照系</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">d.植被面积（外来物种面积不计）</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputVegetationAreaYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputVegetationAreaReference" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentStep === 3">
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">参照系</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">a.围填海面积</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputReclaimedLandAreaYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputReclaimedLandAreaReference" placeholder="请输入内容"
                                    style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;">b.干扰廊道</div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">参照系</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedInterferenceCorridorLength" label="干扰廊道总长度" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputInterferenceCorridorLengthYear" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedInterferenceCorridorLength" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputInterferenceCorridorLengthReference" placeholder="请输入内容"
                                    style="width: 16vh;" :disabled="!checkedInterferenceCorridorLength" />
                            </div>
                        </div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div style="width: 45%;">
                                <el-checkbox v-model="checkedWetlandArea" label="海湾滩涂湿地面积" size="large"
                                    style="margin-left: 6vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputWetlandAreaYear" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedWetlandArea" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputWetlandAreaReference" placeholder="请输入内容" style="width: 16vh;"
                                    :disabled="!checkedWetlandArea" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">c.养殖面积</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputAquacultureAreaYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputAquacultureAreaReference" placeholder="请输入内容"
                                    style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">d.污水排放量</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSewageDischargeYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputSewageDischargeReference" placeholder="请输入内容"
                                    style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="content-title">
                        <div style="width: 45%;padding-left: 1vh;"></div>
                        <div style="width: 27.5%;">评估年份值</div>
                        <div style="width: 27.5%;">基准值</div>
                    </div>
                    <div class="content-body">
                        <div class="content-body-item">
                            <div class="content-title2" style="width: 45%;">e.有害赤潮累积发生面积</div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputHarmfulRedTideAreaYear" placeholder="请输入内容" style="width: 16vh;" />
                            </div>
                            <div style="width: 27.5%;">
                                <el-input v-model="inputHarmfulRedTideAreaReference" placeholder="请输入内容"
                                    style="width: 16vh;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" :class="{ 'single-step': currentStep === 0 }">
            <div class="bottombtn pre" v-if="currentStep > 0" @click="prevStep">上一步</div>
            <div class="bottombtn next" @click="nextStep">{{ currentStep === 3 ? '提交' : '下一步' }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
const emit = defineEmits(['closeDatabox']);
const currentStep = ref(0);
const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--;
    }
    if (currentStep.value === 0) {
        console.log("第一步");
    } else if (currentStep.value === 1) {
        console.log("第二步");
    } else if (currentStep.value === 2) {
        console.log("第三步");
    }
};
const nextStep = () => {
    if (currentStep.value === 0) {
        console.log("第一步");
    } else if (currentStep.value === 1) {
        console.log("第二步");
    } else if (currentStep.value === 2) {
        console.log("第三步");
    } else if (currentStep.value === 3) {
        console.log("第四步");
    }

    if (currentStep.value < 3) {
        currentStep.value++;
    } else {
        emit('closeDatabox');
    }
};

// 沼泽植被
const checkedSaltMarshAreaChange = ref(false);
const inputSaltMarshAreaChangeYear = ref('');
const inputSaltMarshAreaChangeBaseline = ref('');

const checkedSaltMarshVegetationCoverChange = ref(false);
const inputSaltMarshVegetationCoverChangeYear = ref('');
const inputSaltMarshVegetationCoverChangeBaseline = ref('');

const checkedSaltMarshWidthChange = ref(false);
const inputSaltMarshWidthChangeYear = ref('');
const inputSaltMarshWidthChangeBaseline = ref('');

// 生物群落
const checkedBenthicAnimalDensityChange = ref(false);
const inputBenthicAnimalDensityChangeYear = ref('');
const inputBenthicAnimalDensityChangeBaseline = ref('');

const checkedBenthicAnimalBiomassChange = ref(false);
const inputBenthicAnimalBiomassChangeYear = ref('');
const inputBenthicAnimalBiomassChangeBaseline = ref('');

// 环境要素
const checkedSedimentPH = ref(false);
const inputSedimentPHYear = ref('');
const inputSedimentPHValue = ref('');

const checkedSedimentSalinity = ref(false);
const inputSedimentSalinityYear = ref('');
const inputSedimentSalinityValue = ref('');

// 纳潮量和水交换变化率
const checkedTidalVolume = ref(false);
const inputTidalVolumeYear = ref('');
const inputTidalVolumeReference = ref('');

const checkedWaterExchangeRate = ref(false);
const inputWaterExchangeRateYear = ref('');
const inputWaterExchangeRateReference = ref('');

// 沉积物
const checkedOrganicMatter = ref(false);
const inputOrganicMatterAverage = ref('');

const checkedSulfide = ref(false);
const inputSulfideAverage = ref('');

// 富营养化程度
const inputEutrophicationLevel = ref('');

// 水中初级生产力
const inputWaterPrimaryProductivity = ref('');
const inputReferencePrimaryProductivity = ref('');

// 牡蛎礁
const checkedOysterReefAreaChange = ref(false);
const inputOysterReefAreaChangeYear = ref('');
const inputOysterReefAreaChangeBaseline = ref('');

const checkedOysterReefHeightChange = ref(false);
const inputOysterReefHeightChangeYear = ref('');
const inputOysterReefHeightChangeBaseline = ref('');

const checkedOysterDensityChange = ref(false);
const inputOysterDensityChangeYear = ref('');
const inputOysterDensityChangeBaseline = ref('');

const checkedOysterSupplementChange = ref(false);
const inputOysterSupplementChangeYear = ref('');
const inputOysterSupplementChangeBaseline = ref('');

// 盐沼赋值
const inputSaltMarshValue = ref('');

// 鱼卵、仔鱼及游泳动物
const checkedFishEggs = ref(false);
const inputFishEggsYear = ref('');
const inputFishEggsReference = ref('');

const checkedLarvae = ref(false);
const inputLarvaeYear = ref('');
const inputLarvaeReference = ref('');

const checkedSwimmingAnimals = ref(false);
const inputSwimmingAnimalsYear = ref('');
const inputSwimmingAnimalsReference = ref('');

// 沉积物（香农-维纳指数）
const checkedPhytoplankton = ref(false);
const inputPhytoplanktonHIndex = ref('');

const checkedZooplankton = ref(false);
const inputZooplanktonHIndex = ref('');

const checkedBenthicAnimals = ref(false);
const inputBenthicAnimalsHIndex = ref('');

// 物种数量
const inputSpeciesCountYear = ref('');
const inputSpeciesCountReference = ref('');

// 植被面积
const inputVegetationAreaYear = ref('');
const inputVegetationAreaReference = ref('');

// 围填海面积
const inputReclaimedLandAreaYear = ref('');
const inputReclaimedLandAreaReference = ref('');

// 干扰廊道
const checkedInterferenceCorridorLength = ref(false);
const inputInterferenceCorridorLengthYear = ref('');
const inputInterferenceCorridorLengthReference = ref('');

const checkedWetlandArea = ref(false);
const inputWetlandAreaYear = ref('');
const inputWetlandAreaReference = ref('');

// 养殖面积
const inputAquacultureAreaYear = ref('');
const inputAquacultureAreaReference = ref('');

// 污水排放量
const inputSewageDischargeYear = ref('');
const inputSewageDischargeReference = ref('');

// 有害赤潮累积发生面积
const inputHarmfulRedTideAreaYear = ref('');
const inputHarmfulRedTideAreaReference = ref('');
</script>

<style scoped>
.databox {
    width: 70vh;
    height: 70vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #074f929a;
}

.title {
    width: 100%;
    height: 5vh;
    text-align: center;
    line-height: 5vh;
    font-size: 1.8vh;
    font-weight: bold;
    color: white;
}

.steps {
    width: 100%;
    height: 4vh;
    display: flex;
    justify-content: space-evenly;
}

.steps-item {
    font-size: 1.5vh;
    padding-right: 1vh;
    box-sizing: border-box;
    width: 14vh;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-image: url('../../assets/img/step/steper.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.steps-item.active {
    background-image: url('../../assets/img/step/steper-active.png');
}

.steps-item.end {
    text-align: center;
    background-image: url('../../assets/img/step/steper-end.png');
}

.steps-item.end.active {
    text-align: center;
    background-image: url('../../assets/img/step/steper-end-active.png');
}

.bottom {
    margin-top: 1vh;
    display: flex;
    justify-content: space-between;
    width: 16vh;
    position: absolute;
    bottom: 1.5vh;
    right: 1.5vh;
}

.single-step {
    justify-content: flex-end;
}

.bottombtn {
    color: #fff;
    padding: 0.5vh 1vh;
    cursor: pointer;
}

.next {
    width: 7vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/step/btn-next.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.pre {
    width: 7vh;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/step/btn-pre.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.content {
    margin-top: 1.5vh;
    width: 100%;
    padding: 1vh;
    box-sizing: border-box;
    max-height: 53vh;
    overflow-y: auto;
}

.content-title {
    margin-top: 1vh;
    width: 100%;
    color: white;
    display: flex;
    font-size: 1.6vh;
    font-weight: bold;
    align-items: center;
}

.content-title2 {
    color: white;
    display: flex;
    font-size: 1.6vh;
    font-weight: bold;
    align-items: center;
    padding-left: 1vh;
}

.content-body-item {
    display: flex;
    margin-top: 1vh;
}

:deep(.el-checkbox__label) {
    color: white;
    font-size: 1.4vh;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
    color: white;
}

::-webkit-scrollbar {
    height: 0.5vh;
    width: 0.5vh;
}

::-webkit-scrollbar-track {
    background: #084077;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(0, #6bebff 0%, #0071bc 100%);
}

:deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #092856;
}</style>

<template>
    <div>
        <div class="AI"></div>
        <div class="question" 
             v-show="showQuestions" 
             @click="showAnswer('丁字湾近年来水质状况如何？')" 
             @mouseenter="pauseAnimation" 
             @mouseleave="resumeAnimation">
            <div class="point"></div>
            <div class="text">丁字湾近年来水质状况如何？</div>
        </div>
        <div class="question2" 
             v-show="showQuestions" 
             @click="showAnswer('丁字湾生态现状如何？')" 
             @mouseenter="pauseAnimation2" 
             @mouseleave="resumeAnimation2">
            <div class="point"></div>
            <div class="text">丁字湾生态现状如何？</div>
        </div>
        <div class="answer" v-show="showAnswerBox">
            <div class="close" @click="hideAnswer"></div>
            <div class="answer-title"></div>
            <div class="answer-questionbox">
                <div class="point2"></div>
                <div class="answer-question">{{ displayQuestion }}</div>
            </div>
            <div class="answerbox">
                <div class="point" v-if="showpoint"></div>
                <div class="answer-content">
                    {{ displayAnswer }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const question1 = ref(null)
const question2 = ref(null)
const showAnswerBox = ref(false)
const showQuestions = ref(true)
const currentQuestion = ref('')
const displayQuestion = ref('')
const displayAnswer = ref('')
const showpoint = ref(false)

let animationId1 = null
let animationId2 = null
let typingTimer = null

const showAnswer = (question) => {
    currentQuestion.value = question
    showAnswerBox.value = true
    showQuestions.value = false 
    setTimeout(() => {
        startTypingQuestion(question)
    }, 200)
}

const hideAnswer = () => {
    showAnswerBox.value = false
    showQuestions.value = true
    displayQuestion.value = ''
    displayAnswer.value = ''
    if (typingTimer) {
        clearTimeout(typingTimer)
        typingTimer = null
    }
}

const startTypingQuestion = (question) => {
    displayQuestion.value = ''
    displayAnswer.value = ''
    
    let index = 0
    const typeQuestion = () => {
        if (index < question.length) {
            displayQuestion.value += question[index]
            index++
            typingTimer = setTimeout(typeQuestion, 50)
        } else {
            showpoint.value = true
            startTypingAnswer(getAnswerContent(question))
        }
    }
    typeQuestion()
}

const startTypingAnswer = (answer) => {
    displayAnswer.value = ''
    let index = 0
    const typeAnswer = () => {
        if (index < answer.length) {
            displayAnswer.value += answer[index]
            index++
            typingTimer = setTimeout(typeAnswer, 50)
        }
    }
    typeAnswer()
}

const getAnswerContent = (question) => {
    const answers = {
        '丁字湾近年来水质状况如何？': '自然资源部青岛海洋中心分别在2023年6月、8月和11月份对丁字湾水质环境状况开展监测调查，调查结果发现6月和8月水质因高的无机氮含量仅符合四类海水水质标准，12月符合三类海水水质标准。《2023年中国海洋生态环境状况公报》评价结果显示，丁字湾海区夏季无机氮含量处于劣四类海水水质标准，与我中心调查结果相近。',
        '丁字湾生态现状如何？': '2024年4月和11月丁字湾盐沼生态系统状态为受损，牡蛎礁生态系统状态为稳定。综合评估结果显示丁字湾生态系统稳定、健康状况未受损。海湾整体稳定，可自我维持，管理措施为跟踪监测、持续管理。'
    }
    return answers[question] || '暂无相关信息'
}

const pauseAnimation = () => {
    if (question1.value) {
        question1.value.style.animationPlayState = 'paused'
    }
}

const resumeAnimation = () => {
    if (question1.value) {
        question1.value.style.animationPlayState = 'running'
    }
}

const pauseAnimation2 = () => {
    if (question2.value) {
        question2.value.style.animationPlayState = 'paused'
    }
}

const resumeAnimation2 = () => {
    if (question2.value) {
        question2.value.style.animationPlayState = 'running'
    }
}

onMounted(() => {
    question1.value = document.querySelector('.question')
    question2.value = document.querySelector('.question2')
})

onUnmounted(() => {
    if (animationId1) cancelAnimationFrame(animationId1)
    if (animationId2) cancelAnimationFrame(animationId2)
})
</script>

<style scoped>
.AI {
    width: 16vh;
    height: 18vh;
    position: absolute;
    z-index: 3;
    bottom: 2vh;
    left: 50%;
    transform: translate(-50%, 0);
    background-image: url('../../assets/img/AIapng.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.question {
    width: 21.5vh;
    position: absolute;
    background-image: url('../../assets/img/AI/question.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 1vh;
    left: 35%;
    z-index: 3;
    padding: 2vh;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    animation: bubbleUp 4s ease-in-out infinite;
    opacity: 0;
}

.question2 {
    width: 21.5vh;
    position: absolute;
    background-image: url('../../assets/img/AI/question.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    bottom: 1vh;
    left: 55%;
    z-index: 3;
    padding: 2vh;
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    animation: bubbleUp 4s ease-in-out infinite 2s;
    opacity: 0;
}

@keyframes bubbleUp {
    0% {
        bottom: 1vh;
        opacity: 0;
    }

    25% {
        bottom: 7vh;
        opacity: 1;
    }

    75% {
        bottom: 18vh;
        opacity: 1;
    }

    100% {
        bottom: 25vh;
        opacity: 0;
    }
}

.point {
    width: 2vh;
    height: 2vh;
    background-image: url('../../assets/img/AI/point.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.text {
    width: calc(100% - 2vh - 1vh);
    font-size: 1.6vh;
    color: white;
    margin-left: 1vh;
    letter-spacing: 0.1vh;
}

.answer {
    position: absolute;
    bottom: 10vh;
    left: 55%;
    width: 50vh;
    height: 60vh;
    background-image: url('../../assets/img/AI/questionbox.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 3;
    padding: 2vh;
}

.answer-title {
    position: absolute;
    top: 0;
    left: 2vh;
    width: 8vh;
    height: 11vh;
    background-image: url('../../assets/img/AI/AI.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.answer-questionbox {
    min-height: 4vh;
    background-color: #004EA0D4;
    font-size: 1.6vh;
    letter-spacing: 0.1vh;
    border-radius: 0.5vh;
    display: flex;
    align-items: center;
    padding: 0.5vh 1vh;
    margin-top: 2.5vh;
    width: fit-content;
    max-width: calc(100% - 12vh);
    margin-left: auto;
    margin-right: 2vh;
}

.answer-question {
    margin-left: 1vh;
    color: white;
    font-weight: bold;
}

.point2 {
    width: 1vh;
    height: 2.5vh;
    background-image: url('../../assets/img/AI/point2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.answerbox {
    width: 100%;
    margin-top: 4vh;
    display: flex;
}

.answer-content {
    width: calc(100% - 2vh);
    color: white;
    font-size: 1.4vh;
    line-height: 1.6;
    text-align: justify;
    max-height: 40vh;
    overflow-y: auto;
    padding-right: 1vh;
    letter-spacing: 0.1vh;
}

.close{
    width: 1.5vh;
    height: 1.5vh;
    background-image: url('../../assets/img/AI/close.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 1vh;
    right: 1vh;
    cursor: pointer;
}
</style>
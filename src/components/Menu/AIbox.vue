<template>
    <div class="Page">
        <div class="AIrobot" @click="showAIdialog = !showAIdialog"></div>
        <div class="AIbox" v-if="showAIdialog">
            <div class="top">
                <div class="close" @click="showAIdialog = false"></div>
                <div class="title">生态小丁</div>
            </div>
            <div class="content" ref="messageContainer">
                <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
                    <img :src="msg.avatar" class="avatar" :class="{ 'right': msg.sender === 'me' }" />
                    <!-- <div class="bubble" v-html="renderMarkdown(msg.text)"></div> -->
                    <div class="bubble" v-html="msg.text"></div>
                </div>
            </div>
            <div class="bottom">
                <div class="inputQuestion">
                    <a-textarea v-model:value="Question" placeholder="请输入问题..." :auto-size="{ minRows: 1, maxRows: 1 }"
                        @keydown.enter.prevent="sendMessage" />
                </div>
                <a-button type="primary" style="margin-right: 1vw;" @click="sendMessage">发送</a-button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
// import { ref, onMounted, reactive } from "vue";
// import { marked } from "marked";

// const showAIdialog = ref(false);
// const Question = ref('');
// const messages = reactive([]);

// // 头像
// const myAvatar = '/src/assets/img/user.png';
// const aiAvatar = '/src/assets/img/AI.png';

// // 获取消息容器的引用
// const messageContainer = ref(null);

// const scoket = new WebSocket('http://127.0.0.1:8024/question');

// const sendMessage = () => {
//     let userMsg = Question.value;
//     if (userMsg.trim() === '') return;

//     messages.push({
//         text: userMsg,
//         sender: 'me',
//         avatar: myAvatar
//     });

//     scoket.send(userMsg);
//     Question.value = '';
//     scrollToBottom(); // 发送消息后滚动到底部
// };

// const messageHandler = (e) => {
//     const resData = JSON.parse(e.data);
//     const idx = messages.findIndex(item => item.isActive === true);

//     if (!resData.isEnd) {
//         if (idx === -1) {
//             messages.push({
//                 text: '',
//                 sender: 'bot',
//                 isActive: true,
//                 avatar: aiAvatar
//             });
//         } else {
//             const cleanedText = resData.data.replace(/<think>/g, '').replace(/<\/think>/g, '');
//             messages[idx].text += cleanedText;
//         }
//     } else {
//         messages[idx].isActive = false;
//         Question.value = '';
//     }
//     scrollToBottom(); // 接收到消息后滚动到底部
// };

// const scrollToBottom = () => {
//     if (messageContainer.value) {
//         messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
//     }
// };

// const openHanlder = () => {
//     console.log('open');
// };
// const errorHandler = () => {
//     console.log('error');
// };
// const closeHandler = () => {
//     console.log('close');
// };
// const initScoket = () => {
//     scoket.onmessage = messageHandler;
//     scoket.onopen = openHanlder;
//     scoket.onerror = errorHandler;
//     scoket.onclose = closeHandler;
// };

// onMounted(() => {
//     initScoket();
// });

// // 解析 Markdown
// const renderMarkdown = (text) => {
//     return marked(text);
// };
import axios from "axios";
import { ref } from "vue";
import { marked } from "marked";

const showAIdialog = ref(false);
const Question = ref('');
const messages = ref([]);
const lastQuestion = ref(''); // 记录上一次用户输入

// 头像
const myAvatar = '/src/assets/img/用户.png';
const aiAvatar = '/src/assets/img/AI3.png';

const sendMessage = () => {
  if (Question.value.trim() !== '') {
    messages.value.push({ sender: 'me', text: Question.value, avatar: myAvatar });
    lastQuestion.value = Question.value;
    Question.value = '';

    const aiMessage = { sender: 'bot', text: '', avatar: aiAvatar };
    messages.value.push(aiMessage);

    axios.get('丁字湾.json').then((res) => {
      const contents = res.data.map(item => item.choices[0].delta.content);
      const result = contents.join('');
      const htmlContent = marked(result);
      // 将解析后的内容逐字显示
      let index = 0;
      const interval = setInterval(() => {
        if (index < htmlContent.length) {
          aiMessage.text += htmlContent[index];
          messages.value = [...messages.value];
          index++;
        } else {
          clearInterval(interval);
        }
        scrollToBottom();
      }, 50);
    });
  }
};
// // 获取消息容器的引用
const messageContainer = ref(null);
const scrollToBottom = () => {
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
};
</script>
  
<style scoped>
.Page {
    width: 100vw;
    height: 100vh;
}

.AIrobot {
    width: 8vw;
    height: 16vh;
    position: absolute;
    left: 18vw;
    bottom: 3vh;
    cursor: pointer;
    z-index: 2;
    background-image: url('assets/img/AIrobot.gif');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.AIbox {
    width: 25vw;
    height: 60vh;
    position: absolute;
    top: 50%;
    left: 32%;
    transform: translate(-50%, -50%);
    border: 1px solid;
    background-color: #153351bf;
    border: 1px solid #05519c;
    border-radius: 2vh;
}

.top {
    position: relative;
    width: 100%;
    height: 5vh;
    background-color: #14416e;
    border-top-right-radius: 2vh;
    border-top-left-radius: 2vh;
}

.close {
    width: 1.5vw;
    height: 3vh;
    position: absolute;
    top: 1vh;
    right: 0.5vw;
    cursor: pointer;
    background-image: url('assets/img/close.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.title {
    height: 100%;
    font-size: 2vh;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
    width: 100%;
    height: calc(100% - 5vh - 6vh);
    padding: 1vh 0.5vw;
    overflow-y: auto;
}

.message {
    display: flex;
    margin: 0.5vh 0 1vh 0;
}

.message.me {
    justify-content: flex-end;
}

.message.bot {
    justify-content: flex-start;
}

.avatar {
    width: 1.75vw;
    height: 1.75vw;
    border-radius: 50%;
    margin: 0 0.5vw;
}

.bubble {
    max-width: 60%;
    padding: 1vh;
    border-radius: 1vh;
    color: white;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.message.me .bubble {
    background-color: #007bff;
}

.message.bot .bubble {
    padding: 1vh 2vh 1vh 3vh;
    background-color: #1d3e5a;
}

.message.me .avatar {
    order: 1;
}

.message.bot .avatar {
    order: 0;
}

.bottom {
    width: 100%;
    height: 6vh;
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    padding: 0 0.5vw;
    box-sizing: border-box;
}

.inputQuestion {
    width: 60vw;
    margin-right: 1vw;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
}

::-webkit-scrollbar {
    height: 5px;
    width: 5px;
    background-color: rgba(245, 245, 245, 0.25);
}

::-webkit-scrollbar-thumb {
    background-color: rgb(0, 170, 238);
    background-image: -webkit-gradient(linear,
            0 0,
            0 100%,
            color-stop(0.5, rgba(255, 255, 255, 0.2)),
            color-stop(0.5, transparent),
            to(transparent));
}

::-webkit-scrollbar-thumb {
    background-color: rgb(0, 170, 238);
}

.bubble {
    margin: 0;
}
</style>
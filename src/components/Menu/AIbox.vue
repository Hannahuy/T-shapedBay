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
                    <div class="bubble">
                        <div v-if="msg.sender === 'bot' && !msg.text" class="loading-container">
                            <div class="loading-dots">
                                <div class="dot"></div>
                                <div class="dot"></div>
                                <div class="dot"></div>
                            </div>
                        </div>
                        <div v-html="marked(msg.text)"></div>
                    </div>
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
import { ref } from "vue";
import { marked } from "marked";

// 配置marked以安全模式渲染（防止XSS攻击）
marked.setOptions({
    sanitize: true,
});

const showAIdialog = ref(false);
const Question = ref('');
const messages = ref([]);

// 头像路径
const myAvatar = '/src/assets/img/用户.png';
const aiAvatar = '/src/assets/img/AI3.png';

const scrollToBottom = () => {
    const container = document.querySelector('.content');
    if (container) {
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 0);
    }
};

const sendMessage = async () => {
    if (Question.value.trim() === '') return;

    // 添加用户消息
    messages.value.push({ sender: 'me', text: Question.value, avatar: myAvatar });
    const userQuestion = Question.value;
    Question.value = '';

    // 添加AI消息占位符
    const aiMessage = { sender: 'bot', text: '', avatar: aiAvatar };
    messages.value.push(aiMessage);

    // 构造请求数据
    const requestData = {
        messages: [
            { content: userQuestion, role: "system" },
            { content: "你好", role: "user" }
        ],
        model: "deepseek-chat",
        stream: true, // 启用流式传输
        max_tokens: 4096,
        temperature: 1,
    };

    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-b09e2be88f544ba88b532e2e1a82745e'
            },
            body: JSON.stringify(requestData)
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let isStreaming = true;

        // 流式数据接收处理
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                isStreaming = false;
                break;
            }
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // 处理SSE格式
            const parts = buffer.split('\n');
            buffer = parts.pop(); // 剩余部分放回缓冲区

            for (const part of parts) {
                if (part.startsWith('data: ')) {
                    const dataStr = part.slice(6).trim();
                    if (dataStr === '[DONE]') {
                        isStreaming = false;
                        break;
                    }
                    try {
                        const data = JSON.parse(dataStr);
                        if (data.choices[0].delta.content) {
                            // 逐字添加到AI消息
                            aiMessage.text += data.choices[0].delta.content;
                            messages.value = [...messages.value];
                            scrollToBottom();
                        }
                    } catch (e) {
                        console.error('解析错误:', e);
                    }
                }
            }
        }
    } catch (error) {
        console.error('请求失败:', error);
        aiMessage.text += ' [对话出错，请重试]';
        messages.value = [...messages.value];
        scrollToBottom();
    }
};
</script>
<style scoped>
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

.bubble * {
    margin: 0 !important;
}

.loading-container {
    min-height: 20px;
    padding: 8px 0;
}

.loading-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    background: #ddd;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(2) {
    animation-delay: 0.2s;
}

.dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: translateY(0);
        background: #ddd;
    }

    40% {
        transform: translateY(-6px);
        background: #666;
    }
}
</style>
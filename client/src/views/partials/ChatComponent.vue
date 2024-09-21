<script setup>
import IconButton from '@/views/partials/game/IconButton.vue';
import { onMounted, ref, watch } from 'vue';
import MessageComponent from './MessageComponent.vue';
import { GetChatRef, GetClient, SendMessage } from '../../services/Dragonroll';

const textInput = ref(null);
const chat = GetChatRef();
const messageContainer = ref(null);

function Send(message){
    SendMessage({
        content: {
            text: message
        },
        author: GetClient()._id
    });
}

onMounted(() => {
    textInput.value.addEventListener('input', (event) => {
        // textInput.value.style.height = "1px";
        textInput.value.style.height = (textInput.value.scrollHeight)+"px";
    })
    textInput.value.addEventListener("keypress", (event) => {
        if(event.shiftKey) return;
        if (event.key === "Enter") {
            event.preventDefault();
            
            Send(textInput.value.value);
            textInput.value.value = "";


            textInput.value.style.height = "1px";
            textInput.value.style.height = (textInput.value.scrollHeight)+"px";
        }
    });
});

watch(chat, () => {
    if(chat.value.length > 0) if(chat.value[chat.value.length - 1].author == GetClient()._id){
        setTimeout(() => {
            messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
        }, 0);
    }
}, {deep: true})

</script>

<template>
    
<div class="chat-container">
    <div class="message-container" ref="messageContainer">
        <MessageComponent v-for="message in chat" :key="message._id" :message="message"></MessageComponent>
    </div>
    <div class="chat-input-container">
        <textarea ref="textInput" class="chat-input"></textarea>
        <div class="chat-input-actions">
            <div class="chat-input-actions-left">
                <IconButton icon="/icons/iconoir/regular/trash.svg" tooltip="Clear chat"></IconButton>
            </div>
            <div class="chat-input-actions-right">
                <IconButton icon="/icons/iconoir/regular/send.svg" tooltip="Send message"></IconButton>
            </div>
        </div>
    </div>
    
</div>

</template>

<style scoped lang="scss">

.chat-container {
    display: flex;
    height: calc(100% - 24px);
    width: 100%;
    flex-direction: column;

    h2 {
        font-family: MrEavesRemake;
        margin-left: 10px;
        margin-top: 5px;
    }
}

.message-container {
    flex-grow: 1;
    
    display: flex;
    flex-direction: column;
    
    overflow-y: auto;

    margin-bottom: 10px;
}

.chat-input-container {
    position: sticky;
    bottom: 0px;
    width: 100%;
}

.chat-input {
    background-color: var(--color-background-softer);
    border: none;
    padding: 12px;
    border-radius: 6px;
    color: var(--color-text);
    transition: 300ms background-color;
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    min-height: 30px;
    height: 41px;
    max-height: 100px;
    resize: none;
    border: 1px solid var(--color-border);

    &:focus {
        outline: none;
        background-color: var(--color-background-softest);
    }
}

.chat-input-actions {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 8px;
}

.chat-input-actions-left {
    margin-right: auto;
}


.chat-input-actions-right {
    margin-left: auto;
}


</style>

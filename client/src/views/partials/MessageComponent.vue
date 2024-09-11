<script setup>
import { onMounted, ref } from 'vue';

import MessageChunk from './MessageChunk.vue';
import { GetPlayer } from '../../services/Dragonroll';
import { backendUrl } from '../../services/BackendURL';

const props = defineProps(['message']);
const message = props.message;

const avatar = ref(null);
const title = ref("");
const chunks = ref([]);

onMounted(() => {
    let sender = GetPlayer(message.author);
    if(sender.user.image) avatar.value.src = backendUrl + "public/" + sender.user.image;
    title.value = sender.user.username;
    chunks.value = message.chunks;
});

</script>

<template>
    <div class="msg-parent-container rcv">
        <img class="user-icon" src="img/def-avatar.jpg" ref="avatar" draggable="false">
        <div class="content-container">
            <div class="msg-title">
                {{ title }}
            </div>

            <MessageChunk v-for="chunk in chunks" :id="chunk.id" :data="chunk"></MessageChunk> 
        </div>
    </div>

</template>

<style scoped lang="scss">
.msg-chunk {
    border-bottom: 1px solid #ffffff08;
    margin: 2px 0px 2px 0px;
}

.msg-title {
    font-weight: bold;
}

.msg-parent-container {
    width: 100%;
    background-color: var(--color-chat-other);
    display: flex;
    padding-left: 10px;
    font-size: 0.9rem;
}

.content-container {
    width: 100%;
    padding: 1px 15px;
    margin-bottom: 7px;

    text-align: left;
}

.user-icon {
    margin-top: 9px;
    width: 32px;
    height: 32px;
}

</style>

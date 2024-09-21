<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import Api from '@/services/Api.js'
import { backendUrl } from '../../services/BackendURL';
import { GetClient, GetPlayer, GetPlayerList } from '../../services/Dragonroll';
import { GetUser } from '../../services/User';

const props = defineProps(['player']);
let player = props.player;

const playerName = ref("");
const isDm = ref(false);

const avatar = ref(null);
const container = ref(null);
const status = ref(""); 

function retrieveAvatar(){
    let userAvatarDisplay = avatar.value;
    Api().get('/user/retrieve-avatar?username=' + player.user.username).then((response) => {
        if(response.data.image) userAvatarDisplay.src = backendUrl + "public/" + response.data.image;
    }).catch((err) => console.log("Internal error"));
}

onMounted(() => {
    playerName.value = player.user.username;
    if(player.is_dm) isDm.value = true;
    if(player.online) status.value = "online";
    else status.value = "";
    
    retrieveAvatar();
    
    if(player.user._id == GetUser()._id){
        container.value.classList.add("current-player");
    }
});


onUpdated(() => {
    player = GetPlayer(player._id);
    playerName.value = player.user.username;
    if(player.is_dm) isDm.value = true;
    if(player.online) status.value = "online";
    else status.value = "";
});

</script>


<template>
    <div class="main-player-container" ref="container">
        <div class="main-player-container-inner">
            <img class="user-icon" src="/img/def-avatar.jpg" ref="avatar" draggable="false">
            <div class="main-user-info">
                <b>{{ playerName }}</b><span class="dm" v-if="isDm"> DM</span>
                <br>
                <span class="offline-indicator" v-if="status == ''">Offline</span>
                <span class="online-indicator" v-if="status == 'online'">Online</span>
            </div>

            <div class="main-user-actions">

            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.current-player {
    background-color: var(--color-background-softer);
}

.offline-indicator {
    &:before {
        content: '';
        display: inline-block;
        width: 9px;
        height: 9px;
        background-color: var(--text-disabled);
        border-radius: 8px;
        margin-bottom: 1px;
        margin-right: 5px;
    }
    color: var(--text-disabled);
}

.online-indicator {
    &:before {
        content: '';
        display: inline-block;
        width: 9px;
        height: 9px;
        background-color: var(--c-text-green);
        border-radius: 8px;
        margin-bottom: 1px;
        margin-right: 5px;
    }
    color: var(--c-text-green);
}

#send-avatar-form {
    display: none;
}

.button-small {
    height: 32px;
    padding: 10px;
}

.main-player-container {
    width: 100%;
    user-select: none;
}

.dm {
    color: gold;
    font-weight: bold;
}

.main-player-container-inner {
    padding: 10px;
    display: flex;
    align-items: center;

    justify-content: center;
}

.main-user-info {
    text-align: left;
    margin-left: 10px;
}

.user-icon {
    width: 40px;
    height: 40px;
}

.main-user-actions {
    margin-left: auto;
}
</style>
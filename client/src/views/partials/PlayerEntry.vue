<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import Api from '@/services/Api.js'
import { backendUrl } from '../../services/BackendURL';

const props = defineProps(['player']);
const player = props.player;

const playerName = ref("");
const isDm = ref(false);

const avatar = ref(null);

function retrieveAvatar(){
    let userAvatarDisplay = avatar.value;
    Api().get('/user/retrieve-avatar?username=' + player.data.username).then((response) => {
        if(response.data.image) userAvatarDisplay.src = backendUrl + "public/" + response.data.image;
    }).catch((err) => console.log("Internal error"));
}

onMounted(() => {
    playerName.value = player.data.username;
    if(player.is_dm) isDm.value = true;

    retrieveAvatar();
});

</script>


<template>
    <div class="main-player-container">
        <div class="main-player-container-inner">
            <img class="user-icon" src="img/def-avatar.jpg" ref="avatar" draggable="false">
            <div class="main-user-info">
                <b>{{ playerName }}</b><span class="dm" v-if="isDm"> DM</span><br>Miauler
            </div>

            <div class="main-user-actions">

            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
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
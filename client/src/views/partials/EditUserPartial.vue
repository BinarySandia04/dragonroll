<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'

import { onMounted, ref } from 'vue';
import { GetUser, LogoutUser } from '@/services/User'

import Api from '@/services/Api'

import useEmitter from '@/services/Emitter';
import { ClearWindows, CreateWindow, CreateChildWindow } from '../../services/Windows';
import { backendUrl } from '../../services/BackendURL';
const emitter = useEmitter();

const username = ref("");
username.value = GetUser().username;

function retrieveAvatar(){
    let userAvatarDisplay = document.getElementById("upload-image");
    Api().get('/user/retrieve-avatar?username=' + GetUser().username).then((response) => {
        if(response.data.image) userAvatarDisplay.src = backendUrl + "public/" + response.data.image;
    }).catch((err) => console.log("Internal error"));
}

function LogOut(){
    LogoutUser();

    ClearWindows({type: "main_menu"});
    CreateWindow('login');
}

function EditProfile(){
    CreateChildWindow('main_menu', 'edit_profile');
}

function EditSettings(){
    CreateChildWindow('main_menu', 'settings');
}

onMounted(() => {
    let userAvatarDisplay = document.getElementById("upload-image");
    let sendAvatarForm = document.getElementById("send-avatar-form");
    let sendAvatarFileUploader = document.getElementById("send-avatar-file-uploader");
    
    sendAvatarFileUploader.addEventListener("change", (event) => {
        const formData = new FormData();
        const image = event.target.files[0];

        formData.append("image", image);

        Api().post('/user/upload-avatar', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((response) => {
            retrieveAvatar();
        }).catch((err) => console.log("Internal error"));
    });

    userAvatarDisplay.addEventListener("click", (event) => {
        sendAvatarFileUploader.click();
    });

    retrieveAvatar();
});
</script>


<template>
    <form id="send-avatar-form" enctype="multipart/form-data">
        <input name="file" type="file" accept="image/*" id="send-avatar-file-uploader">
    </form>

    <div class="main-user-container">
        <div class="main-user-container-inner">
            <img class="user-icon" src="/img/def-avatar.jpg" id="upload-image" draggable="false">
            <div class="main-user-info">
                <b>{{ username }}</b><br>Hola
            </div>

            <div class="main-user-actions">
                <button class="btn-primary button-small sound-click" v-on:click.prevent="EditProfile">{{ $t("main-menu.edit-profile") }}</button>
                <button class="btn-primary button-small sound-click" v-on:click.prevent="EditSettings">{{ $t("main-menu.settings") }}</button>
                <button class="btn-primary button-small sound-click" v-on:click.prevent="LogOut">{{ $t("main-menu.log-out") }}</button>
            </div>
        </div>
    </div>
</template>


<style scoped>
#send-avatar-form {
    display: none;
}

.button-small {
    height: 32px;
    padding: 10px;
}

.main-user-container {
    background-color: var(--color-background-softer);
    width: 100%;
    user-select: none;
}

.main-user-container-inner {
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

    button {
        margin-left: 10px;
    }
}
</style>

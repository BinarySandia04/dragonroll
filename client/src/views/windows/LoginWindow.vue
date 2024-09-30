<script setup>

import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { SetUser, GetUser } from '@/services/User'

import Api from '@/services/Api.js'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import { ClearWindows, CreateWindow } from '@/services/Windows';
import { DisplayToast } from '@/services/Dragonroll';

const handle = ref(null);

const username = ref("");
const password = ref("");

const props = defineProps(['data']);

const data = props.data;

let id = data.id;

onMounted(() => {
  SetupHandle(id, handle);
  SetSize(id, {width: 450, height: 420});
  ResetPosition(id, "center");
});

function login(){
  Api().post('/user/login', { username: username.value, password: password.value }).then((response) => {
    const data = response.data;
    console.log(data);

    if(data.error){
      DisplayToast('red', t(`login.errors.${data.msg}`), 3000)
    } else {
      SetUser(data.token);

      ShowMainMenu();
    }
  }).catch((error) => {
    console.log(error);
    if(error.response.status == 429){
      // errorMessage.value = error.response.data;
    } else {
      // errorMessage.value = "Hi ha hagut un error intern, torna'ho a provar més tard";
        console.log(error);
    }
  });
}

function ShowMainMenu(){
  ClearWindows({type: "login"});
  CreateWindow('main_menu');
  DisplayToast('green', 'Logged in successfully as ' + GetUser().username + '!', 3000)
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <img src="/img/logo-splash.png" class="splash-image" draggable="false">

        <form v-on:submit.prevent="login">
            <div class="form-field">
                <label for="username">Username</label>
                <input id="username-field" type="text" placeholder="Enter your username here..." name="username" v-model="username" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input id="password-field" type="password" placeholder="Enter your password..." name="password" v-model="password" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click">Log in</button>
            </div>
        </form>

        <!-- <VersionRender></VersionRender> -->

    </div>
</template>


<style scoped>
p {
  user-select: none;
}

.window-wrapper {
    user-select: none;

    display: flex;
    align-items: center;
}

.splash-image {
    width: 450px;
}

form {
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
}

label {
    text-align: left;
}

</style>

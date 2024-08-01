<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'
import SuccessMessage from '@/views/others/SuccessMessage.vue'

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition } from '@/services/Windows';
import { SetUser } from '@/services/User'

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const props = defineProps(['data']);

const data = props.data;

let id = data.id;
let title = data.title;
let success = data.msg;

onMounted(() => {
  successMessage.value = success;
  SetupHandle(id);
  SetSize(id, {x: 700, y: 630});
  SetPosition(id, "center");
});

function login(){
  Api().post('/user/login', { username: username.value, password: password.value }).then((response) => {
    const data = response.data;

    if(data.error){
      errorMessage.value = data.msg;
    } else {
      errorMessage.value = "";
      SetUser(data.token);

      console.log("Logged successfully");
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

function ShowRegister(){
  emitter.emit("clear-windows", {type: "login"});
  emitter.emit("create-window", {type: "register", id: "register"})
}

function ShowMainMenu(){
  emitter.emit("clear-windows", {type: "login"});
  emitter.emit("create-window", {type: "main_menu", id: "main_menu"})
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <div class="window-handle" :id="'window-handle-' + id">
            Login
        </div>

        <img src="img/logo-splash.png" class="splash-image" draggable="false">

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
                <button class="btn-primary">Log in</button>
            </div>
        </form>

        <p>Don't have an account? <a v-on:click.prevent="ShowRegister">Register here</a></p>
        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>
        <SuccessMessage v-if="successMessage">{{ successMessage }}</SuccessMessage>
        <!-- <VersionRender></VersionRender> -->

    </div>
</template>


<style scoped>
p {
  user-select: none;
}

.window-wrapper {
    min-width: 700px;
    min-height: 630px;

    display: flex;
    align-items: center;
}

.splash-image {
    width: 600px;
    height: 250px;
}

.form-field {
    padding: 10px;
    display: flex;
    align-items: left;
    flex-direction: column;
    justify-content: left;
    width: 600px;
}

label {
    text-align: left;
}

</style>

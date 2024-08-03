<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import { ClearWindows, CreateWindow } from '../../services/Windows';

const email = ref("");
const name = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");

const handle = ref(null);

const props = defineProps(['data']);

const data = props.data;

let id = data.id;
let title = data.title;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 700, y: 630});
    ResetPosition(id, "center");
});


function register(){
  if(password.value != confirmPassword.value){
      errorMessage.value = "Password mismatch";
      return;
  }

  Api().post('/user/register', 
      {
          name: name.value,
          username: username.value,
          email: email.value,
          password: password.value,
      }).then((response) => {

      const data = response.data;

      if(data.error){
          console.log(data);
          errorMessage.value = data.msg;
      } else {
          errorMessage.value = "";
          console.log("Logged successfully");
          ShowLogin("Account created successfully");
      }
  }).catch((error) => {
      console.log(error);
  });
}

function ShowLogin(msg){
    ClearWindows({type: "register"});
    CreateWindow({
        type: "login",
        id: "login",
        title: "Login",
        success: msg
    });
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="window-content">
        <img src="img/logo-splash.png" class="splash-image" draggable="false">

        <form v-on:submit.prevent="register">
            <div class="form-field">
                <label for="name">Name</label>
                <input id="name-field" type="text" placeholder="Aran Roig" name="name" v-model="name" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="email">Email</label>
                <input id="email-field" type="email" placeholder="aran@aranroig.com" name="email" v-model="email" autocomplete="off" >
            </div>
            
            <div class="form-field">
                <label for="username">Username</label>
                <input id="username-field" type="text" placeholder="Enter your username..." name="username" v-model="username" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="password">Password</label>
                <input id="password-field" type="password" placeholder="Enter your password..." name="password" v-model="password" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="confirm-password">Confirm your password</label>
                <input id="confirm-password-field" type="password" placeholder="Enter again your password..." name="confirm-password" v-model="confirmPassword" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary">Register</button>
            </div>
        </form>

        <p>Already have an account? <a v-on:click.prevent="ShowLogin">Log in</a></p>
        <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

      </div>
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

.window-content {
  overflow: auto;
  min-width: 700px;

  flex-direction: column;
    display: flex;
    align-items: center;
    padding-bottom: 50px;
}

.splash-image {
    width: 600px;
    height: 250px;
    user-select: none;
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

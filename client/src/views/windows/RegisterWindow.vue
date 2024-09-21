<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import { ClearWindow, ClearWindows, CreateWindow } from '../../services/Windows';
import { DisplayToast } from '../../services/Dragonroll';

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
    SetSize(id, {width: 500, height: 660});
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
        DisplayToast('green', 'Account created successfully, now log in!', 3000);
        ClearWindow(id);
        CreateWindow('login');
    }
  }).catch((error) => {
      console.log(error);
  });
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="window-content">
            <div class="document">
                <h1>Welcome!</h1>
                <b>You have successfull setup Dragonroll!</b>
                <p>Please create the admin account</p>
                <p>Once the admin account has been created, you will be able to create user accounts that will be able to access Dragonroll</p>
                <hr>
            </div>
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
                <button class="btn-primary sound-click confirm-form-button">Register</button>
            </div>
        </form>

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
    display: flex;
    align-items: center;
}

.window-content {
  flex-direction: column;
    display: flex;
    align-items: center;
    padding-bottom: 50px;
    width: 100%;
    padding: 20px;
}

.splash-image {
    width: 450px;
    user-select: none;
}



form {
    width: 100%;
}

label {
    text-align: left;
}

</style>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import ErrorMessage from '@/views/others/ErrorMessage.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import Server from '@/services/Server.js'

import { ClearWindow, CreateWindow } from '@/services/Windows';
import { DisplayToast } from '@/services/Dragonroll';

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

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 620});
    ResetPosition(id, "center");
});


function setup(){
  if(password.value != confirmPassword.value){
      errorMessage.value = t('general.password-mismatch');
      return;
  }

  Server().post('/user/setup?code=' + data.setupCode, 
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
        DisplayToast('green', 'Account setup successfull, now log in!', 3000);
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
            <div class="document" v-html="t('register-account.setup.welcome-message')">
            </div>
        <form v-on:submit.prevent="setup">
            <div class="form-field">
                <label for="name">{{$t('general.name')}}</label>
                <input id="name-field" type="text" :placeholder="t('placeholders.name')" name="name" v-model="name" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="email">{{$t('general.email')}}</label>
                <input id="email-field" type="email" :placeholder="t('placeholders.email')" name="email" v-model="email" autocomplete="off" >
            </div>
            
            <div class="form-field">
                <label for="username">{{$t('general.username')}}</label>
                <input id="username-field" type="text" :placeholder="t('placeholders.username')" name="username" v-model="username" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="password">{{$t('general.password')}}</label>
                <input id="password-field" type="password" :placeholder="t('placeholders.password')" name="password" v-model="password" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="confirm-password">{{$t('general.password-confirm')}}</label>
                <input id="confirm-password-field" type="password" :placeholder="t('placeholders.password-confirm')" name="confirm-password" v-model="confirmPassword" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary sound-click confirm-form-button">{{$t('register-account.setup.confirm')}}</button>
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

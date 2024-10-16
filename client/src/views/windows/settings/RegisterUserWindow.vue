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
import { CallWindow } from '../../../services/Windows';

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
    SetSize(id, {width: 400, height: 310});
    ResetPosition(id, "center");
});


function register(){
    Server().post('/user/register').then((response) => {
        const data = response.data;
        if(data.error){
            errorMessage.value = data.msg;
        } else {
            errorMessage.value = "";
            DisplayToast('green', 'Account created successfully', 3000);
            CallWindow(id, 'done');
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
            <div class="document" v-html="t('register-account.welcome-message')">
            </div>
        <form v-on:submit.prevent="register">
            <div class="form-field">
                <button class="btn-primary sound-click confirm-form-button">{{$t('general.register')}}</button>
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

<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import Server from '@/services/Server'
import BigIconTemplate from '@/views/partials/BigIconTemplate.vue';
import { SetMinSize, SetResizable } from '@/services/Windows';
import { backendUrl } from '@/services/BackendURL';
import { GetUser } from '@/services/User';
import FixedBottomButtons from '../partials/FixedBottomButtons.vue';

const props = defineProps(['data']);
const data = props.data;
const userIcon = ref("");

const handle = ref(null);
const isAdmin = ref(false);

let id = data.id;
console.log(data);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 480});
    ResetPosition(id, "center");

    SetResizable(id, true);
    SetMinSize(id, {width: 350, height: 280});

    isAdmin.value = GetUser().admin;

    Server().get('/user/retrieve-avatar?username=' + data.user.username).then((response) => {
        if(response.data.image) userIcon.value = backendUrl + "public/" + response.data.image;
        else userIcon.value = "public/img/def-avatar.jpg";
    }).catch((err) => console.log("Internal error"));
});

function RemoveUser(){
    alert("Remove")
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <BigIconTemplate :title="data.user.username" :img="userIcon">
        <div v-if="props.data.editable || isAdmin">
            
        </div>
        <div v-else>

        </div>
        </BigIconTemplate>

        <FixedBottomButtons v-if="isAdmin" :remove="RemoveUser"></FixedBottomButtons>
    </div>
</template>


<style scoped>
.window-wrapper {

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

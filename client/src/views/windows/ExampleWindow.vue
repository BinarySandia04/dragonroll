<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

const props = defineProps(['data']);
const data = props.data;

let id = data.id;
let title = data.title;

onMounted(() => {
    SetupHandle(id);
    SetSize(700, 630);
    SetPosition("center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <div class="window-handle" :id="'window-handle-' + id">
            {{ title }}
        </div>

        <!-- Body -->

    </div>
</template>


<style scoped>
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

<script setup>

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

onMounted(() => {
    SetupHandle(id);
    SetSize(id, {x: 500, y: 380});
    SetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <div class="window-handle" :id="'window-handle-' + id">
            Edit profile
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

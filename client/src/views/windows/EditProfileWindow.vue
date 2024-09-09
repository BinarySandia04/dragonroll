<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
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

<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import ErrorMessage from '@/views/others/ErrorMessage.vue'

import EditUserPartial from '@/views/partials/EditUserPartial.vue'

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
    SetSize(id, {x: 500, y: 380});
    SetPosition(id, "center");
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <div class="window-handle" :id="'window-handle-' + id">
            Dragonroll
        </div>

        <EditUserPartial></EditUserPartial>

        <h1>Main Menu</h1>

        <div class="button-container">
            <button class="btn-primary button-expand">My campaings</button>
            <button class="btn-primary button-expand">Join existing campaign</button>
        </div>
        <VersionRender></VersionRender>
    </div>
</template>


<style scoped>

h1 {
    margin-top: 20px;
    font-family: MrEavesRemake;
}

.button-expand {
    width: 100%;
}

.button-container {
    display: flex;
    width: 100%;
    padding: 20px;

    flex-direction: column;
}

p {
  user-select: none;
}

.window-wrapper {
    display: flex;
    align-items: center;
}

.splash-image {
    width: 600px;
    height: 250px;
    user-select: none;
}
</style>

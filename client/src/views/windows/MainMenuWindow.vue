<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import EditUserPartial from '@/views/partials/EditUserPartial.vue'

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
const emitter = useEmitter();
const handle = ref(null);

const props = defineProps(['data']);

const data = props.data;

let id = data.id;
let title = data.title;

onMounted(() => {
    SetupHandle(id, handle, {title: "Dragonroll"});
    SetSize(id, {x: 500, y: 450});
    ResetPosition(id, "center", emitter);
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <EditUserPartial></EditUserPartial>

        <h1>Main Menu</h1>

        <div class="button-container">
            <button class="btn-primary button-expand">My campaings</button>
            <button class="btn-primary button-expand">Join existing campaign</button>
            <button class="btn-primary button-expand">Database</button>
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
    user-select: none;
}

.splash-image {
    width: 600px;
    height: 250px;
    user-select: none;
}
</style>

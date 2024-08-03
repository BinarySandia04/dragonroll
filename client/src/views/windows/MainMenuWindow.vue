<script setup>

import VersionRender from '@/views/others/VersionRender.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import EditUserPartial from '@/views/partials/EditUserPartial.vue'

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'

import useEmitter from '@/services/Emitter';
import { ClearWindow, CreateWindow } from '../../services/Windows';
const emitter = useEmitter();
const handle = ref(null);

const props = defineProps(['data']);

const data = props.data;

let id = data.id;
let title = data.title;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 500, y: 540});
    ResetPosition(id, "center", emitter);
});

// ???
/*
function OpenDatabase(){
    ClearWindow(id);
    CreateWindow({
        type: 'db_window',
        id: 'db_window',
        title: "Database",
        back: () => {
            ClearWindow('db_window');
            CreateWindow({
                type: 'main_menu',
                id: 'main_menu',
                title: 'Dragonroll'
            })
        }
    });
}
    */

function OpenCampaigns(){
    ClearWindow(id);
    CreateWindow('campaign_list');
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <EditUserPartial></EditUserPartial>

        <h1>Main Menu</h1>

        <div class="button-container">
            <button class="btn-primary button-expand sound-click" v-on:click="OpenCampaigns">Campaigns</button>
            <hr>
            <button class="btn-primary button-expand sound-click" v-on:click="OpenCollection">Your Collection</button>
            <button class="btn-primary button-expand sound-click" v-on:click="OpenLibrary">The Cosmic Library</button>
            <button class="btn-primary button-expand sound-click" v-on:click="OpenLibrary">Book Anvil</button>
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

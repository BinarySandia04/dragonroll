<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import VersionRender from '@/views/others/VersionRender.vue'
import WindowHandle from '@/views/partials/WindowHandle.vue';

import EditUserPartial from '@/views/partials/EditUserPartial.vue'

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import useEmitter from '@/services/Emitter';
import { ClearWindow, CreateWindow } from '@/services/Windows';
const emitter = useEmitter();
const handle = ref(null);

const props = defineProps(['data']);

const data = props.data;

const campaignButton = ref(null);

let id = data.id;
let title = data.title;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 460});
    ResetPosition(id, "center", emitter);
});

function OpenCampaigns(){
    ClearWindow(id);
    CreateWindow('campaign_list');
}

function OpenCompendium(){
    ClearWindow(id);
    CreateWindow('compendium_window', {
        back: () => {
            CreateWindow('main_menu');
            ClearWindow('compendium_window');
        },
        close: false
    });
}

function OpenBookAnvil(){
    ClearWindow(id);
    CreateWindow('book_anvil_window');
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <EditUserPartial></EditUserPartial>

        <h1>{{ $t("main-menu.main-menu")}}</h1>

        <div class="button-container">
            <button class="btn-primary button-expand sound-click" v-on:click="OpenCampaigns" ref="campaignButton">{{ $t("main-menu.campaigns") }}</button>
            <hr>
            <button class="btn-primary button-expand sound-click" v-on:click="OpenCompendium">{{ $t("main-menu.cosmic-compendium") }}</button>
            <button class="btn-primary button-expand sound-click" v-on:click="OpenBookAnvil">{{ $t("main-menu.book-anvil") }}</button>
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
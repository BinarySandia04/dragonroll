<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import GameEntry from '../../partials/GameEntry.vue';
import { CreateWindow, SetMinSize, SetMaxSize, SetResizable, ClearWindow } from '../../../services/Windows';
import { GetCampaignModuleName } from '../../../services/Campaign';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);

    SetSize(id, {width: 300, height: 540});
    SetResizable(id, true);
    SetMinSize(id, {height: 300});
    SetMaxSize(id, {height: 700});
    ResetPosition(id, {x: window.innerWidth - 420, y: 60});
});

// temp
function openCharacterSheet(){
    CreateWindow(`${GetCampaignModuleName()}/character_sheet`, {
        id: 'character_sheet',
        title: 'Character Sheet',
        close: () => ClearWindow(`character_sheet`)
    });
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="map-list-container">
            <GameEntry :data='{
                height: "10px",
                icon: "img/game/weaponIcons32x32_png_Transparent/icon_axe1.png",
                name: "Axe",
                click: openCharacterSheet,
                }'></GameEntry>
        </div>
    </div>
</template>


<style scoped>

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.map-list-container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;

    overflow-y: auto;
}

</style>

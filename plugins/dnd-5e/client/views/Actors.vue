<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref, shallowRef, watch } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { CreateWindow, SetMinSize, SetMaxSize, SetResizable, ClearWindow } from '@/services/Windows';
import { GetCampaignModuleName } from '@/services/Campaign';
import ConceptList from '@/views/partials/ConceptList.vue';
import FixedBottomButtons from '@/views/partials/FixedBottomButtons.vue';
import { CreateActor, DeleteActor, FetchActors, GetActors } from '../actors';

import { HideContextMenu } from "@/services/ContextMenu.js";

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

const actorElements = shallowRef([]);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);

    SetSize(id, {width: 300, height: 540});
    SetResizable(id, true);
    SetMinSize(id, {height: 300});
    SetMaxSize(id, {height: 700});
    ResetPosition(id, {x: window.innerWidth - 420, y: 60});

    watch(GetActors, () => {
        update();
    });
    update();
});

function update(){
    actorElements.value = GetActors();
    console.log("ACTOR UPDATE");
    console.log(actorElements.value);
}

// temp
function openCharacterSheet(){
    CreateWindow(`${GetCampaignModuleName()}/character_sheet`, {
        id: 'character_sheet',
        title: 'Character Sheet',
        close: () => ClearWindow(`character_sheet`)
    });
}

async function ActorIcon(element){
    return "public/img/def-avatar.jpg";
}

function ActorContext(element){
    return [
        {name: "Open"},
        {name: "Delete", action: () => {
            DeleteActor(element._id);
            HideContextMenu();
        }}
    ];
}

function Create(){
    CreateActor();
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        

        <div class="main-container">
            <ConceptList
                :elements="actorElements"
                :icon="ActorIcon"
                :open="openCharacterSheet"
                :context="ActorContext"
            ></ConceptList>
        </div>
            <!--
        <div class="map-list-container">
            <GameEntry :data='{
                height: "10px",
                icon: "img/game/weaponIcons32x32_png_Transparent/icon_axe1.png",
                name: "Axe",
                click: openCharacterSheet,
            }'></GameEntry>
        </div>
            -->

        <FixedBottomButtons :plus="Create"></FixedBottomButtons>
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

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import PlayerList from '../../partials/PlayerList.vue';
import { Disconnect, DisplayToast, GetCampaign, GetClient } from '../../../services/Dragonroll';
import CampaignBookList from '../../partials/books/CampaignBookList.vue';
import { ClearAll, ClearWindow, CreateWindow, SetMinSize, SetResizable } from '../../../services/Windows';
import { LaunchGame } from '../../../services/Game';
import { AddSound } from '../../../services/Sound';
import ChatComponent from '../../partials/ChatComponent.vue';
import GameSystem from '@/views/partials/GameSystem.vue'
import { GetModule } from '../../../services/Modules';
import { AddTooltip } from '../../../services/Tooltip';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const hide_start = ref(false);
const hide_chat = ref(false);
const campaign_title = ref(null);
const copy_code_button = ref(null);

const container = ref(null);

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);

    SetSize(id, {width: 800, height: 750});
    SetResizable(id, true);
    SetMinSize(id, {width: 600, height: 500});

    hide_chat.value = true;
    
    ResetPosition(id, "center");

    hide_start.value = data.hide_start;

    AddSound(container.value)

    campaign_title.value.style.backgroundColor = GetModule(data.campaign.system).color ? GetModule(data.campaign.system).color : "#1f1f1f";

    AddTooltip(copy_code_button.value, "<p>Click this button to copy the invite code of your campaign to the clipboard</p>", {max_width: 300})
});

function CopyCode(){
    navigator.clipboard.writeText(GetCampaign().invite_code);
    DisplayToast('aqua', "Copied invite code successfully!", 1000);
}

function Launch(){
    ClearWindow('campaign_preview');
    LaunchGame();
}

function Exit(){
    Disconnect();
    ClearAll();
    CreateWindow('campaign_list');
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body 
         <h1>{{ data.campaign.name }}</h1> -->

         <div class="campaign-preview-container" :class="hide_chat ? 'campaign-preview-compact' : ''" ref="container">
            <div class="campaign-preview-column left">
                <h2>Players</h2>
                <PlayerList :campaign="data.campaign"></PlayerList>
                <div class="buttons-row">
                    <button class="btn-primary button-row sound-click" v-on:click.prevent="CopyCode" ref="copy_code_button">Copy invite code</button>
                </div>
            </div>
            <div class="campaign-preview-column center">
                <h1 class="campaign-title" ref="campaign_title">{{ data.campaign.name }}</h1>
                <div class="campaign-main-container">
                    <div class="campaign-main-container-scroll">
                        <GameSystem :data="GetModule(data.campaign.system)"></GameSystem>
                        <h2>Books</h2>
                        <CampaignBookList class="small-book-list"></CampaignBookList>
                    </div>
                </div>
                <div class="buttons-row">
                    <button class="btn-primary button-row sound-click btn-green" v-if="!hide_start" v-on:click.prevent="Launch">Launch game</button>
                    <button class="btn-primary button-row sound-click btn-red" v-if="hide_start" v-on:click.prevent="Exit">Exit game</button>
                </div>
            </div>
            <div v-if="!hide_chat" class="campaign-preview-column right">
                <ChatComponent></ChatComponent>
            </div>
         </div>

    </div>
</template>


<style scoped lang="scss">
.small-book-list {
    margin: 20px;
    overflow: auto;
}

.campaign-main-container-scroll {
    overflow-y: scroll;
    height: 100%;
    max-height: 520px;
}


.campaign-main-container {
    height: 100%;
     h2 {
        text-align: left;
        margin-left: 20px;
        font-size: 28px;
    }

    overflow: auto;
}

.campaign-title {
    font-weight: normal;
    text-align: left;
    padding: 20px;
    margin-bottom: 30px;
}

.button-row {
    margin-bottom: 10px;
}

.campaign-preview-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.campaign-preview-column {
    display: flex;
    flex-direction: column;

    &.left {
        background-color: var(--color-background-soft);
        border-right: 1px solid var(--color-border);
        flex-grow: 1;
        min-width: 100px;
        max-width: 300px;
    }

    &.center {
        background-color: var(--color-background-semisoft);

        display: flex;
        flex-grow: 3;
    }

    &.right {
        background-color: var(--chat-background);
    }
}

.window-wrapper {
    display: flex;
    user-select: none;
    align-items: center;
}

h1, h2 {
    font-family: MrEavesRemake;
}

h1 {
    background-color: rgb(143, 39, 39);
}

</style>

<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import PlayerList from '../../partials/PlayerList.vue';
import { DisplayToast, GetCampaign, GetClient } from '../../../services/Dragonroll';
import CampaignBookList from '../../partials/books/CampaignBookList.vue';
import { ClearWindow } from '../../../services/Windows';
import { LaunchGame } from '../../../services/Game';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 1200, y: 750});
    ResetPosition(id, "center");

    console.log(data);
});

function CopyCode(){
    navigator.clipboard.writeText(GetCampaign().invite_code);
    DisplayToast('aqua', "Copied invite code successfully!", 1000);
}

function Launch(){
    ClearWindow('campaign_preview');
    LaunchGame();
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body 
         <h1>{{ data.campaign.name }}</h1> -->

         <div class="campaign-preview-container">
            <div class="campaign-preview-column left">
                <h2>Players</h2>
                <PlayerList :campaign="data.campaign"></PlayerList>
                <div class="buttons-row">
                    <button class="btn-primary button-row sound-click" v-on:click.prevent="CopyCode">Copy invite code</button>
                </div>
            </div>
            <div class="campaign-preview-column center">
                <h1 class="campaign-title">{{ data.campaign.name }}</h1>
                <div class="campaign-main-container">
                    <div class="campaign-main-container-scroll">
                        <div class="">Dnd 5e</div>
                        <h2>Books</h2>
                        <CampaignBookList class="small-book-list"></CampaignBookList>
                    </div>
                </div>
                <div class="buttons-row">
                    <button class="btn-primary button-row sound-click btn-green" v-on:click.prevent="Launch">Launch game</button>
                </div>
            </div>
            <div class="campaign-preview-column right">
                <h2>Chat</h2>
            </div>
         </div>

    </div>
</template>


<style scoped lang="scss">
.small-book-list {
    height: 400px;
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

    display: grid;
    grid-template-columns: 3fr 5fr 4fr;
}

.campaign-preview-column {
    display: flex;
    flex-direction: column;

    &.left {
        background-color: var(--color-background-soft);
    }

    &.center {
        background-color: var(--color-background-semisoft);

        display: flex;
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

</style>

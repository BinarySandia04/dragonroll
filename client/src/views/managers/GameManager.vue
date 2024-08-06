<script setup>
import { onMounted, ref, watch } from 'vue';
import { InGameRef } from '../../services/Game';
import IconButton from '../partials/game/IconButton.vue';
import { AddSound } from '../../services/Sound';
import TileMap from './TileMap.vue';
import { DisplayCampaign, GetCampaign } from '../../services/Dragonroll';
import { ClearAll, CreateWindow } from '../../services/Windows';

const game = ref(null);
const in_game = InGameRef();

function OpenCampaignPreview(){
    CreateWindow('campaign_preview', {campaign: GetCampaign(), style: 'compact', hide_start: true, back: undefined, close: true});
}

function OpenChat(){
    CreateWindow('chat');
}

function OpenDiceMenu(){
    CreateWindow('dice_menu');
}

watch(game, () => {
    if(game.value && in_game.value){
        AddSound(game.value);
    }
});

</script>


<template>
    <div class="game-root" ref="game" v-if="in_game">
        <!-- Aquests dos son absolute -->
        
        <div class="vertical-button">
            <IconButton icon="icons/iconoir/regular/menu.svg" :action="OpenCampaignPreview"></IconButton>
            <IconButton icon="icons/iconoir/regular/cursor-pointer.svg"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/rolling-dice-cup.svg" :action="OpenDiceMenu"></IconButton>
        </div>
        <div class="horizontal-button">
            <IconButton icon="icons/iconoir/regular/group.svg"></IconButton>
            <IconButton icon="icons/iconoir/regular/bookmark-book.svg"></IconButton>
            <IconButton icon="icons/iconoir/regular/chat-bubble.svg" :action="OpenChat"></IconButton>
        </div>

        <!-- Tilemap -->
        <TileMap></TileMap>
    </div>
</template>

<style scoped lang="scss">

.vertical-button {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    z-index: 1;

    user-select: none;
}

.horizontal-button {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    z-index: 1;

    user-select: none;
}
</style>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { InGameRef } from '../../services/Game';
import IconButton from '../partials/game/IconButton.vue';
import { AddSound } from '../../services/Sound';
import TileMap from './TileMap.vue';
import { GetCampaign, GetClient } from '../../services/Dragonroll';
import { ClearAll, ClearWindow, CreateWindow } from '../../services/Windows';

const game = ref(null);
const in_game = InGameRef();
const is_dm = ref(false);

function OpenCampaignPreview(){
    CreateWindow('campaign_preview', {
        campaign: GetCampaign(),
        style: 'compact',
        hide_start: true,
        back: undefined,
        close: () => ClearWindow('campaign_preview')
    });
}

function OpenChat(){
    CreateWindow('chat');
}

function OpenDiceMenu(){
    CreateWindow('dice_menu');
}

function OpenMapButtons(){
    CreateWindow('map_buttons');
}

function OpenMapWindows(){
    CreateWindow('map_window');
}

function OpenCombatMenu(){
    CreateWindow('combat_window');
}

function ToggleGrid(){
    
}

function OpenEntityWindow(){
    CreateWindow('entity_window');
}

function OpenCharactersWindow(){
    CreateWindow('characters_window');
}

function OpenDatabaseWindow(){
    CreateWindow('database');
}

watch(game, () => {
    if(game.value && in_game.value){
        AddSound(game.value);

        // Check if we are dm
        is_dm.value = GetClient().is_dm;
    }
});

</script>


<template>
    <div class="game-root" ref="game" v-if="in_game">
        <!-- Aquests dos son absolute -->
        
        <div class="vertical-button">
            <IconButton icon="icons/iconoir/regular/menu.svg" :action="OpenCampaignPreview"></IconButton>
            <IconButton icon="icons/iconoir/regular/cursor-pointer.svg"></IconButton>
            <IconButton icon="icons/iconoir/regular/orthogonal-view.svg" :action="ToggleGrid"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/rolling-dice-cup.svg" :action="OpenDiceMenu"></IconButton>
            <IconButton icon="icons/game-icons/000000/lorc/crossed-sabres.svg" :action="OpenCombatMenu"></IconButton>
        </div>
        
        <div class="vertical-button gm" v-show="is_dm">
            <IconButton icon="icons/iconoir/regular/map.svg" :action="OpenMapWindows"></IconButton>
            <IconButton icon="icons/iconoir/regular/hammer.svg" :action="OpenMapButtons"></IconButton>
            <IconButton icon="icons/iconoir/solid/wolf.svg" :action="OpenEntityWindow"></IconButton>
        </div>

        <div class="horizontal-button">
            <IconButton icon="icons/iconoir/regular/group.svg" :action="OpenCharactersWindow"></IconButton>
            <IconButton icon="icons/iconoir/regular/bookmark-book.svg" :action="OpenDatabaseWindow"></IconButton>
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

    &.gm {
        left: 48px;
    }
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
<script setup>
import { onMounted, ref, watch } from 'vue';
import { InGameRef } from '../../services/Game';
import IconButton from '../partials/game/IconButton.vue';
import { AddSound } from '../../services/Sound';

const game = ref(null);
const in_game = InGameRef();

watch(game, () => {
    if(game) AddSound(game.value);
})

</script>


<template>
    <div class="game-root" ref="game" v-if="in_game">
        <div class="vertical-button">
            <IconButton icon="icons/iconoir/regular/menu.svg"></IconButton>
            <IconButton icon="icons/iconoir/regular/cursor-pointer.svg"></IconButton>
            <IconButton icon="icons/game-icons/000000/delapouite/rolling-dice-cup.svg"></IconButton>
        </div>
        <div class="horizontal-button">

        </div>
    </div>
</template>


<style scoped lang="scss">
.vertical-button {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
}
</style>
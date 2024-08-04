<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Api from '@/services/Api.js'
import PlayerEntry from './PlayerEntry.vue';
import { GetPlayerList } from '../../services/Dragonroll';

const props = defineProps(['campaign']);
const campaign = props.campaign;

const players = GetPlayerList();

onMounted(() => {
});

</script>


<template>
    <PlayerEntry v-for="player in players" :key="player.data._id" :player="player" class="player-list"></PlayerEntry>
</template>


<style scoped lang="scss">
.player-list {
    height: 100%;
}
</style>
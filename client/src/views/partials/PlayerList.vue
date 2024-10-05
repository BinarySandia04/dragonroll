<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import Server from '@/services/Server.js'
import PlayerEntry from './PlayerEntry.vue';
import { GetPlayerList } from '../../services/Dragonroll';

const props = defineProps(['campaign']);
const campaign = props.campaign;

const players = GetPlayerList();

onMounted(() => {
});


</script>


<template>
    <div class="player-list">
        <PlayerEntry v-for="player in players" :key="player._id" :player="player"></PlayerEntry>
    </div>
</template>


<style scoped lang="scss">
.player-list {
    height: 100%;
}
</style>
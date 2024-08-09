<script setup>
import { onMounted } from 'vue';
import { GetMapList, UpdateMapList } from '../../services/Map';
import MapEntry from './MapEntry.vue';

const maps = GetMapList();

onMounted(() => {
    UpdateMapList();
})
</script>


<template>
    <div class="map-list-container">
        <MapEntry v-for="map in maps" :data="map" :id="map._id"></MapEntry>
        <div class="no-maps-message" v-show="maps.length == 0">
            <span class="create-map">You haven't created any map!</span>
            <span class="create-map">Upload or create a new one</span>
        </div>
    </div>
</template>


<style scoped lang="scss">
.map-list-container {
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;

    overflow-y: auto;
}

.create-map {
    font-size: 14px;
    color: var(--text-disabled);
}

.no-maps-message {
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: 100%;
}
</style>
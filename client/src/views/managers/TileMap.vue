<script setup>
import { onMounted, watch } from 'vue';
import { GetBackgroundColor, SetupTilemap } from '../../services/Map';

const backgroundColor = GetBackgroundColor();

onMounted(() => {
    SetupTilemap();
});

watch(backgroundColor, () => {
    let tilemap = document.getElementById('tilemap');
    tilemap.style.backgroundColor = backgroundColor.value;
}, {deep: true});

</script>

<template>
    <canvas class="tilemap" id="tilemap"></canvas>
</template>

<style scoped lang="scss">
.tilemap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
}
</style>
<script setup>
import { onMounted, watch, ref } from 'vue';
import { GetBackgroundColor, SetupTilemap } from '../../services/Map';
import { AddContextMenu } from '../../services/ContextMenu';

const backgroundColor = GetBackgroundColor();

const canvas = ref(null);

onMounted(() => {
    SetupTilemap();

    AddContextMenu(canvas.value, [
        {name: "Ping"}
    ]);
});

watch(backgroundColor, () => {
    let tilemap = document.getElementById('tilemap');
    tilemap.style.backgroundColor = backgroundColor.value;
}, {deep: true});

</script>

<template>
    <div id="tilemap-container" ref="canvas"></div>
</template>

<style scoped lang="scss">
#tilemap-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 0;
}
</style>
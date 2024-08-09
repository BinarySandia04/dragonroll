<script setup>
import IconButton from '@/views/partials/game/IconButton.vue';
import { onMounted, ref, toRaw, watch } from 'vue';
import { GetMapId, LoadMap, RenameMap } from '../../services/Map';

const toggled = ref("");
const title = ref(null);
const mapId = GetMapId();

const props = defineProps(['data']);
let data = props.data;

function ViewMap(){
    LoadMap(toRaw(data))
}

function DeleteMap(){
    console.log("Delete map");
}

function Rename(){
    RenameMap(data._id, title.value.value)
}

onMounted(() => {
    title.value.value = data.data.title;

    watch(mapId, () => {
        if(mapId.value == data._id){
            toggled.value = "toggled-yes";
        } else {
            toggled.value = "toggled-no";
        }
    });
})
</script>


<template>
<div class="map-entry-container">
    <input type="text" ref="title" v-on:change.prevent="Rename">
    <div class="horizontal-button">
        <div class="toggler" :class="toggled"><IconButton icon="icons/iconoir/regular/eye.svg" :action="ViewMap" size="small"></IconButton></div>
        <IconButton icon="icons/iconoir/regular/trash.svg" :action="DeleteMap" size="small"></IconButton>
    </div>
</div>
</template>


<style scoped lang="scss">
.toggler {
    transition: filter 0.2s;
}

.toggled-yes {
    filter: invert(1);
}

.map-entry-container {
    display: flex;
    width: 100%;
    background-color: var(--color-background-softer);
    padding: 10px;

    align-items: center;

    &.selected {
        background-color: var(--color-background-softest);
    }
}

.horizontal-button {
    margin-left: auto;
    display: flex;
    flex-direction: row;
 
    user-select: none;
}

</style>
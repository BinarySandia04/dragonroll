<script setup>
import IconButton from '@/views/partials/game/IconButton.vue';
import { onMounted, ref, toRaw, watch } from 'vue';
import { GetGlobalMapId, GetMapId, LoadMap, RenameMap, SendMap } from '../../services/Map';

const toggled = ref("");
const toggleGlobal = ref("")

const title = ref(null);
const mapId = GetMapId();
const globalMapId = GetGlobalMapId();

const props = defineProps(['data']);
let data = props.data;

function ShowMap(){
    console.log("ShowMap")
    SendMap(data._id);
}

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

    watch(globalMapId, () => {
        if(globalMapId.value == data._id){
            toggleGlobal.value = "toggled-yes";
        } else {
            toggleGlobal.value = "toggled-no";
        }
    })
})
</script>


<template>
<div class="map-entry-container">
    <input type="text" ref="title" v-on:change.prevent="Rename">
    <div class="horizontal-button">
        <div class="toggler" :class="toggleGlobal"><IconButton icon="icons/iconoir/solid/play.svg" :action="ShowMap" size="small"></IconButton></div>
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
<script setup>
import IconButton from '@/views/partials/game/IconButton.vue';
import { onMounted, ref } from 'vue';

const toggled = ref("");
const toggleGlobal = ref("")

const title = ref(null);
const editable = ref(false);

const props = defineProps(['data']);
let data = props.data;

onMounted(() => {
    if(data.editable) editable.value = true;
})

function Click(){
    data.click();
}

</script>


<template>
<div class="game-entry-container">
    <img :v-if="data.icon" class="game-icon" :src="data.icon">
    <div class="name-container" v-on:click.prevent="Click">
        <input v-if="editable" class="edit-name" type="text" ref="title" v-on:change.prevent="Rename" :value="data.name">
        <p v-if="!editable" class="name">{{ data.name }}</p>
    </div>
    <div class="horizontal-button">
        <IconButton icon="/icons/iconoir/solid/play.svg" :action="Play" size="small"></IconButton>
        <IconButton icon="/icons/iconoir/regular/eye.svg" :action="View" size="small"></IconButton>
        <IconButton icon="/icons/iconoir/regular/trash.svg" :action="Delete" size="small"></IconButton>
        <IconButton icon="/icons/iconoir/regular/edit.svg" :action="Edit" size="small"></IconButton>
    </div>
</div>
</template>


<style scoped lang="scss">
.edit-name, .name {
    text-align: left;
}

.name-container {
    margin-left: 5px;
    flex-grow: 1;
    align-items: center;
    display: flex;
    height: 32px;
}

.game-icon {
    width: 32px;
    height: 32px;
    background-color: var(--icon-background);
}

.edit-name {
    padding: 4px;
}

.toggler {
    transition: filter 0.2s;
}

.toggled-yes {
    filter: invert(1);
}

.game-entry-container {
    display: flex;
    width: 100%;
    background-color: var(--color-background-softer);

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
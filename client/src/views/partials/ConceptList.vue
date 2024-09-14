<script setup>

import { onMounted, ref, watch } from 'vue';
import { GetCampaign } from '../../services/Dragonroll';
import { ClearWindow, CreateWindow } from '../../services/Windows';

const props = defineProps(['elements']);

const listContainer = ref(null);
const elements = ref([]);

onMounted(() => {
    watch(() => props.elements, () => {
        elements.value = props.elements;
    });
});

function OpenConcept(element){
    CreateWindow('item_sheet', {
        id: 'item_sheet',
        title: 'Edit Item',
        item_id: element._id,
        close: () => ClearWindow('item_sheet')
    });
}
</script>

<template>
    <div class="list-container" ref="listContainer">
        
        <div class="list-element" v-for="element in elements" :key="element._id" v-on:click.prevent="OpenConcept(element)">
            <img :src="element.info ? element.info.icon : 'icons/game-icons/ffffff/lorc/crossed-swords.svg'" class="concept-icon">
            <span class="title">{{ element.name }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.concept-icon {
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-border);
}

.list-element {
    display: flex;
    width: 100%;
    padding: 10px;
    align-items: center;
    border-bottom: 1px solid var(--color-border-soft);
    

    .title {
        padding-left: 10px;
        font-size: 16px;
        font-weight: bold;
    }
}

.list-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
}
</style>
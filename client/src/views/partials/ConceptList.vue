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
        <TransitionGroup name="list-element">
            <div class="list-element" v-for="element in elements" :key="element._id" v-on:click.prevent="OpenConcept(element)">
                <img :src="element.info ? element.info.icon : 'icons/game-icons/ffffff/lorc/crossed-swords.svg'" class="concept-icon">
                <span class="title">{{ element.name }}</span>
            </div>
        </TransitionGroup>
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

.list-element-move, /* apply transition to moving elements */
.list-element-enter-active,
.list-element-leave-active {
  transition: all 0.5s ease;
}

.list-element-enter-from,
.list-element-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-element-leave-active {
  position: absolute;
}

.list-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
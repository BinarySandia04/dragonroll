<script setup>
import { onMounted, ref, watch } from 'vue';
import { GetCampaign } from '../../services/Dragonroll';
import { ClearWindow, CreateWindow } from '../../services/Windows';

import { animate } from "motion"
import ConceptEntry from './ConceptEntry.vue';

const props = defineProps(['elements', 'open', 'tooltip', 'context', 'icon']);

const listContainer = ref(null);
const elements = ref([]);

let OpenElement = () => {};
let TooltipElement = () => {};
let ContextElement = () => {};
let IconElement = () => {};

onMounted(() => {
    if(props.open) OpenElement = props.open;
    if(props.tooltip) TooltipElement = props.tooltip;
    if(props.context) ContextElement = props.context;
    if(props.icon) IconElement = props.icon;

    watch(() => props.elements, () => {
        elements.value = props.elements;
    });
});

function onBeforeEnter(el) {
  el.style.opacity = 0
}

function onEnter(el, done) {
    animate(el, {
        opacity: [0, 1],
        translateX: [20, 0]
    }, {delay: el.dataset.index * 0.025})
}

function onLeave(el, done) {
    animate(el, {
        opacity: [1, 0],
        translateX: [0, 20]
    });
}
</script>

<template>
    <div class="list-container" ref="listContainer">
        <TransitionGroup name="list-element" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
            <ConceptEntry class="list-element" v-for="(element, index) in elements"
                :key="element._id"
                :element="element"
                :context="async () => await ContextElement(element)"
                :tooltip="async (el) => await TooltipElement(el)"
                :icon="async (el) => await IconElement(el)"
                v-on:click.prevent="OpenElement(element)"
                :data-index="index"></ConceptEntry>
        </TransitionGroup>
    </div>
</template>

<style lang="scss" scoped>

.list-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
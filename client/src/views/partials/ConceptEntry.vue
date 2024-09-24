<script setup>
import { onMounted, ref, watch } from 'vue';
import { AddContextMenu } from '@/services/ContextMenu';
import { AddTooltip } from '@/services/Tooltip';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const props = defineProps(['element']);

const element = ref({});
const elementDiv = ref(null);
const tooltipContainer = ref(null);

function updateElement(){
    element.value = props.element;
    // Do whatever
    let desc = element.value.info.description;
    desc = desc ? marked.parse(desc) : '';
    console.log(desc);
    AddTooltip(tooltipContainer.value, `<div class='document item'>
        <h2>${element.value.name}</h2>
        <img src='${element.value.info.icon}'></img>
        <div class='document'>${desc}</div>
    </div>`)
}

onMounted(() => {
    updateElement();
    watch(() => props.element, () => {
        updateElement();
    });

    AddContextMenu(elementDiv.value, [
        {name: "Open"},
        {name: "Delete"}
    ]);

})
</script>
<template>
    <div class="concept-element" ref="elementDiv">
        <div class="concept-tooltip-container" ref="tooltipContainer">
            <img :src="element.info ? element.info.icon : 'icons/game-icons/ffffff/lorc/crossed-swords.svg'" class="concept-icon">
            <span class="title">{{ element.name }}</span>
        </div>
    </div>
</template>
<style lang="scss">
.concept-tooltip-container {
    display: flex;
    align-items: center;
}

.concept-icon {
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-border);
}

.concept-element {
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
</style>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { AddContextMenu } from '@/services/ContextMenu';
import { AddTooltip } from '@/services/Tooltip';
import { GetKey } from '@/services/Utils';
import { MakeDraggable } from '@/services/Draggable';
import { marked } from "marked";

const props = defineProps([
    'element',
    'context',
    'tooltip',
    'icon',
    'click',
    'types'
]);

const element = ref({});
const elementDiv = ref(null);
const tooltipContainer = ref(null);
const icon = ref("icons/game-icons/ffffff/lorc/crossed-swords.svg")
const tooltipIcon = ref(null);

async function updateElement(){
    element.value = props.element;
    // Do whatever
    let desc = undefined;
    GetKey(element.value, "info.description", (val) => desc = val);
    desc = desc ? marked.parse(desc) : '';
    
    if(props.icon) icon.value = await props.icon(element.value);

    let tooltip = await props.tooltip(element.value);
    if(tooltip) AddTooltip(tooltipIcon.value, tooltip);
}

onMounted(async () => {
    updateElement();
    watch(() => props.element, () => {
        updateElement();
    });

    let context = await props.context();
    if(context) AddContextMenu(elementDiv.value, context);

    MakeDraggable(elementDiv.value, tooltipContainer.value, props.click, props.element, props.types);
})
</script>
<template>
    <div class="concept-element" ref="elementDiv">
        <div class="concept-tooltip-container" ref="tooltipContainer">
            <img :src="icon" class="concept-icon" draggable="false" ref="tooltipIcon">
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
    background-color: var(--color-background-soft);

    &.drag {
        border: 1px solid var(--color-border-hard);
    }

    .title {
        padding-left: 10px;
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
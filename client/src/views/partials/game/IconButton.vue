<script setup>

import { onMounted, ref } from 'vue';
import { AddTooltip } from '../../../services/Tooltip';
const props = defineProps(['icon', 'action', 'size', 'toggled', 'tooltip']);
let icon = props.icon;
let action = props.action;

let size = props.size;
let toggled = props.toggled;
let tooltip = props.tooltip;

const button = ref(null);

onMounted(() => {
    if(tooltip){
        AddTooltip(button.value, tooltip);
    }
})
</script>



<template>
    <div class="icon-button sound-click" :class="size + ' ' + toggled" v-on:click.prevent="action" ref="button">
        <img class="icon" draggable="false" :src="icon" :class="size">
    </div>
</template>


<style scoped lang="scss">
.icon-button {
    height: 32px;
    width: 32px;

    &.big {
        height: 42px;
        width: 42px;
    }

    &.small {
        height: 24px;
        width: 24px;
    }

    &.toggled {
        filter: invert(0.9);
    }

    background-color: var(--color-background-soft);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;

    transition: .3s background-color;
    border: 1px solid var(--color-border);
}

.icon-button:hover {
    background-color: var(--color-background-softer);
}

.icon {
    height: 24px;
    width: 24px;
    pointer-events: none;

    &.big {
        height: 38px;
        width: 38px;
    }

    &.small {
        height: 18px;
        width: 18px;
    }
}




</style>
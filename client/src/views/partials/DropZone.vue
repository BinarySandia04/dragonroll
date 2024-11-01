<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['onDrop', 'validDrops'])

const dragContainer = ref(null);

onMounted(() => {
    dragContainer.value.__onDrop = props.onDrop;
    if(props.validDrops){
        dragContainer.value.__validDrops = props.validDrops;
        console.log(props.validDrops);
    }
})
</script>
<template>
    <div class="drag-container" ref="dragContainer">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.drag-container {
    display: flex;
    flex-grow: 1;
    flex-wrap: wrap;
    height: 100%;
    overflow-y: auto;
    padding: 3px;
    border: 3px dashed;
    border-color: #ffffff00;
    transition: border-color 0.2s;

    &.dashed {
        padding: 3px;
        border: 3px dashed;
        transition: border-color 0.2s;
        border-color: #ffffff88;
    }
}
</style>
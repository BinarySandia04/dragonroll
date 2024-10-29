<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['onDrop'])

const dragContainer = ref(null);

onMounted(() => {
    dragContainer.value.__onDrop = props.onDrop;
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

    &.dashed {
        padding: 0;
        border: 3px dashed;
    }
}
</style>
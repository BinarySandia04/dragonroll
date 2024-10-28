<script setup>

</script>
<template>
    <div class="drag-container">
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
}
</style>
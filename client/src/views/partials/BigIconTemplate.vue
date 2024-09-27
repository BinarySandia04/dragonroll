<script setup>
const props = defineProps(['title', 'img']);
</script>

<template>
<div class="document centered">
    <h1>{{props.title}}</h1>
    <img :src="props.img" class="big-icon">
    <br>
    <slot></slot>
</div>
</template>

<style lang="scss" scoped>
.big-icon {
    height: 80px;
    width: 80px;
    border: 1px solid var(--color-border);
    padding: 16px;
    margin:auto;
}
</style>
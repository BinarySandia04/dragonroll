<script setup>

import { onMounted, ref, watch } from 'vue';
const props = defineProps(['title', 'img']);

const imgSrc = ref("");

onMounted(() => {
    imgSrc.value = props.img;
    watch(() => props.img, () => {
        imgSrc.value = props.img;
    });
})
</script>

<template>
<div class="document centered">
    <h1>{{props.title}}</h1>
    <img :src="imgSrc" class="big-icon">
    <br>
    <slot></slot>
</div>
</template>

<style lang="scss" scoped>
.big-icon {
    height: 80px;
    width: 80px;
    border: 1px solid var(--color-border);
    margin:auto;
}
</style>
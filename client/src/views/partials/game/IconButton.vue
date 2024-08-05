<script setup>
const props = defineProps(['icon']);
let icon = props.icon;
</script>



<template>
    <div class="icon-button sound-click">
        <img class="icon" :src="icon">
    </div>
</template>


<style scoped lang="scss">
.icon-button {
    height: 32px;
    width: 32px;
    background-color: var(--color-background-soft);
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px;

    transition: .3s background-color;
}

.icon-button:hover {
    background-color: var(--color-background-softer);
}

.icon {
    height: 24px;
    width: 24px;
}
</style>
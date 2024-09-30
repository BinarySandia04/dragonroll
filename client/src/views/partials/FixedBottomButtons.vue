<script setup>
import IconButton from '@/views/partials/game/IconButton.vue'

const props = defineProps(['plus', 'edit', 'view', 'remove']);

let plus = props.plus;
let edit = props.edit;
let view = props.view;
let remove = props.remove;
</script>

<template>
<div class="fixed-bottom-buttons">
    <IconButton v-show="plus" icon="/icons/iconoir/regular/plus.svg" :action="plus"></IconButton>
    <IconButton v-show="edit" icon="/icons/iconoir/regular/edit-pencil.svg" :action="edit"></IconButton>
    <IconButton v-show="view" icon="/icons/iconoir/solid/eye.svg" :action="view"></IconButton>
    <IconButton v-show="remove" icon="/icons/iconoir/solid/trash.svg" :action="remove"></IconButton>
</div>
</template>

<style lang="scss" scoped>
.fixed-bottom-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
}
</style>
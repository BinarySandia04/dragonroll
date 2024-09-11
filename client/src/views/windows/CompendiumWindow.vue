<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { SetMinSize, SetMaxSize, SetResizable } from '../../services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 700, height: 850});
    SetResizable(id, true);
    SetMinSize(id, {width: 700, height: 200});
    SetMaxSize(id, {width: 700});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="compendium-container">

        </div>
    </div>
</template>


<style scoped>
.compendium-container {
    display: flex;
    width: 100%;
    height: 100%;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>

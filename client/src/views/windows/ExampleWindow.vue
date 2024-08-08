<script setup>
import { onMounted, onUpdated, ref, compile, render, h } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

const test = ref(null)

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 500, y: 380});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <div ref="test"></div>

    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>



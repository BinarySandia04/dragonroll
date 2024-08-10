<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 400, y: 850});
    ResetPosition(id, {x: window.innerWidth - 420, y: 60});
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        
    </div>
</template>


<style scoped>

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>

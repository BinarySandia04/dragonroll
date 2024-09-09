<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref, watch } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 200, height: 300});
    ResetPosition(id, {x: 30, y: 300});
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

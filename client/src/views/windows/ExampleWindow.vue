<script setup>
import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

const test = ref(null)

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
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



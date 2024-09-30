<script setup>

import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

const handle = ref(null);

const props = defineProps(['data']);

const data = props.data;

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 700});
    ResetPosition(id, {x: 100, y: window.innerHeight / 2 - 250 - 24});
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <div class="document">
            <h1>Welcome to Dragonroll!</h1>
            <p>Dragonroll is the ultimate open-source virtual table top for role-playing games</p>
        </div>

    </div>
</template>


<style scoped>
.document {
    height: 100%;
    overflow-y: auto;
    padding: 20px 15px 30px 15px;
    width: 100%;
}

.window-wrapper {
    display: flex;
    align-items: center;
    user-select: none;
}
</style>

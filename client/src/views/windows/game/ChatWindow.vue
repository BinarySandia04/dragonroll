<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetResizable, SetMinSize, SetPosition, ResetPosition } from '@/services/Windows';
import ChatComponent from '../../partials/ChatComponent.vue';
import { SetMaxSize } from '../../../services/Windows';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 400, height: 750});
    SetResizable(id, true);
    SetMinSize(id, {height: 300});
    SetMaxSize(id, {width: 400})

    ResetPosition(id, {x: window.innerWidth - 420, y: 80});
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <ChatComponent></ChatComponent>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}

</style>

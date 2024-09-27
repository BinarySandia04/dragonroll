<script setup>
import { onMounted, onUpdated, provide, ref, inject } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';

import Api from '@/services/Api.js'
import SystemSelector from '../../partials/SystemSelector.vue';
import { GetModules } from '../../../services/Modules';
import GameSystem from '../../partials/GameSystem.vue';
import { CallWindow, ClearWindow } from '../../../services/Windows';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;
let systems = ref(GetModules());

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 300, height: 600});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <div class="system-list">
            <GameSystem v-for="system in systems" :id="system.id" :data="system" :click="(moduleId) => CallWindow(id, 'done', {selected: moduleId})"></GameSystem>
        </div>
    </div>
</template>


<style scoped lang="scss">
.window-wrapper {
    display: flex;
    align-items: center;
}

.system-list {
    display: flex;
    flex-direction: column;
    width: 100%;
}

</style>
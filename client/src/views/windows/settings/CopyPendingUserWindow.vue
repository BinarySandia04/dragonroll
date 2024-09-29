<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 

import { onMounted, ref, shallowRef, toRaw } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");

});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <h1>Hola</h1>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>



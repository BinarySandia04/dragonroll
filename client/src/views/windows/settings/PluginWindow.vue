<script setup>
import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import BigIconTemplate from '../../partials/BigIconTemplate.vue';

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

        <!-- Body -->
        <BigIconTemplate :title="data.plugin.name" :img="`plugins/${data.plugin._id}/icon.png`">
            
        </BigIconTemplate>
    </div>
</template>


<style lang="scss" scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>



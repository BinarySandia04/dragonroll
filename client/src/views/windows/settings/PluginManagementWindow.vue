<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import ConceptList from '../../partials/ConceptList.vue';
import { _GetPlugins } from '../../../services/Plugins';
import { SetMinSize, SetResizable } from '../../../services/Windows';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

const test = ref(null)

const elements = shallowRef([]);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");

    SetResizable(id, true);
    SetMinSize(id, {width: 350, height: 280});

    elements.value = _GetPlugins();
});

function GetPluginIcon(plugin){
    return `/plugins/${plugin._id}/icon.png`;
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <ConceptList 
            :elements="elements"
            :icon="GetPluginIcon"
        ></ConceptList>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>



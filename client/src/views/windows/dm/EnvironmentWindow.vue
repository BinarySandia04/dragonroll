<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref, watch } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';
import IconButton from '@/views/partials/game/IconButton.vue'
import ColorValue from '../../partials/parameters/ColorValue.vue';
import { GetBackgroundColor } from '../../../services/Map';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const mapUploader = ref(null);

const env_background = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 200, y: 300});
    ResetPosition(id, {x: data.x, y: data.y});

    console.log(env_background.value.GetColor());
    watch(env_background.value.GetColor(), () => {
        GetBackgroundColor().value = env_background.value.GetColor().value; // XD
    });
});

function UploadButton(){
    mapUploader.value.click();
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="parameters">
            <div class="param-element">
                <div class="param-text">Background color: </div>
                <div class="param-value"><ColorValue ref="env_background"></ColorValue></div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>

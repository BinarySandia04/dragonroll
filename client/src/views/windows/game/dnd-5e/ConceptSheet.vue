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
    SetSize(id, {width: 700, height: 850});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle" handleHeight="105px" custom="true" class="character-sheet-handle"></WindowHandle>
        
    </div>
</template>


<style scoped lang="scss">
@mixin shadow {
  -moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
}

@mixin panel {
    @include shadow();
    background-color: #1B1B1B;
    border: 1px solid var(--color-border);
}

.window-wrapper {
    display: flex;
    align-items: center;
    border: solid 1px var(--color-golden-border);

    user-select: none;
}

</style>

<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { SetMinSize, SetMaxSize, SetResizable } from '../../services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 700, height: 850});
    SetResizable(id, true);
    SetMinSize(id, {width: 700, height: 200});
    SetMaxSize(id, {width: 700});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="book-anvil-container">
            <div class="book-anvil-header">
                <img class="img-selector"> <!-- TODO: Canviar això per un component ben fet -->
                <div class="book-info">
                    <h1>New book</h1>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.img-selector {
    width: 72px;
    height: 72px;
}

.book-anvil-header {
    display: flex;
    width: 100%;
    padding: 10px;
    background-color: #27303b;

    .book-info {
        margin-left: 20px;
    }
}

.book-anvil-container {
    width: 100%;
    height: 100%;

    h1 {
        font-family: NodestoCapsCondensed;
    }
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>

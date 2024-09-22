<script setup>
import { onMounted, ref, watch } from 'vue';
import { GetWindowWithId } from '@/services/Windows';
import { ClearWindow, Windows } from '../../services/Windows';

import { AddSound } from '../../services/Sound';

const props = defineProps(['window', 'handleHeight', 'custom', 'color']);
const id = props.window;
const handleHeight = props.handleHeight;

const closeButton = ref(null);
const backButton = ref(null);

const title = ref("");
const close = ref(false);
const hasBack = ref(false);
const def = ref(true);
const resizable = ref(false);

let closeAction;

let backFunction;

function setupHandle() {
    let win = GetWindowWithId(id);
    if(win.title) title.value = win.title;
    if(win.close){
        close.value = true;
        closeAction = win.close;
    }
    if(win.back) {
        hasBack.value = true;
        backFunction = win.back;
    }

    if(handleHeight) {
        let handle = document.getElementById('window-handle-' + id);
        handle.style.height = handleHeight;
    }

    // Setup sounds
    let currentWindowId = "window-wrapper-" + id;
    let currentWindow = document.getElementById(currentWindowId);

    AddSound(currentWindow);

}

function CloseButton(){
    const audio = new Audio('/sounds/close.wav');
    audio.type = "audio/wav"
    audio.play();
    if(typeof closeAction === 'function') closeAction();
    // ClearWindow(id)
}

onMounted(() => {
    if(props.custom) def.value = false;
    let win = GetWindowWithId(id);
    watch(GetWindowWithId(id), () => {
        resizable.value = win.resizable;
    })
});

defineExpose({
    setupHandle
});
</script>


<template>
    <div class="window-handle" :id="'window-handle-' + id">

        <div class="left" v-if="def">
            <img class="icon icon-add-margin" src="/icons/iconoir/regular/arrow-left.svg" draggable="false" ref="backButton" v-if="hasBack" v-on:click="backFunction">
        </div>
        <div class="center" v-if="def">
            <span>{{ $t(title) }}</span>
        </div>
        <div class="right">
            <img class="icon" src="/icons/iconoir/regular/xmark.svg" draggable="false" ref="closeButton" v-if="close" v-on:click="CloseButton">
        </div>
        <!-- span>{{ title }}</span>
            
        -->
    </div>


    <div v-show="resizable" class="window-resize-handle" :id="'window-resize-handle-' + id">
        <img src="/icons/ui/resize-handle.svg" draggable="false">
    </div>
</template>


<style scoped lang="scss">
.window-resize-handle {
    position: absolute;
    filter: invert(0.8);
    opacity: 0.6;
    right: 0px;
    bottom: 0px;
    width: 18px;
    height: 18px;

    img {
        width: 18px;
        height: 18px;
    }
    z-index: 100;
}

.window-handle {

    .left, .right {
        flex: 1;
        display: flex;
    }

    .left {
        justify-content: left;
    }

    .right {
        height: 24px;
        justify-content: right;
    }

    span {
        font-family: MrEavesRemake;
    }

    user-select: none;
    justify-content: center;
    width: 100%;

    display: flex;
    
    background-color: var(--color-handler);
}

</style>

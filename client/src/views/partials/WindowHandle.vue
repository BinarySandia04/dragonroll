<script setup>
import { ref } from 'vue';
import { GetWindowWithId } from '@/services/Windows';
import { ClearWindow } from '../../services/Windows';

const props = defineProps(['window']);
const id = props.window;

const closeButton = ref(null);

const title = ref("");
const close = ref(false);

function setupHandle() {
    let handleInfo = GetWindowWithId(id).handle;

    if(handleInfo.title) title.value = handleInfo.title;
    if(handleInfo.close) close.value = true;
}

function CloseButton(){
    ClearWindow(id)
}

defineExpose({
    setupHandle
})
</script>


<template>
    <div class="window-handle" :id="'window-handle-' + id">

        <div class="left"></div>
        <div class="center">
            <span>{{ title }}</span>
        </div>
        <div class="right">
            <img class="icon" src="icons/iconoir/regular/xmark.svg" draggable="false" ref="closeButton" v-if="close" v-on:click="CloseButton">
        </div>
        <!-- span>{{ title }}</span>
            
        -->
    </div>
</template>


<style scoped lang="scss">

.window-handle {
    
    .left, .right {
        flex: 1;
        display: flex;
    }

    .left {
        justify-content: left;
    }

    .right {
        justify-content: right;
    }

    span {
        font-family: MrEavesRemake;
    }

    img {
    }

    user-select: none;
    justify-content: center;
    width: 100%;

    display: flex;
    
    background-color: var(--color-handler);
}

</style>

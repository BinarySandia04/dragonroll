<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { ClearWindow, CreateWindow, ResetPosition, SetSize, SetupHandle } from '../../../services/Windows';
import IconButton from '@/views/partials/game/IconButton.vue'

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 700, height: 800});
    ResetPosition(id, "center");
});

function OpenCreateItemPrompt(){
    CreateWindow('create_item_prompt', {id: 'create_item_prompt', title: 'Create Item', close: () => ClearWindow('create_item_prompt')})
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="main-container">
            <div class="row">
                <div class="toggler">Items</div>
                <div class="toggler">Spells</div>
                <div class="toggler">Features</div>
            </div>
        </div>

        <div class="fixed-bottom-buttons">
            <IconButton icon="icons/iconoir/regular/plus.svg" :action="OpenCreateItemPrompt"></IconButton>
        </div>
    </div>
</template>


<style scoped>
.toggler {
    flex-grow: 1;
    font-weight: bold;
    padding: 10px;
    font-size: 16px;

    color: #9c9c9c;
    border-left: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    transition: color 1s;
    
    &:first-child {
        border-left: none;
    }

    &.active {
        color: var(--color-text);
    }
}

.fixed-bottom-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>

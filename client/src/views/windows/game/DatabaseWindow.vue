<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';
import Api from '@/services/Api'

import { onMounted, ref, shallowRef } from 'vue';
import { ClearWindow, CreateWindow, ResetPosition, SetMinSize, SetResizable, SetSize, SetupHandle } from '../../../services/Windows';
import IconButton from '@/views/partials/game/IconButton.vue'
import ConceptList from '../../partials/ConceptList.vue';
import { GetCampaign, socket } from '../../../services/Dragonroll';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;
const elements = shallowRef([]);

// SHOULD MOVE!!!


onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 700, height: 800});
    ResetPosition(id, "center");
    SetResizable(id, true);
    SetMinSize(id, {width: 350, height: 300});

    FetchConcepts();

    socket.on('update-concepts', () => {
        console.log("!!!");
        FetchConcepts();
    });
});

function FetchConcepts(){
    Api().get('/concept/list?campaign=' + GetCampaign()._id).then(response => {
        // console.log(response.data);
        elements.value = response.data.data;
        console.log(elements);
        console.log("Updated???")
    }).catch((err) => console.log(err));
}

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
            <ConceptList :elements="elements"></ConceptList>
        </div>


        <div class="fixed-bottom-buttons">
            <IconButton icon="icons/iconoir/regular/plus.svg" :action="OpenCreateItemPrompt"></IconButton>
        </div>
    </div>
</template>


<style scoped>
.main-container {
    height: calc(100% - 24px);
}

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

<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref, shallowRef, watch } from 'vue';
import { ClearWindow, CreateWindow, ResetPosition, SetMinSize, SetResizable, SetSize, SetupHandle } from '@/services/Windows';
import ConceptList from '@/views/partials/ConceptList.vue';
import { FetchConcepts, GetConcepts } from '@/services/Data';
import Tabs from '@/views/partials/Tabs.vue';
import { GetCampaignModuleName } from '@/services/Campaign';
import FixedBottomButtons from '@/views/partials/FixedBottomButtons.vue';

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

    watch(GetConcepts, () => {
        elements.value = GetConcepts();
    });
    
    FetchConcepts();
});
function OpenCreateItemPrompt(){
    CreateWindow(`${GetCampaignModuleName()}/create_item_prompt`, {id: 'create_item_prompt', title: 'Create Item', close: () => ClearWindow('create_item_prompt')})
}


function OpenConcept(element){
    CreateWindow(`${GetCampaignModuleName()}/item_sheet`, {
        id: 'item_sheet_' + element._id,
        title: 'Edit Item',
        item_id: element._id,
        close: () => ClearWindow('item_sheet_' + element._id)
    });
}

function ElementContext(element){
    return [
        {name: "Open"},
        {name: "Delete"}
    ];
}

function ElementTooltip(element){
    return `<div class='document item'>
        <h2>${element.name}</h2>
        <img src='${element.info.icon}'></img>
        <div class='document'>${element.info.description ?? ''}</div>
    </div>`;
}

function ElementIcon(element){
    return element.info ? element.info.icon : 'icons/game-icons/ffffff/lorc/crossed-swords.svg'
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="main-container">
            <Tabs :rows="[
                    {id: 'items', value: 'database.tabs.items'}, 
                    {id: 'spells', value: 'database.tabs.spells'},
                    {id: 'features', value: 'database.tabs.features'}
                ]">
                <template #items>
                    <ConceptList 
                        :elements="elements"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
            </Tabs>
        </div>

        <FixedBottomButtons :plus="OpenCreateItemPrompt"></FixedBottomButtons>
    </div>
</template>


<style scoped>
.main-container {
    height: calc(100% - 24px);
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

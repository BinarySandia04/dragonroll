<script setup>
import { marked } from "marked";

import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref, shallowRef, watch } from 'vue';
import { ResetPosition, SetMinSize, SetResizable, SetSize, SetupHandle } from '@/services/Windows';
import ConceptList from '@/views/partials/ConceptList.vue';
import Tabs from '@/views/partials/Tabs.vue';
import FixedBottomButtons from '@/views/partials/FixedBottomButtons.vue';
import { Global } from '@/services/PluginGlobals';
import { GetKey } from '@/services/Utils.js';

import { FetchConcepts, GetConcepts } from './../data.js'

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const Api = Global('dnd-5e').Api;
const PluginData = Global('dnd-5e').Data;

let id = data.id;

const weapons = shallowRef([]);
const equipment = shallowRef([]);
const consumables = shallowRef([]);
const containers = shallowRef([]);
const tools = shallowRef([]);
const spells = shallowRef([]);
const features = shallowRef([]);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 800, height: 800});
    ResetPosition(id, "center");
    SetResizable(id, true);
    SetMinSize(id, {width: 800, height: 300});

    watch(GetConcepts, () => {
        let elements = GetConcepts();
        weapons.value = elements.filter((e) => e.type == "Weapon");
        equipment.value = elements.filter((e) => e.type == "Equipment");
        consumables.value = elements.filter((e) => e.type == "Consumable");
        containers.value = elements.filter((e) => e.type == "Container");
        tools.value = elements.filter((e) => e.type == "Tool");
        spells.value = elements.filter((e) => e.type == "Spell");
        features.value = elements.filter((e) => e.type == "Feature");

        console.log(elements);
        console.log(elements);
    });
    
    FetchConcepts();
});
function OpenCreateItemPrompt(){
    Api.createWindow(PluginData.windows.create_item_prompt, {id: 'create_item_prompt', title: 'Create Item', close: () => Api.clearWindow('create_item_prompt')})
}

function OpenConcept(element){
    Api.createWindow(PluginData.windows.item_sheet, {
        id: 'item_sheet_' + element._id,
        title: 'Edit Item',
        item_id: element._id,
        close: () => Api.clearWindow('item_sheet_' + element._id)
    });
}

function ElementContext(element){
    return [
        {name: "Open"},
        {name: "Delete"}
    ];
}

function ElementTooltip(element){
    let descHtml = GetKey(element, 'description');
    if(descHtml) descHtml = marked.parse(descHtml);
    else descHtml = '';
    return `<div class='document item'>
        <h2>${element.name}</h2>
        <img src='${GetKey(element, "icon")}'></img>
        <div class='document'>${descHtml}</div>
    </div>`;
}

function ElementIcon(element){
    return GetKey(element, "icon") ? GetKey(element, "icon") : 'icons/game-icons/ffffff/lorc/crossed-swords.svg'
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <div class="main-container">
            <Tabs :rows="[
                    {id: 'weapons', value: 'plugins.dnd-5e.database.tabs.weapons'}, 
                    {id: 'equipment', value: 'plugins.dnd-5e.database.tabs.equipment'}, 
                    {id: 'consumables', value: 'plugins.dnd-5e.database.tabs.consumables'}, 
                    {id: 'containers', value: 'plugins.dnd-5e.database.tabs.containers'}, 
                    {id: 'tools', value: 'plugins.dnd-5e.database.tabs.tools'}, 
                    {id: 'spells', value: 'plugins.dnd-5e.database.tabs.spells'},
                    {id: 'features', value: 'plugins.dnd-5e.database.tabs.features'},
                ]">
                <template #weapons>
                    <ConceptList 
                        :elements="weapons"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #equipment>
                    <ConceptList 
                        :elements="equipment"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #consumables>
                    <ConceptList 
                        :elements="consumables"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #containers>
                    <ConceptList 
                        :elements="containers"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #tools>
                    <ConceptList 
                        :elements="tools"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #spells>
                    <ConceptList 
                        :elements="spells"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                    ></ConceptList>
                </template>
                <template #features>
                    <ConceptList 
                        :elements="features"
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

<script setup>
import { marked } from "marked";

import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref, shallowRef, watch, toRaw } from 'vue';
import { ResetPosition, SetMinSize, SetResizable, SetSize, SetupHandle } from '@/services/Windows';
import ConceptList from '@/views/partials/ConceptList.vue';
import Tabs from '@/views/partials/Tabs.vue';
import FixedBottomButtons from '@/views/partials/FixedBottomButtons.vue';
import { Global } from '@/services/PluginGlobals';
import { GetKey } from '@/services/Utils.js';

import { CreateItem, FetchConcepts, GetConcepts, GetItem } from './../data.js'

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
    SetSize(id, {width: 500, height: 700});
    ResetPosition(id, "center");
    SetResizable(id, true);
    SetMinSize(id, {width: 400, height: 300});

    // console.log(data);

    watch(data.getConcepts, () => {
        updateView();
    });
    
    if(data.fetchConcepts) data.fetchConcepts();
    updateView();
});true

function updateView(){
    let elements = data.getConcepts();
    if(data.transformer) elements = elements.map(element => data.transformer(element));

    console.log(elements);

    weapons.value = elements.filter((e) => e.type == "Weapon");
    equipment.value = elements.filter((e) => e.type == "Equipment");
    consumables.value = elements.filter((e) => e.type == "Consumable");
    containers.value = elements.filter((e) => e.type == "Container");
    tools.value = elements.filter((e) => e.type == "Tool");
    spells.value = elements.filter((e) => e.type == "Spell");
    features.value = elements.filter((e) => e.type == "Feature");

    console.log(elements);
}

function OpenCreateItemPrompt(){
    Api.createWindow(PluginData.windows.create_item_prompt, {id: 'create_item_prompt', title: 'Create Item', close: () => Api.clearWindow('create_item_prompt')})
}

function OpenConcept(element){
    const openConceptWindow = (itemData) => {
        console.log(data.static);
        Api.createWindow(PluginData.windows.item_sheet, {
            id: 'item_sheet_' + itemData._id,
            title: 'Item Sheet',
            item_id: itemData._id,
            content: itemData,
            editable: !data.static,
            close: () => Api.clearWindow('item_sheet_' + itemData._id)
        });
    };

    if(data.static){
        // Element passed has datagen data
        openConceptWindow(element);
    } else {
        // We need to fetch the data from the database
        GetItem(element._id, openConceptWindow);
    }
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

const OndropItem = (element) => CreateItem(toRaw(element));
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
                        :validDrops="['item-weapon']"
                        :types="['item', 'item-weapon']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #equipment>
                    <ConceptList 
                        :elements="equipment"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-equipment']"
                        :types="['item', 'item-equipment']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #consumables>
                    <ConceptList 
                        :elements="consumables"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-consumable']"
                        :types="['item', 'item-consumable']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #containers>
                    <ConceptList 
                        :elements="containers"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-container']"
                        :types="['item', 'item-container']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #tools>
                    <ConceptList 
                        :elements="tools"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-tool']"
                        :types="['item', 'item-tool']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #spells>
                    <ConceptList 
                        :elements="spells"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-spell']"
                        :types="['item', 'item-spell']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
                <template #features>
                    <ConceptList 
                        :elements="features"
                        :open="OpenConcept"
                        :context="ElementContext"
                        :tooltip="ElementTooltip"
                        :icon="ElementIcon"
                        :validDrops="['item-feature']"
                        :types="['item', 'item-feature']"
                        :readonly="data.fromDatagen"
                        :ondrop="OndropItem"
                    ></ConceptList>
                </template>
            </Tabs>
        </div>

        <FixedBottomButtons :plus="OpenCreateItemPrompt" v-if="!data.fromDatagen"></FixedBottomButtons>
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

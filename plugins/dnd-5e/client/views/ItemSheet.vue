<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { GetItem } from './../data.js';

import { onMounted, ref, shallowRef, toRaw } from 'vue';
import { SetupHandle, SetSize, ResetPosition, SetMinSize, SetResizable } from '@/services/Windows';
import IconSelector from '@/views/partials/IconSelector.vue';
import { AddContextMenu, HideContextMenu, ShowContextMenu } from '@/services/ContextMenu';
import Tabs from '@/views/partials/Tabs.vue';
import MarkdownEditor from '@/views/partials/MarkdownEditor.vue';
import Tags from '@/views/partials/Tags.vue';
import Input from '@/views/partials/Input.vue';
import { GetKey, SetKey } from '@/services/Utils.js';

import { Global } from '@/services/PluginGlobals';
import Dropdown from '@/views/partials/Dropdown.vue';
import FormElement from '@/views/partials/FormElement.vue';

const props = defineProps(['data']);
const data = props.data;
const api = Global('dnd-5e').Api;
const pluginData = Global('dnd-5e').Data;
const dndModule = Global('dnd-5e').DndModule;


const handle = ref(null);
const item_type = ref("");
const rarity = ref(null);
const weaponType = ref(null);
const item_name = ref(null);
const icon_selector = ref(null);
const description = ref(null);
const properties = ref(null);
const quantity = ref(null);
const weight = ref(null);
const price = ref(null);
const item_type_name = ref("");

function GenRarities(){
    let rarities = [];
    let raritiesNames = ['', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary', 'Artifact'];
    raritiesNames.forEach(name => {
        let lowerName = name.replace(/\s+/g, '-').toLowerCase();
        rarities.push({
            name: `<span class='${lowerName}'>${name}</span>`,
            action: () => {
                rarity.value.innerHTML = `<span class='important ${lowerName}'>${name}</span>`;
                HideContextMenu();
                SetParam('rarity', name);
            } 
        })
    });
    return rarities;
}

function GenTypes(list){
    let types = [];
    list.forEach(name => {
        types.push({
            name,
            action: () => {
                weaponType.value.innerHTML = `<span class="important">${name}</span>`;
                HideContextMenu();
                SetParam('weapon_type', name);
            }
        });
    });
    return types;
}

let id = data.id;
let concept = shallowRef({});
let oldInfo;

function Upload(){
    let params = {id: concept.value._id};
    dndModule.router.put('/item/update', params, {data: concept.value}).then(response => {
        // console.log(response);
    });
}

function SetParam(param, value){
    SetKey(concept.value, `${param}`, value);
    Upload();
}

function IconSelected(val){
    SetParam('icon', val.selected.path);
}

function DescriptionChanged(text){
    SetParam('description', text);
}

function PropertiesChanged(properties){
    SetParam('properties', properties);
}

function InitValues(){
    let rarities = GenRarities();
    let weapon_types = GenTypes(["", "Melee", "Ranged", "Martial Melee", "Martial Ranged", "Natural", "Improvised", "Siege Weapon"]);
    
    icon_selector.value.icon = GetKey(concept.value, "icon");
    rarity.value.innerHTML = `<span class='important ${GetKey(concept.value, "rarity") ? GetKey(concept.value, "rarity").replace(/\s+/g, '-').toLowerCase() : ""}'>${GetKey(concept.value, "rarity")}</span>`;
    weaponType.value.innerHTML = `<span class='important'>${GetKey(concept.value, "info.weapon_type")}</span>`;
    description.value.text = GetKey(concept.value, "description");
    properties.value.selected = GetKey(concept.value, "info.properties");
    quantity.value.Set(GetKey(concept.value, "quantity"));
    weight.value.Set(GetKey(concept.value, "weight"));
    price.value.Set(GetKey(concept.value, "price"));
    item_type_name.value = GetKey(concept.value, "type");
    item_name.value.innerHTML = GetKey(concept.value, "name");

    quantity.value.OnUpdate((val) => SetParam('quantity', val));
    weight.value.OnUpdate((val) => SetParam('weight', val));
    price.value.OnUpdate((val) => SetParam('price', val));

    rarity.value.addEventListener("click", () => {
        ShowContextMenu(rarities)
    });
    AddContextMenu(rarity.value, rarities, {dropdown: true})

    weaponType.value.addEventListener("click", () => {
        ShowContextMenu(weapon_types)
    });
    AddContextMenu(weaponType.value, weapon_types, {dropdown: true});

    item_name.value.addEventListener('blur', () => {
        concept.value.name = item_name.value.textContent;
        Upload();
    });
}

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 600, height: 700});
    SetResizable(id, true);
    SetMinSize(id, {width: 400, height: 300});
    ResetPosition(id, "center");

    if(data.staticContent){
    concept.value = toRaw(data.staticContent);
        console.log(concept.value);
        InitValues();
    }
});

item_type.value = data.item_type;
if(data.item_create){
    dndModule.router.post('/item/create', {}, {
        data: {
            type: data.item_type,
            name: "New " + data.item_type
        },
    }).then(response => {
        concept.value = response.data.data;
        InitValues();

    }).catch(err => console.log(err));
} else {
    if(!data.staticContent){
        GetItem(data.item_id).then(response => {
            concept.value = response.data.data;
            console.log(concept.value);
            InitValues();
        }).catch(err => console.log(err));
    }
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="main-container">
            <div class="item-header">
                <IconSelector :window="id" ref="icon_selector" :done="IconSelected"></IconSelector>
                <div class="header-info">
                    <div class="row">
                        <h1 class="grow subsection left" contenteditable="true" spellcheck="false" ref="item_name"></h1>
                        <h1 class="subsection right">{{ item_type_name }}</h1>
                    </div>
                    <div class="row">
                        <div class="grow subsection center border" ref="weaponType"></div>
                        <div class="grow subsection center border" ref="rarity"></div>
                    </div>
                </div>
            </div>
            <Tabs :rows="[
                {id: 'description', value: 'general.description'},
                {id: 'details', value: 'general.details'}
            ]">
                <template #description>
                    <div class="description-container">
                        <div class="description-sidebar">
                            <div class="form-container">
                                <FormElement>
                                    <label>{{$t('general.quantity')}}</label>
                                    <Input ref="quantity"></Input>
                                </FormElement>
                                <FormElement>
                                    <label>{{$t('general.weight')}}</label>
                                    <Input ref="weight"></Input>
                                </FormElement>
                                <FormElement>
                                    <label>{{$t('general.price')}}</label>
                                    <Input ref="price"></Input>
                                </FormElement>
                            </div>
                        </div>
                        <div class="description">
                            <MarkdownEditor ref="description" :done="DescriptionChanged" :editable="true"></MarkdownEditor>
                        </div>
                    </div>
                </template>
                <template #details>
                    <h2 class="section">Properties</h2>
                    <FormElement>
                        <label>Properties</label>
                        <Tags ref="properties" :items="['Amunnition','Finesse','Heavy','Light','Loading','Range','Reach','Special','Thrown','Two-Handed','Versatile']" :done="PropertiesChanged"></Tags>
                    </FormElement>
                    <h2 class="section">Usage</h2>
                    <FormElement>
                        <label>Range</label>
                        <Input></Input><label>/</label><Input></Input><Dropdown :options="['ft', 'm']" :selected="'ft'"></Dropdown>
                    </FormElement>
                    <h2 class="section">Damage</h2>
                    <FormElement>
                        <label>Damage</label>
                        <Dropdown :options="['None','Acid','Bludgeoning','Cold','Fire','Force','Lightning','Necrotic','Piercing','Poison','Psychic','Radiant','Slashing','Thunder','Healing','Healing (Temp)']"></Dropdown>
                        <Input></Input>
                    </FormElement>
                </template>
            </Tabs>
        </div>
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

h2.section {
    margin-left: 12px;
    font-family: NodestoCapsCondensed;
    font-size: 32px;
    line-height: 48px;
    text-align: left;
}

.description-container {
    display: flex;
    height: 100%;
    width: 100%;
    
    .description-sidebar {
        max-width: 200px;
    }

    .description {
        flex-grow: 1;
        height: 100%;
    }
}

.item-header {
    display: flex;
    width: 100%;
    height: 88px;
    padding: 10px;
    background-color: #1d1d1d;

    .book-info {
        margin-left: 20px;
    }

    .header-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        
        h1 {
            margin-left: 12px;
            font-family: NodestoCapsCondensed;
            font-weight: lighter;
            font-size: 32px;
            line-height: 32px;
            text-align: left;
        }
    }
}

.row {
    width: 100%;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

</style>

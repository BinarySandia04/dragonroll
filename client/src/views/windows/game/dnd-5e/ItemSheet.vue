<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';
import Api from '@/services/Api';

import { onMounted, ref, shallowRef } from 'vue';
import { SetupHandle, SetSize, ResetPosition, CreateWindow, SetMinSize, SetResizable } from '@/services/Windows';
import IconSelector from '@/views/partials/IconSelector.vue';
import { AddContextMenu, HideContextMenu, ShowContextMenu } from '@/services/ContextMenu';
import { GetCampaign } from '@/services/Dragonroll';
import { GetConcept } from '@/services/Data';
import Tabs from '@/views/partials/Tabs.vue';
import MarkdownEditor from '@/views/partials/MarkdownEditor.vue';
import Tags from '@/views/partials/Tags.vue';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const item_type = ref("");
const rarity = ref(null);
const weaponType = ref(null);
const item_name = ref(null);
const icon_selector = ref(null);
const description = ref(null);
const properties = ref(null);

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
    let extraParams = "";
    if(oldInfo != concept.value.info){
        extraParams = "&fireUpdate=true";
        oldInfo = structuredClone(concept.value.info);
        console.log("MAIASIUDHSAHJ")
    }
    Api().put('/concept/update?campaign=' + GetCampaign()._id + "&id=" + concept.value._id + extraParams, {concept: concept.value}).then(response => {
        console.log(response);
    });
}

function SetParam(param, value){
    concept.value.info[param] = value;
    Upload();
}

function IconSelected(val){
    SetParam('icon', val.selected.path);
    Upload();
}

function DescriptionChanged(text){
    SetParam('description', text);
    Upload();
}

function PropertiesChanged(properties){
    console.log(properties);
    SetParam('properties', properties);
    Upload();
}

function InitValues(){
    let rarities = GenRarities();
    let weapon_types = GenTypes(["", "Melee", "Ranged", "Martial Melee", "Martial Ranged", "Natural", "Improvised", "Siege Weapon"]);

    if(!concept.value.data) concept.value.data = {};
    if(!concept.value.info) concept.value.info = {};
    
    if(concept.value.info.icon) icon_selector.value.icon = concept.value.info.icon;
    if(concept.value.info.rarity) rarity.value.innerHTML = `<span class='important ${concept.value.info.rarity.replace(/\s+/g, '-').toLowerCase()}'>${concept.value.info.rarity}</span>`;
    if(concept.value.info.weapon_type) weaponType.value.innerHTML = `<span class='important'>${concept.value.info.weapon_type}</span>`;
    if(concept.value.info.description) description.value.text = concept.value.info.description;
    if(concept.value.info.properties) properties.value.selected = concept.value.info.properties;

    rarity.value.addEventListener("click", () => {
        ShowContextMenu(rarities)
    });
    AddContextMenu(rarity.value, rarities)

    weaponType.value.addEventListener("click", () => {
        ShowContextMenu(weapon_types)
    });
    AddContextMenu(weaponType.value, weapon_types);

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
    item_type.value = data.item_type;

    if(data.item_create){
        Api().post('/concept/create?campaign=' + GetCampaign()._id, {
            data: {
                type: data.item_type,
                name: "New " + data.item_type
            },
        }).then(response => {
            concept.value = response.data.concept;
            InitValues();

        }).catch(err => console.log(err));
    } else {
        // Get concept
        GetConcept(data.item_id).then(response => {
            concept.value = response.data.concept;
            InitValues();
        }).catch(err => console.log(err));
    }
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="main-container">
            <div class="item-header">
                <IconSelector :window="id" ref="icon_selector" :done="IconSelected"></IconSelector>
                <div class="header-info">
                    <h1 contenteditable="true" spellcheck="false" ref="item_name">{{ concept.name }}</h1>
                    <div class="row">
                        <div class="grow subsection" ref="weaponType"></div>
                        <div class="grow subsection" ref="rarity"></div>
                    </div>
                </div>
            </div>
            <Tabs :rows="['Description', 'Details']">
                <template #description>
                    <div class="description-container">
                        <div class="description-sidebar">
                            <p>Hola</p>
                        </div>
                        <div class="description">
                            <MarkdownEditor ref="description" :done="DescriptionChanged"></MarkdownEditor>
                        </div>
                    </div>
                </template>
                <template #details>
                    <h2 class="section">Properties</h2>
                    <Tags ref="properties" :items="['Amunnition','Finesse','Heavy','Light','Loading','Range','Reach','Special','Thrown','Two-Handed','Versatile']" :done="PropertiesChanged"></Tags>
                    <h2 class="section">Damage</h2>
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
        min-width: 200px;
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

.grow {
    flex-grow: 1;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.subsection {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
        border-right: 1px solid var(--color-border);
    }
}

</style>

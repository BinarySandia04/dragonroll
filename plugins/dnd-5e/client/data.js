import Server from '@/services/Server'
import { reactive } from 'vue';
import { Global } from '@/services/PluginGlobals';

import { GetCampaign } from "@/services/Dragonroll";

let data = reactive({});

let Api = Global('dnd-5e').Api;
let dndModule = Global('dnd-5e').DndModule;

function InitData(){
    Api = Global('dnd-5e').Api;
    dndModule = Global('dnd-5e').DndModule;

    data.value = {
        concepts: []
    };
}

function FetchConcepts(){
    dndModule.router.get('/item/list', {}).then(response => {
        data.value.concepts = response.data.data;
    }).catch(err => console.log(err));
}

let GetConcepts = () => data.value.concepts;
let GetItem = (id) => dndModule.router.get('/item/get', {id})


export {
    InitData,

    FetchConcepts,

    GetConcepts,
    GetItem,
}
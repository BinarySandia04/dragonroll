import Server from '@/services/Server'
import { reactive } from 'vue';
import { Global } from '@/services/PluginGlobals';

import { GetCampaign } from "@/services/Dragonroll";

let data = reactive({});

let Api = Global('dnd-5e').Api;
let dndModule = Global('dnd-5e')['dndModule'];

function InitData(){
    Api = Global('dnd-5e').Api;
    dndModule = Global('dnd-5e')['dndModule'];

    data.value = {
        concepts: []
    };
}

function FetchConcepts(){
    dndModule.router.get('/item/list', {}).then(response => {
        data.value.concepts = response.data.data;
        console.log(response.data);
    }).catch(err => console.log(err));
}

function FetchData(){
    FetchConcepts();
}

let GetConcepts = () => data.value.concepts;
let GetConcept = (id) => dndModule.router.get('/item/get', {id})


export {
    InitData,
    FetchData,

    FetchConcepts,

    GetConcepts,
    GetConcept,
}
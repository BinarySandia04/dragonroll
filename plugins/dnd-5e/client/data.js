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


const GetConcepts = () => data.value.concepts;
const GetItem = (id, callback = () => {}) => {
    dndModule.router.get('/item/get', {id}).then(response => {
        if(response.data.status == "ok") callback(response.data.data);
        else console.err("Request resulted with error " + response.data.status);
    }).catch(err => console.log(err));
}

const CreateItem = (data, callback = () => {}) => {
    dndModule.router.post('/item/create', {}, {data}).then(response => {
        FetchConcepts();
        callback(response.data);
    }).catch(err => console.log(err));
}

const UpdateItem = (id, data, callback = () => {}) => {
    dndModule.router.put('/item/update', {id}, {data}).then(response => {
        FetchConcepts();
        callback(response.data);
    }).catch(err => console.log(err));
}

export {
    InitData,

    FetchConcepts,

    GetConcepts,
    GetItem,
    CreateItem,
    UpdateItem
}
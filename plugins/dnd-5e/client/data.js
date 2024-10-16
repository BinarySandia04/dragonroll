import Server from '@/services/Server'
import { reactive } from 'vue';

import { GetCampaign } from "@/services/Dragonroll";

let data = reactive({});

let Api;
let dndModule;

function InitData(api, module){
    Api = api;
    dndModule = module;

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
let GetConcept = (id) => Server().get('/concept/get?campaign=' + GetCampaign()._id + "&id=" + id)


export {
    InitData,
    FetchData,

    FetchConcepts,

    GetConcepts,
    GetConcept,
}
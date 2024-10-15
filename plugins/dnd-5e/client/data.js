import { Api } from './main.js'

import Server from '@/services/Server'
import { reactive } from 'vue';

import { GetCampaign } from "@/services/Dragonroll";

let data = reactive({});

function InitData(){
    data.value = {
        concepts: []
    };
}

function FetchConcepts(){
    console.log(Api.router)
    Server().get('/concept/list?campaign=' + GetCampaign()._id).then(response => {
        data.value.concepts = response.data.data;
    }).catch((err) => console.log(err));
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
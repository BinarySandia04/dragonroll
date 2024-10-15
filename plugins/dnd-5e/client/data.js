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
    
    Server().get('/concept/list?campaign=' + GetCampaign()._id).then(response => {
        data.value.concepts = response.data.data;
    }).catch((err) => console.log(err));
}

function FetchData(){
    FetchConcepts();
}
/*
Api.socket.on('update-concepts', () => {
    FetchConcepts();
});

/*
socket.on('update-concepts', () => {
    FetchConcepts();
});
*/

let GetConcepts = () => data.value.concepts;
let GetConcept = (id) => Server().get('/concept/get?campaign=' + GetCampaign()._id + "&id=" + id)


export {
    InitData,
    FetchData,

    FetchConcepts,

    GetConcepts,
    GetConcept,
}
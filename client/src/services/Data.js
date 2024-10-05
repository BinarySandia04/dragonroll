import Server from '@/services/Server'
import { GetCampaign } from "./Dragonroll";
import { socket } from './Socket';
import { reactive } from 'vue';

let data = reactive({});

function InitData(){
    data.value = {
        concepts: [],
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


socket.on('update-concepts', () => {
    FetchConcepts();
});

let GetConcepts = () => data.value.concepts;
let GetConcept = (id) => Server().get('/concept/get?campaign=' + GetCampaign()._id + "&id=" + id)


export {
    InitData,
    FetchData,

    FetchConcepts,

    GetConcepts,
    GetConcept,
}
import { ref } from 'vue';
import { ClearAll, ClearWindow, CreateWindow } from './Windows';
import { io } from "socket.io-client";
import Api from '@/services/Api'
import { backendUrl } from './BackendURL';
import { GetUser } from './User';

export const socket = io(backendUrl)

let currentCampaign = null;

const players = ref([]);
let GetPlayerList = () => { return players; }; 

socket.on('update-players', data => {
    players.value = [];
    Object.keys(data).forEach((key) => {
        players.value.push(data[key]);
    });
})

function DisplayCampaign(data){
    ClearAll();
    CreateWindow('campaign_preview', {campaign: data});
}

function ConnectToCampaign(campaign){
    currentCampaign = campaign;
    socket.emit('enter', GetUser(), currentCampaign._id);
}

function Disconnect(){
    socket.emit('exit');
    currentCampaign = null;
}

export {
    DisplayCampaign,
    ConnectToCampaign,
    Disconnect,

    GetPlayerList,
};
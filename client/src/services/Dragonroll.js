import { ref } from 'vue';
import { ClearAll, ClearWindow, CreateWindow } from './Windows';
import { io } from "socket.io-client";
import Api from '@/services/Api'
import { backendUrl } from './BackendURL';
import { GetUser } from './User';

let emitter;

function SetEmitter(newEmitter){
    emitter = newEmitter
}

function DisplayToast(color, text, duration = 1000){
    emitter.emit("toast", {color, text, duration});
}

export const socket = io(backendUrl)

let currentCampaign = null;
let currentPlayer = null;

const players = ref([]);
let GetPlayerList = () => { return players; }; 
let GetCampaign = () => { return currentCampaign; };
let GetClient = () => { return currentPlayer; };

socket.on('update-players', data => {
    players.value = [];
    Object.keys(data).forEach((key) => {
        players.value.push(data[key]);
        if(GetUser()._id == data[key].user._id) currentPlayer = data[key];
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

function GetPlayer(player_campaign){
    let index = players.value.findIndex((p) => {return p._id == player_campaign});
    if(index != -1) return players.value[index];
}

export {
    SetEmitter,

    DisplayToast,

    DisplayCampaign,
    ConnectToCampaign,
    Disconnect,

    GetCampaign,
    GetClient,
    GetPlayerList,
    GetPlayer,
};
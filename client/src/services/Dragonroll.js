import { ref } from 'vue';
import { ClearAll, ClearWindow, CreateWindow } from './Windows';
import { io } from "socket.io-client";
import Api from '@/services/Api'
import { backendUrl } from './BackendURL';
import { GetUser } from './User';
import { ExitGame } from './Game';
import { GetModule } from './Modules';
import { GetMap, LoadMap, UpdateMapList } from './Map';

let emitter;

function SetEmitter(newEmitter){
    emitter = newEmitter
}

let GetEmitter = () => emitter;

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

let chatMessageId = 0;
const chat = ref([]);
let GetChatRef = () => chat;

socket.on('change_map', data => {
    console.log("ChangeMap")
    UpdateMapList().then(() => {
        LoadMap(GetMap(data.id));
    });
})

socket.on('update-players', data => {
    players.value = [];
    Object.keys(data).forEach((key) => {
        players.value.push(data[key]);
        if(GetUser()._id == data[key].user._id) currentPlayer = data[key];
    });
})

socket.on('message', (data) => {
    // Add new chat message, ?
    if(chat.value.length > 0) if(chat.value[chat.value.length - 1].author == data.author){
        chat.value[chat.value.length - 1].chunkSize += 1;
        chat.value[chat.value.length - 1].chunks.push({
            id: chat.value[chat.value.length - 1].chunkSize,
            type: data.type ? data.type : 'text',
            content: data.content
        });
        return;
    }

    chatMessageId += 1;
    chat.value.push({
        id: chatMessageId,
        author: data.author,
        chunkSize: 1,
        chunks: [
            {
                id: 1,
                type: data.type ? data.type : 'text',
                content: data.content
            }
        ]
    });
});

function _SendMap(id){
    socket.emit('send_map', {id});
}

function SendMessage(data){
    socket.emit('message', data);
}

function DisplayCampaign(data = currentCampaign){
    ClearAll();
    CreateWindow('campaign_preview', {campaign: data});
}

function ConnectToCampaign(campaign){
    currentCampaign = campaign;
    chat.value = [];

    socket.emit('enter', GetUser(), currentCampaign._id);
}

function Disconnect(){
    socket.emit('exit');
    ExitGame();

    currentCampaign = null;
    currentPlayer = null;
    chat.value = [];
}

function GetPlayer(player_campaign){
    let index = players.value.findIndex((p) => {return p._id == player_campaign});
    if(index != -1) return players.value[index];
}

function GetSystem(){
    if(currentCampaign) return GetModule(currentCampaign.system)
}

export {
    SetEmitter,
    GetEmitter,

    DisplayToast,

    DisplayCampaign,
    ConnectToCampaign,
    Disconnect,

    GetCampaign,
    GetClient,
    GetPlayerList,
    GetPlayer,
    GetSystem,

    GetChatRef,
    SendMessage,
    _SendMap
};
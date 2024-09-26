import { ref } from 'vue';

import { ExitGame } from "./Game";
import { socket } from "./Socket";
import { GetUser } from "./User";
import { chat } from './Chat';
import { ClearAll, CreateWindow } from './Windows';

import Api from '@/services/Api';
import { GetCampaign } from './Dragonroll';

let _currentCampaign = null;
let _currentPlayer = null;
const _players = ref([]);

function ConnectToCampaign(campaign){
    _currentCampaign = campaign;
    chat.value = [];

    socket.emit('enter', GetUser(), _currentCampaign._id);
}

function Disconnect(){
    socket.emit('exit');
    ExitGame();

    _currentCampaign = null;
    _currentPlayer = null;
    chat.value = [];
}

function DisplayCampaign(data = _currentCampaign){
    ClearAll();
    console.log(data)
    CreateWindow('campaign_preview', {campaign: data});
}

function UpdateCampaignData(data){
    Api().put('/campaign/update?campaign=' + GetCampaign()._id, {campaign: data}).then(response => {
        console.log(response);
    });
}

socket.on('update-players', data => {
    _UpdatePlayers(data)
})

socket.on('init-info', data => {
    _UpdatePlayers(data.players);
    DisplayCampaign();
})

function _UpdatePlayers(data){
    _players.value = [];
    Object.keys(data).forEach((key) => {
        _players.value.push(data[key]);
        if(GetUser()._id == data[key].user._id) _currentPlayer = data[key];
    });
}

export {
    _currentCampaign,
    _currentPlayer,
    _players,

    ConnectToCampaign,
    DisplayCampaign,
    UpdateCampaignData,
    Disconnect
}
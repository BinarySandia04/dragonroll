import { ref } from 'vue';

import { ExitGame } from "./Game";
import { socket } from "./Socket";
import { GetUser } from "./User";
import { chat } from './Chat';
import { ClearAll, CreateWindow } from './Windows';


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


function DisplayCampaign(data = currentCampaign){
    ClearAll();
    CreateWindow('campaign_preview', {campaign: data});
}

socket.on('update-players', data => {
    _players.value = [];
    Object.keys(data).forEach((key) => {
        _players.value.push(data[key]);
        if(GetUser()._id == data[key].user._id) _currentPlayer = data[key];
    });
})

export {
    _currentCampaign,
    _currentPlayer,
    _players,

    ConnectToCampaign,
    DisplayCampaign,
    Disconnect
}
import { GetModule } from './Modules';
import { socket } from './Socket';
import { _currentCampaign, _currentPlayer, _players } from './Campaign';
import { chat } from './Chat';

let emitter;

function SetEmitter(newEmitter){
    emitter = newEmitter
}

let GetEmitter = () => emitter;

function DisplayToast(color, text, duration = 1000){
    emitter.emit("toast", {color, text, duration});
}

let GetPlayerList = () => _players;
let GetCampaign = () => _currentCampaign;
let GetClient = () => _currentPlayer;

let GetChatRef = () => chat;

function _SendMap(id){
    socket.emit('send_map', {id});
}

function SendMessage(data){
    socket.emit('message', data);
}


function GetPlayer(player_campaign){
    let index = _players.value.findIndex((p) => {return p._id == player_campaign});
    if(index != -1) return _players.value[index];
}

function GetSystem(){
    if(currentCampaign) return GetModule(currentCampaign.system)
}

export {
    SetEmitter,
    GetEmitter,

    DisplayToast,

    GetCampaign,
    GetClient,
    GetPlayerList,
    GetPlayer,
    GetSystem,

    GetChatRef,
    SendMessage,
    _SendMap
};
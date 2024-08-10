const CampaignUser = require("../models/CampaignUser");
const User = require("../models/User");
const FilterUser = require('../utils/filters');

let sessions = {};

async function GetOfflinePlayers(campaign){
    let players = await CampaignUser.find({campaign}).populate('user').exec();
    let finalPlayers = [];
    console.log(players)
    // TODO: Filter
    players.forEach(player => finalPlayers.push(FilterUser(player)));

    return finalPlayers;
}

function SetPlayerProperty(campaign, player_id, key, value){
    objIndex = sessions[campaign].players.findIndex(player => player.user._id.toString() == player_id);
    if(objIndex != -1){        
        sessions[campaign].players[objIndex][key] = value;
    }
}

module.exports = io => {
    io.on('connection', (socket) => {
        socket.on('enter', (user, campaignId) => {
            User.findOne(user).then(user => {
                if(user){
                    socket.user = user;
                    CampaignUser.findOne({campaign: campaignId, user}).then(async campaignUser => {
                        if(campaignUser){
                            socket.join(campaignId);
                            socket.campaignUser = campaignUser;
                            socket.campaign = campaignId;

                            if(!sessions[campaignId]){ sessions[campaignId] = {
                                    players: await GetOfflinePlayers(campaignId),
                                    chat: []
                                };
                            } else {
                                newPlayers = await GetOfflinePlayers(campaignId);
                                newPlayers.forEach(player => {
                                    for(let i = 0; i < sessions[campaignId].players.length; i++){
                                        if(player._id == sessions[campaignId].players[i]._id) return;
                                    }
                                    sessions[campaignId].players.push(FilterUser(player));
                                })
                            }
                            
                            
                            console.log(socket.user.username + " ha entrado!");
                            SetPlayerProperty(campaignId, socket.user._id, "online", true);
                            io.to(socket.campaign).emit('update-players', sessions[campaignId].players)

                            // console.log(JSON.stringify(sessions[campaignId], null, 4));
                        }
                    });
                }
            })
        });

        socket.on('exit', () => {
            SetPlayerProperty(socket.campaign, socket.user._id, "online", false);
            io.to(socket.campaign).emit('update-players', sessions[socket.campaign].players)
            socket.leave(socket.campaign)

            console.log(socket.user.username + " ha salido!")
        });

        socket.on('message', (data) => {
            io.to(socket.campaign).emit('message', data);
        })

        socket.on('send_map', (data) => {
            console.log("SENDMAP")
            if(!socket.campaignUser) return;
            if(socket.campaignUser.is_dm){
                console.log("Sended!")
                socket.to(socket.campaign).emit('change_map', data);
            }
        })
    });
}
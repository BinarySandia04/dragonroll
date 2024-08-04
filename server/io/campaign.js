const CampaignUser = require("../models/CampaignUser");
const User = require("../models/User");
const FilterUser = require('../utils/filters');

let sessions = {};

module.exports = io => {
    io.on('connection', (socket) => {
        socket.on('enter', (user, campaignId) => {
            User.findOne(user).then(user => {
                if(user){
                    socket.user = user;
                    CampaignUser.findOne({campaign: campaignId, user}).then(campaignUser => {
                        if(campaignUser){
                            socket.join(campaignId);
                            socket.campaign = campaignId;

                            if(!sessions[campaignId]) sessions[campaignId] = {
                                players: {}
                            }; 
                            
                            sessions[campaignId].players[socket.user._id] = {
                                online: true,
                                is_dm: campaignUser.is_dm,
                                data: FilterUser(socket.user)
                            };

                            console.log(socket.user.username + " ha entrado!");
                            io.to(socket.campaign).emit('update-players', sessions[campaignId].players)

                            console.log(JSON.stringify(sessions, null, 4));
                        }
                    });
                }
            })
        });

        socket.on('exit', () => {
            io.to(socket.campaign).emit('update-players', sessions[campaignId].players)
            socket.leave(socket.campaign)
            sessions[socket.campaign].players[socket.user._id].online = false;

            console.log(socket.user.username + " ha salido!")
        });
    });
}
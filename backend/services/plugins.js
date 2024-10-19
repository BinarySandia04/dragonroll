const fs = require('fs');
const path = require('path');
const BackendApi = require('./api').BackendApi
const express = require('express');
const { getIo } = require('../io/socket');
const { datagenTask } = require('./datagen');
const router = express.Router({
    mergeParams: true
});

const basePath = path.resolve(__dirname, '../')

let pluginsInfo = [];
let plugins = {};
let internalSocket = {};
let datagenRegistry = {};

function init(){
    console.log("Initializing plugins");
    const pluginFolders = fs.readdirSync(path.resolve(basePath + '/plugins'));
    pluginFolders.forEach(pluginFolder => {
        pluginsInfo.push(JSON.parse(fs.readFileSync(
            path.resolve(basePath, 'plugins', pluginFolder, "plugin.json")
        )));
    });
    
    console.log("Launching using the following plugins:");
    pluginsInfo.forEach(pluginInfo => {
        console.log(`\t- ${pluginInfo.name}`);
        plugins[pluginInfo.package] = {info: pluginInfo, payload: require(`${basePath}/plugins/${pluginInfo.package}/${pluginInfo.backend.entrypoint}`)};
    });

    // Execute main
    Object.keys(plugins).forEach(k => {
        datagenRegistry[k] = {modelNames: []};
        let pluginApi = new BackendApi(plugins[k].info, router, internalSocket, datagenRegistry[k]);
        plugins[k].payload.Main(pluginApi);
    });

    datagenTask(datagenRegistry);

    console.log(internalSocket);
    getIo().on('connect', (socket) => {
        Object.keys(internalSocket).forEach(k => {
            socket.on(k, internalSocket[k]);
        });
    })
    
    return {
        router
    }
}

module.exports = {
    init
}
const fs = require('fs');
const path = require('path')
const Api = require('./api').Api

const basePath = path.resolve(__dirname, '../')
console.log(basePath)

let pluginsInfo = [];
let plugins = {};

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
        plugins[pluginInfo.package] = require(`${basePath}/plugins/${pluginInfo.package}/${pluginInfo.backend.entrypoint}`);
    });

    // Execute main
    Object.keys(plugins).forEach(k => {
        plugins[k].Main(new Api(k))
    })
}

module.exports = {
    init
}
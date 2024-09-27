import { GetPluginPaths } from "./Resources"

import * as Dragonroll from "@/services/Dragonroll"
import * as Chat from "@/services/Chat"
import * as ContextMenu from "@/services/ContextMenu"
import * as Map from "@/services/Map"
import * as Modules from "@/services/Modules"
import * as Sound from "@/services/Sound"
import * as Tooltip from "@/services/Tooltip"
import * as Windows from "@/services/Windows"

let pluginInfo = []

async function FetchPlugins(){
    let pluginNames = GetPluginPaths();

    for(let i = 0; i < pluginNames.length; i++){
        let pluginName = pluginNames[i];
        let pluginData = (await import(/* @vite-ignore */ `../../plugins/${pluginName}/plugin.json`)).default
        console.log(`Loading plugin %c${pluginData.name}`, "color: #00ffff");

        pluginInfo.push({
            name: pluginData.name,
            _id: pluginName,
            info: {
                
            }
        });

        import(/* @vite-ignore */ `../../plugins/${pluginName}/${pluginData.entrypoint}`).then(module => {
            module.Main({
                Dragonroll,
                Chat,
                ContextMenu,
                Map,
                Modules,
                Sound,
                Tooltip,
                Windows
            });
        })
    }
}

function _GetPlugins(){
    return pluginInfo
}

export {
    FetchPlugins,

    _GetPlugins
}
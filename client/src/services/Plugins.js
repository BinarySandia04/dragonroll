import { GetPluginPaths } from "./Resources"
import { ClientApi } from '@/services/Api'

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
                name: pluginData.name,
                description: pluginData.description,
                authors: pluginData.authors,
                version: pluginData.version,
            }
        });

        import(/* @vite-ignore */ `../../plugins/${pluginName}/${pluginData.client.entrypoint}`).then(module => {
            module.Main(new ClientApi(pluginData));
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
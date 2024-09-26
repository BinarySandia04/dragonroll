let icons = [];
let plugins = [];

async function GetJson(url){
    let obj = await (await fetch(url)).json();
    return obj;
}

async function FetchResources(){
    let data = await GetJson('/data/data.json');
    icons = data.icons.files;
    plugins = data.plugins;
}

function GetIcons(){
    return icons;
}

function GetPluginPaths(){
    return plugins;
}

export {
    FetchResources,
    
    GetIcons,
    GetPluginPaths,
};
let modulesToLoad = [
    "dnd-5e"
]
let modules = [];

async function GetJson(url){
    let obj = await (await fetch(url)).json();
    return obj;
}

async function ImportModule(moduleFolder) {
    let moduleInfo = await GetJson('/modules/' + moduleFolder + '/module.json');
    modules.push(moduleInfo);
}

let GetModules = () => modules;
let GetModulesToLoad = () => modulesToLoad;

function GetModule(id){
    let module = null;
    modules.forEach(mod => {
        if(mod.id == id) module = mod;
    })
    return module;
}

export {
    ImportModule,
    GetModules,
    GetModule,
    GetModulesToLoad,
}
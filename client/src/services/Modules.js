let modules = {};

function CreateModule(module){
    let moduleInfo = module.info;
    modules[moduleInfo.id] = moduleInfo;
}

/*
async function GetJson(url){
    let obj = await (await fetch(url)).json();
    return obj;
}
*/

/*
async function ImportModule(moduleFolder) {
    let moduleInfo = await GetJson('/modules/' + moduleFolder + '/module.json');
    modules.push(moduleInfo);
}
*/

let GetModules = () => modules;
// let GetModulesToLoad = () => modulesToLoad;

function GetModule(id){
    return modules[id];
}

export {
    CreateModule,
    GetModules,
    GetModule,
}
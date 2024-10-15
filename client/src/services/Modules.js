import { InjectWindow } from "./Windows";

let modules = {};

function CreateModule(module){
    let moduleInfo = module.info;
    let plugin = module._plugin.package;

    modules[moduleInfo.id] = moduleInfo;
}

let GetModules = () => modules;

function GetModule(id){
    return modules[id];
}

export {
    CreateModule,
    GetModules,
    GetModule,
}
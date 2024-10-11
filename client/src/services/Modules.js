import { InjectWindow } from "./Windows";

let modules = {};

function CreateModule(module){
    let moduleInfo = module.info;
    let plugin = module._plugin.package;

    /*
    InjectWindow(`${plugin}/character_sheet`, plugin, moduleInfo.windows.character_sheet.path)
    InjectWindow(`${plugin}/item_sheet`, plugin, moduleInfo.windows.item_sheet.path)
    InjectWindow(`${plugin}/create_item_prompt`, plugin, moduleInfo.windows.create_item_prompt.path)
    */

    modules[moduleInfo.id] = moduleInfo;
}

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
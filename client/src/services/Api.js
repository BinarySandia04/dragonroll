import * as _Dragonroll from "@/services/Dragonroll"
import * as _Chat from "@/services/Chat"
import * as _ContextMenu from "@/services/ContextMenu"
import * as _Map from "@/services/Map"
import * as _Modules from "@/services/Modules"
import * as _Sound from "@/services/Sound"
import * as _Tooltip from "@/services/Tooltip"
import * as _Windows from "@/services/Windows"
import Server from '@/services/Server';
import { socket } from '@/services/Socket';

/**
 * Class for managing the client api
 * @hideconstructor
 */
class ClientApi {
    #_plugin
    #_router
    #_baseRouter
    #_windows
    #_socket

    /**
     * @param {*} plugin 
     */
    constructor(plugin){
        this.#_plugin = plugin
        this.#_router = new ClientRouter(`/plugins/${plugin.package}`, {})
        this.#_baseRouter = new ClientRouter("", {})
        this.#_windows = new ClientWindows(plugin.package)
        this.#_socket = new ClientSocket(`plugins/${plugin.package}`)
    }

    /**
     * 
     * @param {string} path The path to the view relative to the client folder 
     * @returns {ClientView} a new ClientView corresponding to the view
     */
    createView(path){
        return new ClientView(this.#_plugin, path);
    }

    /**
     * Returns a new registered Module
     * @param {string} id The id of the new module
     * @returns {ClientModule}
     */
    createModule(id){
        return new ClientModule(this.#_plugin, id);
    }

    /**
     * Registers a ClientModule
     * @param {ClientModule} module The client module 
     */
    registerModule(module){
        _Modules.CreateModule(module);
    }

        /**
     * Registers a new window for the given view
     * @param {string} name 
     * @param {ClientView} view 
     */
    registerWindow(name, view){
        _Windows.InjectWindow(`${this.#_plugin.package}/${name}`, this.#_plugin.package, view.path)
        return `${this.#_plugin.package}/${name}`;
    }

    createWindow(type, data = {id: type}){
        _Windows.CreateWindow(type, data);
    }

    clearWindow(id){
        _Windows.ClearWindow(id);
    }

    /**
     * Returns the client router
     * @type {ClientRouter}
     */
    get router(){
        return this.#_router;
    }

    get baseRouter(){
        return this.#_baseRouter;
    }

    /**
     * Returns the windows object
     * @type {ClientWindows}
     */
    get windows(){
        return this.#_windows;
    }

    get socket(){
        return this.#_socket;
    }
}

/**
 * Class for managing Dragonroll windows
 * @hideconstructor
 */
class ClientWindows {
    #_plugin;

    constructor(plugin){
        this.#_plugin = plugin;
    }



    get _plugin(){
        return this.#_plugin;
    }
}

/**
 * Class for managing client views
 * @hideconstructor
 */
class ClientView {
    #_plugin;
    #_path;

    constructor(plugin, path){
        this.#_plugin = plugin;
        this.#_path = path;
    }

    /**
     * @type {string} The path of the view
     */
    get path(){
        return this.#_path;
    }

    get _plugin(){
        return this.#_plugin;
    }
}

/**
 * @hideconstructor
 */
class ClientModule {
    #_plugin;
    #_id;
    #_router;

    #_buttons;
    #_previewData;
    #_init;
    #_socket;
    #_exit;

    #_campaign;

    constructor(plugin, id){
        this.#_plugin = plugin;
        this.#_id = id;
        this.#_router = new ClientRouter(`/plugins/${plugin.package}/_module/${id}`, {});
        this.#_socket = new ClientSocket(`plugins/${plugin.package}/${id}`)
    }

    setData(data){
        this.#_previewData = data;
    }

    set onInit(init){ this.#_init = (campaign) => {
            this.#_campaign = campaign;
            this.#_router._setParam("campaign", campaign._id);
            init();
        }; 
    }

    set onExit(exit){ this.#_exit = exit; }

    setButtons(buttons){
        this.#_buttons = buttons;
    }

    get router(){
        return this.#_router;
    }

    get socket(){
        return this.#_socket;
    }

    /**
     * Gets the module info in a json format
     * @returns {Object}
     */
    get info(){
        return {
            id: this.#_id,
            previewData: this.#_previewData,
            init: this.#_init,
            exit: this.#_exit,
            buttons: this.#_buttons
        }
    }

    get _plugin(){
        return this.#_plugin;
    }
}

class ClientSocket {
    #_prefix

    constructor(prefix){
        this.#_prefix = prefix;
    }

    on(msg, callback){
        // alert(`${this.#_prefix}/${msg}`)
        socket.on(`${this.#_prefix}/${msg}`, callback);
    }
}

function ParseQuery(queryData){
    let keys = Object.keys(queryData);
    if(keys.length == 0) return "";
    let res = "?";
    for(let i = 0; i < keys.length; i++){
        res += keys[i] + "=" + queryData[keys[i]];
        if(i != keys.length - 1) res += "&";
    }
    return res;
}

/**
 * @typedef {Object} Response
 * @property {Object} data
 * @property {number} status
 * @property {string} statusText
 * @property {Object} headers
 * @property {Object} config
 * @property {Object} request 
 */

/**
 * @callback routerCallback
 * @param {Response} response
 */

/**
 * Class for accessing backend routes
 * @hideconstructor
 */
class ClientRouter {
    #_path;
    #_defParams;

    constructor(path, defParams){
        this.#_path = path;
        this.#_defParams = defParams;
    }

    get(route, query){
        if(route.startsWith('/')) route = route.substring(1, route.length);
        let f = `${this.#_path}/${route}${ParseQuery({...this.#_defParams, ...query})}`;
        console.log("%cGET%c " + f, 'color: #00ff00', 'color: unset');
        return Server().get(f);
    }

    post(route, query, data = {}){
        if(route.startsWith('/')) route = route.substring(1, route.length);
        let f = `${this.#_path}/${route}${ParseQuery({...this.#_defParams, ...query})}`;
        console.log("%cPOST%c " + f, 'color: #0384fc', 'color: unset');
        return Server().post(f, data);
    }

    put(route, query, data = {}){
        if(route.startsWith('/')) route = route.substring(1, route.length);
        let f = `${this.#_path}/${route}${ParseQuery({...this.#_defParams, ...query})}`;
        console.log("%cPUT%c " + f, 'color: #ff8000', 'color: unset');
        return Server().put(f, data);
    }

    delete(route, query){
        if(route.startsWith('/')) route = route.substring(1, route.length);
        let f = `${this.#_path}/${route}${ParseQuery({...this.#_defParams, ...query})}`;
        console.log("%cDELETE%c " + f, 'color: #fa254c', 'color: unset');
        return Server().delete(f);
    }

    _setParam(key, value){
        this.#_defParams[key] = value;
    }
}


export {
    ClientApi
}
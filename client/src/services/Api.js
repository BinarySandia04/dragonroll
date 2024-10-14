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
    #_windows
    #_socket

    /**
     * @param {*} plugin 
     */
    constructor(plugin){
        this.#_plugin = plugin
        this.#_router = new ClientRouter(`/plugin/${plugin.package}`)
        this.#_windows = new ClientWindows(plugin.package)
        this.#_socket = new ClientSocket(plugin.package)
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
        console.log(id)
        _Windows.ClearWindow(id);
    }

    /**
     * Returns the client router
     * @type {ClientRouter}
     */
    get router(){
        return this.#_router;
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

    #_title;
    #_description;
    #_version;
    #_color;
    #_icon;
    #_buttons;
    #_init;
    #_exit;

    

    constructor(plugin, id){
        this.#_plugin = plugin;
        this.#_id = id;
        this.#_router = new ClientRouter(`/module/${plugin.package}/${id}`);
    }

    /**
     * The title of the module
     * @type {string}
     */
    set title(title) { this.#_title = title; }

    /**
     * The description of the module
     * @type {string}
     */
    set description(description){ this.#_description = description; }

    /**
     * The version of the module
     * @type {string}
     */
    set version(version){ this.#_version = version; }

    /**
     * The accent color of the module. This will be displayed for example
     * in the background title inside the campaign preview
     * @type {string}
     */
    set color(color){ this.#_color = color; }

    /**
     * Sets the icon for the module. It must be placed inside the public folder of the plugin
     */
    set icon(icon){ this.#_icon = icon; }

    set init(init){ this.#_init = init; }

    set exit(exit){ this.#_exit = exit; }

    setButtons(buttons){
        this.#_buttons = buttons;
    }

    get router(){
        return this.#_router;
    }

    /**
     * Gets the module info in a json format
     * @returns {Object}
     */
    get info(){
        return {
            id: this.#_id,
            title: this.#_title,
            description: this.#_description,
            version: this.#_version,
            color: this.#_color,
            icon: this.#_icon,
            init: this.#_init,
            exit: () => {},
            buttons: this.#_buttons
        }
    }

    get _plugin(){
        return this.#_plugin;
    }
}

class ClientSocket {
    #_package

    constructor(plugin){
        this.#_package = plugin;
    }

    on(msg, callback){
        socket.on(`${this.#_package}/${msg}`, callback);
    }
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

    constructor(path){
        this.#_path = path;
    }

    /**
     * Sends a get request to an specified route of a plugin, and then executes the routerCallback with the response
     * @param {String} route
     * @param {routerCallback} callback
     */
    get(route, callback){
        Server().get(`${path}/${route}`).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a post request to specified plugin route
     * @param {String} route
     * @param {Object} data
     * @param {routerCallback} callback
     */
    post(route, data, callback){
        Server().post(`${path}/${route}`, data).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a put request to specified plugin route
     * @param {String} route
     * @param {Object} data
     * @param {routerCallback} callback
     */
    put(route, data, callback){
        Server().put(`${path}/${route}`, data).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a delete request to specified plugin route
     * @param {String} route
     * @param {routerCallback} callback
     */
    delete(route, callback){
        Server().delete(`${route}`).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a get request to an specified route
     * @param {String} route
     * @param {routerCallback} callback
     */
    baseGet(route, callback){
        Server().get(`${route}`).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a post request to specified route
     * @param {String} route
     * @param {Object} data
     * @param {routerCallback} callback
     */
    basePost(route, data, callback){
        Server().post(`${route}`, data).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a put request to specified route
     * @param {String} route
     * @param {Object} data
     * @param {routerCallback} callback
     */
    basePut(route, data, callback){
        Server().put(`${route}`, data).then(callback).catch(err => console.log(err));
    }

    /**
     * Sends a delete request to specified route
     * @param {String} route
     * @param {routerCallback} callback
     */
    baseDelete(route, callback){
        Server().delete(`${route}`).then(callback).catch(err => console.log(err));
    }
}


export {
    ClientApi
}
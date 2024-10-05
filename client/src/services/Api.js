import * as _Dragonroll from "@/services/Dragonroll"
import * as _Chat from "@/services/Chat"
import * as _ContextMenu from "@/services/ContextMenu"
import * as _Map from "@/services/Map"
import * as _Modules from "@/services/Modules"
import * as _Sound from "@/services/Sound"
import * as _Tooltip from "@/services/Tooltip"
import * as _Windows from "@/services/Windows"
import Server from '@/services/Server';

/**
 * Class for managing the client api
 * @hideconstructor
 */
class ClientApi {
    #_plugin
    #_router

    /**
     * @param {*} plugin 
     */
    constructor(plugin){
        this.#_plugin = plugin
        this.#_router = new ClientRouter()
    }

    /**
     * Returns the client router
     * @type {ClientRouter}
     */
    get router(){
        return this.#_router;
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
        Server().get(`${path}/${route}`).then(response => callback(response)).catch(err => console.log(err));
    }

    /**
     * @param {String} route
     * 
     */
    post(route){
        
    }

    /**
     * @param {String} route
     * 
     */
    put(route){

    }

    /**
     * @param {String} route
     * 
     */
    delete(route){

    }

    /**
     * 
     */
    baseGet(){

    }

    /**
     * 
     */
    basePost(){

    }

    /**
     * 
     */
    baseUpdate(){
        
    }

    /**
     * 
     */
    baseDelete(){

    }
}


export {
    ClientApi
}
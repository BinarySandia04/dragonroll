const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Class for managing the backend api
 * @hideconstructor
 */
class BackendApi {
    #_plugin;
    #_router;
    
    /**
     * This object is already created for you
     * @param {plugin} Plugin instance
     */
    constructor(plugin){
        this.#_plugin = plugin;
        this.#_router = new BackendRouter(plugin.package);
    }

    /**
     * Gets the router for your plugin
     * @type {BackendRouter}
     */
    get router(){
        return this.#_router;
    }

    /**
     * Returns a new database model for the plugin
     * @param {String} name 
     * @param {Object} schema 
     * @returns {Model}
     */
    createModel(name, schema){
        return new Model(name, this.#_plugin, schema);
    }
};

/**
 * This class registers routes to the backend that can be accessed from the frontend
 * @hideconstructor
 */
class BackendRouter {
    #_root;

    constructor(path){
        this.#_root = `plugins/${path}`;
    }

    /**
     * Hola
     * @param {String} route
     */
    get(route){

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
}

/**
 * @hideconstructor
 */
class BackendModel {
    #_name;
    #_plugin;
    #_schema;

    constructor(name, plugin, schema){
        this.#_name = name;
        this.#_plugin = plugin;
        this.#_schema = schema;
    }
};



module.exports = {
    BackendApi
}
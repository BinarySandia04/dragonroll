const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Test
 */
class Router {
    constructor(){

    }

    /**
     * @param {String} route
     * Hola
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

class BackendApi {
    #_plugin;
    #_router;
    
    /**
     * This object is already created for you
     * @param {plugin} Plugin instance
     */
    constructor(plugin){
        this._plugin = plugin;
        this._router = new Router();
    }

    /**
     * Gets the router for your plugin
     * @type {Router} router
     */
    get router(){
        return this.router;
    }

    /**
     * Returns a new database model for the plguin
     * @param {String} name 
     * @param {Object} schema 
     * @returns {mongoose.model}
     */
    createModel(name, schema){
        return mongoose.model(name, new Schema(schema))
    }
};

module.exports = {
    BackendApi,
    Router
}
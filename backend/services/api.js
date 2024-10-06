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
     * @returns {BackendModel}
     * @example
     * let itemModel = Api.createModel('Item', {
     *   name: {type: String, required: true, default: "New Item"},
     *   description: {type: String}
     *   type: {type: String, required: true, default: "Misc Item"},
     *   image: { type: String }
     * });
     */
    createModel(name, schema){
        return new BackendModel(name, this.#_plugin, schema);
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

    /**
     * Creates backend REST routes for the specified model. These routes are located
     * relative to the plugin base route:
     * - `/<plugin>/<model>` (POST) - Creates the element
     * - `/<plugin>/<model>` (GET) - Gets a list with elements
     *    - `?id=<id>` return the document with that id
     *    - `?<paramName>=<paramValue>` returns all documents that match this criteria
     * - `/<plugin>/<model>` (UPDATE) - Updates a element by id
     * - `/<plugin>/<model>` (DELETE) - Deletes an element
     * @param {BackendModel} model 
     */
    createModelRoutes(model, path){

    }
}

/**
 * @hideconstructor
 */
class BackendModel {
    #_name;
    #_plugin;
    #_schema;
    #_mongoSchema;

    constructor(name, plugin, schema){
        this.#_name = name;
        this.#_plugin = plugin;
        this.#_schema = schema;
        this.#_mongoSchema = mongoose.model(`${plugin}/${name}`, new Schema(schema));
    }

    /**
     * Finds and returns a promise with the result of the query
     * @param {Object} params 
     * @returns {Promise<Object>}
     */
    find(params){
        return this.#_mongoSchema.find(params);
    }

    /**
     * Finds one element and returns a promise with the result of the query
     * @param {Object} params 
     * @returns {Promise<Object>}
     */
    findOne(params){
        return this.#_mongoSchema.findOne(params);
    }

    /**
     * Finds an element by id and returns a promise with the result of the query
     * @param {String} id 
     * @returns {Promise<Object>}
     */
    findById(id){
        return this.#_mongoSchema.findById(id);
    }

    /**
     * Creates an element given the data and returns a promise with the result of the operation
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    create(data){
        return this.#_mongoSchema.create(data);
    }

    /**
     * Updates an element given the parameters with the given data and returns a promise with the result of the operation
     * @param {Object} params
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    updateOne(params, data){
        return this.#_mongoSchema.updateOne(params, data);
    }

    /**
     * Updates elements given the parameters with the given data and returns a promise with the result of the operation
     * @param {Object} params
     * @param {Object} data 
     * @returns {Promise<Object>}
     */
    updateMany(params, data){
        return this.#_mongoSchema.updateMany(params, data);
    }
};

/**
 * @hideconstructor
 */
class BackendModelDocument {


    save(){

    }
}



module.exports = {
    BackendApi
}
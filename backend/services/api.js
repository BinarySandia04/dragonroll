const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const express = require('express');
const router = express.Router();

/**
 * Class for managing the backend api
 * @hideconstructor
 */
class BackendApi {
    #_plugin;
    #_router;
    #_expressRouter;
    
    /**
     * This object is already created for you
     * @param {plugin} Plugin instance
     */
    constructor(plugin, router){
        this.#_plugin = plugin;
        this.#_expressRouter = router;
        this.#_router = new BackendRouter(`plugin/${plugin.package}`, this.#_expressRouter);
    }

    /**
     * Gets the router for your plugin
     * @type {BackendRouter}
     */
    get router(){
        return this.#_router;
    }

    get _router(){
        return router;
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
        return new BackendModel(name, this.#_plugin.package, schema);
    }

    createModule(id){
        return new BackendModule(this.#_plugin, id, this.#_expressRouter);
    }
};

/**
 * This class registers routes to the backend that can be accessed from the frontend
 * @hideconstructor
 */
class BackendRouter {
    #_root;
    #_expressRouter

    constructor(path, expressRouter){
        this.#_root = `/${path}`;
        this.#_expressRouter = expressRouter;
    }

    /**
     * Hola
     * @param {String} route
     */
    get(route, callback){
        this.#_expressRouter.get(this.#_root + route, callback);
    }

    /**
     * @param {String} route
     * 
     */
    post(route, callback){
        this.#_expressRouter.post(this.#_root + route, callback);
    }

    /**
     * @param {String} route
     * 
     */
    put(route, callback){
        this.#_expressRouter.put(this.#_root + route, callback);
    }

    /**
     * @param {String} route
     * 
     */
    delete(route, callback){
        this.#_expressRouter.delete(this.#_root + route, callback);
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

class BackendModule {
    #_plugin;
    #_id;
    #_router;
    
    constructor(plugin, id, expressRouter){
        this.#_plugin = plugin;
        this.#_id = id;
        this.#_router = new BackendRouter(`module/${plugin.package}/${id}`, expressRouter)
    }

    get router(){
        return this.#_router;
    }

    // Creates a model for the Module
    createModel(name, schema){
        return new BackendModel(name, `${this.#_plugin.package}/${this.#_id}`, schema);
    }
}

/**
 * @hideconstructor
 */
class BackendModel {
    #_name;
    #_prefix;
    #_schema;
    
    #_mongoSchema;

    constructor(name, prefix, schema){
        this.#_name = name;
        this.#_prefix = prefix;
        this.#_schema = ParseSchema(schema);
        this.#_mongoSchema = mongoose.model(`${prefix}/${name}`, new Schema(schema));
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

function ParseSchema(schema){
    const typeTable = {
        String: String,
        Object: Object,
        ObjectId: mongoose.Types.ObjectId,
        Boolean: Boolean,
        Date: Date,
    };
    
    let newSchema = structuredClone(schema);

    // Codi molt guai
    for(const key in newSchema){
        if(Array.isArray(newSchema[key].type))
            newSchema[key][0].type = [ typeTable[newSchema[key][0].type] ];
        else
            newSchema[key].type = typeTable[newSchema[key].type];
    }
    return newSchema;
}

module.exports = {
    BackendApi
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const express = require('express');
const { getIo } = require('../io/socket');

/**
 * Class for managing the backend api
 * @hideconstructor
 */
class BackendApi {
    #_plugin;
    #_router;
    #_expressRouter;
    #_internalSocket;
    #_socket;
    
    /**
     * This object is already created for you
     * @param {plugin} Plugin instance
     */
    constructor(plugin, router, internalSocket){
        this.#_plugin = plugin;
        this.#_expressRouter = router;
        this.#_internalSocket = internalSocket;
        this.#_socket = new BackendSocket(`plugins/${plugin.package}`, internalSocket);
        this.#_router = new BackendRouter(`${plugin.package}`, this.#_expressRouter);
    }

    /**
     * Gets the router for your plugin
     * @type {BackendRouter}
     */
    get router(){
        return this.#_router;
    }

    get socket(){
        return this.#_socket;
    }

    get _socket(){
        return internalSocket;
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
    createModel(name, schema, parentModels = undefined){
        return new BackendModel(name, this.#_plugin.package, schema, parentModels);
    }

    createModule(id){
        return new BackendModule(this.#_plugin, id, this.#_expressRouter, this.#_internalSocket);
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
}

class BackendModule {
    #_plugin;
    #_id;
    #_router;
    #_socket;
    #_internalSocket;
    
    constructor(plugin, id, expressRouter, internalSocket){
        this.#_plugin = plugin;
        this.#_id = id;
        this.#_internalSocket = internalSocket;
        this.#_router = new BackendRouter(`${plugin.package}/_module/${id}`, expressRouter)
        this.#_socket = new BackendSocket(`plugins/${plugin.package}/${id}`, this.#_internalSocket);
    }

    get router(){
        return this.#_router;
    }

    get socket(){
        return this.#_socket;
    }

    // Creates a model for the Module
    // it also includes the campaign id for later on
    createModel(name, schema, parentModels = undefined){
        return new BackendModel(name, `${this.#_plugin.package}/${this.#_id}`, {...{
            campaign: { type: "ObjectId", ref: "Campaign"}
        }, ...schema}, parentModels);
    }

    // scope => ['campaign'] 
    // coses que es necessiten verificar a tots els models
    // i s'agafa de req.query
    createModelRoutes(model, scope = []){
        this.router.get(`/${model.name}/list`, (req, res) => {
            let query = {}
            scope.forEach(k => query[k] = req.query[k]);
            model.find(query).select('-data').lean().then(data => {
                res.json({status: 'ok', data});
            });
        });

        this.router.get(`/${model.name}/get`, (req, res) => {
            let query = {}
            scope.forEach(k => query[k] = req.query[k]);
            query['_id'] = req.query.id;
            model.findOne(query).lean().then(data => {
                res.json({status: 'ok', data});
            })
        });

        this.router.post(`/${model.name}/create`, (req, res) => {
            let query = {}
            scope.forEach(k => query[k] = req.query[k]);
            model.create({...query, ...req.body.data}).then(data => {
                this.socket.emit(query['campaign'], `update-${model.name}`);
                res.json({status: "ok", data});
            });
        });

        this.router.put(`/${model.name}/update`, (req, res) => {
            let query = {}
            scope.forEach(k => query[k] = req.query[k]);
            query['_id'] = req.query.id;
            model.findOneAndUpdate(query, req.body.data).then(data => {
                if(req.query.fireUpdate) this.socket.emit(query['campaign'], `update-${model.name}-all`);
                this.socket.emit(query['campaign'], `update-${model.name}`, req.query.id);
                res.json({status: 'ok'});
            })
        });

        this.router.delete(`/${model.name}/destroy`, (req, res) => {
            let query = {}
            scope.forEach(k => query[k] = req.query[k]);
            query['_id'] = req.query.id;
            model.deleteOne(query).then(data => {
                if(req.query.fireUpdate) this.socket.emit(query['campaign'], `update-${model.name}-all`);
                this.socket.emit(query['campaign'], `update-${model.name}`, req.query.id);
                res.json({status: 'ok'});
            });
        });
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

    constructor(name, prefix, schema, parentModels){
        this.#_name = name;
        this.#_prefix = prefix;
        this.#_schema = ParseSchema(schema);
        if(parentModels === undefined) {
            this.#_mongoSchema = mongoose.model(`${prefix}/${name}`, new Schema(schema));
        } else {
            parentModels.mongoSchema.discriminator(`${prefix}/${name}`, new Schema(schema));
            this.#_mongoSchema = mongoose.model(`${prefix}/${name}`);
        }
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

    findOneAndUpdate(findParams, updateParams){
        return this.#_mongoSchema.findOneAndUpdate(findParams, updateParams);
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

    deleteOne(params){
        return this.#_mongoSchema.deleteOne(params);
    }

    get name(){
        return this.#_name;
    }

    get mongoSchema() {
        return this.#_mongoSchema;
    }
};

class BackendSocket {
    #_prefix;
    #_internalSocket;

    constructor(prefix, internalSocket){
        this.#_prefix = prefix;
        this.#_internalSocket = internalSocket;
    }

    on(msg, callback){
        this.#_internalSocket[`${this.#_prefix}/${msg}`] = callback;
    }

    emit(campaign, msg, data = {}){
        console.log('\x1b[35m%s\x1b[0m', "EMIT " + `${this.#_prefix}/${msg}` + " IN " + campaign);
        getIo().in(campaign).emit(`${this.#_prefix}/${msg}`, data);
    }
}

function ParseSchema(schema){
    const typeTable = {
        String: String,
        Object: Object,
        ObjectId: mongoose.Types.ObjectId,
        Boolean: Boolean,
        Date: Date,
        Number: Number
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
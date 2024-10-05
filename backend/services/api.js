const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class BackendApi {
    /**
     * Plugin
     * @param {plugin} Plugin instance
     */
    constructor(plugin){
        this.plugin = plugin;
    }

    createRoute(){

    }

    createModel(name, schema){
        return mongoose.model(name, new Schema(schema))
    }
};

module.exports = {
    BackendApi
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatagenCollectionSchema = new Schema({
    name: {type: String, required: true },
    id: { type: String, required: true },
    module: { type: String, required: true},
    package: { type: String, required: true },
    icon: {type: String},
    desc: { type: String },
    entries: [ {type: mongoose.Types.ObjectId, ref: "DatagenEntry"} ],
});

module.exports = mongoose.model('DatagenCollection', DatagenCollectionSchema);
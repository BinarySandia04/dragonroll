const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DatagenEntrySchema = new Schema({
    id: {type: String, required: true},
    schema: { type: String, required: true},
    data: { type: Object },
    datagen_collection: {type: mongoose.Types.ObjectId, ref: "DatagenCollection"},
});

module.exports = mongoose.model('DatagenEntry', DatagenEntrySchema);
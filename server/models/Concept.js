const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConceptSchema = new Schema({
    name: {type: String, required: true},
    system: {type: String, required: true},
    type: { type: String },
    data: { type: Object },
});

module.exports = mongoose.model('Concept', ConceptSchema);
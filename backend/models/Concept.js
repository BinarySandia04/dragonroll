const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConceptSchema = new Schema({
    name: {type: String, required: true, default: "New Concept"},
    type: { type: String, required: true, default: "Concept" },
    info: { type: Object }, // For preview only
    data: { type: Object }, // Advanced item
    book: {type: mongoose.Types.ObjectId, ref: "Book"},
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
});

module.exports = mongoose.model('Concept', ConceptSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConceptSchema = new Schema({
    name: {type: String, required: true},
    system: {type: String, required: true},
    type: { type: String },
    data: { type: Object },
    book: {type: mongoose.Types.ObjectId, ref: "Book"},
    campaign: {type: mongoose.Types.ObjectId, ref: "Campaign"},
});

module.exports = mongoose.model('Concept', ConceptSchema);
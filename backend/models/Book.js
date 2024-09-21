const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {type: String, required: true},
    authors: { type: [String] },
    description: { type: String },
    system: {type: String, required: true},
    image: { type: String },
    contents: [ {type: mongoose.Types.ObjectId, ref: "Concept"} ],
});

module.exports = mongoose.model('Book', BookSchema);
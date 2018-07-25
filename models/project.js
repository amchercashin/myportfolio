const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    mdBody: String,
    htmlBody: String,
    type: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);
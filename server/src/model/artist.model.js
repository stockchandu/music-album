const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    artistProfile: { type: String },

}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("artist-data", artistSchema);
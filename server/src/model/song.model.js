const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
    songName: { type: String, required: true },
    musicURL: { type: String, required: true },
    duration: { type: String, required: true },
    musicPoster: { type: String, required: true },
    albumName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album-data", 
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("song-data", songSchema);
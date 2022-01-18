const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
    albumName: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    albumPoster: { type: String},
    artistName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "artist-data"
    },
    songName: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "song-data"
    }]
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model("album-data", albumSchema);
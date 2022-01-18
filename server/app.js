const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/config.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./src/config/db.config");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 2530;

app.use("/", require("./src/controller/song.controller"));
app.use("/", require("./src/controller/album.controller"));
app.use("/", require("./src/controller/artist.controller"));

app.listen(PORT, async () => {
    await connect();
    console.log(`Port is listening on ${PORT}`)
})
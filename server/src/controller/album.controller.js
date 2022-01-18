const router = require("express").Router();
const Album = require("../model/album.model");
const authentication = require("../middleware/authentication");

//get all album for guest user
router.get("/guest_all_album", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 4;
        const offset = (page - 1) * size;
        const guestAllAlbum = await Album
            .find({})
            .skip(offset)
            .limit(size)
            .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
            .populate({ path: "songName", select: ["songName", "musicURL", "duration", "musicPoster"] })
            .lean()
            .exec()
        //count all the documents then divide by size eg.10 / 8 ,ceil value is 2 (total page)
        const totalDocuments = await Album.find().countDocuments();
        const totalPage = Math.ceil(totalDocuments / size);
        return res.status(200).send({ guestAllAlbum, totalPage });
    } catch (error) {
        return res.status(400).send(error);
    }

})

//filter all album for guest user
router.get("/guest_all_album/filter", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;
        const genre = req.query.genre;
        const year = req.query.year;
        const albumName = req.query.albumname;
    
        if (genre) {
            const guestAlbumGenre = await Album
                .find({ genre: genre })
                .skip(offset)
                .limit(size)
                .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
                .lean()
                .exec()
            const totalGenreDocuments = await Album
                .find({ genre: genre })
                .countDocuments();
            const totalPage = Math.ceil(totalGenreDocuments / size);
            return res.status(200).send({ guestAlbumGenre, totalPage });
        }
        else if (year) {
            const guestAlbumYear = await Album
                .find({ year: year })
                .skip(offset)
                .limit(size)
                .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
                .lean()
                .exec()
            const totalYearDocuments = await Album
                .find({ year: year })
                .countDocuments();
            const totalPage = Math.ceil(totalYearDocuments / size);
            return res.status(200).send({ guestAlbumYear, totalPage });
        }
        else if (albumName) {
            const guestAlbumName = await Album
                .find({ albumName: albumName })
                .skip(offset)
                .limit(size)
                .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
                .lean()
                .exec()
            const totalAlbumNameDocuments = await Album
                .find({ albumName: albumName })
                .countDocuments();
            const totalPage = Math.ceil(totalAlbumNameDocuments / size);
            return res.status(200).send({ guestAlbumName, totalPage });
        }

        else if (genre && year ) {
            const guestFindGYA = await Album
                .find({ $and: [{ genre: { $eq: genre } }, { year: { $eq: year }  }] })
                .skip(offset)
                .limit(size)
                .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
                .lean()
                .exec()
            const totalGenYeAlbDocuments = await Album
                .find({ $and: [{ genre: { $eq: genre } }, { year: { $eq: year } }] })
                .countDocuments();
            const totalPage = Math.ceil(totalGenYeAlbDocuments / size);
            return res.status(200).send({ guestFindGYA, totalPage });
        }

        else {
            const guestAllAlbum = await Album
                .find({})
                .skip(offset)
                .limit(size)
                .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
                .lean()
                .exec()
            //count all the documents then divide by size eg.10 / 8 ,ceil value is 2 (total page)
            const totalDocuments = await Album.find().countDocuments();
            const totalPage = Math.ceil(totalDocuments / size);
            return res.status(200).send({ guestAllAlbum, totalPage });
        }
    } catch (error) {
        return res.status(400).send(error);
    }

})

//find all song by album id 
router.get("/get_all_music/:id", async (req, res) => {
    try {
        const AllMusicByAlbumId = await Album
            .findById({ _id: req.params.id })
            .populate({ path: "artistName", select: ["firstName", "lastName", "artistProfile"] })
            .populate({ path: "songName", select: ["songName", "musicURL", "duration"] })
            .lean()
            .exec()
        return res.status(200).send({ AllMusicByAlbumId });
    } catch (error) {
        return res.status(400).send({ error });
    }
})

//create new post for artist 
router.post("/create_album", async (req, res) => {

    try {
        const { albumName, genre, year, albumPoster, artistName } = req.body;
        const createNewAlbum = new Album({
            albumName, genre, year, albumPoster,artistName
        });
        createNewAlbum.save();
        return res.status(201).send(createNewAlbum);
    }
    catch (error) {
        return res.status(400).send(error);
    }

})

//get album for artist
router.get("/all_album/:artist_id", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 5;
        const offset = (page - 1) * size;

        const all_album = await Album
            .find({ artistName: { _id: req.params.artist_id } })
            .populate({ path: "artistName", select: ["firstName", "lastName", "email"] })
            .lean()
            .exec()
        // const totalDocuments = await Contest.find().countDocuments();
        // const totalPage = Math.ceil(totalDocuments / size);
        return res.status(200).send({ all_album });

    } catch (error) {
        return res.status(400).send(error);
    }

})

//album delete by id
router.delete("/all_album_delete/:album_id", authentication, async (req, res) => {
    try {

        const findArtist = await Album
            .findByIdAndDelete({ _id: req.params.album_id })

        return res.status(200).send({ findArtist });


    } catch (error) {
        if (error)
            return res.status(400).send(error);
    }

})

//sort items for artist by artist id
router.get("/artist_all_album/:artist_id/sort",authentication, async (req, res) => {
    try {
        const year = req.query.year;
        let findArtist = await Album
            .find({ artistName: { _id: req.params.artist_id } })
        if (year === "ascending_order") {
            const albumYearAscending = findArtist.sort((a, b) => { return a.year - b.year })
            return res.status(200).send({ albumYearAscending });
        }

        else if (year === "descending_order") {
            const albumYearDescending = findArtist.sort((a, b) => { return b.year - a.year })
            return res.status(200).send({ albumYearDescending });
        }


    } catch (error) {
        return res.status(400).send(error);
    }

})
module.exports = router;
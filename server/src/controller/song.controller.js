const router = require("express").Router();
const Song = require("../model/song.model");

//create new users
//url - http://localhost:2345/create_new_song
router.post("/create_new_song", async (req, res) => {

    try {

        const createNewSong = await Song.create(req.body);
        // const { title, deadline, type, tags, time, author } = req.body;
        // const createContest = new Contest({
        //     title, deadline, type, tags, time, author
        // });
        // createContest.save();
        return res.status(201).send(createNewSong);
        // let { name, city, age, education, gender, contact } = req.body;
        // const userStudent = new Student({
        //     name, city, age, education, gender, contact
        // })

        // userStudent.save();
        // return res.status(200).send(userStudent)
    } catch (error) {
        return res.status(400).send({ error });
    }
})

//get all song 
router.get("/get_all_music", async (req, res) => {
    try {
        const age = req.query.age
        const name = req.query.name
        const AllMusic = await Song.find({}).lean().exec()
        return res.status(200).send({ AllMusic });
    } catch (error) {
        return res.status(400).send({ error });
    }
})



//sort student by name 
router.get("/studentlist/filter", async (req, res) => {
    try {
        const age = req.query.age
        const name = req.query.name


        if (age === "ascending_order") {
            const StudentAgeAscending = await Student
                .aggregate(
                    [
                        { $sort: { age: 1 } }
                    ]
                )
            return res.status(200).send({ StudentAgeAscending });
        }

        else if (age === "descending_order") {
            const StudentAgeDescending = await Student
                .aggregate(
                    [
                        { $sort: { age: -1 } }
                    ]
                )
            return res.status(200).send({ StudentAgeDescending });
        }

        else if (name === "descending_order") {
            const StudentNameDescending = await Student
                .aggregate(
                    [
                        { $sort: { name: -1 } }
                    ]
                )
            return res.status(200).send({ StudentNameDescending });
        }

        else if (name === "ascending_order") {
            const StudentNameAscending = await Student
                .aggregate(
                    [
                        { $sort: { name: 1 } }
                    ]
                )
            return res.status(200).send({ StudentNameAscending });
        }

    } catch (error) {
        return res.status(400).send({ error });
    }
})


module.exports = router;
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Artist = require("../model/artist.model");
const SECRET = "chandankumarmallickchandankumarmallick";
//generate token function
const newToken = (user) => {
    return jwt.sign({ user },SECRET)
}

//register new artist router
router.post("/artist_register", async (req, res) => {
    let userArtist, token;
    try {
        //check the email if already register or not .
        userArtist = await Artist.findOne({ email: req.body.email });
        //if already registered then throws an error
        if (userArtist) {
            //means if its true,then send error message
            return res.status(400).send("Email already registred ,please login")
        }
        //else its false or not registered then register and send token 
        else {
            let { firstName, lastName, email, password } = req.body;
            userArtist = new Artist({
                firstName, lastName, email, password
            })

            userArtist.save();
            //it will create a token 
            token = newToken(userArtist);
            //return success status 
            return res.status(201).send({ userArtist, token });
        }

    } catch (error) {
        //if any error occured 
        return res.status(501).send({ error });
    }
})


//login existed artist router
router.post("/artist_login", async (req, res) => {
    let userArtist, token;
    try {
        //check if artist registered or not 
        userArtist = await Artist.findOne({ email: req.body.email });
        checkPassword = userArtist.password;
        //if artist is not registered then
        if (!userArtist) {
            //means if its false,then send error message;
            return res.status(400).send("wrong admin details");
        }
        else if (req.body.password !== checkPassword) {
            //and check input password with database
            return res.status(400).send("wrong admin details");
        }
        //else everything is good  email is already registered and password is matched  then send token 
        token = newToken(userArtist);
        //return success status 
        return res.status(201).send({ userArtist, token });
    } catch (error) {
        //if any error occured 
        return res.status(501).send({ error });
    }
})

// //update artist
// router.patch("/admin_update/:id", async (req, res) => {
//     let userAdmin;
//     try {
//         let { firstname, lastname, email, password, profile_img } = req.body;
//         console.log(profile_img)
//         userAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body
//             , { new: true })
//         return res.status(200).send({ userAdmin })
//     }
//     catch (error) {
//         return res.status(400).send({ error: "issue with login", status: 400 });
//     }
// })


module.exports = router;
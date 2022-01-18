const SECRET = "chandankumarmallickchandankumarmallick";
const jwt = require("jsonwebtoken");

function verifyToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, SECRET, function (err, user) {
            if (err) return reject(err)
            return resolve(user)
        })
    })
}

async function authentication(req, res, next) {
    const bearerToken = req.headers.authorization
    // console.log(bearerToken)
    // if (!bearerToken || !bearerToken.startsWith("Bearer")) return res.status("please check your token");
    const token = bearerToken.split(" ")[1];

    try {
        const {user} = await verifyToken(token);
        // console.log(request)
        req.user = user
        return next()
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

}


module.exports = authentication
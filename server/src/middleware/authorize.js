function authorize(access) {
    return (req, res, next) => {
        const user = req.user;
        let allowed = false
        access.forEach(ele => {
            if (ele === user.roles) {
                allowed = true
            }
        })
        if (!allowed) return res.status(401).send("you are unauthorized");

        return next()
    }
}
module.exports = authorize
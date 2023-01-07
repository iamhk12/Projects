const jwt = require("jsonwebtoken")
const user = require("../models/UserSchema")

const authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.jwttoken;
        const veryifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await user.findOne({_id:veryifyToken._id, "tokens.token":token})
        if(!rootUser){
            throw new Error("User not found")
        }

        req.token = token;
        req.rootUser = rootUser
        req.UserID = rootUser._id

        next();
    }
    catch (err) {
        console.log(err)
        res.status(401).send({error : "Unauthorized"})
    }
}

module.exports = authenticate
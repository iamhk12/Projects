const express = require("express")
const router = express.Router()
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("../middleware/authenticate")
const cookieParser = require('cookie-parser')


require("../models/UserSchema")

const User = require("../models/UserSchema")
router.use(cookieParser())



//Register
router.post('/registernew', (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all information to continue" })
    }
    else if (password !== cpassword) {
        return res.status(422).json({ error: "Password and cpassword are not same." })
    }
    const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword })
    // console.log(user)

    //Hashing/Securing the password


    const SavingDistUser = (user) => {
        User.findOne({ email: email }, (err, docs) => {
            if (docs === null) {
                user.save().then(() => {
                    console.log("registered new user")
                    res.json({ message: "Registered user successfully" })
                }).catch((err) => {
                    console.log(err)
                    res.status(422).json({ error: "Failed to register" })
                })
            }
            else { //Email exists
                console.log("Already registered")
                res.status(421).json({ error: "Email already exists" })
            }
        })
    }

    SavingDistUser(user);
})

//Handing login 
router.post('/loginuser', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Enter all information" })
        }


        User.findOne({ email: email }, (err, docs) => {

            let token;

            if (docs) {
                // email exists, now check the password
                bcryptjs.compare(password, docs.password, async (err, data) => {
                    //if error
                    if (err) console.log(err)

                    if (data) {
                        token = await docs.generateAuthToken()
                        res.cookie("jwttoken", token, {
                            expires: new Date(Date.now() + 86400000),
                            httpOnly: true
                        })

                        return res.status(200).json({ message: "User login successful." })
                    }
                    else {
                        return res.status(421).json({ error: "Invalid password" })
                    }
                })

            }
            else {
                return res.status(401).json({ error: "User does not exist." })

            }
        })
    }
    catch (err) {
        console.log(err);
    }

})

router.get('/myprofile', authenticate, (req, res) => {
    console.log("myprofile");
    res.send(req.rootUser)
    console.log(req.rootUser.name)
})

router.get('/getdata', authenticate, (req, res) => {
    console.log("Getting data");
    res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {

    try {

        const { name, email, message } = req.body

        if (!name || !email || !message) {
            return res.status(400).json({ error: "Please fill contact form" })
        }

        const userContact = await User.findOne({ _id: req.UserID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);

            await userContact.save()

            res.status(201).json({message : "Contact successful"})
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.get('/logout', (req, res) => {
    console.log("Logout page");
    res.clearCookie("jwttoken", {path:'/'})
    res.status(200).send("logged out")
})


module.exports = router;
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    work: { type: String, required: true },
    password: { type: String, required: true },
    cpassword: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: { type: String, required: true },
            email: { type: String, required: true },
            message: { type: String }
        }
    ],
    tokens: [
        {
            token:
            {
                type: String, required: true
            }
        }]
})




//middleware
//hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcryptjs.hashSync(this.password, 12)
        this.cpassword = bcryptjs.hashSync(this.cpassword, 12)
    }
    next();
})

// We are generating Token

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ "_id": this._id }, process.env.SECRET_KEY)   //payloaddata, secretkey
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    }
    catch (err) {
        console.log(err)
    }
}

//message storing code

userSchema.methods.addMessage = async function (name, email, message) {

    try {
        this.messages = this.messages.concat({ name, email, message })
        await this.save()
        return this.messages
    }
    catch (err) {
        console.log(err)
    }
}

const User = mongoose.model("user", userSchema);
module.exports = User;
// {
    //     name:    "Himanshu Kothari"
    //     email: "hkothari247@gmail.com"
    //     phone: 8779035327
    //     work: "Developer"
    //     password: "iamhk12"
    //     cpassword: "iamhk12"
    // }
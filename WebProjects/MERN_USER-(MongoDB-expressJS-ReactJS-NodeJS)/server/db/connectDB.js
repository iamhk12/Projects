const mongoose = require("mongoose")
const db = process.env.DATABASE;


mongoose.set("strictQuery", true)
mongoose.connect(db).then(() => { console.log("Connection successful") }).catch((err) => { if (err) console.log(err) })


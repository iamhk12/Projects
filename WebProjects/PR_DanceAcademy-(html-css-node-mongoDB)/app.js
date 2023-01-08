//Include

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 80;
const bodyparser = require('body-parser')


//Setting up app directories
app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('index.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
})

app.listen(port, () => {
    console.log("Listening at port ", port)
})


// DATABASE
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/dancewebsite');

    //   use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

})

var contact = mongoose.model('contact', contactschema);

app.post('/contact', (req, res) => {

    var data = new contact(req.body);
    data.save().then(res.send("This item has been saved in database")).catch(res.status(400).send("This item was not has been saved in databas"))
})
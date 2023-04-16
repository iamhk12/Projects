const http = require("http");
const fs = require("fs");
const requests = require("requests")
const port = process.env.PORT || 5000
const app = require("express")();

const HOME = fs.readFileSync("index.html", "utf-8");   //homepage
// console.log(HOME);
// const replaceVal = (htmlfile, org)=>{
//     var htmldata = htmlfile.replace("{%tempval%}",org.main.temp);
//     htmldata = htmlfile.replace("{%tempMin%}", org.main.temp_min);
//     htmldata = htmlfile.replace("{%tempMax%}",org.main.temp_max);
//     htmldata = htmlfile.replace("{%location%}",org.name)
//     htmldata = htmlfile.replace("{%country%}",org.sys.country)

//     return htmldata;
// };


const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Navi Mumbai&appid=8fc9e91887085dfdc191aa0f55d864bd")
            .on('data', (chunk) => {
                const objData = JSON.parse(chunk);
                const arrData = [objData];
                // console.log(dataArray[0].main.temp);
                // const realTimeData = dataArray.map((val) =>  replaceVal(HOME, val)  ).join("");
                realTimeData = HOME.replace("{%tempval%}", (arrData[0].main.temp - 273).toFixed(2)).replace("{%tempMin%}", (arrData[0].main.temp_min - 273).toFixed(2)).replace("{%tempMax%}", (arrData[0].main.temp_max - 273).toFixed(2)).replace("{%location%}", arrData[0].name).replace("{%country%}", arrData[0].sys.country).replace("{%tempstat%}", arrData[0].weather[0].main);
                // console.log(realTimeData)
                res.write(realTimeData)
            })
            .on('end', (err) => {
                if (err) return console.log("Connection closed due to errors ", err);
                res.end();
            })
    }
});


app.listen(port, () => {
    console.log("listening at port ",port);
})

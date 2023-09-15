var express= require("express");
var https= require("https");
const bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){
    console.log("server is running")
})

app.get("/" ,function(req,res){
    res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){
    // console.log(req.body.CityName);
    const city=req.body.CityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=28c1661263dc802ac0e5b9d605fb24bd&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            // This will execute every time the response emits a 'data' event
           const val= JSON.parse(data);
           const weath=val.weather[0].description
           const temp =val.main.temp;
           const icon=val.weather[0].icon;
           const ImageUrl= "https://openweathermap.org/img/wn/"+icon+"@2x.png"
           res.write("<h1>Today's weather is "+weath+"</h1>");
           res.write("<h1>Temperature at "+city+" "+temp+"</h1>");
           res.write("<img src="+ImageUrl+">");

        })
    })
})



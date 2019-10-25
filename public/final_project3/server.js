//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Killer = require("./modules/Killer.js");
var Mard = require("./modules/Mard.js");
var Predator = require("./modules/Predator.js");
var Prkich = require("./modules/Prkich.js");
let random = require('./modules/random');
//! Requiring modules  --  END

grassArr = [];
grassEaterArr = [];
killerArr = [];
mardArr = [];
predatorArr = [];
prkichArr = [];
matrix = [];


// statistics start
grassHashiv = 0;
grassEaterHashiv = 0;
killerHashiv = 0;
mardHashiv = 0;
predatorHashiv = 0;
prkichHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grassEater, killer, mard, predator,prkich) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < killer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < mard; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    
    for (let i = 0; i < prkich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    
}
matrixGenerator(20, 300, 20, 20, 20, 20,3);



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {

    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++
            }
            else if (matrix[y][x] == 5) {
                var killer = new Killer(x, y);
                killerArr.push(killer);
                killerHashiv++
            }
            else if (matrix[y][x] == 4) {
                var mard = new Mard(x, y);
                mardArr.push(mard);
                mardHashiv++
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            }
            else if (matrix[y][x] == 6) {
                var prkich = new Prkich(x, y);
                prkichArr.push(prkich);
                prkichHashiv++;
            }
        }
    }

} 

creatingObjects();
let exanak = 0
function game() {
    exanak++;
    if (exanak <= 10){
        weather = "Գարուն"
        
    }else if (exanak <= 20){
        weather = "Ամառ"
    }else if (exanak <= 30){
        weather = "Աշուն"
    }
    else if (exanak <= 40){
        weather = "Ձմեռ"
    }else if (exanak > 40){
       exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }

    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
            
        }
    }
    if (mardArr[0] !== undefined) {
        for (var i in mardArr) {
            mardArr[i].eat();
            
        }
    }
    
    if (killerArr[0] !== undefined) {
        for (var i in killerArr) {
            killerArr[i].eat();
        }
    }    
     if (prkichArr[0] !== undefined) {
        for (var i in prkichArr) {
            prkichArr[i].eat();
        }
        
    }
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grassEaterCounter: grassEaterHashiv,
        grassEaterLiveCounter: grassEaterArr.length,
        killerCounter: killerHashiv,
        killerLiveCounter: killerArr.length,
        mardCounter: mardHashiv,
        mardLiveCounter: mardArr.length,
        predatorCounter: predatorHashiv,
        predatorLiveCounter: predatorArr.length,
        prkich: prkichHashiv,
        prkichLive: prkichArr.length,
        weather: weather,
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);


}

setInterval(game, 1000)
 





  
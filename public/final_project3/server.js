//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Killer = require("./modules/Killer.js");
var Mard = require("./modules/Mard.js");
var Predator = require("./modules/Predator.js");
let random = require('./modules/random');
//! Requiring modules  --  END

grassArr = [];
grassEaterArr = [];
killerArr = [];
mardArr = [];
predatorArr = [];
matrix = [];


// statistics start
grassHashiv = 0;
grassEaterHashiv = 0;
killerHashiv = 0;
mardHashiv = 0;
predatorHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grassEater, killer, mard, predator) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
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
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < mard; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 25, 20, 15, 10, 2);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
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
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++
            }
            else if (matrix[y][x] == 3) {
                var killer = new Killer(x, y);
                killerArr.push(killer);
                killerHashiv++
            }
            else if (matrix[y][x] == 4) {
                var mard = new Mard(x, y);
                mardArr.push(mard);
                mardHashiv++
            }
            else if (matrix[y][x] == 5) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            }
        }
    }

}

creatingObjects();
let exanak = 0
function game() {
    exanak++;
    if (exanak <= 10){
        weather = "summer"
    }else if (exanak <= 20){
        weather = "autumn"
    }else if (exanak > 20){
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
    if (killerArr[0] !== undefined) {
        for (var i in killerArr) {
            killerArr[i].eat();
        }
    }
    if (mardArr[0] !== undefined) {
        for (var i in mardArr) {
            mardArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grassEaterCounter: grassEaterHashiv,
        killerCounter: killerHashiv,
        mardCounter: mardHashiv,
        predatorCounter: predatorHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)
 
 


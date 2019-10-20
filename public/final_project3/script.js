
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let killerCountElement = document.getElementById('killerCount');
    let mardCountElement = document.getElementById('mardCount');
    let predatorCountElement = document.getElementById('predatorCount');

    //! adding socket listener on "data" <-- nnpm noame, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassCounter;
        killerCountElement.innerText = data.grassCounter;
        mardCountElement.innerText = data.grassCounter;
        predatorCountElement.innerText = data.grassCounter;
            //! Every time it creates new Canvas woth new matrix size
    createCanvas(matrix[0].length * side, matrix.length * side);
            //! clearing background by setting it to new grey color

    background('#acacac');



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("orange");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(y * side, x * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(y * side, x * side, side, side);
            }
        }
        
    } 
}
}

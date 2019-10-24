var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCellspredator0 = this.chooseCell(2);
        let newCell = random(emptyCellspredator0);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];
            predatorHashiv++;
            // matrixi mej gru mem 3 -> 
            matrix[y][x] = 3;


            let predator = new Predator(x, y);
            predatorArr.push(predator);



            this.energy = 50;
        }
    }
    eat() {
        let emptyCellspredator = this.chooseCell(2);
        let newCell = random(emptyCellspredator);

        if (newCell) {
            this.energy++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.energy >= 4) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy--;


        let emptyCellsmove5 = this.chooseCell(0);
        let emptyCellsmove6 = this.chooseCell(1);
        let newCell1 = random(emptyCellsmove6);
        let newCell = random(emptyCellsmove5);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];


            // matrixi mej gru mem MEK -> 3
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }

        if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];


            // matrixi mej gru mem MEK -> 3
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 1;

            this.y = y;
            this.x = x;
        }
        
        if (this.energy < 0) {
            this.die();
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }


        }


    }

}

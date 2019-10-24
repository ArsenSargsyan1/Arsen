var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Prkich extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
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
        let emptyCells0 = this.chooseCell(5);
        let newCell = random(emptyCells0);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];
            prkichHashiv++;
            // matrixi mej gru mem MEK -> 
            matrix[y][x] = 6;

            let prkich = new Prkich(x, y);
            prkichrArr.push(prkich);



            this.life = 10;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(5);
        let newCell = random(emptyCells);

        if (newCell) {
            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            this.x = x;
            this.y = y;

            if (this.life >= 20) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.life--;


        let emptyCells1 = this.chooseCell(0);
        let newCell = random(emptyCells1);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 1
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in prkichArr) {
            if (prkichArr[i].x == this.x && prkichArr[i].y == this.y) {
                prkichArr.splice(i, 1)
            }


        }


    }

}
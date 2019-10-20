var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Mard extends LiveForm {
    constructor(x, y) {
       super(x,y);
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCellsmul = this.chooseCell(2, 3);
        let newCell = random(emptyCellsmul);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 
            matrix[y][x] = 4;


            let mard = new Mard(x, y);
            mardArr.push(mard);



            this.live = 40;
        }
    }
    eat() {
        let emptyCellsmard5 = this.chooseCell(2, 3);
        let newCell = random(emptyCellsmard5);



        if (newCell) {
            this.live++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }


            this.x = x;
            this.y = y;

            if (this.live >= 4) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.live--;


        let emptyCellsmard5 = this.chooseCell(0);
        let emptyCellsmard6 = this.chooseCell(1)
        let newCell = random(emptyCellsmard5);
        let newCell1 = random(emptyCellsmard6);


        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 1\
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
        }
        if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];

            // matrixi mej gru mem MEK -> 1\
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 1;
                this.y = y;
                this.x = x;
        }
        
        if (this.live < 0) {
            this.die();
        }
        if (this.live < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in mardArr) {
            if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
                mardArr.splice(i, 1)
            }


        }


    }

}


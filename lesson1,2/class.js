class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 100;
        this.multiply = 0;
        this.directions = [];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply > 15) {

            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 1
            matrix[y][x] = 1;

            // sarqum em OBJ lscnum grassArr-i mej 
            let grass = new Grass(x, y);
            grassArr.push(grass);


            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.life = 10;
        this.directions = [
        ];
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCells0 = this.chooseCell(0);
        let newCell = random(emptyCells0);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 
            matrix[y][x] = 2;

            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);



            this.life = 10;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);

        if (newCell) {
            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
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
            matrix[y][x] = 2;
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

        for (let i in grassEaterArr) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }


        }


    }

}

class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 50;
        this.directions = [
        ]
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCellspredator0 = this.chooseCell(2);
        let newCell = random(emptyCellspredator0);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

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

class Mard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.live = 60;
        this.directions = [
        ]
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
    chooseCell(character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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


class Killer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.kyanq = 40;
        this.directions = [
        ]
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
            [this.x - 3, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 3, this.y + 3]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCellsmulkiller = this.chooseCell(4);
        let newCell = random(emptyCellsmulkiller);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            // matrixi mej gru mem MEK -> 
            matrix[y][x] = 5;


            let killer = new Killer(x, y);
            killerArr.push(killer);



            this.kyanq = 40;
        }
    }
    eat() {
        let emptyCellskiller1 = this.chooseCell(4);
        let emptyCellskiller2 = this.chooseCell(3);
        let newCell = random(emptyCellskiller1);
        let newCell1 = random(emptyCellskiller2);

        if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }


            this.x = x;
            this.y = y;
        }

        if (newCell) {
            this.kyanq++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            for (let i in mardArr) {
                if (mardArr[i].x == x && mardArr[i].y == y) {
                    mardArr.splice(i, 1)
                }
            }


            this.x = x;
            this.y = y;

            if (this.kyanq >= 5) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.kyanq--;


        let emptyCellskiller5 = this.chooseCell(0);
        let emptyCellskiller6 = this.chooseCell(1);
        let newCell = random(emptyCellskiller5);
        let newCell1 = random(emptyCellskiller6);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];


            // matrixi mej gru mem MEK -> 3
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }

        if (newCell1) {
            let x = newCell1[0];
            let y = newCell1[1];


            // matrixi mej gru mem MEK -> 3
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 1;

            this.y = y;
            this.x = x;
        }
        if (this.kyanq < 0) {
            this.die();
        }
        if (this.kyanq < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in killerArr) {
            if (killerArr[i].x == this.x && killerArr[i].y == this.y) {
                killerArr.splice(i, 1)
            }


        }


    }

}

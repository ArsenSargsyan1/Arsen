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

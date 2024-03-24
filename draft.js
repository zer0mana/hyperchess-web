class Draft {
    constructor() {
        this.currentTurn = 'b'
    }

    turn() {
        return this.currentTurn
    }

    changeTurn() {
        if (this.currentTurn === 'b') {
            this.currentTurn = 'w'
        }
        else {
            this.currentTurn = 'b'
        }
    }
}
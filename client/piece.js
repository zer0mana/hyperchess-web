class Piece {
    PAWN = 'p';
    KNIGHT = 'n';
    BISHOP = 'b';
    ROOK = 'r';
    QUEEN = 'q';
    KING = 'k';
    ASSASSIN = 'a';
    FREEZE = 'f';
    SPADES = 's'
    BOOMERANG = 'g'
    NINJA = 'j';
    SPIDER = 'd'
    ADMIRAL = 'm';
    DOLPHIN = 'l';
    CANNON = 'c';
    PRINCE = 'i'
    CAESAR = 'e'
    HYPNO = 'h'

    get_moves(from, type, board, turn) {
        switch (type) {
            case this.QUEEN:
                return this.get_queen_moves(from, board, turn)
            case this.KNIGHT:
                return this.get_knight_moves(from, board, turn)
            case this.BISHOP:
                return this.get_bishop_moves(from, board, turn)
            case this.ROOK:
                return this.get_rook_moves(from, board, turn)
            case this.DOLPHIN:
                return this.get_dolphin_moves(from, board, turn)
            case this.CANNON:
                return this.get_cannon_moves(from, board, turn)
            case this.NINJA:
                return this.get_ninja_moves(from, board, turn)
            case this.SPIDER:
                return this.get_spidy_moves(from, board, turn)
            case this.ASSASSIN:
                return this.get_assassin_moves(from, board, turn)
            case this.PRINCE:
                return this.get_prince_moves(from, board, turn)
            case this.CAESAR:
                return this.get_caesar_moves(from, board, turn)
            default:
                return this.get_default_moves(from, board, turn)
        }
    }

    get_queen_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [7, 7, 7, 7, 0, 7, 7, 7, 7], false)
    }

    get_knight_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [7, 7, 7, 7, 0, 7, 7, 7, 7], false)
    }

    get_bishop_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [7, 0, 7, 0, 0, 0, 7, 0, 7], false)
    }

    get_rook_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [0, 7, 0, 7, 0, 7, 0, 7, 0], false)
    }

    get_boomerang_moves(from, board, turn) {
        return []
    }

    get_ninja_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [0, 7, 7, 0, 0, 7, 0, 7, 7], false)
    }

    get_spidy_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [1, 1, 1, 1, 0, 1, 1, 1, 1], false)
    }

    get_admiral_moves(from, board, turn) {
        return []
    }

    get_dolphin_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [0, 3, 0, 3, 0, 3, 0, 3, 0], true)
    }

    get_cannon_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [7, 1, 0, 0, 0, 7, 7, 1, 0], false)
    }

    get_assassin_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [2, 2, 2, 2, 0, 2, 2, 2, 2], false)
    }

    get_freeze_moves(from, board, turn) {
        return []
    }

    get_spades_moves(from, board, turn) {
        return []
    }

    get_caesar_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [4, 4, 4, 4, 0, 4, 4, 4, 4], false)
    }

    get_prince_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [2, 2, 2, 2, 0, 2, 2, 2, 2], false)
    }

    get_hypno_moves(from, board, turn) {
        return this.get_moves_by_rays(from, board, turn, [2, 2, 2, 2, 0, 2, 2, 2, 2], false)
    }

    get_default_moves(from, board, turn) {
        return [65,67,66]
    }

    // Метод получения возможных ходов фигуры по массиву лучей
    // Так например для ферзя он будет [7, 7, 7, 7, 0, 7, 7, 7, 7]
    // Для ладьи [0, 7, 0, 7, 0, 7, 0, 7, 0]
    // А для слона [7, 0, 7, 0, 0, 0, 7, 0, 7]
    get_moves_by_rays(from, board, turn, rays, go_true) {
        var moves = []
        var i = 0

        for (var x = -1; x <= 1; x++) {
            for (var y = -16; y <= 16; y += 16) {
                if (x === 0 && y === 0) {
                    i++
                    continue
                }

                var distance = rays[i++]
                var to = from
                while (distance-- > 0) {
                    to += (x + y)
                    if (!this.validate_cell(to)) {
                        break
                    }

                    var cell = board[to];

                    // Пустая клетка
                    if (cell === null || cell === undefined) {
                        moves.push(to)
                        continue
                    }

                    // Своя фигура
                    if (cell.color === turn) {
                        // Способность проходить сквозь фигуры
                        if (go_true) {
                            continue
                        }
                        break
                    }

                    // Чужая фигура
                    if (cell.color !== turn) {
                        moves.push(to)
                        break
                    }
                    break;
                }
            }
        }

        return moves
    }

    // Метод проверяет, находится ли клетка на доске
    validate_cell(cell) {
        if ((cell < 0)
            || (cell > 7 && cell < 16)
            || (cell > 23 && cell < 32)
            || (cell > 39 && cell < 48)
            || (cell > 55 && cell < 64)
            || (cell > 71 && cell < 80)
            || (cell > 87 && cell < 96)
            || (cell > 103 && cell < 112)
            || (cell > 119)) {
            return false
        }

        return true
    }
}
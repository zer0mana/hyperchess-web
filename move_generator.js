// Класс генерирует возможные ходы
class MoveGenerator {
    _piece = new Piece();
    EMPTY = -1;
    ep_square = this.EMPTY;

    PAWN = 'p';
    KNIGHT = 'n';
    BISHOP = 'b';
    ROOK = 'r';
    QUEEN = 'q';

    RANK_1 = 7;
    RANK_8 = 0;

    SQUARES = {
        a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
        a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
        a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
        a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
        a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
        a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
        a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
        a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
    };

    BITS = {
        NORMAL: 1,
        CAPTURE: 2,
        BIG_PAWN: 4,
        EP_CAPTURE: 8,
        PROMOTION: 16,
        KSIDE_CASTLE: 32,
        QSIDE_CASTLE: 64
    };

    BITS = {
        NORMAL: 1,
        CAPTURE: 2,
        BIG_PAWN: 4,
        EP_CAPTURE: 8,
        PROMOTION: 16,
        KSIDE_CASTLE: 32,
        QSIDE_CASTLE: 64
    };

    // Возвращает все возможные ходы
    generate_moves(board, turn) {
        var moves = []

        for (var from = this.SQUARES.a8; from <= this.SQUARES.h1; from++) {
            var piece = board[from]
            if (piece === null || piece === undefined) {
                continue
            }

            var piece_moves = this._piece.get_moves(from, piece.type, board, from)

            for (var to = 0; to < piece_moves.length; to++) {
                this.add_move(board, turn, moves, from, piece_moves[to], this.BITS.NORMAL);
            }
        }

        return moves;
    }

    // Возвращает возможные ходы для фигуры на поле
    generate_single_move(board, square, turn) {
        var moves = []

        var from = this.SQUARES[square]
        var piece = board[from]
        if (piece === null || piece === undefined) {
            return moves
        }

        var piece_moves = this._piece.get_moves(from, piece.type, board, from)

        console.log(1, piece.type, piece_moves)
        for (var to = 0; to < piece_moves.length; to++) {
            this.add_move(board, turn, moves, from, piece_moves[to], this.BITS.NORMAL);
        }

        return moves;
    }

    add_move(board, turn, moves, from, to, flags) {
        if (board[from] === null) {
            return
        }

        moves.push(this.build_move(board, turn, from, to, flags));
    }

    build_move(board, turn, from, to, flags, promotion) {
        var move = {
            color: turn,
            from: from,
            to: to,
            flags: flags,
            piece: board[from].type
        };

        if (promotion) {
            move.flags |= this.BITS.PROMOTION;
            move.promotion = promotion;
        }

        if (board[to]) {
            move.captured = board[to].type;
        } else if (flags & this.BITS.EP_CAPTURE) {
            move.captured = this.PAWN;
        }

        return move;
    }
}
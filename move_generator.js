// Класс генерирует возможные ходы
class MoveGenerator {
    PAWN = 'p';
    KNIGHT = 'n';
    BISHOP = 'b';
    ROOK = 'r';
    QUEEN = 'q';
    KING = 'k';

    RANK_1 = 7;
    RANK_2 = 6;
    RANK_3 = 5;
    RANK_4 = 4;
    RANK_5 = 3;
    RANK_6 = 2;
    RANK_7 = 1;
    RANK_8 = 0;

    BITS = {
        NORMAL: 1,
        CAPTURE: 2,
        BIG_PAWN: 4,
        EP_CAPTURE: 8,
        PROMOTION: 16,
        KSIDE_CASTLE: 32,
        QSIDE_CASTLE: 64
    };

    add_move(board, turn, moves, from, to, flags) {
        if (board[from].type === this.PAWN &&
            (this.rank(to) === this.RANK_8 || this.rank(to) === this.RANK_1)) {
            var pieces = [this.QUEEN, this.ROOK, this.BISHOP, this.KNIGHT];
            for (var i = 0, len = pieces.length; i < len; i++) {
                moves.push(this.build_move(board, turn, from, to, flags, pieces[i]));
            }
        } else {
            moves.push(this.build_move(board, turn, from, to, flags));
        }
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

    rank(i) {
        return i >> 4;
    }
}
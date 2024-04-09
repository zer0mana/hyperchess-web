class Piece {
    PAWN = 'p';
    KNIGHT = 'n';
    BISHOP = 'b';
    ROOK = 'r';
    QUEEN = 'q';

    get_moves(from, type, board, turn) {
        var moves = []

        switch (type) {
            case this.QUEEN:
                return this.get_queen_moves(from, board, turn)
            case this.KNIGHT:
                return this.get_knight_moves(from, board, turn)
            case this.BISHOP:
                return this.get_bishop_moves(from, board, turn)
            case this.ROOK:
                return this.get_rook_moves(from, board, turn)
            default:
                return this.get_default_moves(from, board, turn)
        }
    }

    get_queen_moves(from, board, turn) {
        return [32,33,34]
    }

    get_knight_moves(from, board, turn) {
        return [32,33,34]
    }

    get_bishop_moves(from, board, turn) {
        return [32,33,34]
    }

    get_rook_moves(from, board, turn) {
        return [32,33,34]
    }

    get_default_moves(from, board, turn) {
        return [65,67,66]
    }

    get_moves_by_rays(from, board, turn, rays) {

    }
}
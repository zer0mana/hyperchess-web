class PieceInfo {
    infos= {
        "p": {pieceImage: "url('img/pieces/T_Pawn.png')", pieceName: "Пешка", pieceDescription: "Двигается по вертикали вперед на одну клетку. Если ходит первый раз, то может пойти на две. Ест по диагонали вперед на одну клетку. Может быть повышена, если доходит до последней горизонтали. Не проходит сквозь фигуры."},
        "n": {pieceImage: "url('img/pieces/T_Knight.png')", pieceName: "Конь", pieceDescription: "Ходит на две клетки по горизонтали и одну по вертикали или наоборот в любом направлении. Проходит сквозь фигуры."},
        "b": {pieceImage: "url('img/pieces/T_Bishop.png')", pieceName: "Слон", pieceDescription: "Двигается по диагонали. Не проходит сквозь фигуры."},
        "r": {pieceImage: "url('img/pieces/T_Rook.png')", pieceName: "Ладья", pieceDescription: "Двигается по вертикали и горизонтали. Не проходит сквозь фигуры."},
        "q": {pieceImage: "url('img/pieces/T_Queen.png')", pieceName: "Ферзь", pieceDescription: "Двигается по вертикали, горизонтали и диагонали. Не проходит сквозь фигуры."},
        "k": {pieceImage: "url('img/pieces/T_King.png')", pieceName: "Король", pieceDescription: "Двигается на 1 клетку в любом направлении. Если погибает, то игра завершается. Не проходит сквозь фигуры."},
        "a": {pieceImage: "url('img/pieces/T_Assasin.png')", pieceName: "Ассасин (Конь)", pieceDescription: "Двигается на 2 клетки в любом направлении. Если его съедает фигура, то она тоже убирается с доски. Не проходит сквозь фигуры."},
        "f": {pieceImage: "url('img/pieces/T_Freez.png')", pieceName: "Фриз (Конь)", pieceDescription: "Двигается как конь. Не может есть фигуры. Фигуры противника в зоне атаки не могу двигаться. Проходит сквозь фигуры."},
        "s": {pieceImage: "url('img/pieces/T_Spades.png')", pieceName: "Пикинер (Конь)", pieceDescription: "Двигается на две клетки в любом направлении. Съедат фигуру на расстоянии равном его ходу. Не проходит сквозь фигуры."},
        "g": {pieceImage: "url('img/pieces/T_Boomerang.png')", pieceName: "Бумеранг (Слон)", pieceDescription: "Двигается по диагонали, один раз может оттолкнуться от объекта и продолжить движение. Не может есть фигуры, пока не оттолкнулся. Не проходит сквозь фигуры."},
        "j": {pieceImage: "url('img/pieces/T_Kamikaze.png')", pieceName: "Ниндзя (Слон)", pieceDescription: "Двигается вперед как ферзь. Не проходит сквозь фигуры."},
        "d": {pieceImage: "url('img/pieces/T_Spider.png')", pieceName: "Павук (Слон)", pieceDescription: "Двигается на две клетки в любом направлении. Имеет зону контроля. Не проходит сквозь фигуры."},
        "m": {pieceImage: "url('img/pieces/T_Admiral.png')", pieceName: "Адмирал (Ладья)", pieceDescription: "Двигается 4 клетки по горизонтали, а затем еще 3 по вертикали. Может остановиться на любой из них. Не проходит сквозь фигуры."},
        "l": {pieceImage: "url('img/pieces/T_Dolphin.png')", pieceName: "Дельфин (Ладья)", pieceDescription: "Двигается на 3 клетки по горизонтали или вертикали. Проходит сквозь фигуры."},
        "c": {pieceImage: "url('img/pieces/T_Cannon.png')", pieceName: "Пушка (Ладья)", pieceDescription: "Вперед двигается как ладья, назад как слон. Не проходит сквозь фигуры."},
        "i": {pieceImage: "url('img/pieces/T_Prince.png')", pieceName: "Принц (Ферзь)", pieceDescription: "Двигается на 2 клетки в любом направлении. Если жив, то игра не завершается при съедении короля. Не проходит сквозь фигуры."},
        "e": {pieceImage: "url('img/pieces/T_Caesar.png')", pieceName: "Цезарь (Ферзь)", pieceDescription: "Двигается на 4 клетки в любом направлении. Пока жив, пешки всегда могут ходить на две клетки. Не проходит сквозь фигуры."},
        "h": {pieceImage: "url('img/pieces/T_Hypnosis.png')", pieceName: "Гипно (Ферзь)", pieceDescription: "Двигается как ферзь, но на 2 клетки. Вместо хода может поменяться клетками с союзной пешкой, но только если не стоит на переводной диагонали. Проходимость - обычная."}
    };

    get_piece_info(type) {
        return this.infos[type]
    }
}
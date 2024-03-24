game = new Chess();
draft = new Draft();

var socket = io();

var color = "white";
var figureColor;
var players;
var roomId;
var play = true;

var menu = document.getElementById("menu")
var room = document.getElementById("roomCode")

var connectRoom = function(roomCode){
    menu.remove();
    socket.emit('joined', roomCode);
}

var pickFigure = function (button) {
    if ((draft.turn() === 'b' && color === 'white')
    || (draft.turn() === 'w' && color === 'black')) {
        return
    }
    button.style.backgroundColor = figureColor
    draft.changeTurn()
    socket.emit('changeColor', { buttonId: button.id, color: figureColor, roomId: 0 });
}

var createRoom = function () {
    menu.remove();
    socket.emit('createRoom')
}

socket.on('full', function (msg) {
    if(roomId == msg)
        window.location.assign(window.location.href+ 'full.html');
});

socket.on('play', function (msg) {
    if (msg == roomId) {
        play = false;
    }
    // console.log(msg)
});

socket.on('finishDraft', function () {
    var draftContainer = document.getElementById("draft")
    draftContainer.remove()

    var cfg = {
        orientation: color,
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd
    };

    board = ChessBoard('board', cfg);
});

socket.on('move', function (msg) {
    if (msg.room == roomId) {
        game.move(msg.move);
        board.position(game.fen());
        console.log("moved")
    }
});

socket.on('colorChanged', data => {
    draft.changeTurn()
    var button = document.getElementById(data.buttonId);
    button.style.backgroundColor = data.color
});

var removeGreySquares = function () {
    $('#board .square-55d63').css('background', '');
};

var greySquare = function (square) {
    var squareEl = $('#board .square-' + square);

    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }

    squareEl.css('background', background);
};

var onDragStart = function (source, piece) {
    // do not pick up pieces if the game is over
    // or if it's not that side's turn
    if (game.game_over() === true || play ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1) ||
        (game.turn() === 'w' && color === 'black') ||
        (game.turn() === 'b' && color === 'white') ) {
            return false;
    }
    // console.log({play, players});
};

var onDrop = function (source, target) {
    removeGreySquares();

    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    if (game.game_over()) {
        socket.emit('gameOver', roomId)
    }

    // illegal move
    if (move === null) return 'snapback';
    else
        socket.emit('move', { move: move, board: game.fen(), room: roomId });

};

var onMouseoverSquare = function (square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
        square: square,
        verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // highlight the square they moused over
    greySquare(square);

    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
};

var onMouseoutSquare = function (square, piece) {
    removeGreySquares();
};

var onSnapEnd = function () {
    board.position(game.fen());
};


socket.on('player', (msg) => {
    var plno = document.getElementById('info')
    var draftButtons = document.getElementById('draft')
    draftButtons.style.display = "grid";

    color = msg.color;
    if (color === "white") {
        figureColor = "red"
    }
    else {
        figureColor = "blue"
    }

    plno.innerHTML = 'Player ' + msg.players + " : " + color + " InviteCode: " + msg.roomCode;
    players = msg.players;
    roomId = msg.roomId
    if(players == 2){
        play = false;
        socket.emit('play', msg.roomId);
    }
});

function generateInviteCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Допустимые символы для кода
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength); // Получаем случайный индекс символа
        result += characters.charAt(randomIndex); // Добавляем случайный символ в код
    }
    return result;
}

const inviteCode = generateInviteCode(5); // Генерируем код длиной 5 символов
console.log(inviteCode); // Выводим в консоль сгенерированный пригласительный код

var board;

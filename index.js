const express = require('express');
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 8080

var app = express();
const server = http.createServer(app)
const io = socket(server)
var players;
var joined = true;

app.use(express.static(__dirname + "/"));

var games = Array(100);
for (let i = 0; i < 100; i++) {
    games[i] = {players: 0 , pid: [0 , 0], code: "", figuresCount: 0, whiteFigures: [], blackFigures: []};
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    // console.log(players);
    var color;
    var playerId =  Math.floor((Math.random() * 100) + 1)

    console.log(playerId + ' connected');

    socket.on('createRoom',  function () {
        color = "white"
        var code = generateInviteCode(5);
        console.log(code)

        games[lastGameId].players = 1;
        games[lastGameId].code = code
        games[lastGameId].pid[games[lastGameId].players - 1] = playerId;
        var players = 1

        socket.emit('player', { playerId, players, color, lastGameId, roomCode: code })
        lastGameId++;
    });

    socket.on('joined', function (roomCode) {
        var gameIndex = games.findIndex(game => game.code === roomCode);

        if (gameIndex !== -1) {
            if (games[gameIndex].players < 2) {
                games[gameIndex].players++;
                games[gameIndex].pid[games[gameIndex].players - 1] = playerId;
            }
            else{
                socket.emit('full', gameIndex)
                return;
            }
        } else {
            socket.emit('full', gameIndex)
            return;
        }
        
        console.log(games[gameIndex]);
        players = games[gameIndex].players
        

        if (players % 2 == 0) color = 'black';
        else color = 'white';

        console.log(roomCode)
        socket.emit('player', { playerId, players, color, gameIndex, roomCode: roomCode })
        // players--;
    });

    socket.on('move', function (msg) {
        socket.broadcast.emit('move', msg);
        console.log(msg);
    });

    socket.on('offerDraw', function () {
        socket.broadcast.emit('offerDraw');
    });

    socket.on('acceptDraw', function () {
        // save to db
        socket.broadcast.emit('acceptDraw');
    });

    socket.on('play', function (msg) {
        socket.broadcast.emit('play', msg);
        console.log("ready " + msg);
    });

    socket.on('disconnect', function () {
        for (let i = 0; i < 100; i++) {
            if (games[i].pid[0] == playerId || games[i].pid[1] == playerId)
                games[i].players--;
        }
        console.log(playerId + ' disconnected');
    });

    socket.on('opponentSurrender', function () {
        // save to db
        socket.broadcast.emit('opponentSurrender');
    });

    socket.on('changeColor', data => {
        console.log(data)
        // Передача сообщения о изменении цвета всем остальным клиентам
        games[data.roomId].figuresCount++
        console.log(games[data.roomId].figuresCount)
        socket.broadcast.emit('colorChanged', { buttonId: data.buttonId, color: data.color });

        if (data.turn === 'white') {
            games[data.roomId].whiteFigures.push(data.buttonId.toUpperCase())
        } else {
            games[data.roomId].blackFigures.push(data.buttonId.toLowerCase())
        }

        if (games[data.roomId].figuresCount === 4) {
            games[data.roomId].whiteFigures.push('A')
            games[data.roomId].whiteFigures.push('A')
            games[data.roomId].whiteFigures.push('A')
            games[data.roomId].whiteFigures.push('A')
            games[data.roomId].whiteFigures.push('A')
            games[data.roomId].whiteFigures.push('K')

            games[data.roomId].blackFigures.push('a')
            games[data.roomId].blackFigures.push('a')
            games[data.roomId].blackFigures.push('a')
            games[data.roomId].blackFigures.push('a')
            games[data.roomId].blackFigures.push('a')
            games[data.roomId].blackFigures.push('k')

            console.log(getStartPosition(data.roomId))
            socket.emit('finishDraft', { startPosition: getStartPosition(data.roomId) })
            socket.broadcast.emit('finishDraft', { startPosition: getStartPosition(data.roomId) })
        }
    });
});

var lastGameId = 0

// Генерирует
var generateInviteCode = function(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Допустимые символы для кода
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength); // Получаем случайный индекс символа
        result += characters.charAt(randomIndex); // Добавляем случайный символ в код
    }
    return result;
}

// Генерирует стартовую позицию по набору фигур
var getStartPosition = function(roomId) {
    var position = ""
    for (var i in games[roomId].blackFigures) {
        position += games[roomId].blackFigures[i]
    }
    var blackPawns = "/pppppppp"
    var space = "/8/8/8/8"
    var whitePawns = "/PPPPPPPP/"

    position += blackPawns + space + whitePawns

    for (var i in games[roomId].whiteFigures) {
        position += games[roomId].whiteFigures[i]
    }
    return position + " w KQkq - 0 1"
}


server.listen(port);
console.log('Connected');
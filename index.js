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
    games[i] = {players: 0 , pid: [0 , 0], code: "", figuresCount: 0};
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

    socket.on('changeColor', data => {
        console.log(data)
        // Передача сообщения о изменении цвета всем остальным клиентам
        games[data.roomId].figuresCount++
        console.log(games[data.roomId].figuresCount)
        socket.broadcast.emit('colorChanged', { buttonId: data.buttonId, color: data.color });

        if (games[data.roomId].figuresCount === 4) {
            socket.emit('finishDraft')
            socket.broadcast.emit('finishDraft')
        }
    });
});

var lastGameId = 0
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

server.listen(port);
console.log('Connected');
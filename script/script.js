let cvs = document.getElementById('cvs');
cvs.style.border = '1px solid black';
cvs.width = '600';
cvs.height = '600';

let ctx = cvs.getContext('2d');
let cte = cvs.getContext('2d');

let cont = {};
cont.x = 300;
cont.y = 300;

let eat = {};
eat.x = 0;
eat.y = 0;

let speed = 30 // равно размеру клетки
let vector = 'N';
let crutch = true;
let messageCrutch = false;
let snakeLength = 1;
let snakeGenomeX = [];

setInterval(game, 300); // запуск движка

function game() {
    if (crutch) {
        if (vector != 'end') {
            engine();
        } else {
            document.getElementById('message').innerHTML = 'GAME OVER! <br><br> Нажмите F5, чтобы начать заново!';
            crutch = false;
        };
    };
    return;
};

samobranka(); // генерируем еду в случайном месте

function samobranka() {
    eat.x = Math.round(Math.random() * 19) * 30;
    eat.y = Math.round(Math.random() * 19) * 30;
    for (i = 0; i < snakeGenomeX.length; i++) {
        if (snakeGenomeX[i][0] == eat.x && snakeGenomeX[i][1] == eat.y) {
            ctx.clearRect(0, 0, 600, 600);
            samobranka();
        };
    };
};

window.addEventListener('keypress', event => run(event));

function run(event) {
    if (vector == 'end') {
        return;
    } else if (event.code == 'KeyW' && !messageCrutch) {
        if (vector != 'S') {
            vector = 'W';
        };
        return;
    } else if (event.code == 'KeyA' && !messageCrutch) {
        if (vector != 'D') {
            vector = 'A';
        };
        return;
    } else if (event.code == 'KeyS' && !messageCrutch) {
        if (vector != 'W') {
            vector = 'S';
        };
        return;
    } else if (event.code == 'KeyD' && !messageCrutch) {
        if (vector != 'A') {
            vector = 'D';
        };
        return;
    } else if (event.code == 'Space') {
        if (!messageCrutch) {
            messageCrutch = vector;
            vector = 'N';
            document.getElementById('message').innerHTML = 'Игра на паузе! <br><br> Нажмите ПРОБЕЛ для продолжения.';
        } else {
            vector = messageCrutch;
            messageCrutch = false;
            document.getElementById('message').innerText = '';
        };
    };

};

function engine() {
    if (vector == 'N') {
        return;
    } else if (vector == 'W') {
        if (cont.y - speed < 0) {
            cont.y = 0;
            vector = 'end'
        } else {
            cont.y -= speed;;
        }
    } else if (vector == 'A') {
        if (cont.x - speed < 0) {
            cont.x = 0;
            vector = 'end'
        } else {
            cont.x -= speed;;
        }
    } else if (vector == 'S') {
        if (cont.y + speed > 570) {
            cont.y = 570;
            vector = 'end'
        } else {
            cont.y += speed;;
        }
    } else if (vector == 'D') {
        if (cont.x + speed > 570) {
            cont.x = 570;
            vector = 'end'
        } else {
            cont.x += speed;;
        };
    };
    paint();
};

function paint() {

    if (cont.x == eat.x && cont.y == eat.y) {
        snakeLength++;
        snakeGenomeX.unshift([eat.x, eat.y]);
        samobranka();
        document.getElementById('score').innerText = `Очки: ${snakeLength-1}`;
        if (snakeLength > 397) {
            document.getElementById('endgame').innerText = `Поздравляю, у вас очень много свободного времени! Вы прошли игру. Может, попробуете заняться чем-то более полезным?`;
        }
    };

    snakeGenomeX.shift();

    for (i = 0; i < snakeGenomeX.length; i++) {
        if (snakeGenomeX[i][0] == cont.x && snakeGenomeX[i][1] == cont.y) {
            vector = 'end';
        };
    };

    snakeGenomeX.push([cont.x, cont.y]);

    ctx.clearRect(0, 0, 600, 600); // очищаем поле для новой генерации

    ctx.fillStyle = 'rgb(0, 206, 201)';
    for (i = 0; i < snakeLength; i++) {
        ctx.fillRect(snakeGenomeX[i][0], snakeGenomeX[i][1], 30, 30);
    };

    cte.fillStyle = 'rgb(225, 112, 85)'; // цвет еды
    cte.fillRect(eat.x, eat.y, 30, 30);
};

paint();
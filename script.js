
let form = document.getElementById("submit");
let login = document.getElementById("login");
let game = document.getElementById("game");
let message = document.querySelector(".message");

let players = [];
let currentPlayer = 0;
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name1 = document.getElementById("player-1").value.trim();
    let name2 = document.getElementById("player-2").value.trim();

    if (name1 === "" || name2 === "") {
        return;
    }

    players = [name1, name2];

    login.style.display = "none";
    game.style.display = "block";

    message.textContent = players[0] + ", you're up";
});

let cells = document.querySelectorAll(".cell");

cells.forEach(function(cell) {
    cell.addEventListener("click", function() {
        let index = Number(cell.id) - 1;

        if (gameOver || board[index] !== "") {
            return;
        }

        let symbol = currentPlayer === 0 ? "x" : "o";

        board[index] = symbol;
        cell.textContent = symbol;

        let won = winningCombinations.some(function(combination) {
            return combination.every(function(position) {
                return board[position] === symbol;
            });
        });

        if (won) {
            message.textContent = players[currentPlayer] +
                " congratulations you won!";
            gameOver = true;
            return;
        }

        if (board.every(function(value) {
            return value !== "";
        })) {
            message.textContent = "It's a draw!";
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 0 ? 1 : 0;

        message.textContent = players[currentPlayer] + ", you're up";
    });
});
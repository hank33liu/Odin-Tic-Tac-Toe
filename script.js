"use strict";

const Player = (sign) => {

    const getSign = () => sign;

    return {
        getSign,
    };
}

const gameBoard = (()=> {
    restartButton = document.getElementById("restart");

    const board = ["", "", "", "", "", "", "", "", ""];

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameController.resetCurrentPlayer();
    }

    

    return {
        board,
        resetGame,
    };
})();

const displayController = ( ()=> {
    const fieldElements = document.querySelectorAll(".field");

    for (let field of fieldElements) {
        field.addEventListener("click", (e) => {
            if (e.target.textContent=="") {
                e.target.textContent = gameController.getCurrentPlayerSign();
            }
        })
    }

    const updateBoard = () => {
    for (let index = 0; index < 9; index++) {
        fieldElements[index].textContent = gameBoard.board[index];
    }
    };

    // console.log("ok");
    // console.log(gameBoard.board[3]);

    return {
        updateBoard,
    };
})();

const gameController = ( ()=> {
    const playerX = Player("X");
    const playerO = Player("O");

    let currentPlayer = playerX;

    const getCurrentPlayerSign = () => currentPlayer.getSign();
    const resetCurrentPlayer = () => {
        currentPlayer = playerX;
    }

    return {
        getCurrentPlayerSign, 
        resetCurrentPlayer,
    };
})();
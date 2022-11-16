"use strict";

const Player = (sign) => {

    const getSign = () => sign;

    return {
        getSign,
    };
}

const gameBoard = (()=> {
    let restartButton = document.getElementById("restart");

    let board = ["", "", "", "", "", "", "", "", ""];

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameController.resetCurrentPlayer();
        displayController.displayPlayerTurn();
        displayController.updateBoard();
        gameController.setVictory(false);
        displayController.resetTurnNum();
    };
    restartButton.addEventListener("click", resetGame);


    const getBoard = () => {
        return board;
    };

    const setBoard = (index, value) => {
        board[index] = value;
    };


    return {
        getBoard,
        setBoard,
        resetGame,
    };
})();

const displayController = ( ()=> {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    let turn = 0;

    const getTurnNum = () => turn;
    const resetTurnNum = () => turn = 0;

    for (let field of fieldElements) {
        field.addEventListener("click", (e) => {
            if (e.target.textContent=="") {
                turn += 1;
                let index = parseInt(e.target.getAttribute("data-index"))
                if (gameController.getVictory()==false) {
                    gameBoard.setBoard(index, gameController.getCurrentPlayerSign());
                    updateBoard();
                }
                gameController.victoryDetected(index);
                if (gameController.getVictory() == false) {
                    gameController.switchCurrentPlayer();
                    displayPlayerTurn();
                    (turn==9) ? displayTieMessage():null;
                } else {
                    displayController.displayVictoryMessage();
                }
            }
        })
    }

    const updateBoard = () => {
    for (let index = 0; index < 9; index++) {
        fieldElements[index].textContent = gameBoard.getBoard()[index];
    }
    };

    const displayPlayerTurn = () => {
        messageElement.textContent = `Player ${gameController.getCurrentPlayerSign()}'s turn`;
    };

    const displayVictoryMessage = () => {
        messageElement.textContent = `Player ${gameController.getCurrentPlayerSign()} wins!`;
    };

    const displayTieMessage = () => {
        messageElement.textContent = "It's a tie!";
    };

    // console.log("ok");
    // console.log(gameBoard.board[3]);

    return {
        updateBoard,
        displayPlayerTurn,
        displayVictoryMessage,
        displayTieMessage,
        getTurnNum,
        resetTurnNum,
    };
})();

const gameController = ( ()=> {
    const playerX = Player("X");
    const playerO = Player("O");

    let victory = false;
    const getVictory = () => victory;
    const setVictory = (bool) => {
        victory = bool;
    }

    let currentPlayer = playerX;

    const getCurrentPlayerSign = () => currentPlayer.getSign();

    const switchCurrentPlayer = () => {
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
        } else {
            currentPlayer = playerX;
        }
    };

    const resetCurrentPlayer = () => {
        currentPlayer = playerX;
    };

    const victoryDetected = (index) => {
        let x = getCurrentPlayerSign();
        let board = gameBoard.getBoard();
        switch(index) {
            case 0:
                if ((board[1]==x && board[2]==x) || (board[4]==x && board[8]==x) || (board[3]==x && board[6]==x)) {
                    gameController.setVictory(true);
                }
                break;
            case 1:
                if ((board[0]==x && board[2]==x) || (board[4]==x && board[7]==x)) {
                    gameController.setVictory(true);
                }
                break;
            case 2:
                if ((board[5] == x && board[8] == x) || (board[4] == x && board[6] == x) || (board[1] == x && board[0] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 3:
                if ((board[4] == x && board[5] == x) || (board[0] == x && board[6] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 4:
                if ((board[3] == x && board[5] == x) || (board[0] == x && board[8] == x) || (board[1] == x && board[7] == x) || (board[2] == x && board[6] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 5:
                if ((board[3] == x && board[4] == x) || (board[2] == x && board[8] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 6:
                if ((board[7] == x && board[8] == x) || (board[0] == x && board[3] == x) || (board[4] == x && board[2] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 7:
                if ((board[6] == x && board[8] == x) || (board[1] == x && board[4] == x)) {
                    gameController.setVictory(true);
                }
                break;
            case 8:
                if ((board[6] == x && board[7] == x) || (board[2] == x && board[5] == x) || (board[0] == x && board[4] == x)) {
                    gameController.setVictory(true);
                }
                break;
        }
    };

    return {
        getVictory,
        setVictory,
        getCurrentPlayerSign, 
        switchCurrentPlayer,
        resetCurrentPlayer,
        victoryDetected,
    };
})();
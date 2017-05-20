"use strict";

const TicTacToe = (function($) {

    const boxList = $('.box');

    const Player = function(background, name) {
        this.backgroundImage = background;
        this.name = name;

        this.setPlayerBoxBackground = _ => {
            for (let box of boxList) {
                box.addEventListener('mouseover', _ => {
                    box.style.backgroundImage = `url("./img/${this.backgroundImage}")`;
                });
                box.addEventListener('mouseleave', _ => {
                    box.style.backgroundImage = '';
                });
            }
        };

    };
    const playerOne = new Player('o.svg', 'player1');
    const playerTwo = new Player('x.svg', 'player2');

    let currentPlayer = playerOne;

    const switchPlayer = () => {
        $(`#${currentPlayer.name}`)[0].classList.remove('active');

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        currentPlayer.setPlayerBoxBackground();

        $(`#${currentPlayer.name}`)[0].classList.add('active');

        return currentPlayer;
    };

    const playerTurn = _ => {
        for (let box of boxList) {
            box.addEventListener('click', _ => {
                switchPlayer();
            });
        }
    };

    const init = _ => {
        console.log('game started');
        $(`#${currentPlayer.name}`)[0].classList.add('active');
        currentPlayer.setPlayerBoxBackground();
        playerTurn();
    };

    return {
        init: init
    };

}(Sizzle));

TicTacToe.init();
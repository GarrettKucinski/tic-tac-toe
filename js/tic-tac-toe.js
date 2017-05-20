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
    const playerOne = new Player('o.svg', 'Garrett');
    const playerTwo = new Player('x.svg', 'Jamie');

    let currentPlayer = playerOne;

    const selectBox = _ => {
        for (let box of boxList) {
            box.addEventListener('click', _ => {
                switchPlayer();
            });
        }
    };

    const switchPlayer = () => {
        currentPlayer = $('.player1.active') ? playerTwo : playerOne;
        currentPlayer.setPlayerBoxBackground();
    };

    const init = _ => {
        console.log('game started');
        $('#player1')[0].classList += ' active';
    };

    return {
        init: init
    };

}(Sizzle));

TicTacToe.init();
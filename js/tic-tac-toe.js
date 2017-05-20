"use strict";

const TicTacToe = (function($) {

    const boxList = $('.boxes')[0];

    const Player = function(name, background, marker) {
        this.name = name;
        this.backgroundImage = background;
        this.marker = marker;
    };

    Player.prototype.getBoxBackground = function() {
        return `url("./img/${this.backgroundImage}")`;
    };

    const playerOne = new Player('player1', 'o.svg', 'box-filled-1');
    const playerTwo = new Player('player2', 'x.svg', 'box-filled-2');

    let currentPlayer = playerOne;

    const setPlayerBoxBackground = function() {
        const handleBoxMouseOver = e => {
            e.target.style.backgroundImage = currentPlayer.getBoxBackground();
        };
        const handleBoxMouseLeave = e => {
            e.target.style.backgroundImage = '';
        };

        boxList.addEventListener('mouseover', handleBoxMouseOver, true);
        boxList.addEventListener('mouseleave', handleBoxMouseLeave, true);
    };

    const switchPlayer = () => {
        $(`#${currentPlayer.name}`)[0].classList.remove('active');

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        setPlayerBoxBackground();

        $(`#${currentPlayer.name}`)[0].classList.add('active');

        return currentPlayer;
    };

    const playerTurn = _ => {
        const handleBoxClick = e => {
            if (!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                e.target.classList.add(`${currentPlayer.marker}`);
            }
            switchPlayer();
            e.target.removeEventListener('click', handleBoxClick, true);
        };
        boxList.addEventListener('click', handleBoxClick, true);
    };

    const init = _ => {
        console.log('game started');
        $(`#${currentPlayer.name}`)[0].classList.add('active');
        setPlayerBoxBackground();
    };

    return {
        init: init,
        playerTurn: playerTurn
    };

}(Sizzle));

TicTacToe.init();
TicTacToe.playerTurn();
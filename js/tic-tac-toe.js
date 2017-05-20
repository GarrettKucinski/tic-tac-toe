"use strict";

const TicTacToe = (function($) {

    // Select box list for use later
    const boxList = $('.boxes')[0];

    // Create the Player object
    const Player = function(name, background, marker) {
        this.name = name;
        this.backgroundImage = background;
        this.marker = marker;
    };

    // Add a method to retrieve the correct 
    // background image for each player instance
    Player.prototype.getBoxBackground = function() {
        return `url("./img/${this.backgroundImage}")`;
    };

    // Instantiate a Player instace for each player
    const playerOne = new Player('player1', 'o.svg', 'box-filled-1');
    const playerTwo = new Player('player2', 'x.svg', 'box-filled-2');

    // Set the initial currentPlayer to player one at the start of the game
    let currentPlayer = playerOne;

    // Provide a method for element creation
    const createElement = (name, id, content = '') => {
        const el = document.createElement(name);
        el.id = id;
        el.innerText = content;

        return el;
    };

    // Set the box background on hover depending on who the current player is
    const setPlayerBoxBackground = function() {
        const handleBoxMouseOver = e => {
            if (!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                e.target.classList.add(`${currentPlayer.name}-box-hover`);
            }
        };
        const handleBoxMouseLeave = e => {
            e.target.classList.remove(`${currentPlayer.name}-box-hover`);
        };

        boxList.addEventListener('mouseover', handleBoxMouseOver, true);
        boxList.addEventListener('mouseleave', handleBoxMouseLeave, true);
    };

    // Create the game start screen and display it
    const showStartScreen = () => {
        const gameBoard = document.getElementById('board'),
            startContainer = createElement('div', 'start-screen'),
            startHeader = createElement('header', 'start-header'),
            startButton = createElement('button', 'start-button', 'Start Game'),
            startHeading = createElement('h1', 'start-heading', 'Tic Tac Toe');

        startContainer.classList.add('screen');
        startContainer.classList.add('screen-start');
        startButton.classList.add('button');

        startHeader.appendChild(startHeading);
        startHeader.appendChild(startButton);

        startContainer.appendChild(startHeader);

        gameBoard.appendChild(startContainer);
    };

    // Provide the logic allowing a player to initialize the game
    const startGame = () => {
        const startButton = document.getElementById('start-button');
        const startContainer = document.getElementById('start-screen');
        startButton.addEventListener('click', _ => {
            startContainer.style.display = 'none';
        });
        $(`#${currentPlayer.name}`)[0].classList.add('active');
        setPlayerBoxBackground();
    };

    // Call this function when a box is selected to end the current players 
    // turn and make the other player the current player
    const switchPlayer = () => {
        $(`#${currentPlayer.name}`)[0].classList.remove('active');

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
        setPlayerBoxBackground();

        $(`#${currentPlayer.name}`)[0].classList.add('active');

        return currentPlayer;
    };

    // Function to govern the logic of each players turn
    const playerTurn = _ => {
        const handleBoxClick = e => {
            if (!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                e.target.classList.add(`${currentPlayer.marker}`);
                switchPlayer();
            }
        };
        boxList.addEventListener('click', handleBoxClick, true);
    };

    // Initalize the game with the correct current player
    // and set the box hover background to that players icon
    const init = _ => {
        console.log('game started');
        showStartScreen();
        startGame();
    };

    // Expose the methods to allow the game to be played
    return {
        init: init,
        playerTurn: playerTurn
    };

}(Sizzle));

// Start the game
TicTacToe.init();

// Initialize the first players turn
TicTacToe.playerTurn();
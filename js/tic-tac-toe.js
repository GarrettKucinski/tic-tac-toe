"use strict";

const TicTacToe = (function($) {

    // Select box list for use later
    const boxList = $('.boxes')[0];

    // Select collection of individual boxes for later iteration
    const boxes = $('.box');

    // Select board header to append player name
    const boardHeader = $('.board header')[0];

    // const gameBoard = document.getElementById('board');
    const body = document.getElementsByTagName('body')[0];

    // Specify an array of winning box combinations
    const winConditions = ['123', '456', '789', '147', '258', '369', '357', '159'];

    // Provide a list of available moves for the AI
    let availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // Initialize player win check to false, since nobody has won yet
    let playerWon = false;

    // Initlize a variable to keep track of the cumulative 
    // moves of both players to know when to check for a winner
    let gameMoves = 0;

    // Change a string to TitleCase
    const titleCase = (str) => str.replace(/(^|\s)[a-z]/g, function(f) { return f.toUpperCase(); });

    // Create the Player object
    const Player = function(name, background, marker, winner, realName) {
        this.name = name;
        this.backgroundImage = background;
        this.marker = marker;
        this.winner = winner;
        this.moves = new Set();
        this.realName = realName;
    };

    // Add a method to retrieve the correct 
    // background image for each player instance
    Player.prototype.getBoxBackground = function() {
        return `url("./img/${this.backgroundImage}")`;
    };

    // Instantiate a Player instace for each player
    const playerOne = new Player('player1', 'o.svg', 'box-filled-1', 'screen-win-one');
    const playerTwo = new Player('player2', 'x.svg', 'box-filled-2', 'screen-win-two', 'Computer');

    // Generate a square for the computer to select
    playerTwo.computerMove = _ => availableMoves[Math.floor(Math.random() * (availableMoves.length - 1))];

    // Set the initial currentPlayer to player one at the start of the game
    let currentPlayer = playerOne;

    // Provide a method for element creation
    const createElement = (name, id, className = '', content = '') => {
        const el = document.createElement(name);
        el.id = id;
        el.className = className;
        el.innerText = content;

        return el;
    };

    // Set the box background on hover depending on who the current player is
    const setPlayerBoxBackground = _ => {
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
    const showStartScreen = _ => {
        const startContainer = createElement('div', 'start-screen', 'screen screen-start'),
            startHeader = createElement('header', 'start-header', 'start-header'),
            startButton = createElement('button', 'start-button', 'button', 'Start Game'),
            startHeading = createElement('h1', 'start-heading', 'start-heading', 'Tic Tac Toe'),
            startInput = createElement('input', 'start-input', 'start-input', undefined);

        startInput.type = 'text';
        startInput.placeholder = 'Please enter your name';


        startButton.addEventListener('click', _ => {
            const startContainer = document.getElementById('start-screen');
            playerOne.realName = startInput.value ? startInput.value : 'Player One';

            const playerName = createElement('p', 'player-name', 'player-name', `Welcome, ${titleCase(playerOne.realName)}!`);

            boardHeader.appendChild(playerName);
            startContainer.classList.add('fadeOut');
            setTimeout(_ => {
                startContainer.remove();
            }, 1000);
        });

        startContainer.appendChild(startHeader);
        startHeader.appendChild(startHeading);
        startHeader.appendChild(startInput);
        startHeader.appendChild(startButton);
        body.appendChild(startContainer);
    };

    // Loop through boxes and find selected ones
    // match current players selected box to a list
    // of winning box combinations
    const isWinningRow = _ => {
        let viableBoxes;
        for (let combo of winConditions) {
            viableBoxes = 0;
            for (let num of combo) {
                if (currentPlayer.moves.has(num)) {
                    viableBoxes++;
                }
            }
            if (viableBoxes === 3) {
                return true;
            }
        }
        return false;
    };

    // Provide the logic allowing a player to initialize the game
    const startGame = _ => {
        $(`#${currentPlayer.name}`)[0].classList.add('active');
        setPlayerBoxBackground();
    };

    // Upon a tie or a player winning provide logic
    // to reset the game state for a new game
    const resetGame = _ => {
        const winContainer = document.getElementById('finish');
        $(`#${playerTwo.name}`)[0].classList.remove('active');

        for (let box of boxes) {
            box.classList.remove(`${playerOne.marker}`);
            box.classList.remove(`${playerTwo.marker}`);
        }

        playerOne.moves.clear();
        playerTwo.moves.clear();

        gameMoves = 0;
        playerWon = false;
        availableMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        currentPlayer = playerOne;

        // showStartScreen();
        startGame();
        setTimeout(_ => {
            winContainer.classList.add('fadeOut');
            setTimeout(_ => {
                winContainer.remove();
            }, 1000);
        }, 250);
    };

    // If a player has won or there is a tie, display the game over screen
    // Also display the New Game/Reset Button
    const gameOver = _ => {
        const winner = playerWon ? currentPlayer.winner : 'screen-win-tie';
        const message = playerWon ? `${titleCase(currentPlayer.realName)} Wins!` : 'It\'s a tie!';

        const winContainer = createElement('div', 'finish', `screen screen-win ${winner}`),
            winHeader = createElement('header', 'win-header', 'win-header'),
            resetButton = createElement('button', 'reset-button', 'button', 'New Game'),
            winHeading = createElement('h1', 'win-heading', 'win-heading', 'Tic Tac Toe'),
            winMessage = createElement('p', 'message', 'message', `${message}`);

        winContainer.appendChild(winHeader);
        winHeader.appendChild(winHeading);
        winHeader.appendChild(winMessage);
        winHeader.appendChild(resetButton);
        body.appendChild(winContainer);

        resetButton.addEventListener('click', _ => {
            resetGame();
        });

    };

    // Call this function when a box is selected to end the current players 
    // turn and make the other player the current player
    const switchPlayer = _ => {
        $(`#${currentPlayer.name}`)[0].classList.remove('active');

        currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

        $(`#${currentPlayer.name}`)[0].classList.add('active');

        if (currentPlayer === playerTwo && !playerWon) {
            let playerTwoMove = playerTwo.computerMove();
            console.log('player two move: ', playerTwoMove);
            setTimeout(_ => {
                boxes[playerTwoMove].click();
                console.log('moves left', availableMoves);
            }, 1000);
        }

        return currentPlayer;
    };

    // Function to govern the logic of each players turn
    const playerTurn = _ => {
        const handleBoxClick = e => {
            if (!e.target.classList.contains('box-filled-1') && !e.target.classList.contains('box-filled-2')) {
                let boxSelected = boxes.indexOf(e.target);
                availableMoves.splice(availableMoves.indexOf(boxSelected), 1);

                gameMoves++;
                e.target.classList.add(`${currentPlayer.marker}`);
                e.target.classList.remove(`${currentPlayer.name}-box-hover`);
                currentPlayer.moves.add((boxSelected + 1).toString());

                if (gameMoves >= 5) {
                    playerWon = isWinningRow();
                }

                if (playerWon || gameMoves === 9) {
                    gameOver();
                }

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
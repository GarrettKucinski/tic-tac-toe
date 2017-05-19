"use strict";

const TicTacToe = {};

TicTacToe.board = (function($) {

    const squares = [];

    const add = (square) => {
        squares.push(square);
    };

    const viewArray = () => {
        console.log(squares);
    };

    return {
        viewArray: viewArray,
        add: add
    };

})(Sizzle);

TicTacToe.square = (function($) {
    // Some properties and methods go here
})(Sizzle);

TicTacToe.board.add('hello');
TicTacToe.board.add('World');
TicTacToe.board.viewArray();
"use strict";

let ticTacToe = (function() {
    Board.init('Garrett');
    Board.add('hello');
    Board.add('World');
    Board.viewArray();

    console.log(Board.name());
});

ticTacToe();
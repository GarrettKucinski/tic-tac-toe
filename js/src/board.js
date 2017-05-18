"use strict";

let Board = (function() {
    let squares = [];
    let boardName;

    let init = (name) => {
        console.log(squares);
        boardName = name;
    }

    let add = (square) => {
        squares.push(square);
    };

    let viewArray = () => {
        console.log(squares);
    };

    let getName = () => {
        return boardName;
    };

    return {
        init: init,
        name: getName,
        viewArray: viewArray,
        add: add
    };
})();
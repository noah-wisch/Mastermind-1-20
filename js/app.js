
let GameView = require('./view');
let GameModel = require('./model');

window.addEventListener('load', () => {
    console.log('hi there');
    let games = new GameModel();

    let mainView = new GameView({
        el: document.querySelector('body'),
        model: games,
    });
    save(Backbone.sync);

    let parent = document.querySelector('#gameBoard');
    let child = document.querySelector('li');

    let button = child.querySelector('#submit');
    button.addEventListener('click', function () {
        console.log('clicked on');
        // cart.push(product);
        // console.log(cart);
        showGuess();
    });

    parent.appendChild(child);
});

Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {
        const req = new XMLHttpRequest();
        req.open('POST', 'http://nowhere.org');
        req.addEventListener('load', function () {

            const response = JSON.parse(req.responseText);
            model.set('turn', response.turn);
            model.set('guesses', response.guesses);
            model.trigger('change');
        });
        req.send();
        model.set('turn', 1);
        console.log('sync test');
    }
};

function Guess(guess) {
    this.guess = guess;
    this.exact = null; // right color, right position
    this.close = null; // right color, wrong position

    return this;
    console.log('guess function');
}

const TestModel = Backbone.Model.extend({
    defaults: {
        turn: 0,
        guesses: [],
    },

    makeGuess(guess) {
        const guesses = this.get('guesses');
        guesses.push(new Guess(guess));

        this.set('guesses', guesses);
        this.trigger('change');
        console.log('TestModel');
    },
});

function showGuess(Guess) {
    let child = document.createElement('li');
    let parent = document.querySelector('#game');

    let template = document.querySelector('#MM-template');

    child.innerHTML = Mustache.render(template.innerHTML, {
        guess: guess.guess,
        red: guess.red,
        white: guess.white,
    });
}

/**
 * ['R', 'B', 'G', 'Y'] for colors
 * Each row will be an array of 4
 * We'll get back 2 numbers in an array
 *  - first shows color is right, second shows position and color is right
 * 
 * Want to try to do button click assigns value
 * 
 */
window.addEventListener('load', function () {
    let game = new TestModel();

    game.makeGuess(['r', 'g', 'o', 'p']); // guess red, green, orange, purple
    /* Call save whenever you want to make a request to the server. */
    game.save();
    
});

const TestModel = Backbone.Model.extend({
    defaults: {
        turn: 0,
        guesses: [],
    },

    /**
     * This is the function I'd actually want to call in my view whenever its 
     * time to make a new guess.
     */
    makeGuess(guess) {
        /* Get the array, push new guess into it, store it again */
        const guesses = this.get('guesses');
        guesses.push(new Guess(guess));

        this.set('guesses', guesses);
        /**
         * IMPORTANT
         * 
         * In this case we've technically "changed" the guesses array but Backbone 
         * won't count it as a change since its still the same array (Backbone thinks
         * of 'change' as 'changed to a different array', whereas here we're just
         * modifying the existing array).
         * 
         * We can trigger the change event manually, though.
         */
        this.trigger('change');
    },
});


function Guess(guess) {
    this.guess = guess;
    this.exact = null; // right color, right position
    this.close = null; // right color, wrong position

    return this;
}

// //Creat a model:
// let IngredientsModel = Backbone.Model.extend({
//     //built-in to Bb - starting values for each property
//     defaults: {
//         peas: 100,
//     },
//     increasePeas() {
//         // this.get('peas', this.get('peas') + 1);
//         // this.send('peas', 5);
//         this.set('peas', this.get('peas') + 1);
//     },
// });

// //View for displaying/interacting w/ model
// let IngredientsView = Backbone.View.extend({
//     // what should happen at the beginning
//     initialize() {
//         this.model.on('change', this.render, this);
//     },
//     // events set up
//     events: {
//         'click #more-peas': 'addPea',
//     },

//     addPea() {
//         console.log('peas, love em')
//         this.model.increasePeas();
//     },

//     // not required, but I always make it
//     render() {
//         let button = this.el.querySelector('#more-peas');
//         button.textContent = this.model.get('peas');
//     },
// });

Backbone.sync = function(method, model) {
    /**
     * Creating new object or updating an existing one; this will be the value
     * of 'method' whenever you save().
     */
    if (method === 'create' || method === 'update') {
        const req = new XMLHttpRequest();
        req.open('POST', 'http://nowhere.org');
        req.addEventListener('load', function () {
            const response = JSON.parse(req.responseText);
            /**
             * Update the turn number and guess information now that we have the 
             * latest from the server. 
             */
            model.set('turn', response.turn);
            model.set('guesses', response.guesses);
            /* Triggering the change event will make your view re-render. */
            model.trigger('change');
        });
        req.send();
        model.set('turn', 1);
    }
    
    /* You probably won't need GET, but if you do its method is called 'read' */
};
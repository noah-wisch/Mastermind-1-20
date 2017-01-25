
//View for displaying/interacting w/ model
let GameView = Backbone.View.extend({
    // what should happen at the beginning
    initialize() {
        this.model.on('change', this.render, this);
    },
    // events set up
    events: {
        'click #more-peas': 'addPea',
    },

    addPea() {
        console.log('addPea function')
        this.model.increasePeas();
    },

    // not required, but I always make it
    render() {
        let button = this.el.querySelector('#more-peas');
        button.textContent = this.model.get('peas');
    },
});

module.exports = GameView
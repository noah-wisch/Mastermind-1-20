
let GameModel = Backbone.Model.extend({
    //built-in to Bb - starting values for each property
    defaults: {
        peas: 100,
    },
    increasePeas() {

        this.set('peas', this.get('peas') + 1);
    },
});

module.exports = GameModel;
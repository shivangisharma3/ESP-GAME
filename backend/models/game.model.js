const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const gameSchema = new Schema({
    game_id: {type: Number , required: true},
    q1: {type: Number, required: true},
    q2: {type: Number, required: true},
    q3: {type: Number, required: true},
    q4: {type: Number, required: true},
    q5: {type: Number, required: true},
}, {
    timestamps: true,
});

const Game = mongoose.model('Game',gameSchema);
module.exports = Game;